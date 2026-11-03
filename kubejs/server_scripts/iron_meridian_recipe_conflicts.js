// Iron Meridian: resolve receitas de mesa com os mesmos ingredientes em mods diferentes.
// Cada ajuste mantém a proporção original; a receita "perdedora" muda de forma ou vai para o cortador de pedras.

ServerEvents.recipes(event => {
  // DimStorage: o Dim Wall tinha a mesma receita do Range Upgrade do SCC.
  event.remove({ id: 'dimstorage:dim_wall' })
  event.shaped('4x dimstorage:dim_wall', ['aba', 'bcb', 'aba'], {
    a: 'minecraft:iron_ingot',
    b: 'minecraft:redstone',
    c: 'minecraft:obsidian'
  }).id('iron_meridian:conflicts/dim_wall')

  // Actually Additions: o Tiny Coal repetia o do Utilitarian (1 carvão dava 3 resultados).
  event.remove({ id: 'actuallyadditions:coal_to_tiny' })
  event.remove({ id: 'actuallyadditions:charcoal_to_tiny' })

  // [Let's Do] Meadow: o Woodcutter repete a função do Universal Sawmill. Todos os itens dele
  // também têm receita de mesa, então a mesa sai e as receitas dela ficam sem uso.
  event.remove({ id: 'meadow:woodcutter' })
  event.remove({ type: 'meadow:woodcutting' })
})
