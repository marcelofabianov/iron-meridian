#!/usr/bin/env python3
"""Ajuda a instalar os mods que o autor não deixa baixar automaticamente.

Alguns autores do CurseForge desativam o download por programas de terceiros,
e o packwiz-installer não consegue baixar esses arquivos (hoje, só o SCC).
O script respeita essa escolha: o download continua sendo feito por você, na
página oficial. Ele cuida do resto:

  1. confere quais desses mods faltam na instância;
  2. abre a página oficial do arquivo certo no navegador;
  3. espera o arquivo aparecer na pasta de downloads;
  4. confere o hash (tem que ser exatamente a versão do pack);
  5. copia para a pasta mods/ da instância.

Uso:
  python3 scripts/manual-mods.py                     # instância padrão do Prism
  python3 scripts/manual-mods.py --instance <pasta>  # pasta minecraft/ de outra instância
  python3 scripts/manual-mods.py --downloads <pasta> # se os downloads vão para outro lugar
"""

import argparse
import glob
import hashlib
import json
import os
import shutil
import subprocess
import time
import tomllib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIST = os.path.join(ROOT, "scripts", "manual-downloads.json")
DEFAULT_INSTANCE = os.path.expanduser(
    "~/.local/share/PrismLauncher/instances/IronMeridian-Prism/minecraft")


def default_downloads():
    try:
        out = subprocess.run(["xdg-user-dir", "DOWNLOAD"], capture_output=True, text=True).stdout.strip()
        if out:
            return out
    except FileNotFoundError:
        pass
    return os.path.expanduser("~/Downloads")


def load_manual():
    """Junta a lista de mods manuais com a versão atual de cada um no pack."""
    names = json.load(open(LIST))["mods"]
    out = []
    for f in glob.glob(os.path.join(ROOT, "mods", "*.pw.toml")):
        t = tomllib.load(open(f, "rb"))
        if t["name"] not in names:
            continue
        cf = t["update"]["curseforge"]
        out.append({
            "name": t["name"], "filename": t["filename"],
            "hash_format": t["download"]["hash-format"], "hash": t["download"]["hash"],
            "page": f"https://www.curseforge.com/minecraft/mc-mods/{names[t['name']]}/files/{cf['file-id']}",
        })
    return out


def file_hash(path, algo):
    return hashlib.new(algo, open(path, "rb").read()).hexdigest()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--instance", default=DEFAULT_INSTANCE, help="pasta minecraft/ da instância")
    ap.add_argument("--downloads", default=default_downloads())
    ap.add_argument("--timeout", type=int, default=600, help="segundos esperando cada download")
    a = ap.parse_args()

    mods_dir = os.path.join(a.instance, "mods")
    os.makedirs(mods_dir, exist_ok=True)
    pending = []
    for m in load_manual():
        target = os.path.join(mods_dir, m["filename"])
        if os.path.exists(target) and file_hash(target, m["hash_format"]) == m["hash"]:
            print(f"✓ {m['name']}: já instalado ({m['filename']})")
        else:
            pending.append(m)
    if not pending:
        print("Nada a fazer: todos os mods manuais já estão na instância.")
        return

    for m in pending:
        print(f"\n→ {m['name']}: falta o arquivo {m['filename']}")
        print(f"  Abrindo a página oficial: {m['page']}")
        print(f"  Clique em Download e salve em: {a.downloads}")
        subprocess.Popen(["xdg-open", m["page"]], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        src = os.path.join(a.downloads, m["filename"])
        deadline = time.time() + a.timeout
        while time.time() < deadline:
            if os.path.exists(src) and not os.path.exists(src + ".part") and not os.path.exists(src + ".crdownload"):
                time.sleep(1)
                if file_hash(src, m["hash_format"]) == m["hash"]:
                    shutil.copy2(src, os.path.join(mods_dir, m["filename"]))
                    print(f"  ✓ Hash confere. Copiado para {mods_dir}")
                    break
                print("  ✗ O arquivo baixado não é a versão do pack (hash diferente). Confira a página aberta.")
                return
            time.sleep(2)
        else:
            print("  Tempo esgotado esperando o download. Rode o script de novo quando terminar.")
            return
    print("\nPronto. Pode abrir o jogo.")


if __name__ == "__main__":
    main()
