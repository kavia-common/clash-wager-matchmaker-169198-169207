import React from "react";
import ClashLinkStatus from "../components/ClashLinkStatus";
import { Card, Button } from "../components/UI";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Clash Royale account link/verification flow placeholder page.
 */
export default function ClashLink() {
  const { isVerified } = useAuth();
  function startLink() {
    // In a real app, kick off OAuth/device login and redirect to /oauth/callback
    const site = process.env.REACT_APP_SITE_URL || window.location.origin;
    alert(`Start CR link flow via backend. Redirect back to: ${site}/oauth/callback`);
  }

  return (
    <div className="container">
      <div className="page-hero">
        <div className="text-title" style={{ fontSize: 18 }}>Link Clash Royale</div>
        <span className={`badge ${isVerified ? "badge-green" : "badge-red"}`}>{isVerified ? "Verified" : "Not Linked"}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <ClashLinkStatus />
        <Card>
          <div className="text-title">Get Verified</div>
          <div className="text-muted" style={{ marginTop: 6 }}>
            Verification is required to use matchmaking, lobbies, and wagers.
          </div>
          <div style={{ marginTop: 12 }}>
            <Button onClick={startLink}>Begin Link Flow</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
