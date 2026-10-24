# Madvertize

Marketing site for Madvertize — a creative and paid-social agency that produces
video and print material for brands and runs the Meta Ads behind it.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and
Tailwind CSS v4. Every route is statically prerendered.

## Running it

```bash
npm run dev     # dev server on http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Layout

```
src/
  app/
    page.tsx            Home
    services/           Service detail + FAQ
    work/               Case studies
    pricing/            Plans
    about/              Company
    contact/            Enquiry form + server action
    not-found.tsx       404
    sitemap.ts          /sitemap.xml
    robots.ts           /robots.txt
    globals.css         Theme tokens, display type, background treatments
  components/           Header, footer, UI primitives, icons, form
  content/site.ts       All site copy and data
  lib/                  Shared types and helpers
```

### Editing content

Nearly all copy lives in [`src/content/site.ts`](src/content/site.ts) — contact
details, navigation, services, case studies, testimonials, plans and FAQs. Page
components read from it, so most text changes mean editing that one file.

### Theme

Colors and fonts are Tailwind v4 theme tokens in
[`src/app/globals.css`](src/app/globals.css): `brand` / `brand-bright` /
`brand-deep` for the reds, `ink` / `ink-raised` / `ink-line` for the blacks, and
`bone` / `ash` for text. Headlines use Anton via `.headline`; body copy uses
Geist.

## Before this goes live

- **Placeholder content.** The case studies, testimonials, statistics and
  pricing in `src/content/site.ts` are written as realistic samples, not real
  client results. Replace them with your own before publishing.
- **Contact details.** `site.email`, `site.phone`, `site.address`, `site.url`
  and the social links are placeholders.
- **reCAPTCHA keys.** The site key is inlined into the browser bundle at build
  time, so it must be present in the environment before `npm run build`, not
  just at runtime. Add every domain the form is served from — including
  `localhost` if you want to test there — in the reCAPTCHA admin console.
- **Images.** The site is type- and layout-led, with the brand marks in
  `public/` (`mad.png`, `madvertize.png`, `vertize.png`) used for the nav,
  footer and app icon. Add an `opengraph-image` in `src/app/` so links shared on
  social show a branded card.

## Contact form

Submissions go to `miru@madvertize.com` over SMTP. `submitEnquiry` in
[`src/app/contact/actions.ts`](src/app/contact/actions.ts) validates the form
and hands it to [`src/lib/mail.ts`](src/lib/mail.ts), which sends through
Nodemailer. The email's `Reply-To` is the sender's address, so replying from
the inbox goes straight back to them.

Copy `.env.example` to `.env.local` (or `.env`) and fill in the mailbox
settings:

| Variable        | Required | Notes                                                    |
| --------------- | -------- | -------------------------------------------------------- |
| `SMTP_HOST`     | yes      | Mail host for the domain                                   |
| `SMTP_PORT`     | no       | Defaults to `587`                                          |
| `SMTP_USER`     | yes      | Usually the full mailbox address                           |
| `SMTP_PASSWORD` | yes      | Mailbox or app password                                    |
| `SMTP_SECURE`   | no       | Defaults to `true` on port 465, `false` otherwise          |
| `SMTP_FROM`     | no       | Defaults to `SMTP_USER`; most hosts require it to match    |
| `ENQUIRY_TO`    | no       | Defaults to `miru@madvertize.com`                          |

These are read at request time, so changing them needs a restart but not a
rebuild. Never commit the filled-in file — `.gitignore` covers `.env*` and
allows only `.env.example` through.

If a send fails, the form tells the sender to email directly and the error is
logged server-side; nothing is silently dropped. With no SMTP credentials set,
`next dev` logs the enquiry instead of sending so the flow can be exercised
locally, while production returns the error.

### Spam protection

Two layers, both in [`src/app/contact/actions.ts`](src/app/contact/actions.ts):

- A honeypot field that people never see and bots tend to fill in.
- Google reCAPTCHA v3, which is invisible. The browser mints a token at submit
  time, and [`src/lib/recaptcha.ts`](src/lib/recaptcha.ts) checks it against
  Google, rejecting anything whose action does not match or whose score falls
  below `RECAPTCHA_MIN_SCORE` (0.5 by default). Raise the threshold if spam
  still gets through; lower it if real enquiries are being turned away.

| Variable                         | Required | Notes                                        |
| -------------------------------- | -------- | -------------------------------------------- |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | no       | Needed at build time, not just at runtime     |
| `RECAPTCHA_SECRET_KEY`           | no       | Server-side only                              |
| `RECAPTCHA_MIN_SCORE`            | no       | Lowest score still treated as human           |

With both keys unset the form still works and only the honeypot applies; the
server logs a warning on every submission. That is deliberate — failing closed
would take the contact form down entirely whenever the keys go missing.

A submission that cannot be verified is refused with a message pointing at the
direct email address, and whatever was typed stays in the form. That includes
visitors whose ad blocker stops Google's script from loading, which is the main
cost of running v3 here.

The floating reCAPTCHA badge is hidden in
[`globals.css`](src/app/globals.css), so the attribution line under the form
carries the disclosure Google requires. If you remove that line, unhide the
badge.

## Notes on Next.js 16

`cacheComponents` is enabled, which rejects request-time and non-deterministic
values during prerender. Two consequences are already handled:

- The footer's copyright year comes from `process.env.buildYear`, inlined in
  [`next.config.ts`](next.config.ts), because `new Date()` cannot run in a
  prerender.
- The contact form uses `useActionState`, which reads submitted state from the
  request, so it is wrapped in `<Suspense>` and streams in behind the static
  page shell.
