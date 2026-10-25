# Iron Meridian

> Modpack de **tecnologia e construção** para **Minecraft 1.21.1 / NeoForge 21.1.265**, sem magia, para jogar sozinho.
> **423 mods** · distribuído com [packwiz](https://packwiz.infra.link/) · atualização automática

[![Última versão](https://img.shields.io/github/v/release/marcelofabianov/iron-meridian?label=vers%C3%A3o)](https://github.com/marcelofabianov/iron-meridian/releases/latest)

**[Como instalar](INSTALL.md)** · **[Guia de progressão](docs/PROGRESSAO.md)** · **[Comandos](docs/COMANDOS.md)** · **[Teclas](docs/TECLAS.md)** · **[Manutenção](docs/MANUTENCAO.md)** · **[Guia dos mods](docs/GUIA-DOS-MODS.md)** · **[Lista de mods](docs/MODS.md)** · **[Mods removidos](docs/MODS-REMOVIDOS.md)** · **[Changelog](CHANGELOG.md)** · **[Problemas conhecidos](docs/KNOWN_ISSUES.md)**

## Instalação rápida (Prism Launcher)

1. No Prism, clique em **Adicionar instância → Importar** e cole o link:
   ```
   https://github.com/marcelofabianov/iron-meridian/releases/latest/download/IronMeridian-Prism.zip
   ```
2. Abra a instância. Na primeira vez, o **packwiz-installer** baixa os 423 mods.
3. Um mod, o **SCC**, exige download manual. O instalador mostra o link. Veja os detalhes no [INSTALL.md](INSTALL.md).

Depois disso, o pack se **atualiza sozinho** a cada vez que você abre o jogo.

## Proposta

O Iron Meridian é um pack **sandbox de tecnologia**. Não há objetivo final nem quests obrigatórias. Você escolhe quais caminhos de tecnologia seguir e até onde ir: Create com engenharia mecânica e aviação, Mekanism, AE2 e Refined Storage com logística e armazenamento, Modern Industrialization com indústria pesada, e Draconic Evolution no fim do jogo.

Além da tecnologia, o pack tem **construção e decoração** (Macaw's, Handcrafted, FramedBlocks, Factory Blocks) e **exploração**: biomas do Regions Unexplored, as dimensões Ad Astra e Undergarden, e estruturas do YUNG's, Moog's e When Dungeons Arise.

| Item | Definição |
|---|---|
| Jogadores | Singleplayer |
| Foco | Tecnologia e automação, com construção e decoração |
| Progressão | Livre (sandbox), sem objetivo final |
| Magia | Não tem. A única exceção é o Mystical Agriculture com seus addons. |
| Mundo | Biomas do Regions Unexplored, mais as dimensões Ad Astra (espaço) e The Undergarden |
| Clima | Estações do ano (Serene Seasons) e dia de 30 minutos com noite de 10 (Better Days) |
| Início | O personagem começa com um Akashic Tome no slot 1, já com todos os livros-guia (24) |
| Minérios | Unificados com o Almost Unified: cada minério e lingote repetido entre mods vira um só, inclusive na geração do mundo |

## Regras de construção do pack

Toda mudança no pack segue estas regras:

1. **Compatibilidade:** todo mod precisa ter versão para **NeoForge 1.21.1**.
2. **Sem magia:** não entram mods de magia (feitiços, mana, rituais, alquimia). A única exceção é o **Mystical Agriculture e seus addons**.
3. **Sem conflitos:** primeiro removemos os mods que conflitam com outros. Depois, os que repetem a função de outro (por exemplo, três mods de cinzel ou de vidro).
4. **Dependências primeiro:** só removemos um mod se **nenhum outro mod depender dele**. Bibliotecas que ficam sem uso saem junto com o mod que as usava.
5. **Qualidade:** preferimos mods **bem avaliados e mantidos**. Mods novos ou experimentais só entram com aviso.
6. **Verificação:** antes de adicionar, conferimos as dependências e a faixa de versão de cada uma. Depois de cada mudança, **testamos a inicialização** e lemos o log (mixins, KubeJS, erros).
7. **Fontes:** baixamos de preferência do **Modrinth, com o hash conferido**. Se o mod só existe no CurseForge, baixamos de lá e verificamos a integridade do arquivo.
8. **Pasta limpa:** durante os testes, os mods removidos ou substituídos ficam como `.disabled`. Depois que a mudança é aprovada, são apagados, para a pasta `mods` ter só o que é usado.
9. **Sempre a versão estável mais nova:** todo mod novo entra na **versão estável (release) mais recente** compatível com NeoForge 1.21.1, consultada no Modrinth e no CurseForge, inclusive quando o arquivo de referência vem de outro pack, como o ATM10. Versões beta e alpha só entram quando o mod não tem nenhuma versão estável.

## Destaques

A lista completa, com links, está em [docs/MODS.md](docs/MODS.md). Um resumo de cada mod, por categoria, está no [guia dos mods](docs/GUIA-DOS-MODS.md).

### Tecnologia e energia
- **Create** e addons: Aeronautics (inclui Simulated e Offroad), Steam 'n' Rails, Railways Navigator, Connected, Dragons Plus, Enchantment Industry, Crafts & Additions, New Age, Diesel Generators, Power Loader, Hypertube, Aquatic Ambitions, Numismatics, Bells & Whistles, Stuff & Additions, Ore Excavation, **Central Kitchen** (automatiza a cozinha do Farmer's Delight) **Copycats+** (blocos que copiam a textura de qualquer bloco), **Bionics** (animais robôs que acompanham você, acham minério e carregam itens e fluidos) e **Mechanical Companion** (lobo mecânico com módulos)
- **Mekanism**: Generators, Tools, MoreMachine, Lasers, Mekanistic Routers, **Turrets** (torretas laser e cercas elétricas)
- **Modern Industrialization**: Extended Industrialization, Industrialization Overdrive, Tesseract API
- **Ender IO** (com Modded Conduits), **Industrial Foregoing** (Souls e MIFA), **Oritech**, **Powah**, **PneumaticCraft: Repressurized**, **Actually Additions**, **XyCraft**
- **Extreme Reactors**, **Draconic Evolution**, **Solar Flux Reborn**, **Generator Galore**, **Iron Generators**, **Flux Networks**, **Dyson Cube Project**
- **Extended Crafting**, **Hostile Neural Networks**, **Mining Gadgets**, **Building Gadgets 2**, **QuarryPlus** (Additional Enchanted Miner)

### Armazenamento e logística
- **Applied Energistics 2**: ExtendedAE, Advanced AE, MEGA Cells, Expanded AE, AE2WTLib, AppliedFlux, Applied Mekanistics, ME Requester, Polymorphic Energistics, Soulplied Energistics e outros
- **Refined Storage**: Extra Disks, Extra Storage, Cable Tiers, Refined Types, Universal Grid e integrações
- **SCC (Super Cool Calculator)**: calculadora de receitas e rede de armazenamento com autocrafting
- **Integrated Dynamics**: Tunnels, Terminals, Crafting, Scripting
- **RFTools** e **XNet**, **Modular Routers**, **Pipez**, **Modern Dynamics**, **Logistics Networks**, **Super Factory Manager**, **Translocators**
- **Sophisticated Backpacks e Storage**, **Functional Storage**, **Pocket Storage**, **Ender Storage**, **DimStorage**, **Entangled**

### Redstone e computação
- **CC: Tweaked** e **Advanced Peripherals**, **More Red** (com compatibilidade CC), **Little Big Redstone**, **Redstone Pen**

### Agricultura e recursos
- **Mystical Agriculture**: Agradditions, Customization, Tiered Crystals
- **Agritech: Evolved**, **Botany Pots** (Mystical e Trees), **Productive Metalworks**, **Infinite Water Block**, **Haven Cobble Generators**
- **Ore Hammer**: martelo do início do jogo. Minério bruto vira **2 pós**, e o bloco de minério pego com Toque Suave vira **3 pós**. Vale para ferro, cobre, ouro e o zinco do Create e, por um script do pack, também para estanho, chumbo, prata, níquel, alumínio, urânio, ósmio, platina, antimônio, irídio, titânio e tungstênio.
- **Farmer's Delight**, **Cooking for Blockheads**, **Farming for Blockheads**
- **Spice of Life: Carrot Edition**: cada alimento diferente que você come conta para ganhar **corações extras permanentes**. O progresso aparece no *Food Book*, que fica no Akashic Tome.

### Veículos e transporte
- **Create Aeronautics**, **Immersive Vehicles** (com o MTS Official Pack), **Immersive Aircraft**, **Man of Many Planes**, **Iron Jetpacks**, **Waystones**, **Elevator Mod**, **Laser Bridges**
- No mar: **Create: Deep Seas** (submarinos) e **Small Ships** (navios). Veja *Mar e navegação*, em *Mundo e exploração*.

### Mundo e exploração
- **Regions Unexplored** (biomas, com madeiras, flores e plantas novas)
- **Estruturas:** YUNG's (9 mods e Extras), Moog's (End, Nether, Soaring, Voyager), When Dungeons Arise, ChoiceTheorem's Overhauled Villages, Structory e Towers, Explorify, Underground Villages
- **Dimensões:** Ad Astra (foguetes, planetas e metais), The Undergarden (subterrânea, com minérios novos) e Compact Machines
- **Fauna:** **Naturalist** (47 animais reais, como veados, ursos, cobras e pássaros, com comportamento realista), **Critters and Companions** (bichos pequenos e de companhia, vários domesticáveis, como furão, lontra e panda-vermelho), **Spawn** (peixes e vida marinha, dodô, hamster e formigas) e **Ecologics** (caranguejo-do-coco, esquilo e pinguim, além de coqueiros e madeira de azaleia)
- **Mar e navegação:** **Create: Deep Seas** (submarinos com física, feitos com o Create Aeronautics: lastro, hélice, leme, sonar, oxigênio a bordo; além de velas, âncora, motor de barco e criaturas do abismo), **Small Ships** (navios prontos, com canhões), **When Dungeons Arise: Seven Seas** (navios-estrutura perigosos no oceano) e **Ocean's Delight** (comidas do mar para o Farmer's Delight)
- **Som ambiente:** **AmbientSounds**, com sons por bioma, hora e altura, como grilos à noite, vento nas montanhas e eco nas cavernas
- **Duração do dia:** **Better Days**, com o dia de **30 minutos** e a noite de **10** (no Minecraft puro são 10 e 10). A cama acelera o tempo até amanhecer, em vez de pular a noite.
- **Estações:** Serene Seasons (com GlitchCore)
- **Clima:** Simple Weather, com efeitos visuais de chuva, neve e tempestade mais bonitos
- **Previsão do tempo:** WeatherForecast, um pequeno painel na tela com o clima atual e o tempo até a próxima mudança. Liga e desliga com **F6**.
- **Combate:** Simply Swords (lanças, katanas, martelos e armas únicas), além das armas e torretas do Mekanism
- **Armas de tecnologia:** **Mekanism: Weapons** (Meka-Tana, Meka-Bow e Meka-Gun a laser, com módulos como a MekaSuit), além da Minigun do PneumaticCraft e das armas do Draconic Evolution

### Construção e decoração
- **Macaw's** (11 mods), **Handcrafted**, **FramedBlocks**, **Factory Blocks**, **Additional Lights**, **Connected Glass**, **Amendments**, **Universal Sawmill**

### Qualidade de vida
- **JEI**, **Jade**, **Xaero's Minimap e World Map**, **Just Enough Resources**, **Akashic Tome**, **Chunky**, **Trade Cycling**, **Easy Villagers**, **Crash Assistant**, **AttributeFix**
- **Pick Up Notifier**, **Easy Anvils**, **Durability Tooltip**, **Not Enough Animations**, **NetherPortalFix**, **Colorful Hearts**, **Overloaded Armor Bar**, **Bad Wither No Cookie**, **Hey Berry Shut Up**, **Model Gap Fix**, **Cherished Worlds**
- **Mouse Tweaks**, **Inventory Tweaks Refoxed**, **Inventory Essentials**, **Controlling**, **AppleSkin**, **Gravestone**, **Lootr**, **Comforts**, **Polymorph**, **Simple Backups**
- **FTB Essentials**: `/sethome`, `/home`, `/back`, `/spawn`, `/rtp` e outros comandos que funcionam sem cheats
- **FTB Chunks**: no mapa de chunks (**Alt + M**), reivindique a área da base, que fica protegida contra explosões e grief de mobs, e mantenha os chunks carregados (até 25). O minimapa dele fica desligado, porque o pack usa o do Xaero.
- **Dynamic FPS**, **Enchanting Infuser**, **Shulker Box Tooltip**, **Actually Harvest** (clique direito colhe e replanta)
- **Interface e teclas:** Reese's Sodium Options, BetterF3, Equipment Compare, Configured Defaults, Command Keys (comandos em teclas), Keybind Atlas (mapa do teclado), Universal Keybinds, Controlling, Searchables, KeybindsPurger e KeyBind Bundles.

### Desempenho e gráficos
- **Sodium**, **Iris** (shader *Complementary Reimagined r5.6.1 + Clrwl*), **ModernFix**, **FerriteCore**, **ImmediatelyFast**, **Entity Culling**, **AllTheLeaks**, **spark**, **BadOptimizations**, **CreateBetterFps**, **Alternate Current** (redstone leve) e os mods do Someaddon (**Better Chunk Loading**, **Fast Async World Save**, **Smooth Chunk Save**, **Recipe Essentials**, **Structure Essentials** e **fix GPU memory leak**)
- **Pacote de textura:** **Fancy Crops** (plantações mais bonitas), ativado por padrão

## Configurações do pack

| O quê | Onde | Por quê |
|---|---|---|
| NeoForge 21.1.265 | `pack.toml` | Versão estável mais nova. O Ecologics 2.3.8 exige a 21.1.264 ou mais nova, e o Agritech: Evolved, a 21.1.250. |
| Shader Complementary Reimagined **r5.6.1** | `shaderpacks/` e `configureddefaults/config/iris.properties` | O pack baixa o shader original. Na primeira abertura, o Colorwheel Patcher gera a versão corrigida para as naves do Create Aeronautics (*"... + Clrwl_1.0.5.zip"*), que é ativada a partir da segunda abertura. O Patcher só tem correção para o Complementary 5.6 e 5.6.1. |
| Exceções do Entity Culling: `mts:builder_existing`, `mts:builder_rendering`, `mts:builder_seat` | `config/entityculling.json` | Sem elas, o Entity Culling esconde os veículos do Immersive Vehicles |
| Modelos de sala do Compact Machines | `config/openloader/packs/compactmachines_basic_templates` | Carrega os modelos que já vêm no mod em todos os mundos, inclusive nos novos |
| Logistics Networks 1.16.3 ou mais nova (hoje 1.17.2) | `mods/` | A versão 1.13.0 não tinha a classe que o SCC usa para se integrar |
| Livros soltos ao entrar desligados: `spawnWithGuideBook`/`respawnWithGuideBook` (MI), `givePlayerBookOnJoin` (Advanced Peripherals), `giveGuidebookOnFirstJoin` (MFFS), `obtainOnSpawn` (Integrated Dynamics), `giveManualsOnJoin` (Immersive Vehicles) | `config/` | Os livros ficam só no Akashic Tome |
| Configuração inicial do jogo: escala da interface **2**, brilho **máximo**, shader Complementary com patch, **sombras de entidades desligadas** no shader (o maior custo de FPS medido com o spark), o [mapa de teclas](docs/TECLAS.md) e a **hora do jogo** embaixo do minimapa do Xaero | `configureddefaults/options.txt`, `configureddefaults/config/iris.properties`, `configureddefaults/config/xaero/` e `configureddefaults/shaderpacks/` | O Configured Defaults aplica isso na primeira abertura, quando ainda não existe `options.txt`. Depois, você pode mudar nas opções do jogo, e a escolha é mantida. |
| Akashic Tome inicial | `kubejs/server_scripts/iron_meridian_tome.js` | Na primeira entrada do personagem em cada mundo, monta um Akashic Tome com todos os livros-guia (Patchouli e guias próprios, incluindo os manuais do Immersive Vehicles), coloca no slot 1 e remove os livros soltos. Uma segunda varrida, 10 segundos depois, remove livros que algum mod entregue atrasado. |
| Martelo para os metais dos mods | `kubejs/server_scripts/iron_meridian_hammer.js` | Estende o martelo do Ore Hammer para 12 metais dos mods, com as mesmas regras (bruto 2 pós, minério 3). O pó sai pela prioridade do Almost Unified. |
| Desempenho | `config/modernfix-mixins.properties` | O *dynamic resources* do ModernFix carrega modelos e texturas sob demanda. A abertura fica cerca de 20% mais rápida (de 86 para 70 s, num Ryzen 5 5600X com RX 6700 XT) e usa menos RAM. A instância de importação também traz memória fixa e ajustes do coletor de lixo do Java, que reduzem travadas. |
| SAG Mill para os metais dos mods | `kubejs/server_scripts/iron_meridian_sag.js` | O SAG Mill do Ender IO só mói 8 metais. O script acrescenta antimônio, níquel, platina, prata, tungstênio, zinco, irídio e titânio, com a mesma regra do Ender IO (1 pó garantido + 80% de chance de outro). |
| FTB Chunks: máquinas que agem como jogador (Deployer, block breakers, Modular Routers) liberadas nos chunks reivindicados | `config/ftbchunks-world.snbt` (`fake_players: "allow"`) | No padrão, o FTB Chunks impede essas máquinas de funcionar dentro dos chunks reivindicados, o que quebraria a automação da base |
| Até 5 casas por jogador | `config/ftbessentials.snbt` e `defaultconfigs/ftbessentials-server.snbt` | O padrão do FTB Essentials é 1 casa. Com 5, dá para marcar base, mina e outros lugares com `/sethome <nome>`. |
| Lithostitched 1.8.1 | `mods/` | O Regions Unexplored 0.6.3 usa o `lithostitched:holder_set`, que só existe a partir da 1.8.1. Com versões anteriores aparece "Errors in currently selected data packs" ao criar o mundo. |
| Unificação de minérios | `config/almostunified/startup.json` e `config/almostunified/unification/materials.json` | Receitas, JEI, **geração do mundo** (`world_gen_unification`) e **loot** (`loot_unification`) unificados. Prioridade: Minecraft, KubeJS, **Mekanism** e Mekanism: More Machines, Create, Modern Industrialization, Oritech, XyCraft, Extreme Reactors e outros. Sempre que o Mekanism tem o material, os minérios, lingotes e pós dele são os padrões. |
| JEI ocupando a altura da tela | `config/jei/jei-client.ini` e `config/jei/client/jei-client.ini` | `maxRows = 100` e `maxColumns = 18`. Os arquivos estão marcados como `preserve`, então o que você mudar nas opções do JEI não é desfeito pelas atualizações. |

## Manutenção dos mods

O passo a passo completo, com testes e publicação, está em **[docs/MANUTENCAO.md](docs/MANUTENCAO.md)**.

O `mods.json`, na raiz do repositório, registra cada mod com **origem** (Modrinth ou CurseForge), **versão**, **hash**, os **IDs que ele registra** e as **dependências com a faixa de versão** de cada uma. O packwiz guarda versão e hash, mas não confere se as versões das dependências batem entre si. O script `scripts/mods.py` cobre essa parte:

```bash
python3 scripts/mods.py sync            # gera o mods.json de novo a partir dos mods/*.pw.toml
python3 scripts/mods.py check           # lista as versões estáveis mais novas (Modrinth e CurseForge)
python3 scripts/mods.py update          # simula as atualizações e confere as dependências do conjunto
python3 scripts/mods.py update --apply  # aplica no pack as que passarem, e atualiza o mods.json
python3 scripts/mods.py who-needs <modId>  # quem depende de um mod, antes de remover
scripts/build-instance-zip.sh           # gera o IronMeridian-Prism.zip da release
```

- Só entram versões **estáveis (release)** para NeoForge 1.21.1 (regra 9).
- Antes de aplicar, o script lê os `.jar` novos e **bloqueia** a atualização se ela criar um problema de dependência novo: dependência faltando, versão fora da faixa ou incompatibilidade declarada.
- `scripts/update-ignore.json` lista os mods que ficam de fora das atualizações, com o motivo de cada um.
- Os `.jar` lidos ficam em cache em `~/.cache/iron-meridian/jars`. Quando o hash bate, o script reaproveita os arquivos de uma instância já instalada.
- **Mods de download manual:** o `scripts/manual-mods.py` ajuda a instalar os mods cujo autor bloqueia o download por terceiros (hoje, só o SCC). Ele abre a página oficial, espera o download, confere o hash e copia para a instância. A lista fica em `scripts/manual-downloads.json`, e a versão sai sempre do `.pw.toml`, então acompanha as atualizações sozinha.
- Depois de um `update --apply`, a regra 6 continua valendo: **teste numa instância** antes de publicar.

## Sobre este repositório

- O repositório **não contém nenhum arquivo de mod** (`.jar`). Cada mod é referenciado por um arquivo `.pw.toml`, com o link oficial no Modrinth ou no CurseForge e o hash do arquivo. O instalador baixa tudo direto das fontes oficiais.
- `config/`, `defaultconfigs/` e `kubejs/` guardam as configurações e os scripts próprios do pack. O script mais importante é o que entrega o Akashic Tome no slot 1.
- `configureddefaults/` guarda **padrões iniciais** (escala da interface, brilho, shader). O Configured Defaults copia esses arquivos só quando eles ainda não existem, então as escolhas do jogador são mantidas.
- Configurações de preferência marcadas como `preserve` no `index.toml` não são sobrescritas nas atualizações.
- A licença [MIT](LICENSE) vale só para os arquivos próprios do pack. Cada mod e o shader continuam sob a licença dos respectivos autores.
