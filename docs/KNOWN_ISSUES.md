# Problemas conhecidos

Estes erros aparecem no log, mas não afetam o jogo:
- Loot tables `railways:blocks/track_*`: o Steam 'n' Rails traz trilhos para mods que não estão no pack.
- Ofertas `farmingforblockheads:market/*`: ofertas do mercado para mods que não estão no pack.
- "Couldn't load vanilla shader" do Veil: shaders de mods CodeChicken (Draconic, EnderStorage, CB Multipart) e do Mekasuit.
- Loot tables internas do `mekmm`, `create_connected`, `sfm`, `extendedae` e `createdieselgenerators`: bugs desses próprios mods.
- Duas receitas do Agritech com Oh The Biomes We've Gone, e a textura do *Infused Farmland*: bugs do próprio Agritech.
- "no onnxruntime" do Oracle Index: só desliga a busca inteligente do livro-guia.
- "[GeckoLib] Unable to parse animation: idle/attack/sit": arquivos de animação de alguns mobs têm uma expressão que o GeckoLib não entende. No máximo, uma animação daquele mob não toca.
- Receitas `createbionics:organ_*` e "has not defined synched data value" do Shark, Stalker, Organ e Golem do Create: Bionics: são partes ainda em desenvolvimento, que o próprio autor deixou desligadas. Só a lista de mobs do JER não consegue mostrá-las.
- Receita `createdeco:placard` do Create Deco: o Create já tem a própria placa, e a receita do Create Deco não carrega. Use a do Create.
- "@ModifyConstant conflict" do Create Stuff 'N Additions x Sable Compat e "@Redirect conflict" do Recipe Essentials: o NeoForge pula só aquele ajuste, porque outro mod já mexe no mesmo ponto.
- "Non-unique structure_set salt" do Structure Essentials: só avisa que dois conjuntos de estruturas podem se sobrepor.
- Mixins do Polymorph para o JEI (`polymorph-compatibility.mixins.json:jei`): o JEI mudou essas classes. Só o botão "+" do JEI pode escolher outra receita quando dois mods têm receitas iguais; o seletor do Polymorph na mesa funciona.
- "Invalid path in pack: replication:textures/block/printer - Copy.png" do Replication: uma textura com nome inválido dentro do próprio mod, que o jogo ignora.
- "Registering Runtime: jei:neoforge_gui is running and has taken 5 seconds so far" do JEI: só avisa que o JEI está demorando para montar a lista. Ele termina logo depois.

## Avisos que aparecem no chat

- **Sem shader na primeira abertura.** O Iris tenta carregar o shader corrigido antes de o Colorwheel Patcher criá-lo, e o log mostra *"Pack ... is not valid"*. A partir da segunda abertura, o shader carrega normalmente. Para ativar na hora, selecione *"ComplementaryReimagined_r5.6.1 + Clrwl_1.0.5.zip"* em Opções → Vídeo → Shader Packs. Não use o "fallback mode" que o Colorwheel oferece no chat.
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
- **Carry On abre o baú em vez de pegar.** As duas mãos precisam estar vazias (inclusive a secundária) e o Shift precisa estar pressionado antes do clique direito. Baús e barris do Sophisticated Storage guardam os itens quando quebrados; os baús e barris comuns do Minecraft, não.
- **Não use o Carry On em máquinas grandes do Mekanism**, como a Digital Miner: a máquina pode sumir. Para mudar uma delas de lugar, use a **Configurator** do Mekanism no modo *Wrench* (Shift + clique direito).

