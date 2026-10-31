// Iron Meridian: na primeira entrada do jogador no mundo, entrega o livro de boas-vindas do pack
// no slot 1 (hotbar) e um Akashic Tome já preenchido com todos os livros-guia no slot 2, e remove
// os demais livros-guia que algum mod ainda entregar ao entrar. Quem já tinha recebido o tomo
// antes do livro existir recebe só o livro, no inventário. Quando a lista de guias cresce
// (TOME_VERSION), o tomo de quem já joga ganha os livros que faltam.

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
const JsonArray = Java.loadClass('com.google.gson.JsonArray')

// Livros-guia que não são do Patchouli (itens próprios de cada mod)
const EXTRA_GUIDES = [
  'actuallyadditions:booklet',
  'ae2:guide',
  'industrialforegoing:book_manual',
  'integrateddynamics:on_the_dynamics_of_integration',
  'modern_industrialization:guidebook',
  'powah:book',
  'mts:mts.handbook_car',
  'mts:mts.handbook_plane',
  'rftoolsbase:manual',
  'scc:guide',
  'solcarrot:food_book'
]

// Guias do GuideME que não têm item próprio: entram como guideme:guide com o id do guia.
// As páginas dos addons do AE2 já ficam dentro do guia do AE2.
// Todos usam o mesmo item (e o mesmo ícone), então cada um ganha um nome fixo.
const GUIDEME_GUIDES = {
  'energymeter:guide': 'Guia do Energy Meter',
  'extended_industrialization:guide': 'Guia do Extended Industrialization',
  'little_big_redstone:guide': 'Guia do Little Big Redstone',
  'logisticsnetworks:guide': 'Guia do Logistics Network',
  'replication:main': 'Guia do Replication',
  'trainingdummy:guide': 'Guia do Training Dummy'
}

// Suba quando a lista de guias mudar, para o tomo de quem já joga ser completado
const TOME_VERSION = 2
const TOME_VERSION_KEY = 'iron_meridian_tome_version'

const GIVEN_FLAG = 'iron_meridian_tome_given'
const WELCOME_FLAG = 'iron_meridian_welcome_given'
const REPO_URL = 'https://github.com/marcelofabianov/iron-meridian'

// Página do livro de boas-vindas, em texto JSON do Minecraft
const WELCOME_PAGES = [
  {
    text: '', extra: [
      { text: 'Iron Meridian\n\n', bold: true, color: 'dark_blue' },
      { text: 'Obrigado por jogar nosso modpack! Ele foi criado para entregar uma boa experiência para quem gosta de tecnologia e construção.\n\n' },
      { text: 'Desejamos um ótimo jogo!\n\n', bold: true },
      {
        text: 'Mais informações no GitHub', color: 'blue', underlined: true,
        clickEvent: { action: 'open_url', value: REPO_URL },
        hoverEvent: { action: 'show_text', contents: 'github.com/marcelofabianov/iron-meridian' }
      }
    ]
  }
]

function buildWelcomeBook(ops) {
  let pages = new JsonArray()
  WELCOME_PAGES.forEach(page => {
    let entry = new JsonObject()
    // O livro escrito guarda cada página como texto JSON em string (formato "flat" do 1.21.1)
    entry.addProperty('raw', JSON.stringify(page))
    pages.add(entry)
  })
  let content = new JsonObject()
  let title = new JsonObject()
  title.addProperty('raw', 'Bem-vindo ao Iron Meridian')
  content.add('title', title)
  content.addProperty('author', 'Iron Meridian')
  content.add('pages', pages)
  content.addProperty('resolved', true)
  let components = new JsonObject()
  components.add('minecraft:written_book_content', content)
  let bookJson = new JsonObject()
  bookJson.addProperty('id', 'minecraft:written_book')
  bookJson.addProperty('count', 1)
  bookJson.add('components', components)
  return ItemStack.CODEC.parse(ops, bookJson).getOrThrow()
}

function buildGuideStacks(ops) {
  let stacks = []
  let seen = {}
  let add = (stack, mod) => {
    if (stack == null || stack.isEmpty()) return
    let key = String(BuiltInRegistries.ITEM.getKey(stack.getItem())) + '|' + mod
    let guideIdType = BuiltInRegistries.DATA_COMPONENT_TYPE.get(ResourceLocation.parse('guideme:guide_id'))
    if (guideIdType != null && stack.has(guideIdType)) key += '|' + stack.get(guideIdType)
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

  // Guias do GuideME
  if (BuiltInRegistries.ITEM.containsKey(ResourceLocation.parse('guideme:guide'))) {
    Object.keys(GUIDEME_GUIDES).forEach(guideId => {
      try {
        let components = new JsonObject()
        components.addProperty('guideme:guide_id', guideId)
        components.addProperty('minecraft:custom_name', JSON.stringify({ text: GUIDEME_GUIDES[guideId], italic: false }))
        let json = new JsonObject()
        json.addProperty('id', 'guideme:guide')
        json.addProperty('count', 1)
        json.add('components', components)
        add(ItemStack.CODEC.parse(ops, json).getOrThrow(), guideId.split(':')[0])
      } catch (e) {
        console.warn(`[Iron Meridian] Guia GuideME ignorado ${guideId}: ${e}`)
      }
    })
  }
  return stacks
}

function buildTome(ops, guides) {
  let list = new ArrayList()
  guides.forEach(s => list.add(s))
  // Monta o tomo pelo codec do jogo, como se fosse um item salvo
  let content = ToolContentComponent.CODEC.encodeStart(ops, new ToolContentComponent(list)).getOrThrow()
  let components = new JsonObject()
  components.add('akashictome:tool_content', content)
  let tomeJson = new JsonObject()
  tomeJson.addProperty('id', 'akashictome:tome')
  tomeJson.addProperty('count', 1)
  tomeJson.add('components', components)
  return ItemStack.CODEC.parse(ops, tomeJson).getOrThrow()
}

// Identifica um livro salvo dentro do tomo: item, mod e o livro (Patchouli ou GuideME)
function guideKey(json) {
  let comps = json.has('components') ? json.getAsJsonObject('components') : new JsonObject()
  let part = name => comps.has(name) ? String(comps.get(name).getAsString()) : ''
  return [String(json.get('id').getAsString()), part('akashictome:defined_mod'),
    part('patchouli:book'), part('guideme:guide_id')].join('|')
}

// Completa o tomo de quem já joga com os livros que faltam. Sem tomo no inventário, entrega um novo.
// O tomo pode estar "transformado" no livro escolhido: aí o item é o livro, mas guarda os outros
// em akashictome:tool_content, e o livro da forma atual conta como já presente.
function upgradeTome(player, ops) {
  let guides = buildGuideStacks(ops)
  let inv = player.inventory
  for (let i = 0; i < inv.getContainerSize(); i++) {
    let s = inv.getItem(i)
    if (s.isEmpty()) continue
    let tomeJson = ItemStack.CODEC.encodeStart(ops, s).getOrThrow().getAsJsonObject()
    let isTome = String(tomeJson.get('id').getAsString()) == 'akashictome:tome'
    let hasContent = tomeJson.has('components') && tomeJson.getAsJsonObject('components').has('akashictome:tool_content')
    if (!isTome && !hasContent) continue
    if (!tomeJson.has('components')) tomeJson.add('components', new JsonObject())
    let comps = tomeJson.getAsJsonObject('components')
    if (!comps.has('akashictome:tool_content')) comps.add('akashictome:tool_content', new JsonArray())
    let content = comps.getAsJsonArray('akashictome:tool_content')
    let have = {}
    content.forEach(e => { have[guideKey(e.getAsJsonObject())] = true })
    if (!isTome) have[guideKey(tomeJson)] = true
    let added = 0
    guides.forEach(g => {
      let gJson = ItemStack.CODEC.encodeStart(ops, g).getOrThrow().getAsJsonObject()
      if (have[guideKey(gJson)]) return
      content.add(gJson)
      added++
    })
    if (added > 0) inv.setItem(i, ItemStack.CODEC.parse(ops, tomeJson).getOrThrow())
    console.info(`[Iron Meridian] Akashic Tome de ${player.username} completado com ${added} livro(s)`)
    return
  }
  player.give(buildTome(ops, guides))
  console.info(`[Iron Meridian] ${player.username} estava sem o Akashic Tome no inventário: recebeu um novo com ${guides.length} livros`)
}

function isGuide(stack, guideIds) {
  if (stack.isEmpty()) return false
  let id = String(BuiltInRegistries.ITEM.getKey(stack.getItem()))
  return id == 'patchouli:guide_book' || id == 'guideme:guide' || guideIds[id] === true
}

PlayerEvents.loggedIn(event => {
  let player = event.player
  let data = player.persistentData
  if (data.getBoolean(GIVEN_FLAG) && data.getBoolean(WELCOME_FLAG) && data.getInt(TOME_VERSION_KEY) >= TOME_VERSION) return

  // Espera os outros mods entregarem seus itens de entrada antes de organizar o inventário
  event.server.scheduleInTicks(40, () => {
    let ops = event.server.registryAccess().createSerializationContext(JsonOps.INSTANCE)

    // Jogador que já recebeu o tomo: completa o que faltar (livro de boas-vindas e guias novos)
    if (data.getBoolean(GIVEN_FLAG)) {
      if (!data.getBoolean(WELCOME_FLAG)) {
        player.give(buildWelcomeBook(ops))
        data.putBoolean(WELCOME_FLAG, true)
        console.info(`[Iron Meridian] Livro de boas-vindas entregue a ${player.username}`)
      }
      if (data.getInt(TOME_VERSION_KEY) < TOME_VERSION) {
        upgradeTome(player, ops)
        data.putInt(TOME_VERSION_KEY, TOME_VERSION)
      }
      return
    }

    let guides = buildGuideStacks(ops)
    let guideIds = {}
    guides.forEach(s => { guideIds[String(BuiltInRegistries.ITEM.getKey(s.getItem()))] = true })

    let inv = player.inventory
    for (let i = 0; i < inv.getContainerSize(); i++) {
      if (isGuide(inv.getItem(i), guideIds)) inv.setItem(i, ItemStack.EMPTY)
    }

    let tome = buildTome(ops, guides)

    // Slot 1: livro de boas-vindas; slot 2: o tomo. O que estava nesses slots vai para o inventário.
    let displaced = [inv.getItem(0), inv.getItem(1)]
    inv.setItem(0, buildWelcomeBook(ops))
    inv.setItem(1, tome)
    displaced.forEach(s => { if (!s.isEmpty()) player.give(s) })

    data.putBoolean(GIVEN_FLAG, true)
    data.putBoolean(WELCOME_FLAG, true)
    data.putInt(TOME_VERSION_KEY, TOME_VERSION)
    console.info(`[Iron Meridian] Livro de boas-vindas e Akashic Tome entregues a ${player.username} com ${guides.length} livros`)

    // Segunda varrida: remove livros-guia que algum mod entregar depois do tomo
    event.server.scheduleInTicks(200, () => {
      let removed = 0
      for (let i = 0; i < inv.getContainerSize(); i++) {
        let s = inv.getItem(i)
        if (String(BuiltInRegistries.ITEM.getKey(s.getItem())) == 'akashictome:tome') continue
        if (isGuide(s, guideIds)) { inv.setItem(i, ItemStack.EMPTY); removed++ }
      }
      if (removed > 0) console.info(`[Iron Meridian] ${removed} livro(s) entregue(s) depois do tomo foram removidos (já estão no tomo)`)
    })
  })
})
