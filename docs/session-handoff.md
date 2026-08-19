# Session Handoff — Wendrel Portfolio

_Última atualização: 2026-08-19 · gerado automaticamente ao fim de uma sessão de trabalho._

## Estado atual

- **Branch:** `main` (deployed — `feat/portfolio-real-projects` foi consolidada aqui via fast-forward)
- **Production URL:** https://wendrel-portfolio.vercel.app
- **Working tree:** limpo, nada pendente.
- **Build:** `npm run build` limpo (Vite 8, 452 módulos). `npm run lint` (oxlint): só o warning pré-existente de `Deferred.jsx` (fast-refresh, não relacionado ao conteúdo).
- **Arquitetura:** todo o conteúdo dos projetos vive em [`src/lib/data.js`](../src/lib/data.js) (fonte única). Componentes (`ProjectCase`, `ProjectMediaViewer`, `LivePreviewModal`) são genéricos — a identidade de cada case vem só dos dados, nunca de variantes de componente por projeto.
- **Deployed.** Sem pendência de conteúdo, produto, performance ou SEO.

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
- `index.html` tem `canonical`, `og:url`, `og:image`/`og:image:width`/`og:image:height` e `twitter:image` apontando para URLs **absolutas** em `https://wendrel-portfolio.vercel.app/` — finalizado nesta microfase, nenhuma pendência.

## Performance

Registro breve — não alterar sem evidência (Lighthouse) de que algo regrediu:

- **P0:** LCP do Hero corrigido (removido `opacity:0` do texto crítico) + fontes self-hosted com carregamento assíncrono.
- **P1A/P1B:** JS inicial reduzido via `Deferred.jsx` para Projects, Timeline, Technologies e Contact. `anchorIds` garante que o Terminal (`open <slug>`) force o carregamento de seções ainda não montadas.
- Media gating, iframe de preview 100% sob demanda, TBT do Framer Motion já diagnosticado (P2 não foi necessário).
- `Deferred` min-height do Projects recalibrado nesta sprint (era herdado de quando havia 3 secondary cards; agora são 2) — medido ao vivo em 390/700/1318px.

## Mobile Safari — dois bugs reais corrigidos em produção

Ambos confirmados por A/B em iPhone real (não só Chromium), via Vercel Preview Deployments isolando uma variável por vez.

**Bug 1 — paint stall no Hero.** Causa: os dois glows do `GridBackground.jsx` (900×520 `blur(140px)` + 360×360 `blur(120px)`) somavam quase toda a 1ª dobra em `filter:blur()`, dentro de um `motion.div` transform-animado — Safari/iOS travava pintando a página por vários segundos. Fix: `radial-gradient` (mesmas cores/opacidades) em `<1024px`; `lg:` preserva o blur original no desktop.

**Bug 2 — crash/reload ao dar pinch-zoom sobre a foto do Hero.** Isolado em duas rodadas de A/B: sem o 3D do card (`rotateX`/`rotateY`/`transformPerspective`) o zoom melhorava mas ainda derrubava com zoom forte; com o 3D original mas sem o `blur(64px)` do glow da foto, ficou estável. **Causa decisiva: o `blur(64px)` do glow**, não o 3D. Fix: mesmo padrão — `blur-3xl` vira `lg:blur-3xl` em `Hero.jsx`, sem `filter` em `<1024px`, 3D e blur originais preservados em `lg:` (≥1024px).

Branches de diagnóstico preservadas (não deletar ainda): `diag/mobile-paint-stall`, `fix/mobile-hero-compositing`, `diag/photo-zoom-3d`, `diag/photo-zoom-blur`, `fix/mobile-photo-zoom`.

## V2.2 — Tech ↔ Project Graph

- `technologyRegistry` / `primaryTechIds` são a fonte da relação;
- hover/focus em tecnologia destaca projetos relacionados;
- hover/focus interno em featured project destaca primary technologies;
- mobile funciona como progressive enhancement;
- sem blur/filter/listener global/RAF;
- limitação conhecida: secondary projects sem elemento focável ainda não possuem trigger Project → Technology por teclado.

## V2.3 — Inspect Mode

- toggle `</> Inspect` na Navbar (desktop + menu mobile);
- Hero technical annotations;
- Detailed Stack via Data Truth Layer, acordeão único por projeto (`openProjectId` no `InspectProvider`);
- Technologies mostra projetos relacionados por tecnologia;
- Engineering Note do Safari/iOS (paint stall no grid, crash de pinch-zoom no glow da foto — causas distintas);
- ClinicAI sem detalhamento inventado;
- Inspect e Tech ↔ Project Graph coexistem sem interferência;
- mobile progressive enhancement, sem dependência nova.

## Próxima fase

Nenhuma pendência aberta. Deployed em https://wendrel-portfolio.vercel.app, com metadados de produção finalizados e os dois bugs de mobile Safari corrigidos.
