import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./static/ChatbotIcon";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import AdminPage from "./components/AdminPage";
import { getBotReply } from "./static/Botrules";   // ← BOT_RULES & FALLBACK_REPLIES live here
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";

/* ── Inject fonts & Tailwind CDN ───────────────────────────────────────────── */
function useHead() {
  useEffect(() => {
    if (!document.getElementById("tw-cdn")) {
      const tw = document.createElement("script");
      tw.id = "tw-cdn";
      tw.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries";
      document.head.appendChild(tw);
      tw.onload = () => {
        if (window.tailwind) {
          window.tailwind.config = {
            darkMode: "class",
            theme: {
              extend: {
                colors: {
                  "primary":                   "#735c00",
                  "primary-container":         "#f5d061",
                  "on-primary":                "#ffffff",
                  "secondary":                 "#546066",
                  "background":                "#fbf9f9",
                  "surface":                   "#fbf9f9",
                  "surface-container":         "#efeded",
                  "surface-container-low":     "#f5f3f3",
                  "surface-container-lowest":  "#ffffff",
                  "surface-container-high":    "#e9e8e8",
                  "surface-container-highest": "#e4e2e2",
                  "on-background":             "#1b1c1c",
                  "on-surface-variant":        "#4d4636",
                  "outline-variant":           "#d0c6b0",
                },
                fontFamily: {
                  headline: ["Plus Jakarta Sans", "sans-serif"],
                  body:     ["Manrope", "sans-serif"],
                  label:    ["Plus Jakarta Sans", "sans-serif"],
                },
                animation: { "fade-in-up": "fadeInUp 0.8s ease-out forwards" },
                keyframes: {
                  fadeInUp: {
                    "0%":   { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                  },
                },
              },
            },
          };
        }
      };
    }
    const addLink = (href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const l = document.createElement("link");
        l.rel = "stylesheet"; l.href = href;
        document.head.appendChild(l);
      }
    };
    addLink("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap");
    addLink("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,700;0,800;1,700&display=swap");
    if (!document.getElementById("portfolio-styles")) {
      const s = document.createElement("style");
      s.id = "portfolio-styles";
      s.textContent = `
        .material-symbols-outlined {
          font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;
          font-family:'Material Symbols Outlined';
        }
        .editorial-shadow { box-shadow:0px 12px 32px rgba(27,28,28,0.04); }
        .mobile-menu-open { overflow:hidden; }
        @keyframes scrollUp { 0%{transform:translateY(0)} 100%{transform:translateY(-50%)} }
        .scroll-col-1 { animation:scrollUp 26s linear infinite; }
        .scroll-col-2 { animation:scrollUp 32s linear infinite; }
        .scroll-col-3 { animation:scrollUp 22s linear infinite; }
        .scroll-col-1:hover,.scroll-col-2:hover,.scroll-col-3:hover { animation-play-state:paused; }
        @keyframes chatPulse {
          0%   { transform:scale(1); opacity:0.8; }
          70%  { transform:scale(1.5); opacity:0; }
          100% { transform:scale(1.5); opacity:0; }
        }
        @keyframes chatSlideUp {
          from { opacity:0; transform:translateY(20px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%,60%,100% { transform:translateY(0); opacity:0.4; }
          30%          { transform:translateY(-5px); opacity:1; }
        }
        @keyframes botBounce {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-3px); }
        }
      `;
      document.head.appendChild(s);
    }
  }, []);
}

// const Icon = ({ name, className = "" }) => (
//   <span className={`material-symbols-outlined ${className}`}>{name}</span>
// );

/* ─────────────────────────────────────────────────────────────────────────────
   CHATBOT COMPONENT
   getBotReply is imported from ./botRules.js
───────────────────────────────────────────────────────────────────────────── */
const QUICK_REPLIES = [
  "What's your tech stack?",
  "How much does a project cost?",
  "How long does it take?",
  "How do you work?",
  "How do I contact you?",
];

function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState([{ role: "assistant", content: "Hi there! 👋 I'm the virtual assistant for Lakshyaveer & Amit. Ask me anything about our services, stack, pricing, or process — I'll do my best to help!" }]);
  const [input, setInput]         = useState("");
  const [typing, setTyping]       = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef                 = useRef(null);
  const inputRef                  = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const send = (text) => {
    const userMsg = text.trim();
    if (!userMsg || typing) return;
    setShowQuick(false); setInput("");
    const withUser = [...messages, { role: "user", content: userMsg }];
    setMessages(withUser); setTyping(true);
    setTimeout(() => {
      setMessages([...withUser, { role: "assistant", content: getBotReply(userMsg) }]);
      setTyping(false);
    }, 300 + Math.random() * 400);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        style={{
          position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200,
          width: "64px", height: "64px", borderRadius: "50%",
          background: "transparent", boxShadow: "0 8px 32px rgba(30,60,180,0.35)",
          border: "none", cursor: "pointer", padding: 0, overflow: "visible",
          display: open ? "none" : "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(30,60,180,0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 8px 32px rgba(30,60,180,0.35)"; }}
      >
        <ChatbotIcon size={64} />
      </button>

      {/* Panel */}
      <div style={{
        position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200,
        width: "min(400px, calc(100vw - 2rem))", height: "min(580px, calc(100vh - 4rem))",
        background: "#fdfcf9", borderRadius: "20px",
        boxShadow: "0 24px 80px rgba(27,28,28,0.18), 0 0 0 1px rgba(27,28,28,0.07)",
        display: open ? "flex" : "none", flexDirection: "column", overflow: "hidden",
        animation: open ? "chatSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) both" : "none",
      }}>
        {/* Header */}
        <div style={{ background: "#735c00", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#f5d061", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800, color: "#735c00", fontFamily: "'Plus Jakarta Sans', sans-serif", flexShrink: 0, animation: "botBounce 2.4s ease-in-out infinite" }}>L&A</div>
            <div>
              <div style={{ color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.2 }}>L &amp; A Assistant</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "3px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.63rem", fontFamily: "'Manrope', sans-serif" }}>Online · Always ready</span>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)", padding: "4px", lineHeight: 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ display: "block" }}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "0.5rem" }}>
              {m.role === "assistant" && (
                <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#f5d061", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 800, color: "#735c00", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "2px" }}>L&A</div>
              )}
              <div style={{ maxWidth: "80%", padding: "0.7rem 0.95rem", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px", background: m.role === "user" ? "#735c00" : "#fff", color: m.role === "user" ? "#fff" : "#1b1c1c", fontSize: "0.83rem", lineHeight: 1.65, fontFamily: "'Manrope', sans-serif", boxShadow: "0 2px 8px rgba(27,28,28,0.06)", border: m.role === "user" ? "none" : "1px solid rgba(27,28,28,0.06)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {m.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#f5d061", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 800, color: "#735c00", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>L&A</div>
              <div style={{ background: "#fff", border: "1px solid rgba(27,28,28,0.06)", borderRadius: "4px 16px 16px 16px", padding: "0.7rem 1rem", boxShadow: "0 2px 8px rgba(27,28,28,0.06)", display: "flex", gap: "4px", alignItems: "center" }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#d0c6b0", animation: `typingDot 1.2s ${d * 0.2}s ease-in-out infinite` }} />
                ))}
              </div>
            </div>
          )}

          {/* Quick reply chips */}
          {showQuick && !typing && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginTop: "0.25rem" }}>
              {QUICK_REPLIES.map((q) => (
                <button key={q} onClick={() => send(q)} style={{ background: "transparent", border: "1px solid rgba(115,92,0,0.3)", color: "#735c00", borderRadius: "999px", padding: "0.32rem 0.85rem", fontSize: "0.7rem", fontFamily: "'Manrope', sans-serif", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#735c00"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#735c00"; }}
                >{q}</button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div style={{ padding: "0.875rem 1rem", borderTop: "1px solid rgba(27,28,28,0.07)", background: "#fff", display: "flex", gap: "0.5rem", alignItems: "flex-end", flexShrink: 0 }}>
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your question…"
            style={{ flex: 1, resize: "none", border: "1px solid rgba(27,28,28,0.1)", borderRadius: "12px", padding: "0.7rem 1rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.85rem", outline: "none", background: "#f5f3f3", color: "#1b1c1c", lineHeight: 1.5, maxHeight: "100px", overflowY: "auto", transition: "border-color 0.2s" }}
            onFocus={(e) => e.target.style.borderColor = "#735c00"}
            onBlur={(e)  => e.target.style.borderColor = "rgba(27,28,28,0.1)"}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || typing}
            aria-label="Send"
            style={{ width: "40px", height: "40px", borderRadius: "12px", background: input.trim() && !typing ? "#735c00" : "#e9e8e8", border: "none", cursor: input.trim() && !typing ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", flexShrink: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !typing ? "#fff" : "#9ca3af"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}



/* ─────────────────────────────────────────────────────────────────────────────
   ROOT — hash-based routing, sessionStorage auth persistence
───────────────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  useHead();


  const [page, setPage] = useState(() =>
    window.location.hash === "#admin" ? "admin" : "home"
  );

  // Sync hash with page state
  useEffect(() => {
    if (page === "admin") {
      window.location.hash = "admin";
    } else {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [page]);

  // Handle browser back / forward
  useEffect(() => {
    const onHashChange = () => {
      setPage(window.location.hash === "#admin" ? "admin" : "home");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (page === "admin") {
    return <AdminPage onBack={() => setPage("home")} />;
  }

  return (
    <div className="bg-background text-on-background font-body">
      <Navbar onAdminClick={() => setPage("admin")} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}