#!/usr/bin/env python3
"""Ferramenta de manutenção dos mods do Iron Meridian.

Lê os arquivos do packwiz (mods/*.pw.toml), mantém o mods.json na raiz do
repositório e procura atualizações estáveis no Modrinth e no CurseForge,
conferindo as dependências do conjunto inteiro antes de aceitar.

Uso:
  python3 scripts/mods.py sync                 # (re)gera o mods.json
  python3 scripts/mods.py check                # lista atualizações estáveis disponíveis
  python3 scripts/mods.py update               # simula as atualizações e confere dependências
  python3 scripts/mods.py update --apply       # aplica no pack as que passarem na checagem
  python3 scripts/mods.py who-needs <modId>    # quem depende de um mod (regra 4, antes de remover)

Opções:
  --instance DIR   pasta mods/ de uma instância para reaproveitar .jar já baixados
                   (padrão: a instância IronMeridian-Prism do Prism Launcher)
  --only NOME      limita o update aos mods cujo nome ou arquivo contenha NOME
"""

import argparse
import glob
import hashlib
import io
import json
import os
import re
import subprocess
import sys
import time
import tomllib
import urllib.parse
import urllib.request
import zipfile
from itertools import zip_longest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODS_JSON = os.path.join(ROOT, "mods.json")
IGNORE_JSON = os.path.join(ROOT, "scripts", "update-ignore.json")
CACHE = os.path.expanduser("~/.cache/iron-meridian/jars")
DEFAULT_INSTANCE = os.path.expanduser(
    "~/.local/share/PrismLauncher/instances/IronMeridian-Prism/minecraft/mods")
PACKWIZ = os.environ.get("PACKWIZ", os.path.expanduser("~/go/bin/packwiz"))
UA = {"User-Agent": "iron-meridian-mods-tool (github.com/marcelofabianov/iron-meridian)"}

pack = tomllib.load(open(os.path.join(ROOT, "pack.toml"), "rb"))
MC = pack["versions"]["minecraft"]
LOADER = "neoforge"
LOADER_VERSION = pack["versions"]["neoforge"]


# ---------------------------------------------------------------- utilidades

def http_json(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        return json.load(r)


def http_bytes(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=300) as r:
        return r.read()


def digest(data, algo):
    return hashlib.new(algo, data).hexdigest()


QUAL = {"alpha": -5, "a": -5, "beta": -4, "b": -4, "milestone": -3, "m": -3, "rc": -2,
        "cr": -2, "snapshot": -1, "": 0, "ga": 0, "final": 0, "release": 0, "sp": 1}


def _toks(v):
    out = [(1, int(t)) if t.isdigit() else (0, QUAL.get(t, -0.5))
           for t in re.findall(r"\d+|[a-z]+", v.split("+")[0].lower())]
    while out and out[-1] == (1, 0):
        out.pop()
    return out


def vcmp(a, b):
    for x, y in zip_longest(_toks(a), _toks(b), fillvalue=(1, 0)):
        if x != y:
            return -1 if x < y else 1
    return 0


def in_range(v, r):
    """Faixa de versão no formato Maven, como no neoforge.mods.toml."""
    r = r.replace(" ", "")
    if not r or r == "*":
        return True
    parts = re.findall(r"[\[\(][^\]\)]*[\]\)]", r)
    if not parts:
        return vcmp(v, r) >= 0
    for p in parts:
        body = p[1:-1]
        if "," not in body:
            if vcmp(v, body) == 0:
                return True
            continue
        lo, hi = body.split(",", 1)
        ok = True
        if lo:
            ok &= vcmp(v, lo) >= 0 if p[0] == "[" else vcmp(v, lo) > 0
        if hi:
            ok &= vcmp(v, hi) <= 0 if p[-1] == "]" else vcmp(v, hi) < 0
        if ok:
            return True
    return False


# ------------------------------------------------------------ leitura do pack

def load_pw():
    mods = []
    for f in sorted(glob.glob(os.path.join(ROOT, "mods", "*.pw.toml"))):
        t = tomllib.load(open(f, "rb"))
        u = t.get("update", {})
        m = {"file": os.path.relpath(f, ROOT), "name": t["name"], "filename": t["filename"],
             "side": t.get("side", "both"), "hash_format": t["download"]["hash-format"],
             "hash": t["download"]["hash"]}
        if "modrinth" in u:
            m.update(source="modrinth", project_id=u["modrinth"]["mod-id"],
                     version_id=u["modrinth"]["version"], url=t["download"].get("url"))
        elif "curseforge" in u:
            m.update(source="curseforge", project_id=str(u["curseforge"]["project-id"]),
                     version_id=str(u["curseforge"]["file-id"]))
        else:
            m.update(source="url", url=t["download"].get("url"))
        mods.append(m)
    return mods


_instance_index = None


def instance_index(instance):
    """hash -> caminho dos .jar da instância, para não baixar de novo."""
    global _instance_index
    if _instance_index is None:
        _instance_index = {}
        for j in glob.glob(os.path.join(instance, "*.jar")):
            data = open(j, "rb").read()
            _instance_index[digest(data, "sha1")] = j
            _instance_index[digest(data, "sha512")] = j
    return _instance_index


def fetch_jar(hash_format, hash_value, url, instance):
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, f"{hash_value}.jar")
    if os.path.exists(path):
        return path
    local = instance_index(instance).get(hash_value)
    if local:
        data = open(local, "rb").read()
    else:
        data = http_bytes(url)
        if digest(data, hash_format) != hash_value:
            raise RuntimeError(f"hash não confere ao baixar {url}")
    open(path, "wb").write(data)
    return path


def cf_download_url(project_id, file_id):
    return f"https://www.curseforge.com/api/v1/mods/{project_id}/files/{file_id}/download"


def jar_for(m, instance):
    url = m.get("url") or cf_download_url(m["project_id"], m["version_id"])
    return fetch_jar(m["hash_format"], m["hash"], url, instance)


def read_meta(jar_path):
    """IDs registrados (com versões) e dependências declaradas, incluindo os jars embutidos."""
    provides, deps = {}, []

    def scan(z):
        try:
            t = tomllib.loads(z.read("META-INF/neoforge.mods.toml").decode("utf-8", "replace"))
        except Exception:
            t = None
        ids = []
        if t:
            for mod in t.get("mods", []):
                v = str(mod.get("version", ""))
                if "$" in v:
                    try:
                        mf = z.read("META-INF/MANIFEST.MF").decode(errors="replace")
                        mm = re.search(r"Implementation-Version: *(\S+)", mf)
                        v = mm.group(1) if mm else "0"
                    except KeyError:
                        v = "0"
                ids.append(mod["modId"])
                if mod["modId"] not in provides or vcmp(v, provides[mod["modId"]]) > 0:
                    provides[mod["modId"]] = v
            d = t.get("dependencies", {})
            items = d.items() if isinstance(d, dict) else [(ids[0] if ids else "?", d)]
            for owner, lst in items:
                for dep in (lst if isinstance(lst, list) else [lst]):
                    if "modId" not in dep:
                        continue
                    typ = str(dep.get("type", "required" if dep.get("mandatory", True) else "optional")).lower()
                    deps.append({"owner": owner, "mod_id": dep["modId"], "type": typ,
                                 "range": str(dep.get("versionRange", ""))})
        for n in z.namelist():
            if (n.startswith("META-INF/jarjar/") or n.startswith("META-INF/jars/")) and n.endswith(".jar"):
                try:
                    scan(zipfile.ZipFile(io.BytesIO(z.read(n))))
                except Exception:
                    pass

    scan(zipfile.ZipFile(jar_path))
    return provides, deps


def dep_problems(entries):
    """Problemas de dependência do conjunto. Cada entrada: {'provides', 'deps'}."""
    prov = {"neoforge": LOADER_VERSION, "minecraft": MC}
    for e in entries:
        for k, v in e["provides"].items():
            if k not in prov or vcmp(v, prov[k]) > 0:
                prov[k] = v
    out = set()
    for e in entries:
        for d in e["deps"]:
            m, r = d["mod_id"], d["range"]
            if d["type"] == "required":
                if m not in prov:
                    out.add(f"FALTA: {d['owner']} exige {m} {r}")
                elif m != "minecraft" and not in_range(prov[m], r):
                    out.add(f"VERSÃO: {d['owner']} exige {m} {r}, o pack tem {prov[m]}")
            elif d["type"] == "optional" and r and m in prov and m != "minecraft" and not in_range(prov[m], r):
                # O NeoForge também barra o carregamento quando um mod opcional presente está fora da faixa.
                out.add(f"VERSÃO: {d['owner']} aceita {m} {r} (opcional), o pack tem {prov[m]}")
            elif d["type"] == "incompatible" and m in prov and in_range(prov[m], r or "[0,)"):
                out.add(f"INCOMPATÍVEL: {d['owner']} com {m} {r}")
    return out


# ----------------------------------------------------- versões nas plataformas

def latest_stable(m):
    """Retorna a versão estável mais nova para NeoForge/MC do pack, ou None."""
    q = urllib.parse.quote
    if m["source"] == "modrinth":
        vs = http_json(f"https://api.modrinth.com/v2/project/{m['project_id']}/version"
                       f"?loaders={q(json.dumps([LOADER]))}&game_versions={q(json.dumps([MC]))}")
        cur = next((v for v in vs if v["id"] == m["version_id"]), None)
        rel = [v for v in vs if v["version_type"] == "release"]
        if not rel or not cur:
            return None
        new = rel[0]
        if new["id"] == m["version_id"] or new["date_published"] <= cur["date_published"]:
            return None
        f = next((x for x in new["files"] if x["primary"]), new["files"][0])
        return {"version_id": new["id"], "version": new["version_number"], "filename": f["filename"],
                "url": f["url"], "hash_format": "sha512", "hash": f["hashes"]["sha512"],
                "current": cur["version_number"]}
    if m["source"] == "curseforge":
        d = http_json(f"https://api.cfwidget.com/{m['project_id']}")
        files = d.get("files", [])
        cur = next((x for x in files if str(x["id"]) == m["version_id"]), None)
        rel = [x for x in files if x["type"] == "release" and MC in x.get("versions", [])
               and "NeoForge" in x.get("versions", [])]
        if not rel or not cur:
            return None
        new = max(rel, key=lambda x: x["uploaded_at"])
        if str(new["id"]) == m["version_id"] or new["uploaded_at"] <= cur["uploaded_at"]:
            return None
        if new["name"] == cur["name"]:
            return None  # mesmo arquivo republicado
        url = cf_download_url(m["project_id"], new["id"])
        data = http_bytes(url)
        return {"version_id": str(new["id"]), "version": new["display"], "filename": new["name"],
                "url": url, "hash_format": "sha1", "hash": digest(data, "sha1"),
                "current": cur["display"], "_data": data}
    return None


def write_pw(m, new):
    lines = [f'name = "{m["name"]}"', f'filename = "{new["filename"]}"', f'side = "{m["side"]}"', "",
             "[download]"]
    if m["source"] == "modrinth":
        lines += [f'url = "{new["url"]}"', 'hash-format = "sha512"', f'hash = "{new["hash"]}"', "",
                  "[update]", "[update.modrinth]", f'mod-id = "{m["project_id"]}"',
                  f'version = "{new["version_id"]}"']
    else:
        lines += ['hash-format = "sha1"', f'hash = "{new["hash"]}"', 'mode = "metadata:curseforge"', "",
                  "[update]", "[update.curseforge]", f'file-id = {new["version_id"]}',
                  f'project-id = {m["project_id"]}']
    open(os.path.join(ROOT, m["file"]), "w").write("\n".join(lines) + "\n")


# ------------------------------------------------------------------- comandos

def build_entries(mods, instance, verbose=True):
    entries = []
    for i, m in enumerate(mods, 1):
        if verbose and sys.stdout.isatty():
            print(f"\r  lendo {i}/{len(mods)}", end="", flush=True)
        provides, deps = read_meta(jar_for(m, instance))
        entries.append({**m, "provides": provides, "deps": deps})
    if verbose and sys.stdout.isatty():
        print()
    return entries


def save_mods_json(entries):
    out = {
        "pack": pack["name"], "pack_version": pack["version"], "minecraft": MC,
        "loader": {"name": LOADER, "version": LOADER_VERSION},
        "generated_by": "scripts/mods.py sync",
        "mods": [{
            "name": e["name"], "source": e["source"], "project_id": e.get("project_id"),
            "version_id": e.get("version_id"), "filename": e["filename"], "side": e["side"],
            "hash": {"format": e["hash_format"], "value": e["hash"]},
            "mod_ids": e["provides"],
            "dependencies": [{"mod_id": d["mod_id"], "type": d["type"], "range": d["range"]}
                             for d in e["deps"] if d["mod_id"] not in ("minecraft",)],
            "pw_file": e["file"],
        } for e in entries],
    }
    json.dump(out, open(MODS_JSON, "w"), indent=2, ensure_ascii=False)
    print(f"mods.json salvo com {len(entries)} mods")
    write_mods_md(entries)


def write_mods_md(entries):
    rows = []
    for e in entries:
        if e["source"] == "modrinth":
            src = f"[Modrinth](https://modrinth.com/mod/{e['project_id']})"
        elif e["source"] == "curseforge":
            src = f"[CurseForge](https://www.curseforge.com/projects/{e['project_id']})"
        else:
            src = "—"
        rows.append((e["name"], e["filename"], src))
    rows.sort(key=lambda r: r[0].lower())
    mr = sum("Modrinth" in r[2] for r in rows)
    cf = sum("CurseForge" in r[2] for r in rows)
    out = ["# Lista de mods do Iron Meridian", "",
           "Gerada pelo `scripts/mods.py sync` a partir dos arquivos do packwiz (`mods/*.pw.toml`). "
           "Cada mod continua sob a licença do respectivo autor.", "",
           f"Total: **{len(rows)} mods** ({mr} do Modrinth e {cf} do CurseForge).", "",
           "| # | Mod | Arquivo | Fonte |", "|---|---|---|---|"]
    out += [f"| {i} | {n} | `{f}` | {s} |" for i, (n, f, s) in enumerate(rows, 1)]
    open(os.path.join(ROOT, "docs", "MODS.md"), "w").write("\n".join(out) + "\n")
    print("docs/MODS.md atualizado")


def load_ignore():
    if not os.path.exists(IGNORE_JSON):
        return {}
    return json.load(open(IGNORE_JSON))


def cmd_sync(a):
    entries = build_entries(load_pw(), a.instance)
    probs = dep_problems(entries)
    for p in sorted(probs):
        print("  aviso:", p)
    save_mods_json(entries)


def find_updates(mods, ignore, only):
    found = []
    for i, m in enumerate(mods, 1):
        if sys.stdout.isatty():
            print(f"\r  consultando {i}/{len(mods)}", end="", flush=True)
        if m["name"] in ignore or (only and only.lower() not in (m["name"] + m["filename"]).lower()):
            continue
        try:
            new = latest_stable(m)
        except Exception as e:
            print(f"\n  erro ao consultar {m['name']}: {e}")
            continue
        if new:
            found.append((m, new))
        time.sleep(0.15)
    if sys.stdout.isatty():
        print()
    return found


def cmd_check(a):
    ignore = load_ignore()
    ups = find_updates(load_pw(), ignore, a.only)
    for m, new in ups:
        print(f"  {m['name'][:40]:40} {new['current']} -> {new['version']}")
    print(f"{len(ups)} atualização(ões) estável(is) disponível(is)."
          f" Ignorados pela lista de exceções: {len(ignore)}")


def cmd_update(a):
    mods = load_pw()
    ignore = load_ignore()
    print("Lendo o conjunto atual...")
    entries = build_entries(mods, a.instance)
    base = dep_problems(entries)
    ups = find_updates(mods, ignore, a.only)
    if not ups:
        print("Nada para atualizar.")
        return
    by_file = {e["file"]: e for e in entries}
    for m, new in ups:
        data = new.pop("_data", None)
        path = os.path.join(CACHE, f"{new['hash']}.jar")
        if data is not None:
            os.makedirs(CACHE, exist_ok=True)
            open(path, "wb").write(data)
        else:
            path = fetch_jar(new["hash_format"], new["hash"], new["url"], a.instance)
        provides, deps = read_meta(path)
        by_file[m["file"]] = {**by_file[m["file"]], "provides": provides, "deps": deps,
                              "_new": new}
    new_probs = dep_problems(list(by_file.values())) - base
    print("\nAtualizações encontradas:")
    for m, new in ups:
        print(f"  {m['name'][:40]:40} {new['current']} -> {new['version']}")
    if new_probs:
        print("\nProblemas NOVOS de dependência com estas atualizações (nada foi aplicado):")
        for p in sorted(new_probs):
            print("  -", p)
        sys.exit(1)
    print("\nDependências: nenhum problema novo.")
    if not a.apply:
        print("Simulação apenas. Rode com --apply para aplicar.")
        return
    for m, new in ups:
        write_pw(m, new)
    subprocess.run([PACKWIZ, "refresh"], cwd=ROOT, check=True)
    entries = [{**e, **({"filename": e["_new"]["filename"], "hash_format": e["_new"]["hash_format"],
                         "hash": e["_new"]["hash"], "version_id": e["_new"]["version_id"]}
                        if "_new" in e else {})} for e in by_file.values()]
    save_mods_json(entries)
    print(f"{len(ups)} mod(s) atualizado(s). Teste numa instância antes de publicar.")


def cmd_who_needs(a):
    if not os.path.exists(MODS_JSON):
        sys.exit("mods.json não encontrado: rode 'sync' antes.")
    data = json.load(open(MODS_JSON))["mods"]
    target = a.target
    owner = [m["name"] for m in data if target in m["mod_ids"]]
    print(f"'{target}' é fornecido por: {', '.join(owner) if owner else '(nenhum mod do pack)'}")
    for kind in ("required", "optional", "incompatible"):
        users = sorted({m["name"] for m in data for d in m["dependencies"]
                        if d["mod_id"] == target and d["type"] == kind and target not in m["mod_ids"]})
        label = {"required": "EXIGEM", "optional": "têm integração opcional com", "incompatible": "declaram incompatibilidade com"}[kind]
        print(f"  Mods que {label} '{target}': {len(users)}")
        for u in users:
            print("    -", u)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("command", choices=["sync", "check", "update", "who-needs"])
    ap.add_argument("target", nargs="?", help="modId para o who-needs")
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--only")
    ap.add_argument("--instance", default=DEFAULT_INSTANCE)
    a = ap.parse_args()
    {"sync": cmd_sync, "check": cmd_check, "update": cmd_update, "who-needs": cmd_who_needs}[a.command](a)


if __name__ == "__main__":
    main()
