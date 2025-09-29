import React from "react";

// PUBLIC_INTERFACE
/** Button component with variants: primary, secondary, ghost */
export function Button({ variant = "primary", children, ...props }) {
  const cls =
    variant === "secondary"
      ? "btn btn-secondary"
      : variant === "ghost"
      ? "btn btn-ghost"
      : "btn btn-primary";
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

// PUBLIC_INTERFACE
/** Card surface */
export function Card({ className = "", style = {}, children }) {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}

// PUBLIC_INTERFACE
/** Modal overlay */
export function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div style={overlayStyle} role="dialog" aria-modal="true">
      <div className="card" style={{ width: 520, maxWidth: "92vw" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="text-title">{title}</div>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        <div style={{ marginTop: 10 }}>{children}</div>
        {footer && <div style={{ marginTop: 12 }}>{footer}</div>}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  zIndex: 50,
};

// PUBLIC_INTERFACE
/** Toast lightweight notification */
export function Toast({ kind = "info", message }) {
  if (!message) return null;
  const color =
    kind === "error"
      ? "#7f1d1d"
      : kind === "success"
      ? "#065f46"
      : "#1f2937";
  const bg =
    kind === "error"
      ? "rgba(239,68,68,.15)"
      : kind === "success"
      ? "rgba(16,185,129,.15)"
      : "rgba(37,99,235,.10)";
  return (
    <div style={{ padding: "10px 12px", background: bg, color, borderRadius: 10 }}>
      {message}
    </div>
  );
}

// PUBLIC_INTERFACE
/** Loader */
export function Loader({ label = "Loading..." }) {
  return (
    <div className="card" style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>
      <span role="img" aria-label="spinner">🔄</span>
      <span>{label}</span>
    </div>
  );
}
