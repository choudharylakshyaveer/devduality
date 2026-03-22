import { useState } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

/* ─────────────────────────────────────────────────────────────────────────────
   AdminLogin
   Checks username + password against the Firestore "admins" collection.
   No credentials are hardcoded here — everything lives in your database.
───────────────────────────────────────────────────────────────────────────── */
export function AdminLogin({ onSuccess, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic empty-field check
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      // Query Firestore: find a document where username matches
      const q = query(
        collection(db, "admins"),
        where("username", "==", username.trim())
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        // No matching username found
        setError("Invalid username or password.");
        setLoading(false);
        return;
      }

      // Check password against the first matching document
      const adminDoc = snap.docs[0].data();

      if (adminDoc.password === password) {
        // ✅ Credentials match — allow in
        onSuccess({ id: snap.docs[0].id, ...adminDoc });
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Firestore auth error:", err);
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f5f3f3",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "2rem", fontFamily: "'Manrope', sans-serif",
    }}>

      {/* Back link */}
      <button onClick={onBack} style={{
        position: "absolute", top: "1.5rem", left: "1.5rem",
        display: "flex", alignItems: "center", gap: "0.4rem",
        background: "none", border: "none", cursor: "pointer",
        fontSize: "0.78rem", fontWeight: 600,
        color: "#546066", fontFamily: "'Manrope', sans-serif",
        transition: "color 0.2s",
      }}
        onMouseEnter={(e) => e.currentTarget.style.color = "#735c00"}
        onMouseLeave={(e) => e.currentTarget.style.color = "#546066"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to Portfolio
      </button>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "400px",
        background: "#fff", borderRadius: "20px",
        border: "1px solid rgba(27,28,28,0.07)",
        boxShadow: "0 20px 60px rgba(27,28,28,0.08)",
        padding: "2.5rem",
        animation: "fadeInScale 0.35s ease both",
      }}>

        {/* Logo mark */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "14px",
            background: "#735c00",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            marginBottom: "1rem",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "1.35rem", fontWeight: 800,
            color: "#1b1c1c", marginBottom: "0.25rem",
          }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: "0.78rem", color: "#546066" }}>
            Sign in to view inquiry submissions
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

          {/* Username */}
          <div>
            <label style={{
              display: "block", fontSize: "0.65rem", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#546066", marginBottom: "0.5rem",
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              autoFocus
              required
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={{
                width: "100%", boxSizing: "border-box",
                background: "#f5f3f3", border: "1px solid transparent",
                borderRadius: "10px", padding: "0.85rem 1rem",
                fontFamily: "'Manrope', sans-serif", fontSize: "0.875rem",
                color: "#1b1c1c", outline: "none", transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#735c00"}
              onBlur={(e)  => e.target.style.borderColor = "transparent"}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: "block", fontSize: "0.65rem", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#546066", marginBottom: "0.5rem",
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "#f5f3f3", border: "1px solid transparent",
                  borderRadius: "10px", padding: "0.85rem 3rem 0.85rem 1rem",
                  fontFamily: "'Manrope', sans-serif", fontSize: "0.875rem",
                  color: "#1b1c1c", outline: "none", transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#735c00"}
                onBlur={(e)  => e.target.style.borderColor = "transparent"}
              />
              {/* Show / hide toggle */}
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: "absolute", right: "0.75rem", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#9ca3af", padding: "4px", lineHeight: 1,
                }}
              >
                {showPwd
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                }
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca",
              borderRadius: "8px", padding: "0.7rem 1rem",
              fontSize: "0.78rem", color: "#dc2626",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#735c00", color: "#fff",
              border: "none", borderRadius: "10px",
              padding: "1rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: "0.875rem",
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "opacity 0.2s, transform 0.15s",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "0.5rem",
              marginTop: "0.25rem",
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {loading
              ? <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff"
                    strokeWidth="2.5" strokeLinecap="round"
                    style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Verifying…
                </>
              : "Sign In →"
            }
          </button>

        </form>
      </div>

      {/* Scoped keyframes */}
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}