import React from "react";
import { Card, Button, Toast } from "../components/UI";

/**
 * PUBLIC_INTERFACE
 * Wallet page placeholder with payment scaffolding.
 */
export default function Wallet() {
  const [msg, setMsg] = React.useState("");
  return (
    <div className="container">
      <div className="page-hero">
        <div className="text-title" style={{ fontSize: 18 }}>Wallet</div>
        <span className="badge" style={{ background: "rgba(37,99,235,.12)", color: "#1e3a8a" }}>Payments</span>
      </div>
      <Card>
        <div className="text-muted">
          Deposit and withdraw funds securely. Integrate provider on backend; this page uses API placeholders.
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <Button onClick={() => setMsg("Deposit flow placeholder (Stripe/processor)")}>Deposit</Button>
          <Button variant="ghost" onClick={() => setMsg("Withdraw flow placeholder")}>Withdraw</Button>
        </div>
        <div style={{ marginTop: 12 }}>
          <Toast message={msg} />
        </div>
      </Card>
    </div>
  );
}
