import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/UI";
import TrialBanner from "../components/TrialBanner";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Home page with themed hero and quick entry points.
 */
export default function Home() {
  const { requireEntitlement } = useAuth();
  return (
    <div className="container">
      <div className="page-hero">
        <div className="text-title" style={{ fontSize: 22 }}>
          Welcome to Wager Royale
        </div>
        <span className="badge" style={{ background: "rgba(37,99,235,.12)", color: "#1e3a8a" }}>
          Ocean Professional
        </span>
      </div>
      {!requireEntitlement() && (
        <TrialBanner onSubscribe={() => (window.location.href = "/subscription")} />
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <Card>
          <div className="text-title">Find a Match</div>
          <div className="text-muted" style={{ marginTop: 6 }}>
            Match with similar crown players and start a wager lobby.
          </div>
          <div style={{ marginTop: 10 }}>
            <Link className="btn btn-primary" to="/matchmaking">Go to Matchmaking</Link>
          </div>
        </Card>
        <Card>
          <div className="text-title">Manage Subscription</div>
          <div className="text-muted" style={{ marginTop: 6 }}>
            Start your free 7-day trial or subscribe for $13/month.
          </div>
          <div style={{ marginTop: 10 }}>
            <Link className="btn btn-secondary" to="/subscription">Subscription</Link>
          </div>
        </Card>
        <Card>
          <div className="text-title">Link Clash Royale</div>
          <div className="text-muted" style={{ marginTop: 6 }}>
            Verify your account to unlock matchmaking and wagers.
          </div>
          <div style={{ marginTop: 10 }}>
            <Link className="btn btn-ghost" to="/clash-link">Link Account</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
