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

The `/contact` page posts messages to a small serverless endpoint in [`contact-api/`](contact-api/README.md),
which sends them from your Gmail account over SMTP. The endpoint URL is read at build time from
`NEXT_PUBLIC_CONTACT_API_URL`:

- Locally, put it in a `.env.local` file (gitignored).
- For the deployed site, add it as a repository **variable** (Settings → Secrets and variables → Actions → Variables)
  with the same name. The workflow passes it to the build.

The Gmail address and App Password live only in the Vercel project for `contact-api/`, never in this repository.
The form also has a honeypot field, a minimum fill time, and a 30-second cooldown between sends to deter spam.

## Security

- **Content Security Policy:** GitHub Pages cannot send headers, so `scripts/csp-hashes.mjs` writes a CSP `<meta>`
  into every exported page after `next build`. Scripts are limited to this site plus SHA-256 hashes of each page's
  own inline scripts, so `'unsafe-inline'` is not used for scripts. Build output must be checked in the browser console
  after changes to inline scripts.
- **Clickjacking:** `src/lib/framebust.ts` breaks out of foreign frames, since `frame-ancestors` cannot be set in a meta tag.
- **Dependencies and actions:** Dependabot (`.github/dependabot.yml`) opens weekly update PRs for npm and GitHub Actions.
  Actions are pinned to commit SHAs in the workflow.
- Run `npm audit` before releases.

## Deployment

Pushing to `main` runs [`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml), which type checks,
lints, builds the static export (adding the CSP) and publishes `out/` to GitHub Pages.
