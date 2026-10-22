# Guia de comandos do Iron Meridian

Comandos úteis **dentro do jogo**. A maioria funciona **sem cheats**. Os que precisam de cheats estão marcados com 🔒.

> **Para liberar os comandos 🔒 num mundo singleplayer:** ao criar o mundo, marque *Permitir cheats*. Num mundo já criado, use **Esc → Abrir para LAN → Permitir cheats: Ativado → Iniciar mundo em LAN**. A liberação vale até você sair do mundo.

---

## Teleporte e navegação (FTB Essentials)

| Comando | O que faz | Observação |
|---|---|---|
| `/sethome <nome>` | Salva o lugar atual como "casa" | **O pack permite 1 casa** por jogador. Salvar outra substitui a primeira. |
| `/home <nome>` | Volta para a casa | Espera de 10 s entre usos |
| `/delhome <nome>` | Apaga uma casa | — |
| `/listhomes` | Lista as suas casas | — |
| `/back` | Volta ao lugar onde você estava **antes do último teleporte ou da última morte** | Espera de 30 s. Guarda os 10 últimos lugares. |
| `/spawn` | Vai para o spawn do mundo | Espera de 10 s |
| `/playerspawn` | Vai para o **seu** ponto de renascimento (cama ou âncora) | — |
| `/rtp` | **Teleporte aleatório** para longe, entre 500 e 25.000 blocos do spawn | Espera de **10 minutos**. Não funciona no End. |
| `/warp <nome>` / `/listwarps` | Vai até um warp, ou lista os warps | 🔒 Criar warps: `/setwarp <nome>` e `/delwarp <nome>` |

## Multiplayer (FTB Essentials)

| Comando | O que faz |
|---|---|
| `/tpa <jogador>` | Pede para ir até outro jogador |
| `/tpahere <jogador>` | Pede para outro jogador vir até você |
| `/tpaccept` / `/tpdeny` | Aceita ou recusa um pedido |
| `/near` | Lista os jogadores próximos, por distância |
| `/nick <apelido>` | Muda o seu nome de exibição |
| `/leaderboard <estatística>` | Ranking de estatísticas entre os jogadores |
| `/kickme` | Sai do servidor, útil se você travar |

## Utilidades rápidas (FTB Essentials)

| Comando | O que faz |
|---|---|
| `/trashcan` | Abre uma **lixeira** para destruir itens |
| `/enderchest` | Abre o **baú do Ender** em qualquer lugar |
| `/crafting` | Abre uma **mesa de crafting** em qualquer lugar |
| `/anvil` | Abre uma **bigorna** em qualquer lugar |
| `/smithing` | Abre uma **mesa de ferraria** |
| `/stonecutter` | Abre um **cortador de pedras** |
| `/hat` | Coloca o item da mão na cabeça, como chapéu |

## Comandos de administração 🔒 (FTB Essentials)

| Comando | O que faz |
|---|---|
| `/heal` / `/feed` | Recupera a vida ou a fome |
| `/fly` | Liga ou desliga o voo, sem modo criativo |
| `/god` | Liga ou desliga a invencibilidade |
| `/speed <valor>` | Muda a velocidade de caminhada |
| `/extinguish` | Apaga o fogo do jogador |
| `/invsee <jogador>` | Vê o inventário de outro jogador |
| `/jump` | Teleporta para o bloco que você está mirando |
| `/tpl <jogador>` | Vai até o último lugar onde o jogador foi visto |

---

## Pré-gerar o mundo 🔒 (Chunky)

Gerar os chunks com antecedência **reduz muito o lag** ao explorar, principalmente voando com o Create Aeronautics.

| Comando | O que faz |
|---|---|
| `/chunky radius 2000` | Define o raio, em blocos, em volta do centro |
| `/chunky center` | Usa a sua posição atual como centro |
| `/chunky start` | Começa a gerar |
| `/chunky pause` / `/chunky continue` | Pausa ou continua |
| `/chunky cancel` | Cancela |

**Dica:** rode quando for ficar um tempo sem jogar, por exemplo deixando o jogo parado na base. Um raio de 2000 leva vários minutos.

## Estações e temperatura 🔒

| Comando | O que faz |
|---|---|
| `/season get` / `/season set <estação>` | **Serene Seasons:** mostra ou muda a estação, por exemplo `early_spring`, `mid_summer`, `late_autumn` ou `mid_winter` |
| `/temp` | **Cold Sweat:** consulta e ajusta a temperatura do jogador ou do mundo, para teste. Use **Tab** para ver as opções. |

Para ver a estação **sem cheats**, use o bloco **Season Sensor** ou o calendário do Serene Seasons.

## Desempenho e diagnóstico

| Comando | O que faz |
|---|---|
| `/sparkc profiler start` / `stop` | **spark:** mede o desempenho do **cliente** e gera um link com o relatório |
| `/spark profiler start` / `stop` 🔒 | O mesmo para o **servidor** do mundo, que é o que mede lag de máquinas e farms |
| `/spark tps` 🔒 | Mostra os TPS do mundo (20 é o normal) |
| **F3** | Tela de informações, organizada pelo **BetterF3** |

## Backups 🔒 (Simple Backups)

| Comando | O que faz |
|---|---|
| `/simplebackups backup` | Faz um backup do mundo **agora**. Também há `/simplebackups pause` e `/simplebackups merge`. Use **Tab** para ver as opções. |

Os backups automáticos já acontecem sozinhos, na pasta `simplebackups` da instância.

---

## Teclas úteis (não são comandos, mas ajudam)

| Tecla | O que faz |
|---|---|
| **R** / **U** no JEI | Receita do item / onde o item é usado |
| **W** sobre um item do Create | Mostra a *ponder*, uma animação que explica o item |
| **K** | **Keybind Atlas**: mapa visual de todas as teclas |
| **Shift + clique direito** no Akashic Tome | Escolhe um livro-guia |
| **Shift + clique esquerdo no ar** | Volta o livro para o Akashic Tome |
| Tecla do **FTB Ultimine** (veja em Controles) | Segure para minerar em veio |

Os comandos podem ter **outros parâmetros**. No jogo, digite `/` e o início do comando, e aperte **Tab** para ver as opções.
