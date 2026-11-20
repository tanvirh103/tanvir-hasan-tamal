# Contact API (Gmail SMTP)

A small serverless endpoint for the portfolio's contact form. It receives the form and sends the
message from your Gmail account to your inbox, with the visitor's address as Reply-To.

The portfolio itself is a static site, so it cannot run SMTP. This function does.

## 1. Create a Gmail App Password

1. Turn on 2-Step Verification for your Google account.
2. Open <https://myaccount.google.com/apppasswords>, create an app password (any name), and copy the 16-character value.

## 2. Deploy to Vercel

1. Import this repository in Vercel and set **Root Directory** to `contact-api`.
2. Framework preset: _Other_. No build command or output directory is needed.
3. Add these environment variables (Production):

| Name                 | Value                                                  |
| -------------------- | ------------------------------------------------------ |
| `GMAIL_USER`         | your Gmail address                                     |
| `GMAIL_APP_PASSWORD` | the app password from step 1                           |
| `ALLOWED_ORIGIN`     | `https://tanvirh103.github.io` (no trailing slash)     |
| `CONTACT_TO`         | optional, where messages go (defaults to `GMAIL_USER`) |

4. Deploy. Your endpoint is `https://<project>.vercel.app/api/contact`.

## 3. Connect the portfolio

Add a repository variable named `NEXT_PUBLIC_CONTACT_API_URL` in GitHub
(Settings → Secrets and variables → Actions → Variables) with the endpoint URL above, then redeploy the site.

## Local testing

Two terminals are needed: one for the contact API and one for the portfolio.

1. **Contact API** (terminal 1):

   ```bash
   cd contact-api
   npm install
   cp .env.example .env.local   # then edit it: set GMAIL_USER, GMAIL_APP_PASSWORD, ALLOWED_ORIGIN=http://localhost:3000
   npm run dev                  # serves http://localhost:4000/api/contact
   ```

2. **Portfolio** (terminal 2), from the repository root. Its `.env.local` must contain
   `NEXT_PUBLIC_CONTACT_API_URL=http://localhost:4000/api/contact`:

   ```bash
   npm run dev                  # http://localhost:3000/contact/
   ```

Keep the Gmail credentials in `contact-api/.env.local` only. Do not put them in the root `.env`,
which Next.js also loads. Restart the API after changing `.env.local`.

## Security notes

- Requests are accepted only from `ALLOWED_ORIGIN`, which the browser enforces through CORS.
  A non-browser client can still send a forged `Origin` header, so the rate limit and field limits matter too.
- Rate limiting is per serverless instance and resets when Vercel recycles it. For stricter limits, add a shared store such as Upstash Redis or Vercel KV.
- Input is length-limited and stripped of line breaks before it reaches mail headers.
- The app password is a server secret. Never put it in the portfolio repository or the browser bundle.
