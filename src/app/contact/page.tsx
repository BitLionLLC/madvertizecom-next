import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui";
import { faqs, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you are selling and we will come back within one business day with a point of view on your creative, your offer and your Meta Ads.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us what you
            <span className="text-brand"> need to sell</span>
          </>
        }
        lead="Send a short brief and we will reply within one business day — usually with a question or two and an honest read on whether we are the right fit."
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>

            <aside className="flex flex-col gap-10">
              <div className="rounded-2xl border border-ink-line bg-ink-raised p-7">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">
                  Reach us directly
                </h2>
                <ul className="mt-5 flex flex-col gap-4 text-base">
                  <li>
                    <Link
                      href={`mailto:${site.email}`}
                      className="text-brand-bright hover:underline"
                    >
                      {site.email}
                    </Link>
                  </li>
                  <li className="text-ash">{site.address}</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-ink-line bg-ink-raised p-7">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">
                  Before you ask
                </h2>
                <dl className="mt-5 flex flex-col gap-5">
                  {faqs.slice(0, 3).map((faq) => (
                    <div key={faq.q}>
                      <dt className="font-semibold text-bone">{faq.q}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-ash">
                        {faq.a}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/services#faq"
                  className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-brand-bright hover:underline"
                >
                  All questions
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

/**
 * `useActionState` inside <ContactForm /> reads submitted state from the
 * request, so the form streams in behind the static page shell.
 */
function FormSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-6">
      {[0, 1, 2].map((row) => (
        <div key={row} className="grid gap-6 sm:grid-cols-2">
          <div className="h-[5.5rem] rounded-xl border border-ink-line bg-ink-raised" />
          <div className="h-[5.5rem] rounded-xl border border-ink-line bg-ink-raised" />
        </div>
      ))}
      <div className="h-40 rounded-xl border border-ink-line bg-ink-raised" />
      <div className="h-13 w-48 rounded-full bg-ink-raised" />
    </div>
  );
}
