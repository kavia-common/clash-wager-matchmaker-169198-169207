import React from "react";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
/**
 * ClashLinkStatus displays Clash Royale verification status and a CTA to link/verify.
 * This is a scaffold; implement the actual link flow with backend OAuth when available.
 */
export default function ClashLinkStatus() {
  const { isVerified, crProfile, verificationTokenAgeHours } = useAuth();

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.title}>Clash Royale Account Verification</span>
        <span style={{ ...styles.badge, background: isVerified ? "#16a34a" : "#ef4444" }}>
          {isVerified ? "Verified" : "Not Linked"}
        </span>
      </div>
      {isVerified && crProfile ? (
        <div style={styles.row}>
          <div>
            <div style={styles.label}>Player</div>
            <div style={styles.value}>
              {crProfile.name} ({crProfile.tag})
            </div>
          </div>
          <div>
            <div style={styles.label}>Crowns/Trophies</div>
            <div style={styles.value}>{crProfile.crowns ?? crProfile.trophies ?? "—"}</div>
          </div>
          <div>
            <div style={styles.label}>Token age</div>
            <div style={styles.value}>
              {verificationTokenAgeHours != null ? `${verificationTokenAgeHours}h` : "—"}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 12, color: "#374151" }}>
          Link your Clash Royale account to access matchmaking, lobbies, and wagers.
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <button style={styles.cta} onClick={() => alert("Implement CR link flow with backend")}>
          {isVerified ? "Re-link / Refresh" : "Link Clash Royale Account"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  title: { fontWeight: 600, color: "#111827" },
  badge: {
    color: "#fff",
    borderRadius: 999,
    fontSize: 12,
    padding: "4px 10px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginTop: 12,
  },
  label: { fontSize: 12, color: "#6b7280" },
  value: { fontWeight: 600, color: "#111827" },
  cta: {
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 14px",
    cursor: "pointer",
  },
};
