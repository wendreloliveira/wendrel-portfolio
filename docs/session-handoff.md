# Session Handoff — Wendrel Portfolio

_Última atualização: 2026-08-19 · gerado automaticamente ao fim de uma sessão de trabalho._

## Estado atual

- **Branch:** `feat/portfolio-real-projects`
- **HEAD:** `e4fc060` — `fix(preview): clarify NABOA cold start experience`
- **Working tree:** limpo, nada pendente. Nenhum push feito ainda.
- **Build:** `npm run build` limpo (Vite 8, ~450 módulos, sem warnings de tipo).
- **Arquitetura:** todo o conteúdo dos projetos vive em [`src/lib/data.js`](../src/lib/data.js) (fonte única). Componentes (`ProjectCase`, `ProjectMediaViewer`, `LivePreviewModal`) são genéricos — a identidade de cada case vem só dos dados, nunca de variantes de componente por projeto.

## Stack

- React 19 + Vite 8 + Tailwind CSS 3 + Framer Motion 12 + react-icons
- Estratégia de performance em fases (P0 → P1A → P1B), medida com Lighthouse (`--throttling-method=devtools`, não `simulate` — mais confiável neste ambiente)
- `Deferred.jsx` (IntersectionObserver) + `React.lazy` para code-splitting das seções abaixo da dobra
- `LivePreviewModal` importado via `React.lazy` — zero bytes no bundle inicial até o primeiro clique em "Preview ao vivo"
- Media gating por viewer (`ProjectMediaViewer`) — imagens carregam sob demanda

## Ordem atual dos featured projects

Definida pelo campo `order` em `featuredProjects` (`src/lib/data.js`) e espelhada no `Terminal.jsx` (`OPENABLE`):

1. **RISK** (`order: 1`)
2. **NABOA Streetwear** (`order: 2`)
3. **D' Kastro Café Bistrô** (`order: 3`)
4. **EmpregaAI** (`order: 4`)

## Featured projects

| Projeto | Slug | Live URL | Status | Preview ao vivo | Mídia |
|---|---|---|---|---|---|
| RISK Soluções Empresariais | `risk` | https://risk-platform-b11.pages.dev/ | Entregue | Sim, sem aviso | 4 screenshots reais (`cover`, serviços, método, diagnóstico) |
| NABOA Streetwear | `naboa` | https://naboa-streetwear.onrender.com/ | Demo pública | Sim, **com aviso de cold start** | 3 screenshots reais (home, catálogo, produto) |
| D' Kastro Café Bistrô | `dkastro` | https://dkastro-landing.vercel.app/ | Entregue | Sim, sem aviso | 5 screenshots reais (hero, a casa, pratos, self-service, CTA) |
| EmpregaAI | `empregaai` | https://emprega-ai-wheat.vercel.app/ | Em desenvolvimento | Sim, sem aviso | 3 screenshots reais (principal, para quem, onboarding) |

## NABOA — detalhes

- E-commerce demonstrativo, full-stack: começou como vitrine estática (HTML/CSS/JS) e evoluiu para uma aplicação Flask dinâmica.
- Stack: Python, Flask, PostgreSQL, SQLAlchemy, pytest.
- 291 testes automatizados (dado exibido em `highlights`).
- Deploy: Render (app) + Neon (PostgreSQL persistente), migrações com Alembic.
- Repositório privado — sem link de GitHub na seção (`links: []`).
- Nenhum pagamento real é processado — é uma vitrine demonstrativa.
- **Aviso de cold start:** `livePreview.coldStartNotice` (só a NABOA tem esse campo). Renderizado como uma faixa discreta e dispensável dentro do `LivePreviewModal`, entre o header e o iframe. Reaparece a cada reabertura do preview. Não tenta detectar se o app "acordou" — o `load` do iframe não é confiável para isso (a própria página de waking do Render dispara `load`).
- Terminal: `open naboa` rola até o case; `visit naboa` abre a URL pública em nova aba (`noopener,noreferrer`).

## Secundários

| Projeto | Slug | Mídia |
|---|---|---|
| VassVegas Campus | `vassvegas` | 1 screenshot real (`cover.webp`, extraído de um PDF de onboarding) — **mídia a melhorar** |
| ClinicAI SCA | `clinicai` | Sem mídia definitiva (`emptyMedia()`) |
| PIEMP / CNPq | `piemp` | Sem mídia definitiva (`emptyMedia()`) |

Todos os três são apresentados como cards compactos unificados (sem case completo) na seção secundária de Projects — arquitetura já estabelecida e **não deve ser alterada** na próxima fase, só o conteúdo de mídia.

## Performance

Registro breve — não alterar sem evidência (Lighthouse) de que algo regrediu:

- **P0:** LCP do Hero corrigido (removido `opacity:0` do texto crítico) + fontes self-hosted com carregamento assíncrono.
- **P1A/P1B:** JS inicial reduzido via `Deferred.jsx` (IntersectionObserver, não só `React.lazy`) para Projects, Timeline, Technologies e Contact. `anchorIds` garante que o Terminal (`open <slug>`) consiga forçar o carregamento de seções ainda não montadas.
- Fontes self-hosted, sem pesos não utilizados removidos indevidamente.
- Media gating: screenshots de cada projeto só carregam quando o `ProjectMediaViewer` daquele projeto está perto da viewport.
- Iframe do preview ao vivo é 100% sob demanda — monta só no primeiro clique, desmonta ao fechar o modal.
- Diagnóstico de Framer Motion (TBT) já feito: P2 não foi necessário, TBT bem abaixo do alvo sob throttling real (`devtools`).

## Próxima fase

**FASE 7 — evidências reais dos projetos secundários**

Prioridade:
1. VassVegas — melhorar/expandir mídia real (hoje só 1 screenshot)
2. ClinicAI — buscar mídia real (hoje nenhuma)
3. PIEMP — buscar mídia real (hoje nenhuma)

Objetivo: melhorar mídia e evidência **sem alterar novamente a arquitetura dos cards** (já unificada e aprovada).

**Depois:** microfase de Technologies (`src/sections/Technologies.jsx` + `technologyGroups` em `data.js`) para refletir a stack comprovada pela NABOA (Flask, PostgreSQL, SQLAlchemy, pytest não aparecem hoje nominalmente ligados à NABOA em `technologyGroups`).
