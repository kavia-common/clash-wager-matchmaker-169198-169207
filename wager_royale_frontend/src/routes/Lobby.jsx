import React from "react";
import { Card, Button } from "../components/UI";

/**
 * PUBLIC_INTERFACE
 * Wager Lobby placeholder page.
 */
export default function Lobby() {
  const [msg, setMsg] = React.useState("");
  return (
    <div className="container">
      <div className="page-hero">
        <div className="text-title" style={{ fontSize: 18 }}>Wager Lobby</div>
        <span className="badge" style={{ background: "rgba(37,99,235,.12)", color: "#1e3a8a" }}>Live</span>
      </div>
      <Card>
        <div className="text-muted">Create or join a lobby. Funds are escrowed until the winner is verified.</div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <Button onClick={() => setMsg("Create lobby placeholder")}>Create Lobby</Button>
          <Button variant="ghost" onClick={() => setMsg("Join lobby placeholder")}>Join Lobby</Button>
        </div>
        {msg && <div style={{ marginTop: 10 }} className="text-muted">{msg}</div>}
      </Card>
    </div>
  );
}
