import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { CheckIcon, serviceIcons } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section, SectionHeading } from "@/components/ui";
import { faqs, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Video production, flyer and print design, Meta Ads management and creative strategy — the four things Madvertize does for growing brands.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything between
            <span className="text-brand"> the idea and the spend</span>
          </>
        }
        lead="Four services that work as one engagement. Take the whole thing, or start with the piece that is holding you back."
      />

      <Section>
        <Container className="flex flex-col gap-20">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-brand/12 text-brand-bright">
                      <Icon className="size-6" />
                    </span>
                    <span className="headline text-5xl text-stroke">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="headline mt-6 text-4xl sm:text-5xl">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-lg font-medium text-brand-bright">
                    {service.headline}
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-ash">
                    {service.summary}
                  </p>
                </div>

                <Reveal>
                  <div className="rounded-2xl border border-ink-line bg-ink-raised p-7">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">
                      What you get
                    </h3>
                    <ul className="mt-5 flex flex-col gap-4">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckIcon className="mt-1 size-4 shrink-0 text-brand" />
                          <span className="leading-relaxed text-ash">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </Container>
      </Section>

      <Section id="faq" className="scroll-mt-24 border-t border-ink-line bg-ink-raised/50">
        <Container>
          <SectionHeading
            eyebrow="Questions"
            title="Asked before every kickoff"
          />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-ink p-7">
                <dt className="text-lg font-semibold text-bone">{faq.q}</dt>
                <dd className="mt-3 leading-relaxed text-ash">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
