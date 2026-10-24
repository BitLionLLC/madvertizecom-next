import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-bright">
      <span aria-hidden className="h-px w-8 bg-brand" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="headline text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {lead ? (
        <p className="max-w-2xl text-lg leading-relaxed text-ash">{lead}</p>
      ) : null}
    </div>
  );
}

const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
  size: {
    md: "px-6 py-3",
    lg: "px-7 py-4",
  },
  variant: {
    primary: "bg-brand text-white hover:bg-brand-bright",
    outline:
      "border border-ink-line bg-ink-raised text-bone hover:border-brand hover:text-brand-bright",
    ghost: "text-bone hover:text-brand-bright",
  },
};

type ButtonVariant = keyof typeof buttonStyles.variant;
type ButtonSize = keyof typeof buttonStyles.size;

function buttonClass(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(
    buttonStyles.base,
    buttonStyles.size[size],
    buttonStyles.variant[variant],
    className,
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink-line bg-ink-raised p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="headline text-4xl text-brand-bright sm:text-5xl">
        {value}
      </span>
      <span className="text-sm text-ash">{label}</span>
    </div>
  );
}
