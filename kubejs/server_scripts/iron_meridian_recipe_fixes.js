// Iron Meridian: corrige receitas que vêm quebradas nos próprios mods.

// Veggies Delight: receitas alternativas de comidas do Cultural Delights usam tags que não existem.
const VEGGIES_FIXES = {
  "chicken_taco": {
    "type": "minecraft:crafting_shapeless",
    "ingredients": [
      {
        "item": "culturaldelights:tortilla"
      },
      {
        "tag": "c:foods/cooked_chicken"
      },
      [
        {
          "tag": "c:crops/garlic"
        },
        {
          "tag": "c:crops/onion"
        }
      ],
      {
        "item": "farmersdelight:tomato_sauce"
      },
      {
        "item": "veggiesdelight:smoked_bellpepper"
      },
      {
        "item": "culturaldelights:corn_cob"
      }
    ],
    "result": {
      "count": 1,
      "id": "culturaldelights:chicken_taco"
    }
  },
  "mutton_sandwich": {
    "type": "minecraft:crafting_shapeless",
    "ingredients": [
      {
        "tag": "c:foods/bread"
      },
      {
        "tag": "c:foods/cooked_mutton"
      },
      {
        "tag": "c:foods/cooked_egg"
      },
      {
        "item": "veggiesdelight:turnip"
      }
    ],
    "result": {
      "count": 1,
      "id": "culturaldelights:mutton_sandwich"
    }
  },
  "eggplant_burger": {
    "type": "minecraft:crafting_shapeless",
    "ingredients": [
      {
        "tag": "c:foods/bread"
      },
      {
        "tag": "culturaldelights:smoked_regular_eggplants"
      },
      {
        "tag": "c:foods/leafy_green"
      },
      {
        "tag": "c:crops/tomato"
      }
    ],
    "result": {
      "count": 1,
      "id": "culturaldelights:eggplant_burger"
    }
  },
  "beef_burrito": {
    "type": "minecraft:crafting_shapeless",
    "ingredients": [
      {
        "item": "culturaldelights:tortilla"
      },
      {
        "tag": "c:foods/cooked_beef"
      },
      {
        "item": "veggiesdelight:smoked_bellpepper"
      },
      {
        "item": "farmersdelight:cooked_rice"
      }
    ],
    "result": {
      "count": 1,
      "id": "culturaldelights:beef_burrito"
    }
  },
  "cooking/spicy_curry": {
    "type": "farmersdelight:cooking",
    "container": {
      "count": 1,
      "id": "minecraft:bowl"
    },
    "cookingtime": 400,
    "experience": 2.0,
    "ingredients": [
      {
        "item": "minecraft:blaze_powder"
      },
      {
        "item": "farmersdelight:tomato_sauce"
      },
      {
        "item": "farmersdelight:cooked_rice"
      },
      {
        "tag": "c:crops/garlic"
      },
      {
        "tag": "c:foods/cooked_chicken"
      },
      {
        "tag": "c:drinks/milk"
      }
    ],
    "recipe_book_tab": "meals",
    "result": {
      "count": 1,
      "id": "culturaldelights:spicy_curry"
    }
  }
}

// Ad Astra: as receitas para o Modern Industrialization usam tags antigas, sem nenhum item.
const AD_ASTRA_MI = [
  { old: 'compressor/desh_ingot_to_plate', type: 'compressor', duration: 200, input: { tag: 'c:ingots/desh' }, output: 'ad_astra:desh_plate', count: 1 },
  { old: 'compressor/ostrum_ingot_to_plate', type: 'compressor', duration: 200, input: { tag: 'c:ingots/ostrum' }, output: 'ad_astra:ostrum_plate', count: 1 },
  { old: 'compressor/calorite_ingot_to_plate', type: 'compressor', duration: 200, input: { tag: 'c:ingots/calorite' }, output: 'ad_astra:calorite_plate', count: 1 },
  { old: 'macerator/desh_ore', type: 'macerator', duration: 800, input: { tag: 'c:ores/desh' }, output: 'ad_astra:raw_desh', count: 3 },
  { old: 'macerator/ostrum_ore', type: 'macerator', duration: 800, input: { tag: 'c:ores/ostrum' }, output: 'ad_astra:raw_ostrum', count: 3 },
  { old: 'macerator/calorite_ore', type: 'macerator', duration: 800, input: { tag: 'c:ores/calorite' }, output: 'ad_astra:raw_calorite', count: 3 },
  { old: 'macerator/ice_shard_ores', type: 'macerator', duration: 800, input: { tag: 'c:ores/ice_shard' }, output: 'ad_astra:ice_shard', count: 4 },
  { old: 'macerator/cheese_ore', type: 'macerator', duration: 800, input: { item: 'ad_astra:moon_cheese_ore' }, output: 'ad_astra:cheese', count: 4 }
]

// Iron Furnaces: estes itens exigem materiais do AllTheModium, que não está no pack.
// Os itens também somem do JEI, em client_scripts/iron_meridian_hidden.js.
const IRON_FURNACES_HIDDEN = [
  'ironfurnaces:allthemodium_furnace', 'ironfurnaces:vibranium_furnace', 'ironfurnaces:unobtainium_furnace',
  'ironfurnaces:upgrade_allthemodium', 'ironfurnaces:upgrade_vibranium', 'ironfurnaces:upgrade_unobtainium'
]

ServerEvents.recipes(event => {
  // Mekanism: Weapons: o padrão da receita do Bow Limb é inválido e ela não carrega, o que
  // bloqueia o Meka-Bow. Mantém os ingredientes do mod: linha sobre painel de vidro.
  event.shaped('mekaweapons:bow_limb', ['s', 'g'], {
    s: 'minecraft:string',
    g: '#c:glass_panes'
  }).id('iron_meridian:fixes/bow_limb')

  Object.keys(VEGGIES_FIXES).forEach(path => {
    event.remove({ id: `veggiesdelight:compat/culturaldelight/${path}` })
    event.custom(VEGGIES_FIXES[path]).id(`iron_meridian:fixes/veggies_${path.replace('/', '_')}`)
  })

  AD_ASTRA_MI.forEach(r => {
    event.remove({ id: `modern_industrialization:${r.old}` })
    event.custom({
      type: `modern_industrialization:${r.type}`,
      eu: 2,
      duration: r.duration,
      item_inputs: [Object.assign({ amount: 1 }, r.input)],
      item_outputs: [{ amount: r.count, item: r.output }]
    }).id(`iron_meridian:fixes/ad_astra_${r.old.replace('/', '_')}`)
  })

  IRON_FURNACES_HIDDEN.forEach(item => event.remove({ output: item }))
})
