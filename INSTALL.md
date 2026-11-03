# Como instalar o Iron Meridian

O Iron Meridian é distribuído com o [packwiz](https://packwiz.infra.link/). Você cria uma instância no **Prism Launcher**, e o **packwiz-installer** baixa e mantém atualizados todos os mods, as configurações e o shader direto das fontes oficiais (Modrinth e CurseForge). Sempre que você abre o jogo, ele confere se há uma versão nova do pack.

## Requisitos

- [Prism Launcher](https://prismlauncher.org/), versão recente
- Java 21. O Prism baixa automaticamente se você deixar.
- **Memória:** reserve de **10 a 12 GB** para a instância. O pack tem 370 mods.

## Método rápido: importar a instância pronta ⭐

1. No Prism, clique em **Adicionar instância → Importar**.
2. Cole o link abaixo e clique em **OK**. Se quiser, troque o nome para "Iron Meridian".
   ```
   https://github.com/marcelofabianov/iron-meridian/releases/latest/download/IronMeridian-Prism.zip
   ```
   A instância já vem configurada: Minecraft 1.21.1, NeoForge 21.1.265, 10 GB de memória fixa, ajustes de Java contra travadas, o packwiz-installer-bootstrap e o comando de pré-lançamento.
3. Abra a instância e siga o item **5** do passo a passo manual: download do SCC.

## Passo a passo manual

Use este caminho se preferir montar a instância à mão.


1. **Crie a instância.** No Prism, clique em **Adicionar instância → Personalizado**:
   - Versão do Minecraft: **1.21.1**
   - Carregador de mods: **NeoForge 21.1.265**
   - Nome: **Iron Meridian**
2. **Baixe o bootstrap.** Baixe o `packwiz-installer-bootstrap.jar` em [packwiz-installer-bootstrap/releases](https://github.com/packwiz/packwiz-installer-bootstrap/releases/latest) e coloque o arquivo na pasta **`minecraft`** da instância. No Prism, clique com o botão direito na instância → **Pasta** → entre em `minecraft`.
3. **Configure o comando de pré-lançamento.** Clique com o botão direito na instância → **Editar → Configurações → Comandos personalizados**. Marque a opção para usar comandos personalizados e, em **Comando de pré-lançamento**, cole:
   ```
   "$INST_JAVA" -jar packwiz-installer-bootstrap.jar https://raw.githubusercontent.com/marcelofabianov/iron-meridian/main/pack.toml
   ```
4. **Configure a memória e o Java.** Na aba **Java** das configurações da instância:
   - **Memória mínima e máxima iguais**, entre **10240** e **12288 MB**.
   - Em **Argumentos da JVM**, cole a linha abaixo. São ajustes do coletor de lixo que reduzem travadas durante o jogo:
     ```
     -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:InitiatingHeapOccupancyPercent=15 -XX:SurvivorRatio=32 -XX:MaxTenuringThreshold=1
     ```
5. **Abra o jogo.** Na primeira vez, o instalador baixa os 370 mods. Isso demora alguns minutos.
   - **Um mod exige download manual:** o **SCC (Super Cool Calculator)**. O autor não permite que outros programas baixem o arquivo pelo CurseForge. O instalador mostra uma janela com o link. Baixe o [`scc-1.4.7.jar`](https://www.curseforge.com/minecraft/mc-mods/scc-super-cool-calculator/files/9252241), coloque-o em `minecraft/mods/` e abra o jogo de novo. Isso só é necessário uma vez. Todos os outros mods são baixados automaticamente.
     - **Atalho, opcional, se você baixou este repositório e tem Python 3:** rode `python3 scripts/manual-mods.py --instance <pasta minecraft da instância>`. Ele abre a página oficial do arquivo certo, espera o download terminar, **confere o hash** e copia para a pasta `mods`. O download continua sendo feito por você, como o autor exige.

## Primeiros passos no jogo

Não sabe por onde começar? Veja o **[Guia de progressão](docs/PROGRESSAO.md)**: ele sugere rotas como indústria pesada, Mekanism, logística, energia, recursos automáticos e exploração, além de metas de endgame.

- Você começa com o **livro de boas-vindas** do pack no slot 1, com o link do GitHub, e um **Akashic Tome** no slot 2, com os livros-guia do pack. Use **Shift + clique direito** para escolher um livro, **clique direito no ar** para abrir e **Shift + clique esquerdo no ar** para voltar ao tomo.
- O **FTB Essentials** libera `/sethome`, `/home`, `/back`, `/spawn` e `/rtp` sem precisar de cheats. A lista completa está no **[guia de comandos](docs/COMANDOS.md)**.
- O **Keybind Atlas** (tecla **K**) mostra o mapa do teclado. As teclas do pack estão organizadas para não colidirem: veja o **[mapa de teclas](docs/TECLAS.md)**.
- Quando tiver uma base, proteja e mantenha carregada a área pelo **FTB Chunks** (**Alt + M**), como explica o [guia de comandos](docs/COMANDOS.md).

## Atualizações

Não precisa fazer nada. A cada abertura do jogo, o packwiz-installer compara a instância com o `pack.toml` deste repositório e baixa só o que mudou. As mudanças de cada versão estão no [CHANGELOG](CHANGELOG.md).

## Continuar na versão 1.x

A **2.0 quebra mundos**: ela tira o Create, o Mystical Agriculture e outros mods, e o conteúdo deles some dos mundos antigos. Para seguir jogando um mundo 1.x, aponte a instância para a branch `v1`, que está congelada na última versão da linha 1 (**1.1.20**).

1. **Antes de abrir o jogo,** vá em **Editar instância → Configurações → Comandos personalizados** no Prism.
2. Troque `main` por `v1` no comando de pré-lançamento:
   ```
   "$INST_JAVA" -jar packwiz-installer-bootstrap.jar https://raw.githubusercontent.com/marcelofabianov/iron-meridian/v1/pack.toml
   ```
3. Abra o jogo normalmente. A instância fica na 1.x e recebe só correções críticas.

O zip de qualquer release vem apontando para o `main`. Quem importar um zip antigo recebe a versão mais nova, então faça essa troca antes da primeira abertura. Para abrir um mundo 1.x na 2.0 mesmo assim, faça backup antes. A política de versões está em [docs/VERSIONAMENTO.md](docs/VERSIONAMENTO.md).

## Problemas

Veja [docs/KNOWN_ISSUES.md](docs/KNOWN_ISSUES.md). Se o jogo fechar com erro, o **Crash Assistant** abre uma janela apontando o mod culpado. Abra uma *issue* neste repositório com o arquivo de `crash-reports/`.
