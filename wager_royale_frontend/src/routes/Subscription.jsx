import React, { useEffect, useState } from "react";
import { createCheckoutSession, startTrial, verifyCheckout } from "../api/subscription";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Subscription page to manage free trial and subscription checkout flow.
 */
export default function Subscription() {
  const { billing, setBilling } = useAuth();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Handle payment provider redirect verification (if applicable)
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (sessionId) {
      (async () => {
        try {
          setBusy(true);
          const status = await verifyCheckout(sessionId);
          if (status) setBilling(status);
          setMessage("Subscription verified. Thank you!");
        } catch (e) {
          setMessage("Unable to verify subscription. Please contact support.");
        } finally {
          setBusy(false);
        }
      })();
    }
  }, [setBilling]);

  async function onStartTrial() {
    setMessage("");
    try {
      setBusy(true);
      const status = await startTrial();
      if (status) setBilling(status);
      setMessage("Trial started!");
    } catch (e) {
      setMessage(e?.data?.message || "Unable to start trial.");
    } finally {
      setBusy(false);
    }
  }

  async function onSubscribe() {
    setMessage("");
    try {
      setBusy(true);
      const { url } = await createCheckoutSession();
      if (url) {
        window.location.href = url;
      } else {
        setMessage("No checkout URL returned. Please try again.");
      }
    } catch (e) {
      setMessage(e?.data?.message || "Unable to create checkout session.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="text-title" style={{ fontSize: 18 }}>Manage Subscription</div>
        <div className="text-muted" style={{ marginTop: 4, marginBottom: 14 }}>
          Access core features with an active trial or a $13/month subscription.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 12 }} className="text-muted">Trial</div>
            <div style={{ fontWeight: 600 }}>
              {billing.isTrialActive
                ? `Active until ${billing.trialEndsAt ? new Date(billing.trialEndsAt).toLocaleString() : "—"}`
                : "Not active"}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12 }} className="text-muted">Subscription</div>
            <div style={{ fontWeight: 600 }}>{billing.isSubscribed ? "Active" : "Not active"}</div>
          </div>
        </div>

        {!billing.isSubscribed && (
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            {!billing.isTrialActive && (
              <button disabled={busy} className="btn btn-secondary" onClick={onStartTrial}>
                Start 7-day Free Trial
              </button>
            )}
            <button disabled={busy} className="btn btn-primary" onClick={onSubscribe}>
              Subscribe $13/month
            </button>
          </div>
        )}

        {message && <div className="card" style={{ marginTop: 12, background: "var(--ocean-background)" }}>{message}</div>}
      </div>
    </div>
  );
}
