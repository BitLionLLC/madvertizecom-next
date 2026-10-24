import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Card, Container, Section } from "@/components/ui";
import { caseStudies } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Madvertize: video, print and Meta Ads campaigns for DTC brands, local services, restaurants and multi-location businesses.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title={
          <>
            Campaigns we would
            <span className="text-brand"> put our name on</span>
          </>
        }
        lead="Six engagements, what we made for them, and what it moved. Ask us about the ones that needed a second attempt — we will tell you about those too."
      />

      <Section>
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {caseStudies.map((study, index) => (
              <Reveal key={study.slug} delay={(index % 2) * 90}>
                <Card className="flex h-full flex-col transition-colors duration-300 hover:border-brand/60">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
                      {study.industry}
                    </p>
                    <span className="headline text-3xl text-stroke">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="headline mt-5 text-3xl">{study.client}</h2>
                  <p className="mt-2 text-lg font-medium text-bone">
                    {study.title}
                  </p>
                  <p className="mt-4 flex-1 leading-relaxed text-ash">
                    {study.summary}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {study.deliverables.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-ink-line px-3 py-1 text-xs text-ash"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-ink-line pt-5">
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dd className="headline text-2xl text-brand-bright">
                          {metric.value}
                        </dd>
                        <dt className="mt-1 text-[11px] leading-tight text-ash">
                          {metric.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
