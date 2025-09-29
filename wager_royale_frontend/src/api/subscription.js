import createApiClient from "./client";

const api = createApiClient();

// PUBLIC_INTERFACE
/**
 * getBillingStatus fetches trial/subscription status for the current user.
 * Returns: { trialEndsAt?: string, isTrialActive: boolean, isSubscribed: boolean }
 */
export async function getBillingStatus() {
  return api.request("/billing/status", { method: "GET" });
}

// PUBLIC_INTERFACE
/**
 * startTrial starts a 7-day free trial for the current user.
 * Returns billing status.
 */
export async function startTrial() {
  return api.request("/billing/start-trial", { method: "POST" });
}

// PUBLIC_INTERFACE
/**
 * createCheckoutSession creates a checkout session and returns a URL for redirect.
 * Returns: { url: string }
 */
export async function createCheckoutSession() {
  return api.request("/billing/checkout-session", { method: "POST" });
}

// PUBLIC_INTERFACE
/**
 * verifyCheckout verifies a completed checkout session.
 * @param {string} sessionId - The payment session id from provider redirect.
 */
export async function verifyCheckout(sessionId) {
  const params = new URLSearchParams({ session_id: sessionId });
  return api.request(`/billing/verify-session?${params.toString()}`, { method: "GET" });
}
