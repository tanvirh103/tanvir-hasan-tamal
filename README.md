# Tanvir Hasan Tamal — Portfolio

Personal portfolio of **Tanvir Hasan Tamal**, Full-Stack Software Engineer.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, full-stack: pages + route handlers) · React 19 · TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) with CSS-variable design tokens
- Light / dark theme (follows the OS by default, remembers the visitor's choice, no flash on load)
- [simple-icons](https://simpleicons.org) logos served as a single cached SVG sprite
- Contact form delivered by email from a server route handler
- ESLint (Next.js core-web-vitals + TypeScript) and Prettier (with Tailwind class sorting)
- Deployed on Vercel; GitHub Actions runs the checks

## Getting started

Requires Node.js 20.9+ (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Start the development server           |
| `npm run build`     | Production build                       |
| `npm start`         | Run the production build locally       |
| `npm run typecheck` | Generate Next.js types and run `tsc`   |
| `npm run lint`      | Lint with ESLint                       |
| `npm run format`    | Format with Prettier                   |
| `npm run check`     | Type check, lint and verify formatting |

## Project structure

```
src/
├── app/                # Routes, root layout, global styles, SEO (robots, sitemap, icons sprite)
│   └── api/contact/    # Contact form route handler
├── assets/             # Optimized images imported by components
├── components/
│   ├── contact/        # Contact form
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

The `/contact` page sends messages through a route handler at `/api/contact`. The form also includes
spam protection.

## Deployment (Vercel)

1. Import this repository in Vercel. The framework is detected as Next.js; no build settings need changing.
2. Every push to `main` deploys to production, and pull requests get preview deployments.
3. [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs the type check, lint, format check and build on
   every push and pull request.
