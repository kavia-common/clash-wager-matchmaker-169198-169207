import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
/**
 * SearchFilters renders crown-based filters for matchmaking.
 * Props:
 *  - initial: { crownMin?: number, crownMax?: number }
 *  - onChange: (filters) => void
 */
export default function SearchFilters({ initial = {}, onChange }) {
  const [crownMin, setCrownMin] = useState(initial.crownMin ?? 0);
  const [crownMax, setCrownMax] = useState(initial.crownMax ?? 8000);

  useEffect(() => {
    onChange && onChange({ crownMin: Number(crownMin), crownMax: Number(crownMax) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crownMin, crownMax]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Min Crowns</label>
          <input
            style={styles.input}
            type="number"
            min={0}
            max={10000}
            value={crownMin}
            onChange={(e) => setCrownMin(e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Max Crowns</label>
          <input
            style={styles.input}
            type="number"
            min={0}
            max={10000}
            value={crownMax}
            onChange={(e) => setCrownMax(e.target.value)}
          />
        </div>
      </div>
      <div style={styles.helper}>Filter lobbies and players by crowns/trophies to match similar skill.</div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  row: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 },
  field: { display: "flex", flexDirection: "column" },
  label: { fontSize: 12, color: "#6b7280", marginBottom: 6 },
  input: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 14,
  },
  helper: { marginTop: 8, color: "#6b7280", fontSize: 12 },
};
