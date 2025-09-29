import React from "react";
import { Card, Button } from "../components/UI";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Profile page showing user info and verification status.
 */
export default function Profile() {
  const { user, isVerified, crProfile } = useAuth();
  return (
    <div className="container">
      <div className="page-hero">
        <div className="text-title" style={{ fontSize: 18 }}>Profile</div>
        <span className={`badge ${isVerified ? "badge-green" : "badge-red"}`}>
          {isVerified ? "Verified" : "Not Verified"}
        </span>
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
