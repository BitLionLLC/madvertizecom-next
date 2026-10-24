import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { ArrowIcon, CheckIcon, serviceIcons } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  Stat,
} from "@/components/ui";
import {
  caseStudies,
  differentiators,
  process,
  services,
  testimonials,
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesPreview />
      <ProcessSection />
      <WorkPreview />
      <WhyUs />
      <Testimonials />
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-backdrop" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[32rem] brand-glow" />

      <Container className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-4xl">
          <Eyebrow>Creative + paid social, one team</Eyebrow>

          <h1 className="headline mt-7 text-5xl sm:text-7xl lg:text-8xl">
            Ads that stop
            <br />
            the scroll.
            <br />
            <span className="text-brand">Creative that sells.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ash sm:text-xl">
            Madvertize makes the video and print material your brand needs — then
            puts it in front of the right people with Meta Ads built to be
            measured. One team from the first hook to the weekly report.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Book a free strategy call
            </ButtonLink>
            {/* <ButtonLink href="/work" variant="outline" size="lg">
              See the work
              <ArrowIcon className="size-4" />
            </ButtonLink> */}
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-ash">
            {[
              "No long contracts",
              "You own every file",
              "First assets in 2 weeks",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckIcon className="size-4 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-ink-line pt-10 sm:grid-cols-4">
          <Stat value="180+" label="Ads shipped last year" />
          <Stat value="3.4x" label="Median return on ad spend" />
          <Stat value="40+" label="Brands served" />
          <Stat value="14 days" label="Average time to first launch" />
        </dl>
      </Container>
    </section>
  );
}

function ServicesPreview() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Four jobs, done
              <br className="hidden sm:block" /> in the same room
            </>
          }
          lead="Most brands buy creative from one place and media from another, then wonder why the two never add up. We do both, so the ad you approve is the ad that gets spent behind."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal key={service.slug} delay={index * 80}>
                <Card className="group h-full transition-colors duration-300 hover:border-brand/60">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand/12 text-brand-bright">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="headline mt-6 text-2xl">{service.name}</h3>
                  <p className="mt-2 text-base font-medium text-brand-bright">
                    {service.headline}
                  </p>
                  <p className="mt-4 leading-relaxed text-ash">
                    {service.summary}
                  </p>
                  <Link
                    href={`/services#${service.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-bone transition-colors group-hover:text-brand-bright"
                  >
                    What you get
                    <ArrowIcon className="size-4" />
                  </Link>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function ProcessSection() {
  return (
    <Section className="border-y border-ink-line bg-ink-raised/50">
      <Container>
        <SectionHeading
          eyebrow="How it runs"
          title="From kickoff to scale"
          lead="A straight line from the first call to the week budget goes up. Nothing here waits on a quarterly review."
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <li key={item.step} className="bg-ink p-7">
              <span className="headline text-5xl text-stroke">{item.step}</span>
              <h3 className="headline mt-5 text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function WorkPreview() {
  const featured = caseStudies.slice(0, 3);

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Receipts, not a reel"
            className="sm:max-w-xl"
          />
          {/* <ButtonLink href="/work" variant="outline">
            All case studies
            <ArrowIcon className="size-4" />
          </ButtonLink> */}
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {featured.map((study, index) => (
            <Reveal key={study.slug} delay={index * 90}>
              <Card className="flex h-full flex-col transition-colors duration-300 hover:border-brand/60">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
                  {study.industry}
                </p>
                <h3 className="headline mt-4 text-2xl">{study.client}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ash">
                  {study.summary}
                </p>
                <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-ink-line pt-5">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dd className="headline text-xl text-bone">
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
  );
}

function WhyUs() {
  return (
    <Section className="border-t border-ink-line">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Why Madvertize"
            title={
              <>
                Built to be
                <br /> <span className="text-brand">accountable</span>
              </>
            }
            lead="We would rather be judged on what the account returns than on how the showreel looks."
          />

          <dl className="grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item.title} className="bg-ink p-7">
                <dt className="flex items-start gap-3 text-lg font-semibold text-bone">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-brand" />
                  {item.title}
                </dt>
                <dd className="mt-3 pl-7 text-sm leading-relaxed text-ash">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section className="border-t border-ink-line bg-ink-raised/50">
      <Container>
        <SectionHeading
          eyebrow="Clients"
          title="What they say after a quarter"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink-line bg-ink p-7">
                <span aria-hidden className="headline text-5xl text-brand">
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-lg leading-relaxed text-bone">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-ink-line pt-5 text-sm">
                  <span className="font-semibold text-bone">
                    {testimonial.name}
                  </span>
                  <span className="mt-1 block text-ash">
                    {testimonial.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
