# Session Handoff — Wendrel Portfolio

_Última atualização: 2026-08-19 · gerado automaticamente ao fim de uma sessão de trabalho._

## Estado atual

- **Branch:** `feat/portfolio-real-projects`
- **HEAD:** `4609cfa` — `feat(seo): add portfolio social preview`
- **Working tree:** limpo, nada pendente. Nenhum push feito ainda.
- **Build:** `npm run build` limpo (Vite 8, 452 módulos). `npm run lint` (oxlint): só o warning pré-existente de `Deferred.jsx` (fast-refresh, não relacionado ao conteúdo).
- **Arquitetura:** todo o conteúdo dos projetos vive em [`src/lib/data.js`](../src/lib/data.js) (fonte única). Componentes (`ProjectCase`, `ProjectMediaViewer`, `LivePreviewModal`) são genéricos — a identidade de cada case vem só dos dados, nunca de variantes de componente por projeto.
- **Sprint final de conteúdo concluída.** Próximo passo é deploy — nenhuma alteração de conteúdo/produto/performance pendente.

## Stack

- React 19 + Vite 8 + Tailwind CSS 3 + Framer Motion 12 + react-icons
- Estratégia de performance em fases (P0 → P1A → P1B), medida com Lighthouse (`--throttling-method=devtools`)
- `Deferred.jsx` (IntersectionObserver) + `React.lazy` para code-splitting das seções abaixo da dobra
- `LivePreviewModal` importado via `React.lazy` — zero bytes no bundle inicial até o primeiro clique em "Preview ao vivo"
- Media gating por viewer (`ProjectMediaViewer`) — imagens carregam sob demanda

## Ordem dos featured projects (não mexer sem motivo forte)

1. **RISK** (`order: 1`)
2. **NABOA Streetwear** (`order: 2`)
3. **D' Kastro Café Bistrô** (`order: 3`)
4. **EmpregaAI** (`order: 4`) — proposta forte, mas ainda em estágio inicial; fica atrás dos três cases com mais maturidade/evidência visual

## PIEMP não é mais um projeto separado

EmpregaAI é o produto sendo desenvolvido **dentro do contexto do PIEMP** — não são duas coisas distintas. PIEMP só aparece hoje como contexto (na copy do EmpregaAI, num marco único da Trajetória "EmpregaAI / PIEMP", e nas linhas de uso de Python/SQL em Technologies), nunca mais como card ou marco independente.

## Secondary projects

| Projeto | Slug | Mídia |
|---|---|---|
| VassVegas Campus | `vassvegas` | 1 screenshot real (`cover.webp`) — mídia ainda limitada, sem prioridade definida |
| ClinicAI SCA | `clinicai` | **Evidência real** (`cover.webp` + `coverAlt` descritivo do hackathon) — antes não tinha mídia |

(PIEMP removido desta lista — ver acima.)

## Technologies

Reflete agora a stack comprovada pela NABOA: `Flask` (usage aponta para a NABOA nominalmente), `SQLAlchemy`, `PostgreSQL` e `pytest` foram adicionados/atualizados com uma linha de uso real cada, mesmo formato de sempre (ícone + nome + uma linha) — sem grid de logos, porcentagem, estrela ou nível.

## SEO / Open Graph

- `public/og-image.png` — 1200×630, 284 KB, composição própria (não é screenshot de projeto): grid + glow azul/violeta iguais ao Hero, foto do Hero com o mesmo tratamento de fade/vignette do card original, "Wendrel Oliveira" + "Engenharia de Software & Produtos Digitais" + a mesma linha que o `whoami` do Terminal já usa.
- `index.html` tem `og:image`/`og:image:width`/`og:image:height`/`twitter:image` apontando para `/og-image.png` (URL **relativa** — não há domínio final decidido ainda, ver `README.md`).
- **Pendência real:** trocar para URL absoluta assim que o domínio de deploy for escolhido — várias plataformas não resolvem `og:image` relativo de forma confiável.

## Performance

Registro breve — não alterar sem evidência (Lighthouse) de que algo regrediu:

- **P0:** LCP do Hero corrigido (removido `opacity:0` do texto crítico) + fontes self-hosted com carregamento assíncrono.
- **P1A/P1B:** JS inicial reduzido via `Deferred.jsx` para Projects, Timeline, Technologies e Contact. `anchorIds` garante que o Terminal (`open <slug>`) force o carregamento de seções ainda não montadas.
- Media gating, iframe de preview 100% sob demanda, TBT do Framer Motion já diagnosticado (P2 não foi necessário).
- `Deferred` min-height do Projects recalibrado nesta sprint (era herdado de quando havia 3 secondary cards; agora são 2) — medido ao vivo em 390/700/1318px.

## Próxima fase

**Deploy.** Sem pendência de conteúdo, produto ou performance. Único item real: converter `og:image`/`twitter:image` para URL absoluta assim que o domínio for definido (ver seção SEO acima).
