import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Matchmaking from "./routes/Matchmaking";
import Subscription from "./routes/Subscription";
import Home from "./routes/Home";
import Wallet from "./routes/Wallet";
import Profile from "./routes/Profile";
import Results from "./routes/Results";
import Lobby from "./routes/Lobby";
import ClashLink from "./routes/ClashLink";
import OAuthCallback from "./routes/OAuthCallback";

// Simple protected route wrapper for gating (verified + entitlement)
function Protected({ requireVerified = false, requireEntitlement = false, children }) {
  const auth = useAuth();
  if (!auth || auth.loading) {
    return <div className="container"><div className="card">Loading...</div></div>;
  }
  if (requireVerified && !auth.requireVerified()) {
    return <Navigate to="/clash-link" replace />;
  }
  if (requireEntitlement && !auth.requireEntitlement()) {
    return <Navigate to="/subscription" replace />;
  }
  return children;
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="nav-inner">
            <div className="brand">
              <span className="brand-badge">$</span>
              <span>Wager Royale</span>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/matchmaking">Matchmaking</Link>
              <Link to="/lobby">Wager Lobby</Link>
              <Link to="/wallet">Wallet</Link>
              <Link to="/results">Results</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/subscription">Subscription</Link>
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </div>
          </div>
        </nav>

        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/matchmaking"
              element={
                <Protected requireVerified requireEntitlement>
                  <Matchmaking />
                </Protected>
              }
            />
            <Route
              path="/lobby"
              element={
                <Protected requireVerified requireEntitlement>
                  <Lobby />
                </Protected>
              }
            />
            <Route
              path="/wallet"
              element={
                <Protected requireVerified requireEntitlement>
                  <Wallet />
                </Protected>
              }
            />
            <Route
              path="/results"
              element={
                <Protected requireVerified requireEntitlement>
                  <Results />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route path="/clash-link" element={<ClashLink />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
          </Routes>
        </AuthProvider>
      </header>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
