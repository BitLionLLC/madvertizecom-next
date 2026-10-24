import { Container, Eyebrow } from "@/components/ui";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  lead,
  titleClassName,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  titleClassName?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-line">
      <div aria-hidden className="absolute inset-0 grid-backdrop" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-80 brand-glow opacity-70" />
      <Container className="relative py-20 sm:py-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          className={cn(
            "headline mt-6 max-w-3xl text-5xl sm:text-6xl lg:text-7xl",
            titleClassName,
          )}
        >
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ash sm:text-xl">
          {lead}
        </p>
      </Container>
    </section>
  );
}
