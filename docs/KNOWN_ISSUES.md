# Problemas conhecidos

Estes erros aparecem no log, mas não afetam o jogo:
- Ofertas `farmingforblockheads:market/*`: ofertas do mercado para mods que não estão no pack.
- Loot tables internas do `mekmm`, `sfm` e `extendedae`: bugs desses próprios mods.
- A textura do *Infused Farmland*: bug do próprio Agritech.
- "no onnxruntime" do Oracle Index: só desliga a busca inteligente do livro-guia.
- "[GeckoLib] Unable to parse animation: idle/attack/sit": arquivos de animação de alguns mobs têm uma expressão que o GeckoLib não entende. No máximo, uma animação daquele mob não toca.
- "@Redirect conflict" do Recipe Essentials: o NeoForge pula só aquele ajuste, porque outro mod já mexe no mesmo ponto.
- "Non-unique structure_set salt" do Structure Essentials: só avisa que dois conjuntos de estruturas podem se sobrepor.
- Mixins do Polymorph para o JEI (`polymorph-compatibility.mixins.json:jei`): o JEI mudou essas classes. Só o botão "+" do JEI pode escolher outra receita quando dois mods têm receitas iguais; o seletor do Polymorph na mesa funciona.
- "Invalid path in pack: replication:textures/block/printer - Copy.png" do Replication: uma textura com nome inválido dentro do próprio mod, que o jogo ignora.
- "Registering Runtime: jei:neoforge_gui is running and has taken 5 seconds so far" do JEI: só avisa que o JEI está demorando para montar a lista. Ele termina logo depois.
- "Could not decode GlobalLootModifier ... tempad:tempad_loot_modifier" do Tempad: um ajuste de loot do próprio mod não carrega, e o resto dele funciona.
- "Failed to parse recipe 'veggiesdelight:compat/culturaldelight/...' ... Falling back to vanilla" do KubeJS: o KubeJS lê essas receitas do jeito padrão, e elas carregam.
- "[EnderIO] Unable to inherit the cooking recipe with ID: geore:..._shard": o Ender IO não copia as receitas de forno dos cristais do GeOre para a Alloy Smelter. Os cristais continuam derretendo no forno e no alto-forno.
- "FTBQuestsJEIIntegration ... NoClassDefFoundError" do FTB XMod Compat: é a integração com o FTB Quests, que não está no pack. O resto do mod funciona.
- "Cannot invoke MachineRecipeType.getPath()" e "Caught an error getting an Ingredient's tooltip" com o Processing Array: o Tesseract API falha ao montar a dica desse item no JEI.
- "Couldn't load advancements: dungeons_arise:..." do When Dungeons Arise: duas conquistas do próprio mod não carregam.

## Avisos que aparecem no chat

- **"IV HAS DETECTED THAT ENTITY CULLING MOD IS PRESENT"**: o aviso aparece sempre, mas as exceções para os veículos do Immersive Vehicles já estão em `config/entityculling.json`.
- **"... is not compatible with HUD batching / font atlas resizing"** do ImmediatelyFast: o Default Dark Mode muda o shader do texto, e o ImmediatelyFast desliga essas duas otimizações da interface. O jogo funciona normal; só o HUD fica um pouco mais pesado. Desative o pacote em Opções → Pacotes de recursos se preferir o desempenho.
- **"Ender IO is in alpha"** e avisos de versão nova de algum mod: só informativos.
- **Janela "não está respondendo" no Linux (GNOME)** durante o carregamento: o jogo continua carregando normalmente. Para tirar o aviso, aumente o tempo limite do GNOME com `gsettings set org.gnome.mutter check-alive-timeout 60000`.
- **Bloco ou item com textura roxa e preta.** Pode ser efeito do *dynamic resources* do ModernFix, que carrega modelos sob demanda. Abra uma *issue* informando o bloco ou item. Para desligar enquanto isso, mude `mixin.perf.dynamic_resources` para `false` em `config/modernfix-mixins.properties` e reinicie o jogo.

## Problemas ao abrir o jogo

- **Raro: o jogo para na abertura com vários erros "already registered" / "Failed to wait for future Common setup".** É uma falha intermitente de carregamento simultâneo (no log aparece `ConcurrentModificationException` no `SolarFluxResourcePack`). Não é um problema do mundo nem da instalação: feche e abra o jogo de novo.
- **Raro: janela "Failed to initialize the mod loading system and display… trouble handing off the window".** A tela de carregamento do NeoForge não conseguiu passar a janela para o jogo. Feche a mensagem e abra o jogo de novo. Se repetir, procure no `logs/latest.log` uma linha *"Unsupported installed optional dependencies"* ou *"Missing or unsupported"*, que indica um mod em versão errada.

## Teclas e controles

- **Teclas voltam ao que eram depois de editar o `options.txt` à mão.** O **Universal Keybinds** guarda as teclas num perfil global (`~/.config/JustKeybinds/profiles/default/keybinds.json` no Linux) e o reaplica ao abrir o jogo. Mude as teclas em **Opções → Controles** (o mod salva sozinho) ou edite os dois arquivos com o jogo fechado. Veja o [mapa de teclas](TECLAS.md).
- **Carry On não pega um bloco ou mob.** Na 2.0, ele só carrega animais, baús, barris e Shulker Boxes. Aldeões ficam com o Easy Villagers, e máquinas são movidas com a **Configurator** do Mekanism no modo *Wrench* (Shift + clique direito).
- **Carry On abre o baú em vez de pegar.** As duas mãos precisam estar vazias (inclusive a secundária) e o Shift precisa estar pressionado antes do clique direito. Baús e barris do Sophisticated Storage guardam os itens quando quebrados; os baús e barris comuns do Minecraft, não.

