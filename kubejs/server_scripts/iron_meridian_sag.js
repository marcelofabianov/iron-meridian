// Iron Meridian: receitas do SAG Mill (Ender IO) para os metais que o mod não cobre.
// Mesmas regras das receitas originais do Ender IO para minério bruto:
// 1 pó garantido + 80% de chance de um segundo pó. A saída usa a tag c:dusts/<metal>,
// e o Almost Unified escolhe qual pó aparece.

const SAG_METALS = ['antimony', 'nickel', 'platinum', 'silver', 'tungsten', 'zinc', 'iridium', 'titanium']

ServerEvents.recipes(event => {
  SAG_METALS.forEach(metal => {
    event.custom({
      type: 'enderio:sag_milling',
      energy: 2400,
      input: { tag: `c:raw_materials/${metal}` },
      outputs: [
        { item: { count: 1, tag: `c:dusts/${metal}` } },
        { chance: 0.8, item: { count: 1, tag: `c:dusts/${metal}` } }
      ]
    }).id(`iron_meridian:sag_milling/raw_${metal}`)
  })
})
