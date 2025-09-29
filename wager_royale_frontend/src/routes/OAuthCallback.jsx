import React, { useEffect, useState } from "react";
import { Card, Toast } from "../components/UI";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * OAuth callback placeholder: exchanges code for verification status via backend.
 */
export default function OAuthCallback() {
  const { setIsVerified, setCrProfile, setVerificationTokenAgeHours } = useAuth();
  const [message, setMessage] = useState("Processing verification...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    async function run() {
      // Placeholder: call backend /cr/verify?code=...
      await new Promise((r) => setTimeout(r, 500));
      // Fake success
      setIsVerified(true);
      setCrProfile({ name: "Barbarian", tag: "#ABC123", crowns: 5400 });
      setVerificationTokenAgeHours(0);
      setMessage("Account linked! You can now access core features.");
    }
    if (code) run();
    else setMessage("Missing authorization code. Please retry the link flow.");
  }, [setCrProfile, setIsVerified, setVerificationTokenAgeHours]);

  return (
    <div className="container">
      <Card>
        <Toast kind="info" message={message} />
      </Card>
    </div>
  );
}
