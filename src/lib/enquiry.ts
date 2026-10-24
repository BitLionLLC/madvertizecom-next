export type EnquiryField =
  | "name"
  | "email"
  | "company"
  | "budget"
  | "interests"
  | "message";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<EnquiryField, string>>;
};

export const initialEnquiryState: EnquiryState = { status: "idle", message: "" };

/** Shared by the browser that mints the token and the server that checks it. */
export const RECAPTCHA_ACTION = "contact_enquiry";

/** Name of the hidden form field carrying the reCAPTCHA token. */
export const RECAPTCHA_FIELD = "recaptchaToken";
