# Tanvir Hasan Tamal — Portfolio

Personal portfolio of **Tanvir Hasan Tamal**, Full-Stack Software Engineer.
Live at **[tanvirh103.github.io/tanvir-hasan-tamal](https://tanvirh103.github.io/tanvir-hasan-tamal/)**.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, static export) · React 19 · TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) with CSS-variable design tokens
- Light / dark theme (follows the OS by default, remembers the visitor's choice, no flash on load)
- [simple-icons](https://simpleicons.org) logos served as a single cached SVG sprite
- ESLint (Next.js core-web-vitals + TypeScript) and Prettier (with Tailwind class sorting)
- Deployed to GitHub Pages via GitHub Actions

## Getting started

Requires Node.js 20.9+ (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production builds are served under the GitHub Pages
base path `/tanvir-hasan-tamal`; override it with `NEXT_PUBLIC_BASE_PATH` (e.g. `""` for a custom domain).

## Scripts

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Start the development server           |
| `npm run build`     | Build the static site into `out/`      |
| `npm run typecheck` | Generate Next.js types and run `tsc`   |
| `npm run lint`      | Lint with ESLint                       |
| `npm run format`    | Format with Prettier                   |
| `npm run check`     | Type check, lint and verify formatting |

## Project structure

```
src/
├── app/                # Routes, root layout, global styles, SEO (robots, sitemap, icons sprite)
├── assets/             # Optimized images imported by components
├── components/
│   ├── icons/          # UI and brand SVG icons
│   ├── layout/         # Header, Footer, ThemeToggle
│   ├── sections/       # Page sections (Hero, About, Experience, …)
│   └── ui/             # Reusable primitives (Button, Badge, Section, …)
├── data/               # All site content — edit these files to update the portfolio
├── lib/                # Site config, theme helpers, utilities
└── types/              # Shared TypeScript types
```

## Updating content

All content lives in typed files under [`src/data`](src/data):

- `profile.ts` — name, headline, about, stats, social links, navigation
- `experience.ts` — work history
- `projects.ts` — projects (set `featured: true` to highlight one)
- `skills.ts` — skill groups and the hero tech marquee
- `education.ts`, `achievements.ts` — education, awards and volunteering

Replace `public/Resume_of_Tanvir_Hasan_Tamal.pdf` to update the downloadable resume.

## Contact form

The `/contact` page sends messages through [Web3Forms](https://web3forms.com) to the inbox the
access key was created for. To change the destination inbox, create a new key at web3forms.com and
set `contactForm.accessKey` in [`src/lib/site.ts`](src/lib/site.ts). The key is public by design.

## Deployment

Pushing to `main` runs [`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml), which type checks,
lints, builds the static export and publishes `out/` to GitHub Pages.
