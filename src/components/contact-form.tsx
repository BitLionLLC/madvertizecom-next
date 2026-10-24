"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useTransition } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { services } from "@/content/site";
import { initialEnquiryState, RECAPTCHA_FIELD } from "@/lib/enquiry";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          theme?: "light" | "dark";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

// Inlined at build time, so the key has to be set before `next build`.
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const WIDGET_TIMEOUT_MS = 15000;

const budgets = [
  "Under $2,500 / month",
  "$2,500 – $5,000 / month",
  "$5,000 – $15,000 / month",
  "$15,000+ / month",
  "Not sure yet",
];

const fieldClass =
  "w-full rounded-xl border border-ink-line bg-ink px-4 py-3 text-base text-bone placeholder:text-ash/60 focus:border-brand focus:outline-none";

const emptyValues = {
  name: "",
  email: "",
  company: "",
  budget: "",
  message: "",
};

export function ContactForm() {
  // Deliberately not useActionState: React resets a form once its action
  // settles, which desynced these controlled inputs and wiped what had been
  // typed whenever a submission came back with an error.
  const [state, setState] = useState(initialEnquiryState);
  const [pending, startTransition] = useTransition();

  const [values, setValues] = useState(emptyValues);
  const [interests, setInterests] = useState<string[]>([]);

  const widgetHost = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [widgetBlocked, setWidgetBlocked] = useState(false);

  // The checkbox is rendered explicitly rather than by the script scanning for
  // a .g-recaptcha class, which does not survive React re-rendering the tree.
  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || widgetId.current !== null) return true;

      const grecaptcha = window.grecaptcha;
      const host = widgetHost.current;
      if (!grecaptcha?.render || !host) return false;

      widgetId.current = grecaptcha.render(host, {
        sitekey: siteKey,
        theme: "dark",
        callback: (value) => setToken(value),
        "expired-callback": () => setToken(null),
        "error-callback": () => setToken(null),
      });
      return true;
    };

    if (render()) return;

    const poll = setInterval(() => {
      if (render()) clearInterval(poll);
    }, 200);

    // An ad blocker stopping Google's script is the usual reason this never
    // arrives; say so rather than leaving an empty gap above the button.
    const giveUp = setTimeout(() => {
      clearInterval(poll);
      if (!cancelled && widgetId.current === null) setWidgetBlocked(true);
    }, WIDGET_TIMEOUT_MS);

    return () => {
      cancelled = true;
      clearInterval(poll);
      clearTimeout(giveUp);
    };
  }, []);

  const set = (field: keyof typeof emptyValues) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const toggleInterest = (name: string) =>
    setInterests((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (siteKey) {
      if (!token) {
        setState({
          status: "error",
          message: widgetBlocked
            ? "The reCAPTCHA check could not load, which is usually an ad blocker. Allow google.com or email miru@madvertize.com directly."
            : "Please confirm you are not a robot before sending.",
        });
        return;
      }
      data.set(RECAPTCHA_FIELD, token);
    }

    startTransition(async () => {
      const result = await submitEnquiry(data);
      setState(result);

      if (result.status !== "success") {
        // A v2 token is single use, so a retry needs a fresh one.
        window.grecaptcha?.reset(widgetId.current ?? undefined);
        setToken(null);
      }
    });
  }

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand/40 bg-ink-raised p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand/15 text-brand-bright">
          <CheckIcon className="size-6" />
        </span>
        <h2 className="headline mt-5 text-3xl">Brief received</h2>
        <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-ash">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <>
      {siteKey ? (
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
        />
      ) : null}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* Honeypot: hidden from people, irresistible to bots. */}
        <div aria-hidden className="hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Your name" name="name" error={state.fieldErrors?.name}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Alex Rivera"
              value={values.name}
              onChange={(event) => set("name")(event.target.value)}
              className={fieldClass}
            />
          </Field>

          <Field label="Email" name="email" error={state.fieldErrors?.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="alex@yourbrand.com"
              value={values.email}
              onChange={(event) => set("email")(event.target.value)}
              className={fieldClass}
            />
          </Field>

          <Field label="Company" name="company" optional>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Your Brand Co."
              value={values.company}
              onChange={(event) => set("company")(event.target.value)}
              className={fieldClass}
            />
          </Field>

          <Field label="Monthly budget" name="budget" optional>
            <select
              id="budget"
              name="budget"
              value={values.budget}
              onChange={(event) => set("budget")(event.target.value)}
              className={cn(fieldClass, "appearance-none")}
            >
              <option value="" disabled>
                Select a range
              </option>
              {budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-bone">
            What do you need?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <label
                key={service.slug}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink-line bg-ink px-4 py-3 text-sm text-ash transition-colors hover:border-brand/60 hover:text-bone has-checked:border-brand has-checked:text-bone"
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={service.name}
                  checked={interests.includes(service.name)}
                  onChange={() => toggleInterest(service.name)}
                  className="size-4 accent-brand"
                />
                {service.name}
              </label>
            ))}
          </div>
        </fieldset>

        <Field
          label="What are you selling, and to whom?"
          name="message"
          error={state.fieldErrors?.message}
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="We sell a subscription coffee box, mostly to people who already own a grinder. We have tried boosting posts but never run a real campaign."
            value={values.message}
            onChange={(event) => set("message")(event.target.value)}
            className={cn(fieldClass, "resize-y")}
          />
        </Field>

        {siteKey ? <div ref={widgetHost} className="min-h-[78px]" /> : null}

        {state.status === "error" ? (
          <p
            role="alert"
            className="rounded-xl border border-brand/50 bg-brand/10 px-4 py-3 text-sm text-brand-bright"
          >
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="shrink-0 self-start whitespace-nowrap"
          >
            {pending ? "Sending…" : "Send the brief"}
          </Button>
          <p className="text-xs leading-relaxed text-ash">
            We reply within one business day. No sequences, no cold calls.
          </p>
        </div>
      </form>
    </>
  );
}

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-semibold uppercase tracking-[0.14em] text-bone"
      >
        {label}
        {optional ? (
          <span className="ml-2 font-normal normal-case tracking-normal text-ash">
            optional
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className="text-sm text-brand-bright" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
