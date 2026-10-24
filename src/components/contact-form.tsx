"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { services } from "@/content/site";
import { initialEnquiryState } from "@/lib/enquiry";
import { cn } from "@/lib/utils";

const budgets = [
  "Under $2,500 / month",
  "$2,500 – $5,000 / month",
  "$5,000 – $15,000 / month",
  "$15,000+ / month",
  "Not sure yet",
];

const fieldClass =
  "w-full rounded-xl border border-ink-line bg-ink px-4 py-3 text-base text-bone placeholder:text-ash/60 focus:border-brand focus:outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialEnquiryState,
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
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" error={state.fieldErrors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Alex Rivera"
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
            className={fieldClass}
          />
        </Field>

        <Field label="Monthly budget" name="budget" optional>
          <select
            id="budget"
            name="budget"
            defaultValue=""
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
