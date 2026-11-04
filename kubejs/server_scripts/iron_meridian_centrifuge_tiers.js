// Iron Meridian: o Centrifuge Tiers: Reproduced só traz receitas com blocos do AllTheCompressed,
// que não está no pack. Estas receitas têm a mesma forma, com os blocos normais do mesmo material.

ServerEvents.recipes(event => {
  const MOD = 'centrifugetiersreproduced'
  const TIERS = [
    { tier: 1, block: '#c:storage_blocks/iron' },
    { tier: 2, block: '#c:storage_blocks/gold' },
    { tier: 3, block: '#c:storage_blocks/diamond' },
    { tier: 4, block: '#c:storage_blocks/emerald' }
  ]

  TIERS.forEach(t => {
    const part = (kind, first) => {
      const center = t.tier == 1 ? first : `${MOD}:tier_${t.tier - 1}_centrifuge_${kind}`
      event.shaped(`${MOD}:tier_${t.tier}_centrifuge_${kind}`, [' R ', 'RER', ' R '], {
        R: t.block,
        E: center
      }).id(`iron_meridian:centrifuge_tiers/tier_${t.tier}_${kind}`)
    }
    part('casing', '#c:dusts/redstone')
    part('controller', 'minecraft:redstone_block')
  })
})
