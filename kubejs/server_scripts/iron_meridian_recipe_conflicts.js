// Iron Meridian: resolve receitas de mesa com os mesmos ingredientes em mods diferentes.
// Cada ajuste mantém a proporção original; a receita "perdedora" muda de forma ou vai para o cortador de pedras.

ServerEvents.recipes(event => {
  // Create Deco: suportes e chapa de metal colidiam com a Iron Gear do Industrial Foregoing
  // (mostrada como a do Modern Industrialization pelo Almost Unified), com a Iron Large Plate
  // do Modern Industrialization e com o Copper Wire do Immersive Vehicles.
  event.remove({ id: 'createdeco:iron_support' })
  event.stonecutting('createdeco:iron_support', 'minecraft:iron_ingot')
    .id('iron_meridian:conflicts/createdeco_iron_support')
  event.remove({ id: 'createdeco:iron_sheet_metal' })
  event.stonecutting('createdeco:iron_sheet_metal', '#c:plates/iron')
    .id('iron_meridian:conflicts/createdeco_iron_sheet_metal')
  event.remove({ id: 'createdeco:copper_support' })
  event.stonecutting('createdeco:copper_support', 'minecraft:copper_ingot')
    .id('iron_meridian:conflicts/createdeco_copper_support')

  // Create: Diesel Generators: 4 wood chips em 2x2 também faziam a Cardboard Box do Mekanism.
  event.remove({ id: 'createdieselgenerators:crafting/chip_wood_block' })
  event.shaped('createdieselgenerators:chip_wood_block', ['AAA', 'AAA', 'AAA'], {
    A: 'createdieselgenerators:wood_chip'
  }).id('iron_meridian:conflicts/chip_wood_block')

  // Create: Diesel Generators: o Oil Barrel tinha a mesma receita do Item Silo do Create Connected.
  event.remove({ id: 'createdieselgenerators:crafting/oil_barrel' })
  event.shaped('createdieselgenerators:oil_barrel', ['SBS', ' U '], {
    S: '#c:plates/iron',
    B: '#c:barrels/wooden',
    U: 'minecraft:bucket'
  }).id('iron_meridian:conflicts/oil_barrel')

  // DimStorage: o Dim Wall tinha a mesma receita do Range Upgrade do SCC.
  event.remove({ id: 'dimstorage:dim_wall' })
  event.shaped('4x dimstorage:dim_wall', ['aba', 'bcb', 'aba'], {
    a: 'minecraft:iron_ingot',
    b: 'minecraft:redstone',
    c: 'minecraft:obsidian'
  }).id('iron_meridian:conflicts/dim_wall')

  // Create Stuff 'N Additions: conversões de 1 bloco que repetiam as do Create Connected.
  event.remove({ id: 'create_sa:small_filling_tank_recipe' })
  event.stonecutting('create_sa:small_filling_tank', 'create:fluid_tank')
    .id('iron_meridian:conflicts/small_filling_tank')
  event.remove({ id: 'create_sa:vault_component_recipe' })
  event.stonecutting('create_sa:vault_component', 'create:item_vault')
    .id('iron_meridian:conflicts/vault_component')

  // Actually Additions: o Tiny Coal repetia o do Utilitarian (1 carvão dava 3 resultados).
  event.remove({ id: 'actuallyadditions:coal_to_tiny' })
  event.remove({ id: 'actuallyadditions:charcoal_to_tiny' })

  // [Let's Do] Meadow: o Woodcutter repete a função do Universal Sawmill. Todos os itens dele
  // também têm receita de mesa, então a mesa sai e as receitas dela ficam sem uso.
  event.remove({ id: 'meadow:woodcutter' })
  event.remove({ type: 'meadow:woodcutting' })
})
