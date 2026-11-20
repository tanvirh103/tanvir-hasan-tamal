# Tanvir Hasan Tamal — Portfolio

Personal portfolio of **Tanvir Hasan Tamal**, Full-Stack Software Engineer.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, full-stack: pages + route handlers) · React 19 · TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) with CSS-variable design tokens
- Light / dark theme (follows the OS by default, remembers the visitor's choice, no flash on load)
- [simple-icons](https://simpleicons.org) logos served as a single cached SVG sprite
- Contact form sent through Gmail SMTP (Nodemailer) from a server route handler
- ESLint (Next.js core-web-vitals + TypeScript) and Prettier (with Tailwind class sorting)
- Deployed on Vercel; GitHub Actions runs the checks

## Getting started

Requires Node.js 20.9+ (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # then fill in the Gmail values (see "Contact form")
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
│   └── api/contact/    # Contact form route handler (Gmail SMTP)
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

The `/contact` page posts to `/api/contact`, a route handler that sends the message from your Gmail
account to `CONTACT_TO` over SMTP, with the visitor's address as Reply-To. The Gmail credentials are
read on the server only; they are never sent to the browser.

Environment variables (`.env.local` locally, Vercel project settings in production):

| Name                   | Value                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `GMAIL_USER`           | the Gmail address that sends the mail                                                          |
| `GMAIL_APP_PASSWORD`   | a Google App Password (2-Step Verification must be on)                                         |
| `CONTACT_TO`           | where messages are delivered (defaults to `GMAIL_USER`)                                        |
| `NEXT_PUBLIC_SITE_URL` | the public site URL, e.g. `https://your-project.vercel.app` (used for canonical links and SEO) |

Create an App Password at <https://myaccount.google.com/apppasswords>.

The form also has a honeypot field, a minimum fill time, a 30-second cooldown between sends, and
rejects requests from other sites (cross-site form posts). Rate limiting is per server instance.

## Security

- **Security headers** are set in [`next.config.ts`](next.config.ts): a Content Security Policy,
  `X-Frame-Options: DENY` and `frame-ancestors 'none'` (clickjacking), HSTS, `nosniff`, a referrer policy,
  and a permissions policy.
- Scripts currently allow `'unsafe-inline'`, because Next.js inlines its hydration data. Moving to
  nonces would require a Next.js proxy file that sets a nonce per request.
- **Secrets** stay in environment variables. `.env*` files are gitignored.
- **Dependencies and actions:** Dependabot (`.github/dependabot.yml`) opens weekly update PRs for npm and
  GitHub Actions. Actions are pinned to commit SHAs. Run `npm audit` before releases.

## Deployment (Vercel)

1. Import this repository in Vercel. The framework is detected as Next.js; no build settings need changing.
2. Add the environment variables above under **Project → Settings → Environment Variables**
   (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO`, `NEXT_PUBLIC_SITE_URL`).
3. Every push to `main` deploys to production, and pull requests get preview deployments.
4. [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs the type check, lint, format check and build on
   every push and pull request.
