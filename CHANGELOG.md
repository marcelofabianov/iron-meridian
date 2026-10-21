# Changelog

## 1.1.4 — 21/10/2026

- A lista de itens do JEI passa a ocupar toda a altura livre da tela (`maxRows` = 100, antes 16). Continua com 9 colunas.
- As configurações do JEI (`config/jei/jei-client.ini` e `config/jei/client/jei-client.ini`) ficam marcadas como `preserve`: o que o jogador mudar no jogo não é desfeito pelas atualizações do pack.

## 1.1.3 — 21/10/2026

- Os manuais do Immersive Vehicles (carros e aviões) passam a ficar dentro do Akashic Tome.
- O Immersive Vehicles não entrega mais os manuais e o scanner de peças na primeira entrada (`giveManualsOnJoin = false`). O scanner tem receita.
- O script do tomo faz uma segunda varrida 10 segundos depois da entrega, para remover livros-guia que algum mod entregue atrasado.

## 1.1.2 — 21/10/2026

- A configuração do Iris (shader ativo) passou a ser só um padrão inicial, via Configured Defaults. Antes, cada atualização do pack desfazia a escolha de shader do jogador.
- Documentado que, na primeira abertura, o jogo roda sem shader, porque o Colorwheel Patcher ainda está gerando a versão corrigida. Da segunda abertura em diante, o shader é ativado automaticamente.

## 1.1.1 — 21/10/2026

- Configuração inicial do jogo com escala da interface 2 e brilho máximo, via Configured Defaults (`configureddefaults/options.txt`). Vale só para instalações novas: quem já tem um `options.txt` mantém as próprias configurações.
- Removido do índice o `debug.json` gerado pelo Almost Unified, que causava erro de download no packwiz-installer.

## 1.1.0 — 21/10/2026

**Critério:** cada mod foi atualizado para a versão **estável (release) mais nova** para NeoForge 1.21.1. Versões beta e alpha foram evitadas. Mods que só publicam beta ficaram na versão que já estava no pack. Mods publicados só no CurseForge foram atualizados para a versão que roda no ATM10 com o mesmo NeoForge.

**Verificação:** antes de aplicar, simulamos o conjunto inteiro já atualizado, conferindo dependências obrigatórias, faixas de versão, incompatibilidades declaradas e bibliotecas embutidas. Todos os downloads do Modrinth tiveram o hash conferido. Depois, testamos a inicialização e o carregamento de um mundo, e comparamos os erros do log com os da versão 1.0.

**Resultado:**
- 64 mods atualizados pelo Modrinth e 18 pelo ATM10.
- 1 dependência nova: **Simply Tooltips**, que o Simply Swords 1.70 exige.
- O Simply Swords 1.70 deixou de trazer o livro *Runic Grimoire*. Por isso o Akashic Tome inicial passa a ter 22 livros, e não mais 23.
- Instalação pelo packwiz testada do zero: os 380 mods são os mesmos da instância de referência. Só o SCC precisa de download manual (veja o INSTALL.md).
- Removida a cópia duplicada do **CC: Tweaked** (sai a 1.113.1, fica a 1.120.2).
- O **Structory: Towers** ficou na 1.0.16. O arquivo da 1.0.17 não é reconhecido como mod válido pelo NeoForge e impedia o jogo de abrir.
- Não foram atualizados:
  - **Cable Tiers:** a versão publicada aparece como 0.0.0, o que parece erro de publicação.
  - **Modular Routers:** é a mesma versão.
  - **Mods que só publicam beta:** Ender IO, Draconic Evolution, RFTools, XNet, Titanium e outros.
- **Erros novos no log em relação à 1.0:** nenhum que afete o jogo. Só um aviso de tempo de carregamento do JEI.

### Mods atualizados

| Mod | De | Para | Fonte |
|---|---|---|---|
| 3D Skin Layers | 1.11.2 | 1.11.4 | Modrinth |
| Additional Enchanted Miner | 21.1.162 | 21.1.165 | Modrinth |
| AE2 Import Export Card | 1.21.1-1.6.0 | 1.21.1-1.9.1 | Modrinth |
| alltheleaks-1.1.13+1.21.1-neoforge | alltheleaks-1.1.12+1.21.1-neoforge | alltheleaks-1.1.13+1.21.1-neoforge | ATM10 |
| Amendments | 1.21-2.1.9 | 1.21-2.2.0 | Modrinth |
| Applied Energistics 2 | 19.2.17 | 19.2.18 | Modrinth |
| Balm | 21.0.65+neoforge-1.21.1 | 21.0.66+neoforge-1.21.1 | Modrinth |
| Carry On | 2.2.2 | 2.2.6 | Modrinth |
| Colorwheel | 1.3.0-beta3+mc1.21.1 | 1.3.0+mc1.21.1 | Modrinth |
| Comforts | 9.0.4+1.21.1 | 9.0.5+1.21.1 | Modrinth |
| commoncapabilities-1.21.1-neoforge-2.11.6 | commoncapabilities-1.21.1-neoforge-2.11.5 | commoncapabilities-1.21.1-neoforge-2.11.6 | ATM10 |
| ConstructionSticks-1.21.1-1.5.0 | ConstructionSticks-1.21.1-1.4.2 | ConstructionSticks-1.21.1-1.5.0 | ATM10 |
| Create: Dragons Plus | 1.11.7b | 1.11.9 | Modrinth |
| Create: New Age | 1.1.5 | 1.2.0+mc1.21.1 | Modrinth |
| cupboard-1.21.1-4.2 | cupboard-1.21.1-4.1 | cupboard-1.21.1-4.2 | ATM10 |
| cyclopscore-1.21.1-neoforge-1.30.0 | cyclopscore-1.21.1-neoforge-1.29.3 | cyclopscore-1.21.1-neoforge-1.30.0 | ATM10 |
| DragonLib | 1.21.1-beta-3.0.28 | 3.0.29+1.21.1-neoforge | Modrinth |
| Energy Meter | 1.21.1-0.5.2+neoforge | 1.21.1-0.5.3+neoforge | Modrinth |
| Extended Industrialization | 1.16.2-1.21.1 | 1.16.4-1.21.1 | Modrinth |
| ExtraStorage | 5.0.10 | 5.1.0 | Modrinth |
| Extreme sound muffler | 3.56-1.21.1 | 3.57-1.21.1 | Modrinth |
| FancyMenu | 3.9.12-1.21.1-neoforge | 3.9.14-1.21.1-neoforge | Modrinth |
| Farmer's Delight | 1.21.1-1.3.3 | 1.21.1-1.3.4 | Modrinth |
| FramedBlocks | 10.6.1 | 10.6.3 | Modrinth |
| ftb-library-neoforge-2101.1.36 | ftb-library-neoforge-2101.1.35 | ftb-library-neoforge-2101.1.36 | ATM10 |
| ftb-xmod-compat-neoforge-21.1.12 | ftb-xmod-compat-neoforge-21.1.11 | ftb-xmod-compat-neoforge-21.1.12 | ATM10 |
| Fusion (Connected Textures) | 1.2.12-neoforge-mc1.21.1 | 1.3.16-neoforge-mc1.21.1 | Modrinth |
| Fzzy Config | 0.7.2+1.21+neoforge | 0.7.7+1.21+neoforge | Modrinth |
| Geckolib | 4.9.2 | 4.9.3 | Modrinth |
| GuideME | 21.1.17 | 21.1.19 | Modrinth |
| ImmediatelyFast | 1.6.13+1.21.1-neoforge | 1.6.15+1.21.1-neoforge | Modrinth |
| Immersive Aircraft | 1.4.6+1.21.1 | 1.7.0+1.21.1 | Modrinth |
| integratedcrafting-1.21.1-neoforge-1.7.2 | integratedcrafting-1.21.1-neoforge-1.5.0-646 | integratedcrafting-1.21.1-neoforge-1.7.2 | ATM10 |
| integrateddynamics-1.21.1-neoforge-1.37.1-2160 | integrateddynamics-1.21.1-neoforge-1.35.0-1981 | integrateddynamics-1.21.1-neoforge-1.37.1-2160 | ATM10 |
| integratedterminals-1.21.1-neoforge-1.10.0 | integratedterminals-1.21.1-neoforge-1.8.0-840 | integratedterminals-1.21.1-neoforge-1.10.0 | ATM10 |
| integratedtunnels-1.21.1-neoforge-1.12.0-792 | integratedtunnels-1.21.1-neoforge-1.10.0-729 | integratedtunnels-1.21.1-neoforge-1.12.0-792 | ATM10 |
| Iris & Oculus Search | 1.8.1-neoforge | 1.8.3-neoforge | Modrinth |
| Just Enough Breeding (JEBr) | 3.2.1 | 3.3.1 | Modrinth |
| Just Enough Items (JEI) | 19.57.0.446 | 19.64.0.455 | Modrinth |
| Just Zoom | 2.1.0-1.21.1-neoforge | 3.0.1-1.21.1-neoforge | Modrinth |
| JustEnoughMekanismMultiblocks-1.21.1-7.21 | JustEnoughMekanismMultiblocks-1.21.1-7.18 | JustEnoughMekanismMultiblocks-1.21.1-7.21 | ATM10 |
| Kotlin for Forge | 5.4.0 | 5.12.0 | Modrinth |
| KotlinLangForge | 2.12.1-k2.3.21-3.0+neoforge | 2.16.0-k2.4.21-3.0+neoforge | Modrinth |
| LambDynamicLights - Dynamic Lights | 4.8.8+1.21.1 | 4.8.11+1.21.1 | Modrinth |
| Laser Bridges & Doors | 1.21.1-neoforge-6 | 1.21.1-neoforge-6.2 | Modrinth |
| Little Big Redstone | 1.9.10-1.21.1 | 1.9.12-1.21.1 | Modrinth |
| Lootr | 1.21.1-1.11.38.124 | 1.21.1-1.11.38.127 | Modrinth |
| Man of Many Planes | 0.2.1+1.21.1 | 0.2.3+1.21.1 | Modrinth |
| ME Requester | 1.21.1-1.4.3+neoforge | 1.21.1-1.5.0+neoforge | Modrinth |
| MES - Moog's End Structures | 2.0.3 | 2.1.1 | Modrinth |
| mininggadgets-1.18.8 | mininggadgets-1.18.7 | mininggadgets-1.18.8 | ATM10 |
| MNS - Moog's Nether Structures | 3.0.0 | 3.1.1 | Modrinth |
| Modern Industrialization | 2.5.6 | 2.5.11 | Modrinth |
| ModernFix | 5.27.20+mc1.21.1 | 5.27.26+mc1.21.1 | Modrinth |
| Moog's Structure Lib (moogs_structures) | 3.1.2 | 3.4.2-neoforge-1.21.1 | Modrinth |
| Moonlight Lib | 1.21.1-3.5.2 | 1.21.1-3.7.2 | Modrinth |
| MSS - Moog's Soaring Structures | 2.1.2 | 2.2.0 | Modrinth |
| MVS - Moog's Voyager Structures | 5.0.14 | 5.1.3 | Modrinth |
| Mystical Agradditions | 8.0.14 | 8.0.15 | Modrinth |
| Oritech | 1.2.12 | 1.2.13 | Modrinth |
| Placebo | 1.21.1-9.9.2 | 1.21.1-9.9.4 | Modrinth |
| polylib-2100.1.0-build.183-neoforge | polylib-2100.0.3-build.172-neoforge | polylib-2100.1.0-build.183-neoforge | ATM10 |
| Puzzles Lib | v21.1.52-1.21.1-NeoForge | 21.1.65 | Modrinth |
| Reese's Sodium Options | mc1.21.1-2.2.3+neoforge | mc1.21.1-2.2.4+neoforge | Modrinth |
| rhino-2101.2.8-build.91 | rhino-2101.2.7-build.81 | rhino-2101.2.8-build.91 | ATM10 |
| Sable | 2.0.5+mc1.21.1 | 2.0.6+mc1.21.1 | Modrinth |
| Scalable Cat's Force | 3.5.0-build-1 | 3.7.1-build-11 | Modrinth |
| Simply Swords | 1.62.0-1.21.1 | 1.70.2-1.21.1 | Modrinth |
| Simply Tooltips (novo; exigido pelo Simply Swords 1.70) | — | 0.1.5 | Modrinth |
| Sodium | mc1.21.1-0.8.12-neoforge | mc1.21.1-0.8.13-neoforge | Modrinth |
| sophisticatedbackpacks-1.21.1-3.26.3.2158 | sophisticatedbackpacks-1.21.1-3.25.78.2107 | sophisticatedbackpacks-1.21.1-3.26.3.2158 | ATM10 |
| sophisticatedbackpackscreateintegration-1.21.1-0.2.0.168 | sophisticatedbackpackscreateintegration-1.21.1-0.1.8.134 | sophisticatedbackpackscreateintegration-1.21.1-0.2.0.168 | ATM10 |
| sophisticatedcore-1.21.1-1.5.1.2341 | sophisticatedcore-1.21.1-1.4.90.2299 | sophisticatedcore-1.21.1-1.5.1.2341 | ATM10 |
| Step Crafter | 1.21.1-0.1.9 | 1.21.1-0.1.10 | Modrinth |
| SuperMartijn642's Core Lib | 1.1.22-neoforge-mc1.21 | 1.1.25-neoforge-mc1.21 | Modrinth |
| Tesseract API | 1.12.16-1.21.1 | 1.12.18-1.21.1 | Modrinth |
| TorchMaster | 21.1.11-release | 21.1.13-release | Modrinth |
| Trash Cans | 1.0.18c-neoforge-mc1.21 | 1.1.1-neoforge-mc1.21 | Modrinth |
| Waystones | 21.1.41+neoforge-1.21.1 | 21.1.46+neoforge-1.21.1 | Modrinth |
| Xaero's Minimap | neoforge-1.21.1-26.2.1 | neoforge-1.21.1-26.6.0 | Modrinth |
| Xaero's World Map | neoforge-1.21.1-1.42.0 | neoforge-1.21.1-1.47.0 | Modrinth |
| YetAnotherConfigLib (YACL) | 3.6.6+1.21.1-neoforge | 3.8.2+1.21.1-neoforge | Modrinth |
| YUNG's API | 1.21.1-NeoForge-5.1.8 | 1.21.1-NeoForge-5.1.9 | Modrinth |

## 1.0.0 — 21/10/2026

Primeira versão, montada a partir do pack Technoverse Frontier V8 + ATM Tech.

Pack de origem: **Technoverse Frontier V8 + ATM Tech**.

| Etapa | Mudança |
|---|---|
| Crash inicial | **Mekanism Covers** desativado: era incompatível com o Sodium 0.8.12 e causava crash por mixin |
| Sem magia | Removidos **Ars Nouveau** e **ProjectE**. Mantidos o Mystical Agriculture e seus addons. |
| Agricultura | Adicionado **Agritech: Evolved** |
| Qualidade de vida | Adicionados 18 mods (veja "Qualidade de vida") e **Living Things** |
| Mundo | Removidos Oh The Biomes We've Gone (com TerraBlender, Oh The Trees You'll Grow e CorgiLib), Nullscape, Deeper and Darker, Ad Astra (com o Giselle Addon), Twilight Forest e Mining Dimension |
| Conflitos e funções repetidas | Removidos Dungeon Crawl (conflitava com o YUNG's Better Dungeons), Cristel Lib, MyLuckyBlock, Chisel Reborn, Rechiseled (com Rechiseled: Create), Glassential e Cloud Glass |
| Tecnologia | Adicionados SCC, Extended Crafting, Create Ore Excavation, Create: Stuff & Additions, Mekanism Lasers, Solar Flux Reborn (com HammerLib) e Translocators (com CB Multipart) |
| Limpeza | Removidos Productive Bees (com Modular Bees), Railcraft Reborn, Productive Trees, Macaw's Holidays, Supplementaries, StevesCarts2, SecurityCraft, MineColonies (com Byzantine, Structurize, Domum Ornamentum, BlockUI e Multi-Piston), Chipped e Artifacts |
| Água | Adicionado **Infinite Water Block** |
| Mundo | Adicionados **Terralith** e **Tectonic** |
| Comandos | Adicionado **FTB Essentials** (comandos de jogador sem cheats) |
| Facilitadores | Adicionados **Dynamic FPS**, **Enchanting Infuser** e **Shulker Box Tooltip**. O **Right Click Harvest** (com JamLib) foi testado, mas causava crash: com ele a Architectury falhava e os mods eram registrados em duplicidade. Ficou desativado e foi substituído pelo **Actually Harvest**. |
| Mundo | Removidos **Terralith** e **Tectonic**. Adicionados **Regions Unexplored**, **Ad Astra 1.16.26** e **The Undergarden**. |
| Livros-guia | Akashic Tome entregue no slot 1 por script KubeJS. Livros soltos desligados nas configurações. |
| Clima | Adicionados **Serene Seasons** (com **GlitchCore**) e **Cold Sweat** |
| Interface e teclas | Adicionados Reese's Sodium Options 2.2.3 (a 2.2.4 exige o Sodium 0.8.13), BetterF3, Configured Defaults, Equipment Compare, Command Keys, Keybind Atlas e Just Universal Keybinds. O **KeybindsGalore** também foi testado, mas saiu: com 41 teclas compartilhadas no pack (muitas só valem dentro de telas), ele abria o menu circular em quase toda tecla. |
| **Versão 1.1** | 82 mods atualizados para as versões estáveis mais novas e Simply Tooltips adicionado. Removido o CC: Tweaked duplicado. Structory: Towers mantido na 1.0.16. Veja "Atualização 1.1". |
