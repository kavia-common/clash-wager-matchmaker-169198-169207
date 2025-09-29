import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ClashLinkStatus from "../components/ClashLinkStatus";
import SearchFilters from "../components/SearchFilters";
import TrialBanner from "../components/TrialBanner";

/**
 * PUBLIC_INTERFACE
 * Matchmaking page
 * - Enforces gating: requires verified CR account and active trial/subscription.
 * - Displays crowns-based matchmaking filters and sample results list (placeholder).
 */
export default function Matchmaking() {
  const { requireVerified, requireEntitlement } = useAuth();

  const [filters, setFilters] = useState(() => readFiltersFromQuery());
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const canAccess = requireVerified() && requireEntitlement();

  useEffect(() => {
    writeFiltersToQuery(filters);
  }, [filters]);

  useEffect(() => {
    if (!canAccess) return;
    setLoading(true);
    // TODO: Replace with real API call to /matchmaking/search?crownMin=...&crownMax=...
    const timer = setTimeout(() => {
      // Sample mock
      const sample = [
        { id: "l1", name: "PlayerA", crowns: 5200 },
        { id: "l2", name: "PlayerB", crowns: 5600 },
        { id: "l3", name: "PlayerC", crowns: 6100 },
      ].filter((x) => x.crowns >= filters.crownMin && x.crowns <= filters.crownMax);
      setResults(sample);
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [filters, canAccess]);

  const content = useMemo(() => {
    if (!requireVerified()) {
      return (
        <div>
          <ClashLinkStatus />
          <div style={styles.blocker}>
            Verify your Clash Royale account to access matchmaking.
          </div>
        </div>
      );
    }
    if (!requireEntitlement()) {
      return (
        <div>
          <TrialBanner onSubscribe={() => (window.location.href = "/subscription")} />
          <div style={styles.blocker}>
            Your trial has ended. Subscribe to continue matchmaking.
          </div>
        </div>
      );
    }
    return (
      <div>
        <TrialBanner onSubscribe={() => (window.location.href = "/subscription")} />
        <div style={styles.grid}>
          <div>
            <SearchFilters
              initial={filters}
              onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))}
            />
          </div>
          <div>
            <div style={styles.card}>
              <div style={styles.headerRow}>
                <span style={styles.title}>Nearby Lobbies</span>
              </div>
              {loading ? (
                <div style={styles.muted}>Loading...</div>
              ) : results.length === 0 ? (
                <div style={styles.muted}>No lobbies found for selected crown range.</div>
              ) : (
                <ul style={styles.list}>
                  {results.map((r) => (
                    <li key={r.id} style={styles.listItem}>
                      <div>
                        <div style={styles.name}>{r.name}</div>
                        <div style={styles.subtext}>Crowns: {r.crowns}</div>
                      </div>
                      <button
                        style={styles.join}
                        onClick={() => alert(`Join lobby ${r.name} (${r.crowns})`)}
                      >
                        Join
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }, [filters, results, loading, requireVerified, requireEntitlement]);

  return <div style={styles.container}>{content}</div>;
}

function readFiltersFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const crownMin = Number(params.get("crownMin")) || 0;
  const crownMax = Number(params.get("crownMax")) || 8000;
  return { crownMin, crownMax };
}

function writeFiltersToQuery(filters) {
  const params = new URLSearchParams(window.location.search);
  params.set("crownMin", filters.crownMin);
  params.set("crownMax", filters.crownMax);
  const url = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", url);
}

const styles = {
  container: { maxWidth: 980, margin: "24px auto", padding: "0 16px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: 16,
    marginTop: 12,
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  headerRow: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  title: { fontWeight: 700, color: "#111827" },
  muted: { color: "#6b7280" },
  list: { listStyle: "none", margin: 0, padding: 0 },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #e5e7eb",
    padding: "10px 12px",
    borderRadius: 10,
    marginBottom: 8,
  },
  name: { fontWeight: 600, color: "#111827" },
  subtext: { color: "#6b7280", fontSize: 12 },
  join: {
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 12px",
    cursor: "pointer",
  },
  blocker: {
    marginTop: 12,
    background: "#fee2e2",
    border: "1px solid #fecaca",
    color: "#7f1d1d",
    borderRadius: 12,
    padding: 12,
  },
};
