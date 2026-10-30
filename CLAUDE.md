# Iron Meridian

Modpack de **tecnologia e construção** para **Minecraft 1.21.1 NeoForge**, singleplayer. Sem magia, exceto **Mystical Agriculture** e seus addons. É distribuído com **packwiz** a partir de `github.com/marcelofabianov/iron-meridian`, público e com licença MIT. O repositório **não tem nenhum `.jar`**.

O usuário fala português. Responda, documente e escreva os commits em português.

## Regras do pack (siga à risca)

As regras completas estão no `README.md`, em *Regras de construção do pack*.

1. **Compatibilidade:** o mod precisa ter versão para **NeoForge 1.21.1**.
2. **Sem magia:** a única exceção é o Mystical Agriculture com seus addons.
3. **Sem conflitos nem duplicidade:** não adicione um mod que repete a função de outro que o pack já tem.
4. **Dependências primeiro:** só remova um mod se nenhum outro depender dele. Confira com `python3 scripts/mods.py who-needs <modId>`.
5. **Qualidade:** prefira mods bem avaliados e **mantidos**, com versão recente para a 1.21.1. Um mod abandonado não entra, mesmo que seja popular.
6. **Verificação:** antes de adicionar, confira as dependências e a faixa de versão no `neoforge.mods.toml` do jar. Depois, **teste numa instância temporária**.
7. **Fontes:** **Modrinth primeiro**, com o hash conferido. Use o CurseForge só se o mod não existir no Modrinth.
8. **Pasta limpa:** durante os testes, os mods removidos ficam como `.disabled`, e são apagados depois que a mudança é aprovada.
9. **Sempre a versão estável mais nova:** use a release mais recente para a 1.21.1. Beta ou alpha só entram se o mod não tiver nenhuma versão estável.

Ao sugerir mods:
- Avalie cada candidato por essas regras e diga por que cada descartado ficou de fora.
- **Confira antes o `docs/MODS-REMOVIDOS.md`.** Mods que já saíram, como Squat Grow, Just Dire Things e LaserIO, não voltam sem um motivo novo.
- Leia as dependências no `neoforge.mods.toml` do jar, inclusive as opcionais com faixa de versão. Uma opcional instalada fora da faixa também impede o jogo de abrir: foi o caso do Applied Oritech, que pedia o ExtendedAE 2.2.36 ou mais novo.
- Compare a versão do Modrinth com a do CurseForge. Alguns mods param num site e continuam no outro (ExtendedAE e Replication).

## Fluxo de trabalho

- **Anote no `PENDENTES.txt`.** Toda mudança é registrada nesse arquivo na raiz, que é local e fica fora do git e do pack.
- **Release só quando pedirem.** Nunca crie tag ou release por conta própria. O processo está na seção 9 de `docs/MANUTENCAO.md`.
- **Commit e push só quando pedirem.** Cada mudança vai para o `main`, e quem já instalou recebe na próxima abertura.
- **Listas numeradas:** numere sempre as listas de mods, porque o usuário escolhe pelo número.
- **Uma instância por vez:** ao pedir "nova instância", crie uma só. Mantenha uma instância aberta por vez.

## Comandos

```bash
~/go/bin/packwiz modrinth add --project-id <id> --version-id <id> -y   # adicionar mod (Modrinth)
~/go/bin/packwiz curseforge detect                                     # adicionar mod (jar do CurseForge em mods/)
~/go/bin/packwiz remove <nome-sem-.pw.toml>
~/go/bin/packwiz refresh
python3 scripts/mods.py sync            # gera de novo o mods.json e o docs/MODS.md
python3 scripts/mods.py check           # lista as versões estáveis novas
python3 scripts/mods.py update [--apply] [--only <nome>]
python3 scripts/mods.py who-needs <modId>
```

- O `packwiz` não está no PATH. Use `~/go/bin/packwiz`.
- **Não use `packwiz curseforge add -y` nem `packwiz update --all`.** Eles trocam a origem das dependências e duplicam entradas.
- Para deixar um mod de fora das atualizações, coloque o nome e o motivo em `scripts/update-ignore.json`.
- O `mods.py check` só compara com a mesma fonte do `.pw.toml`. Ele não avisa quando o outro site tem uma versão mais nova.
- Use a API do Modrinth (`api.modrinth.com/v2`) com `loaders=["neoforge"]` e `game_versions=["1.21.1"]` para achar a versão estável e as dependências.

## Ao adicionar ou remover um mod, atualize junto

1. `python3 scripts/mods.py sync`.
2. `docs/GUIA-DOS-MODS.md`: um resumo de 3 linhas na categoria certa, em ordem alfabética, renumerando os seguintes, e o total no topo.
3. O total de mods no `README.md` (duas ocorrências) e no `INSTALL.md` (duas ocorrências).
4. A lista de destaques do `README.md`, se fizer sentido.
   - Se o mod novo usar uma biblioteca, acrescente-o na linha "Exigida por" dela no guia.
   - Se ele mudar algo do jogo, atualize o `docs/PROGRESSAO.md` e o `docs/COMANDOS.md` quando couber.
5. **Teclas** (veja a seção abaixo).
6. Na remoção, ou quando um mod for testado e descartado, registre-o em `docs/MODS-REMOVIDOS.md`.
7. Uma linha no `PENDENTES.txt` e, no fim do ciclo, a seção da versão no `CHANGELOG.md`.

## Teclas

- A fonte de verdade é o `configureddefaults/options.txt` (só as linhas `key_`), e a documentação fica em `docs/TECLAS.md`.
- Ao adicionar um mod com teclas, leia os padrões no bytecode da classe que cria os `KeyMapping` (javap) e compare com o mapa.
- Resolva colisões no `options.txt`. Use `key.keyboard.unknown` para deixar uma ação sem tecla, ou o sufixo `:SHIFT`, `:ALT` ou `:CONTROL` para um modificador.
- Documente no `TECLAS.md`:
  - na tabela de principais teclas;
  - em *Sem tecla, de propósito*;
  - na seção do mod, em ordem alfabética.
- O `configureddefaults/` só vale para instalações novas. Para mudar a instância do usuário, edite com o jogo fechado o `options.txt` dela **e** o perfil do Universal Keybinds, em `~/.config/JustKeybinds/profiles/default/keybinds.json`. Sem o perfil, o mod reverte as teclas.
- Ids que começam com `gui.` (por exemplo, `gui.xaero_*`) podem ser ações no mundo, não de tela.
- Ações que só funcionam dentro de telas não colidem com as do mundo.

## Testar numa instância temporária

O procedimento completo está na seção 6 de `docs/MANUTENCAO.md`.

1. **Feche o Prism Launcher antes.** Com ele aberto, o Prism grava de volta o `instance.cfg` e a cópia se atualiza pelo `main`.
2. Copie uma instância já instalada, sem os mundos, e deixe `PreLaunchCommand=` vazio.
3. Sirva o pack local com `packwiz serve -p 8766 --refresh=false`. Depois de adicionar arquivos, rode `packwiz refresh` e reinicie o serve.
4. Instale na cópia, dentro da pasta `minecraft` dela: `java -jar packwiz-installer-bootstrap.jar -g -s client http://localhost:8766/pack.toml`.
5. Abra o jogo e confira:
   - se houve crash;
   - se algum mixin falhou (`Mixin apply ... failed` no `logs/latest.log`);
   - se o KubeJS carregou com 0 erros (`logs/kubejs/server.log`);
   - se mundos novos e existentes carregam.
6. Para testar um mundo existente, copie também um mundo para a cópia e abra com `prismlauncher --launch <instância> --world <mundo>`.
7. Compare as linhas de erro com o `latest.log` da instância do usuário. Só as novas importam, e as conhecidas estão em `docs/KNOWN_ISSUES.md`.
8. Apague a cópia e pare o `packwiz serve`.

## Ambiente local

| O quê | Onde |
|---|---|
| Repositório | `~/Workspace/projects/iron-meridian` |
| Instância de jogo do usuário | Prism, `~/.local/share/PrismLauncher/instances/IronMeridian-Prism/`. Mundo `saves/2026-10-21`, player "Zennd". |
| Java para o javap | `~/.local/share/PrismLauncher/java/java-runtime-delta/bin/` |
| Leitor de NBT (save, região, `level.dat`) | `~/.cache/iron-meridian/nbt.py`, com as funções `load`, `World`, `find` e `todict` |

- O save só reflete o jogo depois que ele salva (Esc ou sair do mundo).
- Não mexa na instância do usuário com o jogo aberto.
- Não investigue dispositivos de entrada (`/dev/input`) sem pedir.
- Não use `pkill -f <padrão>` com um padrão que aparece no próprio comando: isso mata o shell.
- No zsh, `ls | grep` pode falhar por causa de aliases, e globs como `--include=*.toml` dão "no matches found". Prefira `find`, aspas ou Python.
- O Prism fica na versão 11.0.1 por escolha do usuário. Não sugira atualizar.

## Estrutura

- `pack.toml` e `index.toml` definem o pack.
- `mods/*.pw.toml` tem um arquivo por mod.
- `config/`, `defaultconfigs/` e `kubejs/` guardam configurações e scripts do pack.
- `configureddefaults/` tem padrões que só valem na primeira abertura.
- Configurações de preferência do jogador recebem `preserve = true` no `index.toml`.
- `scripts/`, `release/`, `docs/`, `mods.json` e este arquivo ficam no `.packwizignore`, fora do download do jogador.
- O hook `scripts/pre-push` valida o índice antes do push.
