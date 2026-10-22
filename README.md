# Iron Meridian

> Modpack de **tecnologia e construção** para **Minecraft 1.21.1 / NeoForge 21.1.251**, sem magia, para jogar sozinho.
> **382 mods** · distribuído com [packwiz](https://packwiz.infra.link/) · atualização automática

[![Última versão](https://img.shields.io/github/v/release/marcelofabianov/iron-meridian?label=vers%C3%A3o)](https://github.com/marcelofabianov/iron-meridian/releases/latest)

**[Como instalar](INSTALL.md)** · **[Guia de progressão](docs/PROGRESSAO.md)** · **[Lista de mods](docs/MODS.md)** · **[Changelog](CHANGELOG.md)** · **[Problemas conhecidos](docs/KNOWN_ISSUES.md)**

## Instalação rápida (Prism Launcher)

1. No Prism, clique em **Adicionar instância → Importar** e cole o link:
   ```
   https://github.com/marcelofabianov/iron-meridian/releases/latest/download/IronMeridian-Prism.zip
   ```
2. Abra a instância. Na primeira vez, o **packwiz-installer** baixa os 382 mods.
3. Um mod, o **SCC**, exige download manual. O instalador mostra o link. Veja os detalhes no [INSTALL.md](INSTALL.md).

Depois disso, o pack se **atualiza sozinho** a cada vez que você abre o jogo.

## Proposta

O Iron Meridian é um pack **sandbox de tecnologia**. Não há objetivo final nem quests obrigatórias. Você escolhe quais caminhos de tecnologia seguir e até onde ir: Create com engenharia mecânica e aviação, Mekanism, AE2 e Refined Storage com logística e armazenamento, Modern Industrialization e Immersive Engineering com indústria pesada, e Draconic Evolution no fim do jogo.

Além da tecnologia, o pack tem **construção e decoração** (Macaw's, Handcrafted, FramedBlocks, Factory Blocks) e **exploração**: biomas do Regions Unexplored, as dimensões Ad Astra e Undergarden, e estruturas do YUNG's, Moog's e When Dungeons Arise.

| Item | Definição |
|---|---|
| Jogadores | Singleplayer |
| Foco | Tecnologia e automação, com construção e decoração |
| Progressão | Livre (sandbox), sem objetivo final |
| Magia | Não tem. A única exceção é o Mystical Agriculture com seus addons. |
| Mundo | Biomas do Regions Unexplored, mais as dimensões Ad Astra (espaço) e The Undergarden |
| Clima | Estações do ano (Serene Seasons) e temperatura do corpo (Cold Sweat) |
| Início | O personagem começa com um Akashic Tome no slot 1, já com todos os livros-guia (25) |
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

## Destaques

A lista completa, com links, está em [docs/MODS.md](docs/MODS.md).

### Tecnologia e energia
- **Create** e addons: Aeronautics (inclui Simulated e Offroad), Steam 'n' Rails, Railways Navigator, Connected, Dragons Plus, Enchantment Industry, Crafts & Additions, New Age, Diesel Generators, Power Loader, Hypertube, Aquatic Ambitions, Numismatics, Bells & Whistles, Stuff & Additions, Ore Excavation
- **Mekanism**: Generators, Tools, MoreMachine, Lasers, Mekanistic Routers
- **Modern Industrialization**: Extended Industrialization, Industrialization Overdrive, Tesseract API
- **Immersive Engineering**, **Ender IO** (com Modded Conduits), **Industrial Foregoing** (Souls e MIFA), **Oritech**, **Powah**, **PneumaticCraft: Repressurized**, **Actually Additions**, **XyCraft**
- **Extreme Reactors**, **Draconic Evolution**, **Solar Flux Reborn**, **Generators Galore**, **Iron Generators**, **Flux Networks**, **Dyson Cube Project**
- **Extended Crafting**, **Hostile Neural Networks**, **Just Dire Things**, **Mining Gadgets**, **Building Gadgets 2**, **QuarryPlus**

### Armazenamento e logística
- **Applied Energistics 2**: ExtendedAE, Advanced AE, MEGA Cells, Expanded AE, AE2WTLib, AppliedFlux, Applied Mekanistics, ME Requester, Polymorphic Energistics, Soulplied Energistics, Immersive Energistics e outros
- **Refined Storage**: Extra Disks, Extra Storage, Cable Tiers, Refined Types, Universal Grid e integrações
- **SCC (Super Cool Calculator)**: calculadora de receitas e rede de armazenamento com autocrafting
- **Integrated Dynamics**: Tunnels, Terminals, Crafting, Scripting
- **RFTools** e **XNet**, **LaserIO**, **Modular Routers**, **Pipez**, **Modern Dynamics**, **Logistics Networks**, **Super Factory Manager**, **Translocators**
- **Sophisticated Backpacks e Storage**, **Functional Storage**, **Pocket Storage**, **Ender Storage**, **DimStorage**, **Entangled**

### Redstone e computação
- **CC: Tweaked** e **Advanced Peripherals**, **More Red** (com compatibilidade CC), **Little Big Redstone**, **Redstone Pen**

### Agricultura e recursos
- **Mystical Agriculture**: Agradditions, Customization, Tiered Crystals
- **Agritech: Evolved**, **Botany Pots** (Mystical e Trees), **Productive Metalworks**, **Infinite Water Block**, **Haven Cobble Generators**
- **Ore Hammer**: martelo do início do jogo. Minério bruto vira **2 pós**, e o bloco de minério pego com Toque Suave vira **3 pós**, para ferro, cobre, ouro e o zinco do Create.
- **Farmer's Delight**, **Cooking for Blockheads**, **Farming for Blockheads**
- **Spice of Life: Carrot Edition**: cada alimento diferente que você come conta para ganhar **corações extras permanentes**. O progresso aparece no *Food Book*, que fica no Akashic Tome.

### Veículos e transporte
- **Create Aeronautics**, **Immersive Vehicles** (com o MTS Official Pack), **Immersive Aircraft**, **Man of Many Planes**, **Iron Jetpacks**, **Waystones**, **Elevator Mod**, **Laser Bridges**

### Mundo e exploração
- **Regions Unexplored** (biomas, com madeiras, flores e plantas novas)
- **Estruturas:** YUNG's (9 mods e Extras), Moog's (End, Nether, Soaring, Voyager), When Dungeons Arise, ChoiceTheorem's Overhauled Villages, Structory e Towers, Explorify, Underground Villages
- **Dimensões:** Ad Astra (foguetes, planetas e metais), The Undergarden (subterrânea, com minérios novos) e Compact Machines
- **Fauna:** Living Things
- **Estações e temperatura:** Serene Seasons (com GlitchCore) e Cold Sweat
- **Combate:** L_Ender's Cataclysm, Simply Swords

### Construção e decoração
- **Macaw's** (11 mods), **Handcrafted**, **FramedBlocks**, **Factory Blocks**, **Additional Lights**, **Connected Glass**, **Amendments**, **Universal Sawmill**

### Qualidade de vida
- **JEI**, **Jade**, **Xaero's Minimap e World Map**, **Just Enough Resources**, **Akashic Tome**, **Chunky**, **Trade Cycling**, **Easy Villagers**, **Crash Assistant**, **AttributeFix**
- **Pick Up Notifier**, **Easy Anvils**, **Durability Tooltip**, **Entity Culling**, **Not Enough Animations**, **NetherPortalFix**, **Colorful Hearts**, **Overloaded Armor Bar**, **Bad Wither No Cookie**, **Hey Berry Shut Up**, **ModelFix**, **Cherished Worlds**
- **Mouse Tweaks**, **Inventory Tweaks Refoxed**, **Inventory Essentials**, **Controlling**, **AppleSkin**, **Gravestone**, **Lootr**, **Comforts**, **Polymorph**, **Simple Backups**
- **FTB Essentials**: `/sethome`, `/home`, `/back`, `/spawn`, `/rtp` e outros comandos que funcionam sem cheats
- **Dynamic FPS**, **Enchanting Infuser**, **Shulker Box Tooltip**, **Actually Harvest** (clique direito colhe e replanta)
- **Interface e teclas:** Reese's Sodium Options, BetterF3, Equipment Compare, Configured Defaults, Command Keys (comandos em teclas), Keybind Atlas (mapa do teclado), Just Universal Keybinds. Já faziam parte do pack: Controlling, Searchables, KeybindsPurger e KeyBind Bundles.

### Desempenho e gráficos
- **Sodium**, **Iris** (shader *Complementary Reimagined r5.6.1 + Clrwl*), **ModernFix**, **FerriteCore**, **ImmediatelyFast**, **Entity Culling**, **AllTheLeaks**, **spark**

## Configurações do pack

| O quê | Onde | Por quê |
|---|---|---|
| NeoForge 21.1.251 | `pack.toml` | O Agritech: Evolved exige a versão 21.1.250 ou mais nova |
| Shader Complementary Reimagined **r5.6.1** | `shaderpacks/` e `configureddefaults/config/iris.properties` | O pack baixa o shader original. Na primeira abertura, o Colorwheel Patcher gera a versão corrigida para as naves do Create Aeronautics (*"... + Clrwl_1.0.5.zip"*), que é ativada a partir da segunda abertura. O Patcher só tem correção para o Complementary 5.6 e 5.6.1. |
| Exceções do Entity Culling: `mts:builder_existing`, `mts:builder_rendering`, `mts:builder_seat` | `config/entityculling.json` | Sem elas, o Entity Culling esconde os veículos do Immersive Vehicles |
| Modelos de sala do Compact Machines | `config/openloader/packs/compactmachines_basic_templates` | Carrega os modelos que já vêm no mod em todos os mundos, inclusive nos novos |
| Logistics Networks 1.16.3 | `mods/` | A versão 1.13.0 não tinha a classe que o SCC usa para se integrar |
| Livros soltos ao entrar desligados: `spawnWithGuideBook`/`respawnWithGuideBook` (MI), `givePlayerBookOnJoin` (Advanced Peripherals), `giveGuidebookOnFirstJoin` (MFFS), `obtainOnSpawn` (Integrated Dynamics), `giveManualsOnJoin` (Immersive Vehicles) | `config/` | Os livros ficam só no Akashic Tome |
| Configuração inicial do jogo: escala da interface **2**, brilho **máximo** e shader Complementary com patch | `configureddefaults/options.txt` e `configureddefaults/config/iris.properties` | O Configured Defaults aplica isso na primeira abertura, quando ainda não existe `options.txt`. Depois, você pode mudar nas opções do jogo, e a escolha é mantida. |
| Akashic Tome inicial | `kubejs/server_scripts/iron_meridian_tome.js` | Na primeira entrada do personagem em cada mundo, monta um Akashic Tome com todos os livros-guia (Patchouli e guias próprios, incluindo os manuais do Immersive Vehicles), coloca no slot 1 e remove os livros soltos. Uma segunda varrida, 10 segundos depois, remove livros que algum mod entregue atrasado. |
| Lithostitched 1.8.1 | `mods/` | O Regions Unexplored 0.6.3 usa o `lithostitched:holder_set`, que só existe a partir da 1.8.1. Com versões anteriores aparece "Errors in currently selected data packs" ao criar o mundo. |
| Unificação de minérios | `config/almostunified/startup.json` e `config/almostunified/unification/materials.json` | Receitas, JEI, **geração do mundo** (`world_gen_unification`) e **loot** (`loot_unification`) unificados. Prioridade: Minecraft, KubeJS, Create, Immersive Engineering, Mekanism, Modern Industrialization, Oritech, XyCraft, Extreme Reactors e outros. |
| JEI ocupando a altura da tela | `config/jei/jei-client.ini` e `config/jei/client/jei-client.ini` | `maxRows = 100` e `maxColumns = 18`. Os arquivos estão marcados como `preserve`, então o que você mudar nas opções do JEI não é desfeito pelas atualizações. |

## Sobre este repositório

- O repositório **não contém nenhum arquivo de mod** (`.jar`). Cada mod é referenciado por um arquivo `.pw.toml`, com o link oficial no Modrinth ou no CurseForge e o hash do arquivo. O instalador baixa tudo direto das fontes oficiais.
- `config/`, `defaultconfigs/` e `kubejs/` guardam as configurações e os scripts próprios do pack. O script mais importante é o que entrega o Akashic Tome no slot 1.
- `configureddefaults/` guarda **padrões iniciais** (escala da interface, brilho, shader). O Configured Defaults copia esses arquivos só quando eles ainda não existem, então as escolhas do jogador são mantidas.
- Configurações de preferência marcadas como `preserve` no `index.toml` não são sobrescritas nas atualizações.
- A licença [MIT](LICENSE) vale só para os arquivos próprios do pack. Cada mod e o shader continuam sob a licença dos respectivos autores.
