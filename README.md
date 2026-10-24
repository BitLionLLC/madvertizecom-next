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
- **Form delivery.** `submitEnquiry` in
  [`src/app/contact/actions.ts`](src/app/contact/actions.ts) validates the
  submission and then logs it. Wire the marked spot to your email service, CRM
  or database. Consider adding spam protection at the same time.
- **Images.** The site is type- and layout-led, with the brand marks in
  `public/` (`mad.png`, `madvertize.png`, `vertize.png`) used for the nav,
  footer and app icon. Add an `opengraph-image` in `src/app/` so links shared on
  social show a branded card.

## Notes on Next.js 16

`cacheComponents` is enabled, which rejects request-time and non-deterministic
values during prerender. Two consequences are already handled:

- The footer's copyright year comes from `process.env.buildYear`, inlined in
  [`next.config.ts`](next.config.ts), because `new Date()` cannot run in a
  prerender.
- The contact form uses `useActionState`, which reads submitted state from the
  request, so it is wrapped in `<Suspense>` and streams in behind the static
  page shell.
