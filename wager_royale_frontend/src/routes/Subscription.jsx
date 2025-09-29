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
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>Manage Subscription</div>
        <div style={styles.muted}>
          Access core features with an active trial or a $13/month subscription.
        </div>
        <div style={styles.status}>
          <div>
            <div style={styles.label}>Trial</div>
            <div style={styles.value}>
              {billing.isTrialActive
                ? `Active until ${billing.trialEndsAt ? new Date(billing.trialEndsAt).toLocaleString() : "—"}`
                : "Not active"}
            </div>
          </div>
          <div>
            <div style={styles.label}>Subscription</div>
            <div style={styles.value}>{billing.isSubscribed ? "Active" : "Not active"}</div>
          </div>
        </div>

        {!billing.isSubscribed && (
          <div style={styles.actions}>
            {!billing.isTrialActive && (
              <button disabled={busy} style={styles.secondary} onClick={onStartTrial}>
                Start 7-day Free Trial
              </button>
            )}
            <button disabled={busy} style={styles.primary} onClick={onSubscribe}>
              Subscribe $13/month
            </button>
          </div>
        )}

        {message && <div style={styles.message}>{message}</div>}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 720, margin: "24px auto", padding: "0 16px" },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  title: { fontWeight: 700, color: "#111827", fontSize: 18 },
  muted: { color: "#6b7280", marginTop: 4, marginBottom: 14 },
  status: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 12 },
  label: { fontSize: 12, color: "#6b7280" },
  value: { fontWeight: 600, color: "#111827" },
  actions: { display: "flex", gap: 10, marginTop: 10 },
  primary: {
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 14px",
    cursor: "pointer",
  },
  secondary: {
    background: "#F59E0B",
    color: "#111827",
    border: "none",
    borderRadius: 10,
    padding: "10px 14px",
    cursor: "pointer",
  },
  message: {
    marginTop: 12,
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "8px 10px",
    color: "#111827",
  },
};
