"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ButtonLink, Container } from "@/components/ui";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-ink-line bg-ink/90 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Logo priority />

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    active ? "text-brand-bright" : "text-ash hover:text-bone",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <ButtonLink href="/contact">Book a call</ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-lg border border-ink-line p-2 text-bone md:hidden"
          >
            {open ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-ink-line md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-bone hover:bg-ink-raised"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3"
            >
              Book a call
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
