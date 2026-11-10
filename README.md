# Portfólio — Leonardo Lucca

Site pessoal em Next.js (App Router), TypeScript, Tailwind CSS v4 e Motion. Português em `/`, inglês em `/en`. Todas as páginas são geradas estaticamente.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000 (mostra os marcadores de pendência)
npm run build && npm start
```

## Verificar

```bash
npm run typecheck
npm run lint
npx playwright install chromium   # uma vez
npm run build && npm test          # sobe o servidor de produção sozinho
```

Os testes cobrem: renderização das 8 páginas nos dois idiomas, ausência de conteúdo pendente/restrito em produção, interações (ciclo do hero, decisões, simulação de triagem, links de evidência, copiar e-mail), movimento reduzido, overflow horizontal e acessibilidade com axe (WCAG 2.2 AA), em desktop e mobile.

## Editar conteúdo

Todo o texto fica em `content/` e é tipado por `content/types.ts`, então PT e EN precisam ter os mesmos campos para compilar.

| Arquivo | O que contém |
|---|---|
| `content/profile.ts` | e-mail, LinkedIn, GitHub, caminho do CV e da foto |
| `content/{pt,en}/site.ts` | hero, ciclo, provas, processo, trajetória, competências, sobre, contato |
| `content/{pt,en}/experiences.ts` | experiências da trajetória (datas no formato `AAAA-MM` ou `present`) |
| `content/{pt,en}/cases.ts` | os três estudos de caso, em blocos narrativos |

Duas marcações controlam o que vai ao ar:

- `pending: "..."` — informação que ainda falta. Aparece como marcador âmbar só em `npm run dev`; em produção o bloco vazio some.
- `restricted: true` — detalhe interno que depende de autorização. Só aparece com `SHOW_RESTRICTED=1`.

Para preencher uma pendência, escreva o conteúdo (por exemplo, `paragraphs` ou `items`) e remova o campo `pending`.

## Publicar

Defina `NEXT_PUBLIC_SITE_URL` com o domínio final (usado em canonical, Open Graph, sitemap e JSON-LD). Funciona em qualquer host com suporte a Next.js, como a Vercel.

## Estrutura

```
app/(pt)/…            rotas em português (layout raiz com lang="pt-BR")
app/(en)/en/…         rotas em inglês (layout raiz com lang="en")
app/global-not-found  404 para qualquer URL desconhecida
components/sections   seções da home
components/case       página de estudo de caso, DecisionTrace, simulação de triagem
components/figures    figuras conceituais em SVG
lib/                  i18n, SEO/JSON-LD, flags, fontes, OG image
tests/                Playwright
```
