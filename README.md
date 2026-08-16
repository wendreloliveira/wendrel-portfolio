# Wendrel Oliveira — Portfolio

Landing page premium construída com **React (Vite)**, **TailwindCSS**, **Framer Motion** e **react-icons**.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:5173

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos finais ficam em `dist/`.

## Estrutura

```
src/
  components/     -> peças reutilizáveis (Navbar, Reveal, GridBackground, AnimatedCounter, SkillBar, Footer, FloatingWhatsapp)
  sections/       -> uma seção por arquivo (Hero, About, Projects, Timeline, Technologies, Contact)
  lib/data.js     -> todo o conteúdo textual (projetos, timeline, stack, contatos) num único lugar
```

## Personalizando

- **Conteúdo**: edite `src/lib/data.js` — nome, cargo, projetos, timeline, tecnologias e links de contato.
- **Cores**: edite os tokens em `tailwind.config.js` (`colors.base`, `colors.ink`, `colors.signal`).
- **Links reais**: troque `whatsapp`, `linkedin`, `github` e `email` em `lib/data.js` pelos seus links reais antes de publicar.

## Deploy

Funciona em qualquer host estático (Vercel, Netlify, GitHub Pages) — basta apontar para `npm run build` e a pasta `dist`.
