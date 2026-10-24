import { RECAPTCHA_ACTION } from "@/lib/enquiry";

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const DEFAULT_MIN_SCORE = 0.5;

type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
};

export type VerifyResult =
  | { ok: true; score: number | null }
  | { ok: false; reason: string };

/**
 * Both keys are needed for the check to mean anything: without the site key the
 * browser cannot mint a token, and without the secret the server cannot judge
 * one.
 */
export function isRecaptchaConfigured() {
  return Boolean(
    process.env.RECAPTCHA_SECRET_KEY &&
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  );
}

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
    // The whole payload, because the error code alone rarely says enough:
    // `hostname` shows which origin Google saw, which is the usual culprit.
    return { ok: false, reason: `rejected ${JSON.stringify(payload)}` };
  }

  // A token minted for another action would mean it was lifted from elsewhere.
  if (payload.action && payload.action !== RECAPTCHA_ACTION) {
    return { ok: false, reason: `unexpected action "${payload.action}"` };
  }

  const parsedMin = Number(process.env.RECAPTCHA_MIN_SCORE);
  const minScore = Number.isFinite(parsedMin) ? parsedMin : DEFAULT_MIN_SCORE;
  const score = typeof payload.score === "number" ? payload.score : null;

  if (score !== null && score < minScore) {
    return { ok: false, reason: `score ${score} below threshold ${minScore}` };
  }

  return { ok: true, score };
}
