import { ButtonLink, Container } from "@/components/ui";
import { site } from "@/content/site";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden border-y border-ink-line">
      <div aria-hidden className="absolute inset-0 grid-backdrop" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-64 brand-glow opacity-60"
      />
      <Container className="relative py-20 text-center sm:py-24">
        <h2 className="headline mx-auto max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
          Let&apos;s make the ad
          <span className="text-brand"> mad good</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ash">
          Book a free 45-minute strategy call. You leave with a written take on
          your offer, your creative and your account — whether or not you hire
          us.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg">
            Book a free strategy call
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="outline" size="lg">
            Email us instead
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
