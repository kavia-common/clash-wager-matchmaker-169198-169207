import React, { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./UI";

// PUBLIC_INTERFACE
/**
 * TrialBanner shows the user's trial status and prompts subscription when needed.
 * It does not enforce gating by itself; parent pages should block interactions if entitlement missing.
 */
export default function TrialBanner({ onSubscribe }) {
  const { billing } = useAuth();

  const { label, isActive } = useMemo(() => {
    if (billing.isSubscribed) {
      return { label: "You are subscribed to the $13/month plan.", isActive: true };
    }
    if (billing.isTrialActive) {
      const ends = billing.trialEndsAt ? new Date(billing.trialEndsAt) : null;
      const remaining = ends ? formatRemaining(ends) : "Trial active";
      return { label: `Free trial active: ${remaining}`, isActive: true };
    }
    return { label: "Your free trial has ended. Subscribe to continue.", isActive: false };
  }, [billing]);

  return (
    <div className="banner">
      <div>{label}</div>
      {!billing.isSubscribed && (
        <Button onClick={onSubscribe}>
          {billing.isTrialActive ? "Manage Subscription" : "Subscribe $13/month"}
        </Button>
      )}
    </div>
  );
}

function formatRemaining(ends) {
  const now = new Date();
  const ms = ends.getTime() - now.getTime();
  if (ms <= 0) return "ending soon";
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}h remaining`;
}
