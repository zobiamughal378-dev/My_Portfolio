# Zobia Razzaq — Portfolio

React + TypeScript + Tailwind developer portfolio. Pure static site — no
backend, no external API keys, nothing to configure. Deploy and go.

## Local Development

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Deploying to Vercel

1. Push the `frontend/` folder to a GitHub repo
2. Import it on [vercel.com](https://vercel.com) — Framework preset: **Vite**
   (auto-detected)
3. Root Directory: `frontend`
4. Deploy — that's it, no environment variables needed

## Contact Form

The contact form opens the visitor's email app with the message pre-filled
(a `mailto:` link) — no backend, no API key, no third-party service, so
nothing can break on deploy.

## Advanced Features

- **Command Palette** — press `⌘K` / `Ctrl+K` anywhere to fuzzy-search and
  jump to any section or link instantly (the same pattern Linear, Vercel,
  and Raycast use)
- **Animated project filtering** — filter the Projects grid by category
  with a spring-animated pill indicator, powered by Framer Motion's
  `layoutId`
- **Scroll progress bar** — a slim gradient bar at the top tracks reading
  progress down the page
- **Cursor spotlight** — a soft light follows the pointer on desktop for
  subtle depth (auto-disabled on touch devices)
- **Full SEO** — Open Graph, Twitter Card, and JSON-LD `Person` structured
  data in `index.html` so the site renders properly when shared and is
  indexable by search engines
- **Film-grain texture overlay** — a barely-there noise layer (CSS +
  inline SVG filter) that keeps flat dark backgrounds from looking sterile
- **Real tech-brand icons** — every skill pill in the Skills section uses
  an actual brand icon (`react-icons`) instead of plain text, sized by
  importance (core skills render larger)
- **Project spotlight carousel** — one large project at a time with
  left/right arrow navigation, dot indicators, and category filtering
- **3D certificate carousel** — certificates flip through in 3D
  (CSS `rotateY` + perspective, no WebGL) one at a time, with a zoomable
  lightbox on click
- **Hero portrait** — profile photo with an animated, slowly-rotating
  gradient blob background behind it

## Editing Content

- `frontend/src/data/projects.ts` — projects list
- `frontend/src/data/certificates.ts` — certificates (image goes in
  `frontend/public/certificates/`)
- `frontend/src/data/skills.ts` — skills, grouped by category
- `frontend/src/data/experience.ts` — experience timeline

## Tech Stack

React 19, TypeScript, Vite, Tailwind CSS, Framer Motion.


## New in this version
- **Fonts**: Playfair Display (headings, elegant serif) + Outfit (text) + JetBrains Mono (small labels).
- **Hero**: dreamy sunset sky with twinkling stars and drifting clouds. Left: a sun with turning rays, breathing light shafts and
  lens flares. Middle: animated serif name. Warrior-style portrait (`public/photo/zobia-warrior.jpg`) with aura, energy pulses,
  ring of turning words, sword-light slashes, rising sparks and sparks running round the frame. Right: a code editor that types
  your "portfolio.ts", a build terminal, floating </> { } AI API chips, and a waving robot - click it to open the NOVA chat.
- **Butterflies**: soft glowing white butterflies (like the reference image) fly across every page; one follows your mouse.
  Nothing falls any more - small lights float up and twinkle instead.
- **Sketch section (home)**: shows only 2 sketches on a printed-page spread with washi tape, a pencil that keeps drawing a
  butterfly, and the flowing paint background where every click splashes colour. All sketches live in the **Sketch Vault** (`#/sketches`).
- **Visible cursor**: pink arrow, light-blue arrow on clickable things (the old hidden cursor was removed).
- 3D project cylinder, 3D coverflow certificates, cinematic ENTER intro, command palette (Ctrl/Cmd+K).
- **NOVA chat**: real AI through `api/chat.js` (see below). Without the API it falls back to built-in answers.

## Latest changes
- **About**: only about Zobia (3rd-year CS student), new photo, no projects / team names. The old "Currently" card became a "3rd year" card.
- **Currently** (own section): Co-Head Design at Rung Society, Marketing Head at Career Connect Society (`src/components/Currently.tsx`).
- **Internship** (own section): certificate + appreciation letter from Hadi Textile (`src/components/Internship.tsx`, files in `public/certificates/`).
- **Certificates**: added the IEEE GRSS participation certificate and the internship certificate.
- **Projects**: Weather App (5 new screenshots) and Aether Chat - AI Chat with PDF (2 screenshots).
- Team-mate and coach names removed everywhere (ICPC text only says Fast Syntax Syndicate / NU-CFC).

## Turn on the real AI chatbot (NOVA)
1. In Vercel: Project -> Settings -> General -> Root Directory must be `frontend`.
2. Settings -> Environment Variables -> add `ANTHROPIC_API_KEY` (your key from console.anthropic.com). Redeploy.
3. Done. The key lives only on the server (`api/chat.js`); it is never in the website code.
4. After you change projects / skills / experience / certificates, run `npm run knowledge` so the AI knows the new data.
Local note: `npm run dev` has no `/api` route, so NOVA uses the built-in answers there. Use `vercel dev` to test the AI locally.
