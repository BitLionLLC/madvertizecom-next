import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import {
  Container,
  Section,
  SectionHeading,
  Stat,
} from "@/components/ui";
import { differentiators, process } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Madvertize is a creative and paid-social agency built so the people making the ads and the people buying the media answer to the same number.",
};

const values = [
  {
    title: "Say the hard thing early",
    body: "If the offer is the problem, we say so on the first call. Spending media against a weak offer is the most expensive way to learn that.",
  },
  {
    title: "Volume beats polish",
    body: "One perfect film rarely beats ten honest attempts. We build for iteration, then put the budget behind whatever the audience picks.",
  },
  {
    title: "Nothing locked in a vault",
    body: "Your ad account, your footage, your print files. We work in your accounts so there is nothing to untangle if you leave.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A creative shop that
            <span className="text-brand"> buys its own media</span>
          </>
        }
        lead="Madvertize started because too many good ads died in an inbox between an agency that made them and an agency that spent behind them."
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-ash">
              <p>
                We are a small team of editors, designers, strategists and media
                buyers who sit in the same standup. When an ad underperforms, the
                person who cut it hears about it the same morning as the person
                who bought it — and the next version is usually live that week.
              </p>
              <p>
                That shape decides what we take on. We work with brands that have
                something real to sell and the appetite to test, from
                direct-to-consumer products to local service businesses opening
                their fifth location. We are less useful to companies that need a
                brand film and nothing else.
              </p>
              <p>
                The output is deliberately unglamorous: video built for the feed,
                print built for the hand, and a campaign structure you can read
                without a dashboard tour. If the number goes up, we did our job.
                If it does not, you will hear that from us first.
              </p>
            </div>

            {/* <dl className="grid grid-cols-2 gap-8 self-start rounded-2xl border border-ink-line bg-ink-raised p-8">
              <Stat value="2026" label="Founded" />
              <Stat value="40+" label="Brands served" />
              <Stat value="180+" label="Ads shipped last year" />
              <Stat value="11" label="People on the team" />
            </dl> */}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-ink-line bg-ink-raised/50">
        <Container>
          <SectionHeading eyebrow="How we work" title="Three house rules" />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="bg-ink p-7">
                <dt className="headline text-2xl">{value.title}</dt>
                <dd className="mt-3 leading-relaxed text-ash">{value.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Engagement"
            title="What the first 90 days look like"
          />
          <ol className="mt-12 flex flex-col gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line">
            {process.map((item) => (
              <li
                key={item.step}
                className="grid gap-4 bg-ink p-7 sm:grid-cols-[6rem_12rem_1fr] sm:items-baseline"
              >
                <span className="headline text-4xl text-stroke">
                  {item.step}
                </span>
                <h3 className="headline text-2xl">{item.title}</h3>
                <p className="leading-relaxed text-ash">{item.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item.title} className="bg-ink p-7">
                <h3 className="text-lg font-semibold text-bone">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
