import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Matchmaking from "./routes/Matchmaking";
import Subscription from "./routes/Subscription";

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
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <div style={{ marginBottom: 16 }}>
          <nav style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link className="App-link" to="/matchmaking">Matchmaking</Link>
            <Link className="App-link" to="/subscription">Subscription</Link>
          </nav>
        </div>

        <AuthProvider>
          <Routes>
            <Route path="/" element={<Matchmaking />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route path="/subscription" element={<Subscription />} />
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
