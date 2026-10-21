# Problemas conhecidos

Estes erros aparecem no log, mas não afetam o jogo:
- Loot tables `railways:blocks/track_*`: o Steam 'n' Rails traz trilhos para mods que não estão no pack.
- Ofertas `farmingforblockheads:market/*`: ofertas do mercado para mods que não estão no pack.
- "Couldn't load vanilla shader" do Veil: shaders de mods CodeChicken (Draconic, EnderStorage, CB Multipart) e do Mekasuit.
- "Cannot get config value before config is loaded": o Just Dire Things lê a configuração antes da hora ao iniciar.
- Loot tables internas do `mekmm`, `create_connected`, `sfm`, `extendedae` e `createdieselgenerators`: bugs desses próprios mods.
- Duas receitas do Agritech com Oh The Biomes We've Gone, e a textura do *Infused Farmland*: bugs do próprio Agritech.
- "no onnxruntime" do Oracle Index: só desliga a busca inteligente do livro-guia.

## Avisos que aparecem no chat

- **Sem shader na primeira abertura.** O Iris tenta carregar o shader corrigido antes de o Colorwheel Patcher criá-lo, e o log mostra *"Pack ... is not valid"*. A partir da segunda abertura, o shader carrega normalmente. Para ativar na hora, selecione *"ComplementaryReimagined_r5.6.1 + Clrwl_1.0.5.zip"* em Opções → Vídeo → Shader Packs. Não use o "fallback mode" que o Colorwheel oferece no chat.
- **"IV HAS DETECTED THAT ENTITY CULLING MOD IS PRESENT"**: o aviso aparece sempre, mas as exceções para os veículos do Immersive Vehicles já estão em `config/entityculling.json`.
- **"Ender IO is in alpha"** e avisos de versão nova de algum mod: só informativos.
- **Janela "não está respondendo" no Linux (GNOME)** durante o carregamento: o jogo continua carregando normalmente. Para tirar o aviso, aumente o tempo limite do GNOME com `gsettings set org.gnome.mutter check-alive-timeout 60000`.
