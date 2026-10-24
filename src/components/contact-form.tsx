"use client";

import Script from "next/script";
import { useState, useTransition } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { services } from "@/content/site";
import {
  initialEnquiryState,
  RECAPTCHA_ACTION,
  RECAPTCHA_FIELD,
} from "@/lib/enquiry";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

// Inlined at build time, so the key has to be set before `next build`.
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const TOKEN_TIMEOUT_MS = 8000;

/**
 * v3 tokens expire after a couple of minutes, so one is minted at submit time
 * rather than when the form is first shown. Resolves null if the script never
 * loaded — an ad blocker, usually — and the server decides what that means.
 */
function mintRecaptchaToken(key: string) {
  return new Promise<string | null>((resolve) => {
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) return resolve(null);

    // execute() can hang indefinitely on a misconfigured key, which would
    // leave the form stuck on "Sending…" with nothing for anyone to act on.
    const timer = setTimeout(() => resolve(null), TOKEN_TIMEOUT_MS);
    const settle = (token: string | null) => {
      clearTimeout(timer);
      resolve(token);
    };

    grecaptcha.ready(() => {
      grecaptcha
        .execute(key, { action: RECAPTCHA_ACTION })
        .then(settle, () => settle(null));
    });
  });
}

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

  // React resets an uncontrolled form once the action settles, which would
  // throw away everything typed whenever a submission comes back with an
  // error. Holding the values here keeps them through a failed attempt.
  const [values, setValues] = useState(emptyValues);
  const [interests, setInterests] = useState<string[]>([]);
  // Covers the gap between the click and the transition starting, while the
  // reCAPTCHA token is being minted.
  const [preparing, setPreparing] = useState(false);
  const busy = pending || preparing;

  const set = (field: keyof typeof emptyValues) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  // Submitting by hand rather than through `action={formAction}`: the token
  // can only be fetched asynchronously, and it has to be in the FormData
  // before the action runs.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setPreparing(true);
    try {
      if (siteKey) {
        const token = await mintRecaptchaToken(siteKey);
        if (token) data.set(RECAPTCHA_FIELD, token);
      }
      startTransition(async () => {
        setState(await submitEnquiry(data));
      });
    } finally {
      setPreparing(false);
    }
  }

  const toggleInterest = (name: string) =>
    setInterests((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );

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
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
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
          disabled={busy}
          className="shrink-0 self-start whitespace-nowrap"
        >
          {busy ? "Sending…" : "Send the brief"}
        </Button>
        <p className="text-xs leading-relaxed text-ash">
          We reply within one business day. No sequences, no cold calls.
        </p>
      </div>

      {siteKey ? (
        // Required wording when the reCAPTCHA badge is hidden.
        <p className="text-xs leading-relaxed text-ash/70">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            className="underline hover:text-ash"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            className="underline hover:text-ash"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
          </p>
        ) : null}
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
