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

/** Name of the hidden form field carrying the reCAPTCHA token. */
export const RECAPTCHA_FIELD = "recaptchaToken";
