// Iron Meridian: entrega um Akashic Tome já preenchido com todos os livros-guia do pack
// no slot 1 (hotbar) na primeira entrada do jogador no mundo, e remove os demais livros-guia
// que algum mod ainda entregar ao entrar.

const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')
const ArrayList = Java.loadClass('java.util.ArrayList')
const BookRegistry = Java.loadClass('vazkii.patchouli.common.book.BookRegistry')
const PatchouliAPI = Java.loadClass('vazkii.patchouli.api.PatchouliAPI')
const TomeRegistries = Java.loadClass('vazkii.akashictome.Registries')
const ToolContentComponent = Java.loadClass('vazkii.akashictome.data_components.ToolContentComponent')
const JsonOps = Java.loadClass('com.mojang.serialization.JsonOps')
const JsonObject = Java.loadClass('com.google.gson.JsonObject')

// Livros-guia que não são do Patchouli (itens próprios de cada mod)
const EXTRA_GUIDES = [
  'actuallyadditions:booklet',
  'ae2:guide',
  'energymeter:guide',
  'immersiveengineering:manual',
  'industrialforegoing:book_manual',
  'integrateddynamics:on_the_dynamics_of_integration',
  'livingthings:lexicon',
  'modern_industrialization:guidebook',
  'rftoolsbase:manual',
  'scc:guide',
  'xnet:xnet_manual'
]

const GIVEN_FLAG = 'iron_meridian_tome_given'

function buildGuideStacks() {
  let stacks = []
  let seen = {}
  let add = (stack, mod) => {
    if (stack == null || stack.isEmpty()) return
    let key = String(BuiltInRegistries.ITEM.getKey(stack.getItem())) + '|' + mod
    if (seen[key]) return
    seen[key] = true
    stack.set(TomeRegistries.DEFINED_MOD.get(), mod)
    stacks.push(stack)
  }

  // Todos os livros Patchouli registrados
  BookRegistry.INSTANCE.books.forEach((id, book) => {
    try {
      if (book.noBook) return
      add(PatchouliAPI.get().getBookStack(id), String(id.getNamespace()))
    } catch (e) {
      console.warn(`[Iron Meridian] Livro Patchouli ignorado ${id}: ${e}`)
    }
  })

  // Itens-guia próprios
  EXTRA_GUIDES.forEach(idStr => {
    let id = ResourceLocation.parse(idStr)
    if (!BuiltInRegistries.ITEM.containsKey(id)) return
    add(new ItemStack(BuiltInRegistries.ITEM.get(id)), String(id.getNamespace()))
  })
  return stacks
}

function isGuide(stack, guideIds) {
  if (stack.isEmpty()) return false
  let id = String(BuiltInRegistries.ITEM.getKey(stack.getItem()))
  return id == 'patchouli:guide_book' || guideIds[id] === true
}

PlayerEvents.loggedIn(event => {
  let player = event.player
  if (player.persistentData.getBoolean(GIVEN_FLAG)) return

  // Espera os outros mods entregarem seus itens de entrada antes de organizar o inventário
  event.server.scheduleInTicks(40, () => {
    if (player.persistentData.getBoolean(GIVEN_FLAG)) return
    let guides = buildGuideStacks()
    let guideIds = {}
    guides.forEach(s => { guideIds[String(BuiltInRegistries.ITEM.getKey(s.getItem()))] = true })

    let inv = player.inventory
    for (let i = 0; i < inv.getContainerSize(); i++) {
      if (isGuide(inv.getItem(i), guideIds)) inv.setItem(i, ItemStack.EMPTY)
    }

    let list = new ArrayList()
    guides.forEach(s => list.add(s))
    // Monta o tomo pelo codec do jogo, como se fosse um item salvo
    let ops = event.server.registryAccess().createSerializationContext(JsonOps.INSTANCE)
    let content = ToolContentComponent.CODEC.encodeStart(ops, new ToolContentComponent(list)).getOrThrow()
    let components = new JsonObject()
    components.add('akashictome:tool_content', content)
    let tomeJson = new JsonObject()
    tomeJson.addProperty('id', 'akashictome:tome')
    tomeJson.addProperty('count', 1)
    tomeJson.add('components', components)
    let tome = ItemStack.CODEC.parse(ops, tomeJson).getOrThrow()

    let first = inv.getItem(0)
    inv.setItem(0, tome)
    if (!first.isEmpty()) player.give(first)

    player.persistentData.putBoolean(GIVEN_FLAG, true)
    console.info(`[Iron Meridian] Akashic Tome entregue a ${player.username} com ${guides.length} livros`)
  })
})
