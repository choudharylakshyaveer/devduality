import { useEffect, useState } from "react";
import { collection, serverTimestamp, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { fetchVisitStats } from "./visittracker";

/* ─────────────────────────────────────────────────────────────────────────────
   ADMIN — DASHBOARD (reads Firestore inquiries + visit stats)
───────────────────────────────────────────────────────────────────────────── */
export default function AdminDashboard({ onLogout, onGoHome }) {
  const [inquiries,  setInquiries]  = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [search,     setSearch]     = useState("");
  const [filter,     setFilter]     = useState("all");
  const [expanded,   setExpanded]   = useState(null);
  const [resNotes,   setResNotes]   = useState({});
  const [resolving,  setResolving]  = useState({});
  const [visitStats, setVisitStats] = useState(null);   // { totalVisits, uniqueVisits }

  // ── Fetch inquiries ──────────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setInquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        try {
          const snap = await getDocs(collection(db, "inquiries"));
          setInquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch (err2) {
          setError(err2.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Fetch visit stats ────────────────────────────────────────────────────
  useEffect(() => {
    fetchVisitStats().then(setVisitStats);
  }, []);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const fmtDate = (ts) => {
    if (!ts) return "—";
    try {
      const d = ts.toDate ? ts.toDate() : new Date(ts);
      return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch { return "—"; }
  };

  const handleResolve = async (e, id) => {
    e.stopPropagation();
    const note = (resNotes[id] || "").trim();
    setResolving((p) => ({ ...p, [id]: true }));
    try {
      await updateDoc(doc(db, "inquiries", id), {
        resolved:   true,
        resolution: note || "Marked as resolved.",
        resolvedAt: serverTimestamp(),
      });
      setInquiries((prev) =>
        prev.map((r) => r.id === id ? { ...r, resolved: true, resolution: note || "Marked as resolved." } : r)
      );
      setResNotes((p) => ({ ...p, [id]: "" }));
    } catch (err) {
      alert("Failed to update: " + err.message);
    } finally {
      setResolving((p) => ({ ...p, [id]: false }));
    }
  };

  const handleReopen = async (e, id) => {
    e.stopPropagation();
    setResolving((p) => ({ ...p, [id]: true }));
    try {
      await updateDoc(doc(db, "inquiries", id), {
        resolved:   false,
        resolution: "",
        resolvedAt: null,
      });
      setInquiries((prev) =>
        prev.map((r) => r.id === id ? { ...r, resolved: false, resolution: "" } : r)
      );
    } catch (err) {
      alert("Failed to reopen: " + err.message);
    } finally {
      setResolving((p) => ({ ...p, [id]: false }));
    }
  };

  const resolved = inquiries.filter((r) => r.resolved);
  const open     = inquiries.filter((r) => !r.resolved);

  const filtered = inquiries.filter((r) => {
    const s = search.toLowerCase();
    const matchSearch = !s || [r.name, r.email, r.message, r.resolution].some((f) => f?.toLowerCase().includes(s));
    const matchFilter = filter === "all" || (filter === "resolved" ? r.resolved : !r.resolved);
    return matchSearch && matchFilter;
  });

  // ── Shared style helpers ─────────────────────────────────────────────────
  const pill = (bg, color, children) => (
    <div style={{ background: bg, borderRadius: "20px", padding: "0.35rem 0.9rem", fontSize: "0.72rem", fontWeight: 700, color, display: "flex", alignItems: "center", gap: "0.35rem" }}>
      {children}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f3f3", fontFamily: "'Manrope', sans-serif" }}>

      {/* ── Top bar ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(27,28,28,0.07)", padding: "0.9rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 12px rgba(27,28,28,0.04)" }}>

        {/* Left — logo (click to go home) */}
<div
  onClick={onGoHome}
  title="Back to portfolio"
  style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}
  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
>
  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#735c00", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  </div>
  <div>
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#1b1c1c", display: "flex", alignItems: "center", gap: "0.4rem" }}>
      Admin Dashboard
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    </div>
    <div style={{ fontSize: "0.65rem", color: "#546066", letterSpacing: "0.06em" }}>Devduality — Inquiry Management</div>
  </div>
</div>

        {/* Right — stats + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>

          {/* ── Visit stats ── */}
          {visitStats !== null && (
            <>
              {pill("#f0f4ff", "#3b5bdb",
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {visitStats.totalVisits.toLocaleString()} Total Visits
                </>
              )}
              

              {/* Divider */}
              <div style={{ width: "1px", height: "22px", background: "rgba(27,28,28,0.08)", margin: "0 0.1rem" }} />
            </>
          )}

          {/* ── Inquiry stats ── */}
          {!loading && (
            <>
              {pill("#f5e9cc", "#735c00", <>{inquiries.length} Total</>)}
              {pill("#dcfce7", "#15803d", <>{resolved.length} Resolved</>)}
              {pill("#fef9c3", "#854d0e", <>{open.length} Open</>)}
            </>
          )}

          {/* Logout */}
          <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "1px solid rgba(27,28,28,0.1)", borderRadius: "8px", padding: "0.5rem 0.9rem", fontSize: "0.72rem", fontWeight: 600, color: "#546066", cursor: "pointer", fontFamily: "'Manrope', sans-serif", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#735c00"; e.currentTarget.style.color = "#735c00"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(27,28,28,0.1)"; e.currentTarget.style.color = "#546066"; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* ── Visit stats card (detailed view) ── */}
        {visitStats !== null && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>

            {/* Total visits card */}
            <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid rgba(27,28,28,0.07)", padding: "1.25rem 1.5rem", boxShadow: "0 2px 8px rgba(27,28,28,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b5bdb" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#546066" }}>Total Visits</span>
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#1b1c1c", lineHeight: 1 }}>
                {visitStats.totalVisits.toLocaleString()}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: "0.35rem" }}>All page loads</div>
            </div>


          </div>
        )}

        {/* ── Search + filter row ── */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"
              style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or message…"
              style={{ width: "100%", boxSizing: "border-box", background: "#fff", border: "1px solid rgba(27,28,28,0.08)", borderRadius: "12px", padding: "0.85rem 1rem 0.85rem 2.75rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.875rem", color: "#1b1c1c", outline: "none", boxShadow: "0 2px 8px rgba(27,28,28,0.04)", transition: "border-color 0.2s" }}
              onFocus={(e) => e.target.style.borderColor = "#735c00"}
              onBlur={(e)  => e.target.style.borderColor = "rgba(27,28,28,0.08)"}
            />
          </div>
          <div style={{ display: "flex", gap: "0.4rem", background: "#fff", border: "1px solid rgba(27,28,28,0.08)", borderRadius: "12px", padding: "0.35rem", boxShadow: "0 2px 8px rgba(27,28,28,0.04)" }}>
            {[["all", "All"], ["open", "Open"], ["resolved", "Resolved"]].map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)} style={{ padding: "0.45rem 0.9rem", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: "0.72rem", transition: "all 0.2s", background: filter === val ? (val === "resolved" ? "#dcfce7" : val === "open" ? "#fef9c3" : "#735c00") : "transparent", color: filter === val ? (val === "resolved" ? "#15803d" : val === "open" ? "#854d0e" : "#fff") : "#546066" }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#546066" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#735c00" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite", margin: "0 auto 1rem", display: "block" }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            <p style={{ fontSize: "0.875rem" }}>Loading inquiries from Firestore…</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", padding: "1.5rem", color: "#dc2626", fontSize: "0.875rem" }}>
            <strong>Error loading data:</strong> {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#9ca3af" }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d0c6b0" strokeWidth="1.5" strokeLinecap="round" style={{ margin: "0 auto 1rem", display: "block" }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <p style={{ fontSize: "0.875rem" }}>{search ? "No results match your search." : "No inquiries yet."}</p>
          </div>
        )}

        {/* Cards grid */}
        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
            {filtered.map((r, i) => {
              const isOpen     = expanded === r.id;
              const isResolved = !!r.resolved;
              const isSaving   = !!resolving[r.id];

              return (
                <div key={r.id}
                  onClick={() => setExpanded(isOpen ? null : r.id)}
                  style={{
                    background: isResolved ? "#f0fdf4" : "#fff",
                    borderRadius: "14px",
                    border: isResolved
                      ? `${isOpen ? "1.5px" : "1px"} solid ${isOpen ? "#16a34a" : "#bbf7d0"}`
                      : isOpen ? "1.5px solid #735c00" : "1px solid rgba(27,28,28,0.07)",
                    padding: "1.4rem", cursor: "pointer",
                    boxShadow: isResolved ? "0 4px 16px rgba(22,163,74,0.08)" : isOpen ? "0 6px 24px rgba(115,92,0,0.12)" : "0 2px 8px rgba(27,28,28,0.04)",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.boxShadow = isResolved ? "0 6px 20px rgba(22,163,74,0.14)" : "0 6px 20px rgba(27,28,28,0.1)"; }}
                  onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.boxShadow = isResolved ? "0 4px 16px rgba(22,163,74,0.08)" : "0 2px 8px rgba(27,28,28,0.04)"; }}
                >
                  {/* Card header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.9rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                      <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: isResolved ? "#dcfce7" : "#f5e9cc", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: isResolved ? "#15803d" : "#735c00" }}>
                        {isResolved
                          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          : (r.name || "?").charAt(0).toUpperCase()
                        }
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1b1c1c" }}>{r.name || "—"}</div>
                        <div style={{ fontSize: "0.72rem", color: isResolved ? "#15803d" : "#735c00", wordBreak: "break-all", marginTop: "1px" }}>{r.email || "—"}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem" }}>
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", background: "#f5f3f3", padding: "0.2rem 0.6rem", borderRadius: "6px" }}>
                        #{String(i + 1).padStart(3, "0")}
                      </span>
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "6px", background: isResolved ? "#dcfce7" : "#fef9c3", color: isResolved ? "#15803d" : "#854d0e" }}>
                        {isResolved ? "✓ Resolved" : "● Open"}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.8rem", color: "#546066", lineHeight: 1.65, marginBottom: "0.75rem", display: "-webkit-box", WebkitLineClamp: isOpen ? "none" : 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {r.message || "No message provided."}
                  </p>

                  {isOpen && (
                    <div onClick={(e) => e.stopPropagation()} style={{ marginTop: "0.75rem" }}>
                      {isResolved ? (
                        <div style={{ background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "1rem", marginBottom: "0.75rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#15803d" }}>Resolution Note</span>
                            {r.resolvedAt && <span style={{ fontSize: "0.62rem", color: "#4ade80" }}>{fmtDate(r.resolvedAt)}</span>}
                          </div>
                          <p style={{ fontSize: "0.82rem", color: "#166534", lineHeight: 1.6, margin: 0 }}>{r.resolution || "Marked as resolved."}</p>
                          <button onClick={(e) => handleReopen(e, r.id)} disabled={isSaving} style={{ marginTop: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "1px solid #86efac", borderRadius: "8px", padding: "0.4rem 0.85rem", fontSize: "0.72rem", fontWeight: 600, color: "#15803d", cursor: isSaving ? "default" : "pointer", fontFamily: "'Manrope', sans-serif", transition: "all 0.2s", opacity: isSaving ? 0.6 : 1 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.1"/></svg>
                            {isSaving ? "Updating…" : "Reopen"}
                          </button>
                        </div>
                      ) : (
                        <div style={{ marginBottom: "0.75rem" }}>
                          <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#546066", marginBottom: "0.5rem" }}>
                            Resolution Note <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#9ca3af" }}>(optional)</span>
                          </label>
                          <textarea rows={3} value={resNotes[r.id] || ""} onChange={(e) => setResNotes((p) => ({ ...p, [r.id]: e.target.value }))} placeholder="Describe how this query was resolved…"
                            style={{ width: "100%", boxSizing: "border-box", resize: "vertical", background: "#f5f3f3", border: "1px solid rgba(27,28,28,0.1)", borderRadius: "8px", padding: "0.65rem 0.85rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", color: "#1b1c1c", outline: "none", lineHeight: 1.6, transition: "border-color 0.2s" }}
                            onFocus={(e) => e.target.style.borderColor = "#735c00"}
                            onBlur={(e)  => e.target.style.borderColor = "rgba(27,28,28,0.1)"}
                          />
                          <button onClick={(e) => handleResolve(e, r.id)} disabled={isSaving}
                            style={{ marginTop: "0.6rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem", background: isSaving ? "#4ade80" : "#16a34a", color: "#fff", border: "none", borderRadius: "8px", padding: "0.7rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", cursor: isSaving ? "default" : "pointer", transition: "background 0.2s", opacity: isSaving ? 0.75 : 1 }}>
                            {isSaving
                              ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Saving…</>
                              : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>Mark as Resolved</>
                            }
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${isResolved ? "#bbf7d0" : "#f5f3f3"}`, paddingTop: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.65rem", color: "#9ca3af" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {fmtDate(r.createdAt)}
                    </div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, color: isOpen ? (isResolved ? "#15803d" : "#735c00") : "#c0b9a8", transition: "color 0.2s" }}>
                      {isOpen ? "▲ Collapse" : "▼ Read more"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}