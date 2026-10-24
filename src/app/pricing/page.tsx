import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container, Section } from "@/components/ui";
import { plans } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Monthly retainers for creative production and Meta Ads management. Three plans, no long contracts, media spend paid directly to the platform.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Flat monthly fees,
            <span className="text-brand"> no percentage of spend</span>
          </>
        }
        lead="We charge for the work, not a cut of your media budget — so our incentive is the result, not a bigger budget. Month to month after the first 90 days."
      />

      <Section>
        <Container>
          <div className="grid items-start gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-8",
                  plan.featured
                    ? "border-brand bg-ink-raised shadow-[0_0_60px_-20px] shadow-brand/50"
                    : "border-ink-line bg-ink-raised",
                )}
              >
                {plan.featured ? (
                  <span className="mb-5 self-start rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    Most popular
                  </span>
                ) : null}

                <h2 className="headline text-3xl">{plan.name}</h2>
                <p className="mt-3 leading-relaxed text-ash">{plan.blurb}</p>

                <p className="mt-7 flex items-baseline gap-2">
                  <span className="headline text-5xl text-bone">
                    {plan.price}
                  </span>
                  <span className="text-sm text-ash">{plan.cadence}</span>
                </p>

                {plan.note ? (
                  <p className="mt-3 text-sm leading-relaxed text-ash">
                    {plan.note}
                  </p>
                ) : null}

                <ul className="mt-8 flex flex-1 flex-col gap-4 border-t border-ink-line pt-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="mt-1 size-4 shrink-0 text-brand" />
                      <span className="text-sm leading-relaxed text-ash">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/contact"
                  variant={plan.featured ? "primary" : "outline"}
                  className="mt-8"
                >
                  {plan.cta}
                </ButtonLink>
              </div>
            ))}
          </div>

          <p className="mt-10 rounded-2xl border border-ink-line bg-ink-raised p-6 text-sm leading-relaxed text-ash">
            <strong className="font-semibold text-bone">
              Media spend is separate.
            </strong>{" "}
            Ad budget goes directly to Meta on your own payment method, so you
            keep full visibility and own the account. One-off projects — a single
            video shoot, a flyer campaign, a tracking audit — are quoted on their
            own.
          </p>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
