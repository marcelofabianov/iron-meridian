# Guia de manutenção do Iron Meridian

Guia para quem **mantém** o pack: atualizar mods, adicionar ou remover, testar e publicar versões. Para jogar, veja o [INSTALL.md](../INSTALL.md) e o [guia de comandos](COMANDOS.md).

Toda mudança segue as **regras do pack**, que estão no [README](../README.md#regras-de-construção-do-pack). As mais usadas aqui:
- **regra 4:** só remova um mod se nenhum outro depender dele;
- **regra 6:** teste numa instância antes de publicar;
- **regra 9:** use sempre a versão estável mais nova.

---

## 1. Preparar o ambiente (uma vez)

| Ferramenta | Para quê | Instalação |
|---|---|---|
| **git** e **GitHub CLI** (`gh`) | Versionar e publicar releases | Gerenciador de pacotes do sistema. Depois rode `gh auth login`. |
| **Python 3.11+** | Scripts em `scripts/`, que usam `tomllib` | Já vem na maioria das distros Linux |
| **Go** e **packwiz** | Gerenciar os `.pw.toml` e o índice | `go install github.com/packwiz/packwiz@latest`, que instala em `~/go/bin/packwiz` |
| **Prism Launcher** | Testar as instâncias | — |

Depois de clonar, ligue o **hook de verificação**. Ele bloqueia um `git push` quando o índice do pack está inconsistente:
```bash
ln -sf ../../scripts/pre-push .git/hooks/pre-push
```

## 2. Estrutura do repositório

| Caminho | O que é |
|---|---|
| `pack.toml` / `index.toml` | Definição do pack (versão, Minecraft, NeoForge) e índice de todos os arquivos |
| `mods/*.pw.toml` | Um arquivo por mod: origem (Modrinth ou CurseForge), versão e hash. **Nenhum `.jar`.** |
| `config/`, `defaultconfigs/`, `kubejs/` | Configurações e scripts próprios do pack |
| `configureddefaults/` | **Padrões iniciais** (escala, brilho, shader). Só são copiados quando o arquivo ainda não existe. |
| `mods.json` | Lista gerada com versão, hash, IDs e **dependências** de cada mod |
| `scripts/` | Ferramentas de manutenção (este guia) |
| `release/instance/` | Modelo da instância de importação do Prism |
| `PENDENTES.txt` | **Local, não versionado.** Mudanças acumuladas para a próxima tag. |

`mods.json`, `scripts/`, `release/` e os documentos ficam **fora do pack**, no `.packwizignore`. Quem joga não baixa esses arquivos.

## 3. Verificar e aplicar atualizações

```bash
python3 scripts/mods.py check            # 1. lista as versões estáveis novas
python3 scripts/mods.py update           # 2. simula e confere as dependências do conjunto
python3 scripts/mods.py update --apply   # 3. aplica no pack (.pw.toml, índice e mods.json)
```
- O `update` **bloqueia** a aplicação se alguma atualização criar um problema de dependência novo: dependência faltando, versão fora da faixa ou incompatibilidade.
- `--only <nome>` limita a um mod, por exemplo `--only sophisticated`.
- Para deixar um mod **de fora** das atualizações, coloque o nome e o motivo em `scripts/update-ignore.json`.
- **Não use `packwiz curseforge add -y` nem `packwiz update --all` para atualizar.** Eles trocam a origem das dependências (Modrinth → CurseForge) e duplicam entradas.

Depois de aplicar, **teste** (seção 6) antes do `git push`.

## 4. Adicionar um mod novo

1. **Confira as regras:** NeoForge 1.21.1, sem magia, sem conflito ou duplicidade, e **versão estável mais nova** (regra 9), mesmo que você tenha o `.jar` de outro pack, como o ATM10.
2. **Adicione ao pack:**
   - **Modrinth:** `packwiz modrinth add --project-id <id> --version-id <id> -y`. Confira em seguida, no `git status`, se ele mexeu em outros `.pw.toml`.
   - **CurseForge:** coloque o `.jar` em `mods/` e rode `packwiz curseforge detect`. Ele cria o `.pw.toml` e apaga o `.jar`.
3. **Veja se o CurseForge permite download automático.** Instale o pack numa instância de teste (seção 6). Se o instalador pedir download manual, acrescente o mod em `scripts/manual-downloads.json` e documente no INSTALL.
4. **Gere a lista de novo:** `python3 scripts/mods.py sync`, que atualiza o `mods.json` e o `docs/MODS.md`.
5. **Documente:** destaque no README (se fizer sentido), o total de mods no README e no INSTALL, e uma linha no `PENDENTES.txt`.

## 5. Remover um mod

1. **Veja quem depende dele:** `python3 scripts/mods.py who-needs <modId>`. Se aparecer algum mod em "EXIGEM", **não remova**, ou remova os dois juntos.
2. Remova: `packwiz remove <nome-do-arquivo-sem-.pw.toml>`.
3. Apague as configurações dele em `config/`, se houver.
4. Rode `python3 scripts/mods.py sync`, atualize a documentação e anote no `PENDENTES.txt`.

## 6. Testar numa instância temporária

1. **Copie uma instância** já instalada, sem os mundos, e desligue o comando de pré-lançamento da cópia (`OverrideCommands=false` no `instance.cfg`), para ela não puxar do GitHub.
2. **Sirva o pack local:**
   ```bash
   packwiz serve -p 8766 --refresh=false
   ```
3. **Instale na cópia:**
   ```bash
   java -jar packwiz-installer-bootstrap.jar -g -s client http://localhost:8766/pack.toml
   ```
   Rode isso dentro da pasta `minecraft` da cópia.
4. **Abra o jogo** e confira:
   - se não houve crash;
   - se nenhum mixin falhou (`Mixin apply ... failed` no `logs/latest.log`);
   - se o KubeJS carregou com 0 erros (`logs/kubejs/server.log`);
   - se mundos novos e existentes carregam.
5. Apague a cópia.

**Configurações de preferência do jogador** (JEI, notificações e outras) devem ficar com `preserve = true` no `index.toml`. Sem isso, o instalador desfaz o que o jogador mudar. Padrões que só valem na primeira abertura vão em `configureddefaults/`.

## 7. Mods de download manual

O autor do **SCC** bloqueia o download automático pelo CurseForge, e o pack respeita essa escolha. Para ajudar quem instala:
```bash
python3 scripts/manual-mods.py --instance <pasta minecraft da instância>
```
O script abre a página oficial do arquivo certo, espera o download, confere o hash e copia para a pasta `mods`. A lista fica em `scripts/manual-downloads.json`, e a versão é lida do `.pw.toml`, então acompanha as atualizações.

## 8. Publicar uma versão

1. **Durante o ciclo:** cada mudança vai para o `main`, e quem já instalou recebe na próxima abertura. Anote tudo no `PENDENTES.txt`.
2. **Ao fechar a versão:**
   - escreva a seção da versão no `CHANGELOG.md` a partir do `PENDENTES.txt`, organizada por assunto;
   - confira o `version` do `pack.toml`;
   - gere a instância de importação:
     ```bash
     scripts/build-instance-zip.sh
     ```
     O arquivo sai em `dist/IronMeridian-Prism.zip`.
   - publique:
     ```bash
     gh release create vX.Y.Z --title "Iron Meridian X.Y.Z" --notes-file notas.md dist/IronMeridian-Prism.zip
     ```
3. **Abra o próximo ciclo:** suba o `version` do `pack.toml`, rode `packwiz refresh`, zere o `PENDENTES.txt` e faça o commit.

O link `releases/latest/download/IronMeridian-Prism.zip` sempre aponta para a release mais nova. Depois de um `git push`, o GitHub pode levar alguns minutos para servir os arquivos novos, por causa do cache do `raw.githubusercontent.com`.

## 9. Problemas comuns

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Instalador: *"Failed to download … 404"* | Um arquivo do índice não está no git, como um `debug.json` ignorado por um `.gitignore` interno | O hook `pre-push` detecta isso. Coloque o arquivo no `.packwizignore` e rode `packwiz refresh`. |
| Instalador pede download manual | O autor bloqueou o download por terceiros | Seção 7 |
| *"Errors in currently selected data packs"* ao criar o mundo | Um mod de geração de mundo exige versão mais nova de uma biblioteca, como o Regions Unexplored com a Lithostitched | Leia o `latest.log`, procure *Unknown registry key* e atualize a biblioteca |
| *"… is not a valid mod file"* | Arquivo publicado com defeito, como o Structory: Towers 1.0.17 | Volte à versão anterior e acrescente o mod no `update-ignore.json` |
| Configuração do jogador volta ao padrão a cada abertura | O arquivo está no pack sem `preserve` | Marque `preserve = true` ou mova para `configureddefaults/` |
