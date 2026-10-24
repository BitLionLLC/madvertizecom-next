import Link from "next/link";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";
import { nav, services, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-line bg-ink">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo variant="full" imageClassName="h-28 w-auto" />
            <p className="max-w-xs text-sm leading-relaxed text-ash">
              {site.tagline} Video, print and Meta Ads from one team.
            </p>
          </div>

          <FooterColumn title="Company">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((service) => (
              <FooterLink key={service.slug} href={`/services#${service.slug}`}>
                {service.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
            {site.socials.map((social) => (
              <FooterLink key={social.label} href={social.href}>
                {social.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-line pt-6 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {process.env.buildYear} {site.name}. All rights reserved.
          </p>
          <p>{site.address}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-ash transition-colors hover:text-brand-bright"
      >
        {children}
      </Link>
    </li>
  );
}
