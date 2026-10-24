"use server";

import { services } from "@/content/site";
import { RECAPTCHA_FIELD, type EnquiryState } from "@/lib/enquiry";
import { isMailConfigured, sendEnquiryEmail } from "@/lib/mail";
import { isRecaptchaConfigured, verifyRecaptcha } from "@/lib/recaptcha";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const serviceNames = new Set(services.map((service) => service.name));

const SUCCESS_MESSAGE =
  "Thanks — your brief is in. We reply to every enquiry within one business day.";

const FAILURE_MESSAGE =
  "Something went wrong sending that. Please email miru@madvertize.com directly.";

const UNVERIFIED_MESSAGE =
  "We could not verify that submission. Please try again, or email miru@madvertize.com directly.";

export async function submitEnquiry(
  formData: FormData,
): Promise<EnquiryState> {
  // Hidden field; only a bot fills it in.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

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

  if (isRecaptchaConfigured()) {
    const token = String(formData.get(RECAPTCHA_FIELD) ?? "");
    const verdict = await verifyRecaptcha(token);

    if (!verdict.ok) {
      console.warn("[madvertize] reCAPTCHA rejected a submission:", verdict.reason);
      return { status: "error", message: UNVERIFIED_MESSAGE };
    }
  } else {
    // The honeypot still applies. Failing closed here would take the contact
    // form down entirely whenever the keys are missing, which is worse than
    // accepting unverified enquiries.
    console.warn("[madvertize] reCAPTCHA not configured — submission unverified");
  }

  const enquiry = { name, email, company, budget, interests, message };

  if (!isMailConfigured()) {
    // Local development without SMTP credentials: log it so the flow can be
    // exercised end to end. Production without credentials is a misconfigured
    // deploy, and silently dropping an enquiry there would be worse than
    // telling the sender to email directly.
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[madvertize] SMTP not configured — enquiry logged instead of sent:",
        enquiry,
      );
      return { status: "success", message: SUCCESS_MESSAGE };
    }

    console.error("[madvertize] SMTP not configured; enquiry not delivered");
    return { status: "error", message: FAILURE_MESSAGE };
  }

  try {
    await sendEnquiryEmail(enquiry);
  } catch (error) {
    console.error("[madvertize] failed to send enquiry", error);
    return { status: "error", message: FAILURE_MESSAGE };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
