// Iron Meridian: estende o martelo do Ore Hammer para os metais dos mods.
// Mesmas regras do Ore Hammer: minério bruto -> 2 pós, bloco de minério -> 3 pós.
// O martelo perde durabilidade sozinho (é o item que se devolve danificado na mesa).
// Os pós de saída seguem a prioridade do Almost Unified.

const HAMMER = 'ore_hammer:crushing_hammer'

const METALS = {
  aluminum: 'immersiveengineering:dust_aluminum',
  antimony: 'modern_industrialization:antimony_dust',
  iridium: 'modern_industrialization:iridium_dust',
  lead: 'immersiveengineering:dust_lead',
  nickel: 'immersiveengineering:dust_nickel',
  osmium: 'mekanism:dust_osmium',
  platinum: 'modern_industrialization:platinum_dust',
  silver: 'immersiveengineering:dust_silver',
  tin: 'mekanism:dust_tin',
  titanium: 'modern_industrialization:titanium_dust',
  tungsten: 'modern_industrialization:tungsten_dust',
  uranium: 'immersiveengineering:dust_uranium'
}

ServerEvents.recipes(event => {
  Object.keys(METALS).forEach(metal => {
    let dust = METALS[metal]
    event.shapeless(Item.of(dust, 2), [`#c:raw_materials/${metal}`, HAMMER])
      .id(`iron_meridian:hammer/${metal}_dust_from_raw`)
    event.shapeless(Item.of(dust, 3), [`#c:ores/${metal}`, HAMMER])
      .id(`iron_meridian:hammer/${metal}_dust_from_ore`)
  })
})
