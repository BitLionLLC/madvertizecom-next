const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

type SiteVerifyResponse = {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
};

export type VerifyResult = { ok: true } | { ok: false; reason: string };

/**
 * Both keys are needed for the check to mean anything: without the site key the
 * browser cannot render the checkbox, and without the secret the server cannot
 * judge the token it produces.
 */
export function isRecaptchaConfigured() {
  return Boolean(
    process.env.RECAPTCHA_SECRET_KEY &&
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  );
}

/**
 * Checks a reCAPTCHA v2 checkbox token. v2 has no score and no action — a
 * token is either valid, already spent, expired, or from another site key.
 */
export async function verifyRecaptcha(token: string): Promise<VerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: false, reason: "no secret key configured" };
  if (!token) return { ok: false, reason: "no token submitted" };

  let payload: SiteVerifyResponse;
  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return { ok: false, reason: `siteverify returned ${response.status}` };
    }

    payload = (await response.json()) as SiteVerifyResponse;
  } catch (error) {
    return {
      ok: false,
      reason: `siteverify unreachable: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }

  if (!payload.success) {
    const codes = payload["error-codes"]?.join(", ");
    return { ok: false, reason: `rejected${codes ? `: ${codes}` : ""}` };
  }

  return { ok: true };
}
