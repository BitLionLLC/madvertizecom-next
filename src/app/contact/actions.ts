"use server";

import { services } from "@/content/site";
import type { EnquiryState } from "@/lib/enquiry";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const serviceNames = new Set(services.map((service) => service.name));

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const interests = formData
    .getAll("interests")
    .map(String)
    .filter((value) => serviceNames.has(value));

  const fieldErrors: NonNullable<EnquiryState["fieldErrors"]> = {};

  if (name.length < 2) {
    fieldErrors.name = "Please tell us your name.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Please enter an email we can reply to.";
  }
  if (message.length < 20) {
    fieldErrors.message =
      "A couple of sentences about what you are trying to sell helps us prepare.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  // Delivery is not wired up yet. Swap this for your email service, CRM or
  // database write — the validated payload below is everything the form knows.
  console.info("[madvertize] new enquiry", {
    name,
    email,
    company,
    budget,
    interests,
    message,
  });

  return {
    status: "success",
    message:
      "Thanks — your brief is in. We reply to every enquiry within one business day.",
  };
}
