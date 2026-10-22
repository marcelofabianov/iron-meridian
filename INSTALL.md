# Como instalar o Iron Meridian

O Iron Meridian é distribuído com o [packwiz](https://packwiz.infra.link/). Você cria uma instância no **Prism Launcher**, e o **packwiz-installer** baixa e mantém atualizados todos os mods, as configurações e o shader direto das fontes oficiais (Modrinth e CurseForge). Sempre que você abre o jogo, ele confere se há uma versão nova do pack.

## Requisitos

- [Prism Launcher](https://prismlauncher.org/), versão recente
- Java 21. O Prism baixa automaticamente se você deixar.
- **Memória:** reserve de **10 a 12 GB** para a instância. O pack tem 383 mods.

## Método rápido: importar a instância pronta ⭐

1. No Prism, clique em **Adicionar instância → Importar**.
2. Cole o link abaixo e clique em **OK**. Se quiser, troque o nome para "Iron Meridian".
   ```
   https://github.com/marcelofabianov/iron-meridian/releases/latest/download/IronMeridian-Prism.zip
   ```
   A instância já vem configurada: Minecraft 1.21.1, NeoForge 21.1.251, 10 GB de memória fixa, ajustes de Java contra travadas, o packwiz-installer-bootstrap e o comando de pré-lançamento.
3. Abra a instância e siga os itens **5 e 6** do passo a passo manual: download do SCC e shader.

## Passo a passo manual

Use este caminho se preferir montar a instância à mão.


1. **Crie a instância.** No Prism, clique em **Adicionar instância → Personalizado**:
   - Versão do Minecraft: **1.21.1**
   - Carregador de mods: **NeoForge 21.1.251**
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
5. **Abra o jogo.** Na primeira vez, o instalador baixa os 383 mods. Isso demora alguns minutos.
   - **Um mod exige download manual:** o **SCC (Super Cool Calculator)**. O autor não permite que outros programas baixem o arquivo pelo CurseForge. O instalador mostra uma janela com o link. Baixe o [`scc-1.4.7.jar`](https://www.curseforge.com/minecraft/mc-mods/scc-super-cool-calculator/files/9252241), coloque-o em `minecraft/mods/` e abra o jogo de novo. Isso só é necessário uma vez. Todos os outros mods são baixados automaticamente.
     - **Atalho, opcional, se você baixou este repositório e tem Python 3:** rode `python3 scripts/manual-mods.py --instance <pasta minecraft da instância>`. Ele abre a página oficial do arquivo certo, espera o download terminar, **confere o hash** e copia para a pasta `mods`. O download continua sendo feito por você, como o autor exige.
6. **Shader.** Na **primeira** abertura, o jogo roda **sem shader**. Nessa abertura, o Colorwheel Patcher gera a versão do Complementary corrigida para as naves do Create Aeronautics. A partir da **segunda** abertura, o shader *"ComplementaryReimagined_r5.6.1 + Clrwl_1.0.5.zip"* é ativado automaticamente. Para ativar sem reiniciar, vá em **Opções → Vídeo → Shader Packs**, selecione esse shader e clique em **Aplicar**.

## Primeiros passos no jogo

Não sabe por onde começar? Veja o **[Guia de progressão](docs/PROGRESSAO.md)**: ele sugere rotas como Create, indústria pesada, Mekanism, logística, energia, recursos automáticos e exploração, além de metas de endgame.

- Você começa com um **Akashic Tome** no slot 1, com os 25 livros-guia do pack. Use **Shift + clique direito** para escolher um livro e **Shift + clique esquerdo no ar** para voltar ao tomo.
- O **FTB Essentials** libera `/sethome`, `/home`, `/back`, `/spawn` e `/rtp` sem precisar de cheats.
- O **Keybind Atlas** (tecla **K**) mostra o mapa do teclado. Como o K tem várias funções no pack, vale trocar a tecla dele em **Controles**.

## Atualizações

Não precisa fazer nada. A cada abertura do jogo, o packwiz-installer compara a instância com o `pack.toml` deste repositório e baixa só o que mudou. As mudanças de cada versão estão no [CHANGELOG](CHANGELOG.md).

## Problemas

Veja [docs/KNOWN_ISSUES.md](docs/KNOWN_ISSUES.md). Se o jogo fechar com erro, o **Crash Assistant** abre uma janela apontando o mod culpado. Abra uma *issue* neste repositório com o arquivo de `crash-reports/`.
