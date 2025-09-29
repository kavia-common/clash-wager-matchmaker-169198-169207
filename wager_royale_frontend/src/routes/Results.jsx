import React from "react";
import { Card } from "../components/UI";

/**
 * PUBLIC_INTERFACE
 * Results page placeholder.
 */
export default function Results() {
  const sample = [
    { id: "m1", opponent: "PlayerA", crowns: 5300, outcome: "Won", amount: 10 },
    { id: "m2", opponent: "PlayerB", crowns: 5600, outcome: "Lost", amount: -5 },
  ];
  return (
    <div className="container">
      <div className="page-hero">
        <div className="text-title" style={{ fontSize: 18 }}>Results</div>
        <span className="badge" style={{ background: "rgba(245,158,11,.15)", color: "#7c2d12" }}>History</span>
      </div>
      <Card>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {sample.map((r) => {
            return (
              <li
                key={r.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--ocean-border)",
                }}
              >
                <span>{r.id}</span>
                <span>{r.opponent}</span>
                <span>{r.crowns} crowns</span>
                <span style={{ color: r.amount >= 0 ? "#065f46" : "#7f1d1d" }}>
                  {r.outcome} ({r.amount >= 0 ? "+" : ""}{r.amount})
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
```

````write file="clash-wager-matchmaker-169198-169207/wager_royale_frontend/src/routes/Profile.jsx"
import React from "react";
import { Card, Button } from "../components/UI";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Profile page placeholder.
 */
export default function Profile() {
  const { user, isVerified, crProfile } = useAuth();
  return (
    <div className="container">
      <div className="page-hero">
        <div className="text-title" style={{ fontSize: 18 }}>Profile</div>
        <span className={`badge ${isVerified ? "badge-green" : "badge-red"}`}>{isVerified ? "Verified" : "Not Verified"}</span>
      </div>
      <Card>
        <div><strong>User:</strong> {user?.email || "anonymous"}</div>
        <div style={{ marginTop: 8 }}>
          <strong>Clash Royale:</strong>{" "}
          {isVerified && crProfile ? `${crProfile.name} (${crProfile.tag})` : "Not linked"}
        </div>
        <div style={{ marginTop: 12 }}>
          <Button onClick={() => (window.location.href = "/clash-link")}>Manage Verification</Button>
        </div>
      </Card>
    </div>
  );
}
