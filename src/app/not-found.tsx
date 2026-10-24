import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-backdrop" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-80 brand-glow" />
      <Container className="relative flex flex-col items-center py-28 text-center sm:py-40">
        <p className="headline text-7xl text-brand sm:text-8xl">404</p>
        <h1 className="headline mt-6 text-4xl sm:text-5xl">
          This page never made it to print
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ash">
          The link is broken or the page has moved. Head back to the homepage, or
          tell us what you were after.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
