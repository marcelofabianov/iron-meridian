# Política de versionamento

O Iron Meridian usa **versionamento semântico** adaptado para modpacks: `MAJOR.MINOR.PATCH`, por exemplo `2.1.3`.

O número da versão responde a uma pergunta para quem joga: **"posso atualizar sem medo?"**

| Casa | Pergunta | Resposta |
|---|---|---|
| **MAJOR** | Meu mundo continua inteiro? | **Não necessariamente.** Leia o changelog e faça backup |
| **MINOR** | Tem coisa nova? | Sim, e o mundo continua inteiro |
| **PATCH** | Mudou algo que eu vou notar? | Pouco: correções e atualizações |

---

## MAJOR — `X.0.0`

**Quebra mundos existentes ou muda a base do pack.**

Sobe quando:
- Sai um mod que tem **conteúdo de mundo**: blocos, itens, entidades, dimensões, biomas, estruturas ou dados salvos (energia, redes, inventários).
- Muda a versão do **Minecraft** ou a **linha da NeoForge** (ex.: 1.21.1 → 26.1).
- Um mod é trocado por outro que não converte o conteúdo antigo (ex.: Mystical Agriculture → Productive Bees).
- A geração de mundo muda a ponto de exigir um mundo novo para fazer sentido.

**Teste prático:** se um mundo aberto na versão nova pode mostrar o aviso de *"entradas faltando"* (*missing registry entries*), a versão é MAJOR.

Exemplo: **2.0.0** — saída do Create e do Mystical Agriculture.

## MINOR — `x.Y.0`

**Adiciona ou muda sem quebrar mundos.**

Sobe quando:
- Entra um **mod novo** ou um sistema novo (um addon de AE2, uma dimensão nova, um mod de decoração).
- Muda a **jogabilidade** de forma perceptível, sem tirar conteúdo de mundo: receitas, progressão, balanceamento, unificação de minérios.
- Sai um mod **sem conteúdo de mundo**: do lado do cliente, de desempenho, de interface ou de qualidade de vida (ex.: um mod de tooltip, o Simple Voice Chat).
- Muda um padrão que o jogador nota: teclas, shader padrão, configurações iniciais.

Exemplo: **2.1.0** — entra um addon novo para o Productive Bees.

## PATCH — `x.y.Z`

**Manutenção.**

Sobe quando:
- **Atualização de mods** dentro da mesma linha (`mods.py update`), sem remoção de conteúdo.
- Ajustes de **config** e de **scripts KubeJS** que corrigem comportamento.
- Correção de **conflito de receita**, tag ou unificação.
- Troca da **fonte** de um mod (Modrinth ↔ CurseForge) mantendo a mesma versão ou uma mais nova.
- Mudanças só de **documentação** (README, guias, KNOWN_ISSUES) — podem ir junto com o próximo patch, sem versão própria.

Exemplo: **2.0.1** — 12 mods atualizados e uma receita conflitante corrigida.

---

## Casos de fronteira

| Situação | Casa |
|---|---|
| Uma versão junta mudanças de vários tipos | A **mais alta** entre elas |
| Atualização de um mod que **remove** blocos ou itens (decisão do autor) | **MAJOR**. Leia o changelog do mod antes do `update --apply` |
| Atualização de um mod que **muda a geração de mundo** (minério em outra altura, bioma novo) | **MINOR**. Áreas já geradas não mudam |
| Biblioteca removida por ficar órfã | Segue a casa da mudança que a deixou órfã |
| Mod removido que nunca chegou a ser publicado (testado e descartado no mesmo ciclo) | Não conta |
| Atualização da NeoForge dentro da mesma linha (21.1.265 → 21.1.270) | **PATCH** |
| Mod em beta trocado pela versão estável (regra 9) | **PATCH** |
| Mudança de uma configuração marcada como `preserve` no `index.toml` | Não chega a quem já joga. **PATCH**, com nota no changelog |

Na dúvida entre duas casas, escolha a **mais alta**. Uma versão que avisa demais incomoda menos que um mundo quebrado.

---

## Ciclo de uma versão

1. **Abrir o ciclo:** subir o número no `pack.toml` logo no primeiro commit (`Abre o ciclo 2.0.1`). A casa pode subir durante o ciclo, se entrar uma mudança maior.
2. **Acumular:** as mudanças vão para o `PENDENTES.txt` (local) e para o rascunho do `CHANGELOG.md`.
3. **Fechar:** `packwiz refresh`, `mods.py sync` (o `mods.json` recebe a versão), testes da regra 6.
4. **Publicar:** tag anotada, release no GitHub com o `IronMeridian-Prism.zip`:
   ```bash
   git tag -a v2.0.1 -m "Iron Meridian 2.0.1"
   git push origin v2.0.1
   gh release create v2.0.1 dist/IronMeridian-Prism.zip --title "Iron Meridian 2.0.1" --notes-file <notas>.md
   ```

## Branches e linhas de versão

| Branch | Conteúdo | Quem usa |
|---|---|---|
| `main` | Versão publicada mais nova. **É de onde as instâncias se atualizam sozinhas** | Todos os jogadores, por padrão |
| `release/X.0.0` | Trabalho de uma versão MAJOR, até ser testada | Só o mantenedor |
| `vN` (ex.: `v1`) | Última versão de uma linha MAJOR anterior. Só recebe correções críticas (PATCH) | Quem quer continuar num mundo antigo |

Regras:
- **MINOR e PATCH** podem ser feitos direto na `main` ou numa branch curta, porque não quebram mundos.
- **MAJOR nunca é feito direto na `main`.** Vai numa `release/X.0.0` e só entra com PR, depois dos testes.
- Antes de publicar um MAJOR, a versão anterior ganha uma branch `vN` congelada. O `INSTALL.md` explica como apontar a instância para ela. A linha 1 terminou na **1.1.20**, na branch `v1`.
- `main` e as branches `vN` ficam protegidas contra force-push e exclusão.

## Changelog

- Uma entrada por versão, com data, na ordem da mais nova para a mais antiga.
- Em versões **MAJOR**, a primeira seção é sempre **"Mudanças que quebram mundos"**, com a recomendação (mundo novo ou backup) e o link para continuar na linha anterior.
- Seções usuais: *Mudanças que quebram mundos* · *Mods novos* · *Mods removidos* · *Atualizações* · *Correções* · *Teclas* · *Outros*.
- A contagem total de mods aparece em *Outros* sempre que muda.

## Tags

- Formato `vMAJOR.MINOR.PATCH` (ex.: `v2.0.0`), sempre **anotadas** (`git tag -a`).
- Uma tag por versão publicada, nunca movida nem apagada. É o ponto de restauração de qualquer versão.
- Versões de teste não recebem tag. Se precisar distribuir uma, use o sufixo de pré-lançamento: `v2.0.0-rc.1`.
