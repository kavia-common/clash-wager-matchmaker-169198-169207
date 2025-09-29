import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getBillingStatus } from "../api/subscription";

// PUBLIC_INTERFACE
/**
 * AuthContext holds authentication, Clash Royale verification, and billing states.
 * This is a scaffold; wire real backend calls where noted.
 */
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  // Authentication placeholder
  const [user, setUser] = useState(null); // { id, email, ... }

  // Clash Royale verification placeholder (to be fetched from backend)
  const [isVerified, setIsVerified] = useState(false);
  const [verificationTokenAgeHours, setVerificationTokenAgeHours] = useState(null);
  const [crProfile, setCrProfile] = useState(null); // { tag, name, crowns, trophies }

  // Billing status
  const [billing, setBilling] = useState({
    isTrialActive: false,
    isSubscribed: false,
    trialEndsAt: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder boot logic:
    // 1. Fetch current user (TODO: integrate auth)
    // 2. Fetch CR verification + profile
    // 3. Fetch billing status
    async function boot() {
      setLoading(true);
      try {
        // TODO: Replace with actual auth check
        const fakeUser = { id: "anon", email: "user@example.com" };
        setUser(fakeUser);

        // TODO: Replace with /cr/status and /cr/profile calls
        // Temporary hardcoded values for scaffolding
        setIsVerified(false);
        setVerificationTokenAgeHours(null);
        setCrProfile(null);

        const bs = await safeGetBillingStatus();
        if (bs) setBilling(bs);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Auth boot error", e);
      } finally {
        setLoading(false);
      }
    }
    boot();
  }, []);

  async function safeGetBillingStatus() {
    try {
      return await getBillingStatus();
    } catch (e) {
      // Non-fatal: backend not wired yet
      return {
        isTrialActive: false,
        isSubscribed: false,
        trialEndsAt: null,
      };
    }
  }

  // PUBLIC_INTERFACE
  /**
   * requireVerified returns true if the user has a verified CR account.
   */
  function requireVerified() {
    return Boolean(isVerified);
  }

  // PUBLIC_INTERFACE
  /**
   * requireEntitlement returns true if user has access via trial or subscription.
   */
  function requireEntitlement() {
    return Boolean(billing.isTrialActive || billing.isSubscribed);
  }

  const value = useMemo(
    () => ({
      user,
      setUser,
      isVerified,
      setIsVerified,
      verificationTokenAgeHours,
      setVerificationTokenAgeHours,
      crProfile,
      setCrProfile,
      billing,
      setBilling,
      loading,
      requireVerified,
      requireEntitlement,
    }),
    [
      user,
      isVerified,
      verificationTokenAgeHours,
      crProfile,
      billing,
      loading,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
