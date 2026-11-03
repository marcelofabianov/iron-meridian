// Iron Meridian: esconde do JEI itens que não podem ser feitos neste pack.
// As receitas saem em server_scripts/iron_meridian_recipe_fixes.js.
RecipeViewerEvents.removeEntries('item', event => {
  event.remove([
    'ironfurnaces:allthemodium_furnace', 'ironfurnaces:vibranium_furnace', 'ironfurnaces:unobtainium_furnace',
    'ironfurnaces:upgrade_allthemodium', 'ironfurnaces:upgrade_vibranium', 'ironfurnaces:upgrade_unobtainium',
    'irongenerators:allthemodium_generator', 'irongenerators:allthemodium_to_vibranium_generator_upgrade', 'irongenerators:netherite_to_allthemodium_generator_upgrade', 'irongenerators:unobtainium_generator', 'irongenerators:vibranium_generator', 'irongenerators:vibranium_to_unobtainium_generator_upgrade'
  ])
})
