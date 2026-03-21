import { useEffect, useRef, useState } from "react";
import AmitPhoto from "./Amit_Upadhyay.png";
import LakshyaveerPhoto from "./Lakshyaveer.jpeg";
import ChatbotIcon from "./static/ChatbotIcon";

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

const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

/* ─────────────────────────────────────────────────────────────────────────────
   RULE-BASED CHATBOT ENGINE
   Each rule has: patterns (keywords to match) + replies (randomly picked)
───────────────────────────────────────────────────────────────────────────── */
const BOT_RULES = [
  {
    patterns: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "howdy", "sup"],
    replies: [
      "Hi there! 👋 Welcome to Lakshyaveer & Amit's portfolio. How can I help you today?",
      "Hello! 😊 Great to have you here. Feel free to ask anything about our services, tech stack, pricing, or process!",
      "Hey! Welcome! I'm here to answer any questions you have about working with Lakshyaveer & Amit.",
    ],
  },
  {
    patterns: ["who are you", "what are you", "are you a bot", "are you human", "are you ai", "are you real"],
    replies: [
      "I'm a virtual assistant for Lakshyaveer & Amit — a two-person full-stack dev duo based in Noida, India. I can answer your pre-sales questions before you get on a call with them!",
      "I'm the portfolio chatbot for L&A! Not a human, but I know everything about their services, pricing, and process. Ask away!",
    ],
  },
  {
    patterns: ["who is lakshyaveer", "tell me about lakshyaveer", "about lakshyaveer"],
    replies: [
      "Lakshyaveer Singh is a Backend Architect & Android Engineer with 6+ years of experience. He specialises in Java microservices, AWS infrastructure, and Android SDK internals. 📞 +91 81304 17748",
    ],
  },
  {
    patterns: ["who is amit", "tell me about amit", "about amit"],
    replies: [
      "Amit Upadhyay is a Full-Stack Developer & API Engineer focused on clean REST API architecture, PostgreSQL database design, and end-to-end Android application development. 📞 +91 91401 42098",
    ],
  },
  {
    patterns: ["team", "members", "founders", "people", "duo", "both"],
    replies: [
      "The team is:\n• Lakshyaveer Singh — Backend Architect & Android Engineer (+91 81304 17748)\n• Amit Upadhyay — Full-Stack Developer & API Engineer (+91 91401 42098)\n\nTogether they bring 10+ years of combined experience!",
    ],
  },
  {
    patterns: ["tech stack", "technologies", "what do you use", "tools", "languages", "framework"],
    replies: [
      "Here's the full stack:\n\n📱 Android: Kotlin, Jetpack Compose, Android SDK, ReactiveX, Dagger/Hilt, Kotlin Multiplatform\n\n⚙️ Backend: Java SE/EE, Node.js, REST APIs, Microservices, AWS, PostgreSQL, Redis, Firebase\n\n🔧 Other: Docker, CI/CD, GraphQL",
    ],
  },
  {
    patterns: ["java", "android", "kotlin", "jetpack", "compose", "dagger", "hilt", "reactivex"],
    replies: [
      "Yes! Java and Android are our core strengths. Lakshyaveer specialises in Java microservices and Android SDK internals, while Amit handles full-stack Android and API work using Kotlin, Jetpack Compose, and Dagger/Hilt.",
      "Android + Java is exactly what we do best — from Jetpack Compose UIs to scalable Java backends. Want to discuss a specific project?",
    ],
  },
  {
    patterns: ["node", "nodejs", "postgresql", "postgres", "firebase", "aws", "redis", "docker"],
    replies: [
      "Absolutely, that's part of our backend toolkit. We use Node.js, PostgreSQL, Firebase, Redis, AWS, and Docker in production. Amit leads most backend API work while Lakshyaveer handles cloud infrastructure and microservices.",
    ],
  },
  {
    patterns: ["price", "pricing", "cost", "how much", "budget", "rate", "fees", "charge", "expensive"],
    replies: [
      "Here's a rough idea of our pricing:\n\n💡 Small projects / MVPs: ₹50,000 – ₹1,50,000\n📦 Medium projects: ₹1,50,000 – ₹4,00,000\n🏢 Large / Enterprise: Custom quote after a discovery call\n⏱ Hourly consulting: Available on request\n\nEvery project is scoped individually. Want to book a free 30-min discovery call?",
    ],
  },
  {
    patterns: ["timeline", "how long", "duration", "time", "deadline", "weeks", "months", "fast", "quick"],
    replies: [
      "Typical timelines:\n\n⚡ MVP / Small project: 3–6 weeks\n📲 Medium Android app: 6–12 weeks\n🏗 Large backend system: 3–6 months\n\nWe work in weekly sprints with regular client updates. Project kickoff usually happens within 1–2 weeks of agreement.",
    ],
  },
  {
    patterns: ["process", "workflow", "steps", "how do you work", "methodology", "approach"],
    replies: [
      "Our work process is simple and transparent:\n\n1️⃣ Discovery call — free, 30 minutes\n2️⃣ Scoping & proposal — 2–3 days\n3️⃣ Development — weekly updates & demos\n4️⃣ Testing & QA — before any release\n5️⃣ Deployment & handover\n6️⃣ Post-launch support\n\nWant to start with step 1?",
    ],
  },
  {
    patterns: ["services", "what do you do", "what can you build", "offer", "expertise", "capabilities"],
    replies: [
      "We offer:\n\n📱 Custom Android app development (native & hybrid)\n⚙️ Java backend & microservices architecture\n🔌 API design and third-party integrations\n🔍 Technical audits & code reviews\n🚀 Performance optimisation for existing apps\n\nHave a specific project in mind? Tell me more!",
    ],
  },
  {
    patterns: ["mobile", "app", "android app", "ios", "flutter", "hybrid", "react native"],
    replies: [
      "We specialise in native Android development using Kotlin and Jetpack Compose. We also have experience with hybrid approaches using Kotlin Multiplatform. For iOS-only or React Native projects, we can discuss scope on a call.",
    ],
  },
  {
    patterns: ["backend", "server", "api", "microservice", "database", "cloud"],
    replies: [
      "Backend is our strong suit! We build scalable Java microservices, RESTful APIs, and cloud infrastructure on AWS. Our systems are designed for high throughput and low latency. What kind of backend are you looking to build?",
    ],
  },
  {
    patterns: ["mvp", "startup", "idea", "prototype", "proof of concept", "poc"],
    replies: [
      "We love working on MVPs and early-stage startups! We can help you build a lean, production-ready MVP quickly so you can validate your idea. Typical MVP cost: ₹50,000–₹1,50,000. Want to discuss your idea?",
    ],
  },
  {
    patterns: ["freelance", "upwork", "fiverr", "hire", "available", "availability", "free"],
    replies: [
      "We're generally available for new projects, with kickoff typically within 1–2 weeks of agreement. You can reach us directly at devduality7@gmail.com or book a free discovery call. We've delivered 40+ projects across Upwork and Fiverr!",
    ],
  },
  {
    patterns: ["contact", "reach", "call", "phone", "email", "get in touch", "talk", "connect", "meeting"],
    replies: [
      "You can reach the team directly:\n\n📧 devduality7@gmail.com\n📞 Lakshyaveer Singh: +91 81304 17748\n📞 Amit Upadhyay: +91 91401 42098\n\nOr scroll up to the Contact section to send an inquiry form!",
    ],
  },
  {
    patterns: ["location", "where are you", "based", "india", "noida", "remote", "onsite"],
    replies: [
      "We're based in Noida, India 🇮🇳 and work with clients globally — fully remote-friendly. We've successfully delivered projects for clients in India, UAE, UK, and the US.",
    ],
  },
  {
    patterns: ["experience", "years", "how long have you", "background", "history", "portfolio"],
    replies: [
      "Lakshyaveer & Amit have a combined 10+ years of experience in Java and Android development. They've shipped 40+ projects across domains like fintech, edtech, logistics, and SaaS. You can see selected work in the Projects section above!",
    ],
  },
  {
    patterns: ["review", "testimonial", "rating", "feedback", "client", "happy", "satisfied"],
    replies: [
      "We have 60+ five-star reviews across Upwork and Fiverr! Clients consistently highlight our technical depth, communication, and on-time delivery. You can see some testimonials scrolling above on this page 😊",
    ],
  },
  {
    patterns: ["thanks", "thank you", "thank", "appreciate", "helpful", "great", "awesome", "good"],
    replies: [
      "You're welcome! 😊 Feel free to ask anything else, or reach out directly at devduality7@gmail.com",
      "Happy to help! If you're ready to start a project, drop us a line at devduality7@gmail.com 🚀",
      "Glad I could help! Don't hesitate to get in touch with the team when you're ready.",
    ],
  },
  {
    patterns: ["bye", "goodbye", "see you", "later", "take care", "ciao"],
    replies: [
      "Goodbye! 👋 Hope to hear from you soon at devduality7@gmail.com",
      "See you! Feel free to come back anytime. Good luck with your project! 🚀",
    ],
  },
];

const FALLBACK_REPLIES = [
  "I'm not sure I understood that. Could you try rephrasing? You can ask about our tech stack, pricing, timeline, services, or how to get in touch!",
  "Hmm, that's outside what I can answer right now. For detailed queries, reach us at devduality7@gmail.com or call +91 81304 17748 📞",
  "I didn't quite catch that! Try asking about: services, pricing, tech stack, process, or how to contact the team.",
];

function getBotReply(userInput) {
  const text = userInput.toLowerCase().trim();
  // Try to find a matching rule
  for (const rule of BOT_RULES) {
    const matched = rule.patterns.some((p) => text.includes(p));
    if (matched) {
      const replies = rule.replies;
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }
  // Fallback
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
}

/* ─────────────────────────────────────────────────────────────────────────────
   CHATBOT COMPONENT  — rule-based, no API calls
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
  const [messages, setMessages]   = useState([
    {
      role: "assistant",
      content: "Hi there! 👋 I'm the virtual assistant for Lakshyaveer & Amit. Ask me anything about our services, stack, pricing, or process — I'll do my best to help!",
    },
  ]);
  const [input, setInput]         = useState("");
  const [typing, setTyping]       = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef                 = useRef(null);
  const inputRef                  = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (text) => {
    const userMsg = text.trim();
    if (!userMsg || typing) return;

    setShowQuick(false);
    setInput("");

    const withUser = [...messages, { role: "user", content: userMsg }];
    setMessages(withUser);
    setTyping(true);

    // Simulate a short typing delay (300–700ms) for realism
    const delay = 300 + Math.random() * 400;
    setTimeout(() => {
      const reply = getBotReply(userMsg);
      setMessages([...withUser, { role: "assistant", content: reply }]);
      setTyping(false);
    }, delay);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <>
      {/* ── Floating bubble ── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        style={{
          position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200,
          width: "64px", height: "64px", borderRadius: "50%",
          background: "transparent",
          boxShadow: "0 8px 32px rgba(30,60,180,0.35)",
          border: "none", cursor: "pointer", padding: 0, overflow: "visible",
          display: open ? "none" : "flex",
          alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(30,60,180,0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(30,60,180,0.35)"; }}
      >
        <ChatbotIcon size={64} />
      </button>

      {/* ── Chat panel — always mounted, toggled via display ── */}
      <div style={{
        position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200,
        width: "min(400px, calc(100vw - 2rem))",
        height: "min(580px, calc(100vh - 4rem))",
        background: "#fdfcf9",
        borderRadius: "20px",
        boxShadow: "0 24px 80px rgba(27,28,28,0.18), 0 0 0 1px rgba(27,28,28,0.07)",
        display: open ? "flex" : "none",
        flexDirection: "column",
        overflow: "hidden",
        animation: open ? "chatSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) both" : "none",
      }}>

        {/* ── Header ── */}
        <div style={{
          background: "#735c00",
          padding: "1rem 1.25rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Avatar */}
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "#f5d061",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.65rem", fontWeight: 800, color: "#735c00",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              flexShrink: 0,
              animation: "botBounce 2.4s ease-in-out infinite",
            }}>L&A</div>
            <div>
              <div style={{ color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.2 }}>
                L &amp; A Assistant
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "3px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.63rem", fontFamily: "'Manrope', sans-serif" }}>
                  Online · Always ready
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)", padding: "4px", lineHeight: 1 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ display: "block" }}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── Messages ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "0.5rem" }}>
              {/* Bot avatar */}
              {m.role === "assistant" && (
                <div style={{
                  width: "26px", height: "26px", borderRadius: "50%",
                  background: "#f5d061", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.5rem", fontWeight: 800, color: "#735c00",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  marginBottom: "2px",
                }}>L&A</div>
              )}
              <div style={{
                maxWidth: "80%",
                padding: "0.7rem 0.95rem",
                borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                background: m.role === "user" ? "#735c00" : "#fff",
                color: m.role === "user" ? "#fff" : "#1b1c1c",
                fontSize: "0.83rem",
                lineHeight: 1.65,
                fontFamily: "'Manrope', sans-serif",
                boxShadow: "0 2px 8px rgba(27,28,28,0.06)",
                border: m.role === "user" ? "none" : "1px solid rgba(27,28,28,0.06)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}>
                {m.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
              <div style={{
                width: "26px", height: "26px", borderRadius: "50%",
                background: "#f5d061", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.5rem", fontWeight: 800, color: "#735c00",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>L&A</div>
              <div style={{
                background: "#fff",
                border: "1px solid rgba(27,28,28,0.06)",
                borderRadius: "4px 16px 16px 16px",
                padding: "0.7rem 1rem",
                boxShadow: "0 2px 8px rgba(27,28,28,0.06)",
                display: "flex", gap: "4px", alignItems: "center",
              }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#d0c6b0",
                    animation: `typingDot 1.2s ${d * 0.2}s ease-in-out infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Quick reply chips — shown only on first load */}
          {showQuick && !typing && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginTop: "0.25rem" }}>
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(115,92,0,0.3)",
                    color: "#735c00", borderRadius: "999px",
                    padding: "0.32rem 0.85rem",
                    fontSize: "0.7rem",
                    fontFamily: "'Manrope', sans-serif", fontWeight: 500,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#735c00"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#735c00"; }}
                >{q}</button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Input bar ── */}
        <div style={{
          padding: "0.875rem 1rem",
          borderTop: "1px solid rgba(27,28,28,0.07)",
          background: "#fff",
          display: "flex", gap: "0.5rem", alignItems: "flex-end",
          flexShrink: 0,
        }}>
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your question…"
            style={{
              flex: 1, resize: "none",
              border: "1px solid rgba(27,28,28,0.1)",
              borderRadius: "12px", padding: "0.7rem 1rem",
              fontFamily: "'Manrope', sans-serif", fontSize: "0.85rem",
              outline: "none", background: "#f5f3f3", color: "#1b1c1c",
              lineHeight: 1.5, maxHeight: "100px", overflowY: "auto",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => e.target.style.borderColor = "#735c00"}
            onBlur={(e)  => e.target.style.borderColor = "rgba(27,28,28,0.1)"}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || typing}
            aria-label="Send"
            style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: input.trim() && !typing ? "#735c00" : "#e9e8e8",
              border: "none",
              cursor: input.trim() && !typing ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s", flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={input.trim() && !typing ? "#fff" : "#9ca3af"}
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ display: "block" }}>
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────────────────────── */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => { setMenuOpen(false); document.body.classList.remove("mobile-menu-open"); };
  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.classList.toggle("mobile-menu-open", next);
  };
  const NAV_LINKS = [
    { label: "About",    href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Stack",    href: "#tech-stack" },
    { label: "Contact",  href: "#contact" },
  ];
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 w-full z-50 border-b border-black/5">
      <div className="flex justify-between items-center w-full px-6 md:px-12 py-5 max-w-screen-2xl mx-auto">
        <div className="text-xl md:text-2xl font-bold tracking-tighter text-on-background font-headline">
          Lakshyaveer <span className="text-primary italic font-light">&amp;</span> Amit
        </div>
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="text-secondary font-medium uppercase tracking-widest text-[10px] hover:text-primary transition-colors">{label}</a>
          ))}
          <button className="bg-primary text-on-primary rounded-full px-6 py-2.5 font-label text-xs font-bold tracking-tight hover:shadow-lg transition-all active:scale-95">
            Get in Touch
          </button>
        </div>
        <button className="md:hidden p-2 text-on-background" onClick={toggleMenu} aria-label="Toggle menu">
          <Icon name="menu" />
        </button>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-background z-[60] flex flex-col items-center justify-center gap-8 md:hidden">
          <button className="absolute top-6 right-6 p-2" onClick={closeMenu} aria-label="Close menu">
            <Icon name="close" className="text-3xl" />
          </button>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="text-3xl font-headline font-bold" onClick={closeMenu}>{label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-24 pb-20 md:pb-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-20">
        <div className="w-full lg:w-3/5 space-y-6 md:space-y-8 animate-fade-in-up">
          <span className="inline-block px-3 py-1 bg-primary-container/30 text-primary uppercase tracking-[0.2em] font-bold text-[10px] rounded">
            Architecting Digital Sanctuaries
          </span>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tighter text-on-background">
            Lakshyaveer <br />
            <span className="text-primary italic font-light">&amp;</span> Amit
          </h1>
          <p className="text-lg md:text-2xl text-secondary max-w-xl leading-relaxed font-light">
            Full-stack craftsmen specializing in robust Java architectures and fluid Android experiences.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="inline-flex items-center justify-center gap-3 bg-primary text-on-primary rounded-full px-8 py-4 font-headline font-bold text-base transition-all hover:scale-105 hover:shadow-xl active:scale-95">
              View Selected Works
              <Icon name="arrow_forward" className="text-xl" />
            </a>
          </div>
        </div>
        <div className="w-full lg:w-2/5 relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex gap-3 relative z-10">
            <div className="flex-1 flex flex-col gap-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden editorial-shadow border border-black/5 bg-surface-container-high">
                <img src={LakshyaveerPhoto} alt="Lakshyaveer Singh" className="w-full h-full object-cover object-top" />
              </div>
              <div className="text-center">
                <p className="font-headline font-bold text-xs text-on-background tracking-tight">Lakshyaveer Singh</p>
                <p className="text-secondary text-[10px] uppercase tracking-widest font-medium">Backend · Android</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2" style={{ marginTop: "2.5rem" }}>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden editorial-shadow border border-black/5 bg-surface-container-high">
                <img src={AmitPhoto} alt="Amit Upadhyay" className="w-full h-full object-cover object-top" />
              </div>
              <div className="text-center">
                <p className="font-headline font-bold text-xs text-on-background tracking-tight">Amit Upadhyay</p>
                <p className="text-secondary text-[10px] uppercase tracking-widest font-medium">Full-Stack · API</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-24 md:w-32 h-24 md:h-32 border-2 border-primary/15 rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="bg-surface-container-low py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="order-2 lg:order-1 space-y-10">
          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl editorial-shadow border border-black/5">
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Expertise In Core &amp; Mobile</h2>
            <div className="space-y-6 text-on-surface-variant text-base md:text-lg leading-relaxed">
              <p>With over a decade of combined experience, we bridge the gap between complex backend systems and intuitive mobile interfaces.</p>
              <p>Our philosophy is rooted in <strong>Type-Safe</strong> development, focusing on Java's scalability and Android's high-performance ecosystem.</p>
            </div>
            <div className="pt-10 flex flex-wrap gap-3">
              {["Java Expert", "Android Specialist", "Architecture"].map((tag) => (
                <span key={tag} className="bg-primary/5 text-primary border border-primary/10 px-5 py-2 rounded-full font-label text-xs font-bold uppercase tracking-wider">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="uppercase tracking-[0.2em] text-primary font-bold text-[10px] block mb-6">01. The Approach</span>
          <h3 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
            Crafting solutions with precision and editorial intent.
          </h3>
          <div className="w-20 h-1.5 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div className="max-w-xl">
            <span className="uppercase tracking-[0.2em] text-secondary font-bold text-[10px] block mb-4">02. Selected Works</span>
            <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter">Handcrafted Software.</h2>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer"
             className="group flex items-center gap-2 text-primary font-headline font-bold text-sm border-b-2 border-primary-container pb-1 hover:border-primary transition-all">
            Browse GitHub
            <Icon name="arrow_right_alt" className="text-sm group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl overflow-hidden editorial-shadow group border border-black/5 hover:border-primary/20 transition-all duration-500">
            <div className="p-8 md:p-12 h-full flex flex-col">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                    <Icon name="brush" className="text-2xl text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-headline font-extrabold">Modern_UI_Kit</h3>
                </div>
                <p className="text-base md:text-lg text-on-surface-variant max-w-lg leading-relaxed">
                  A collection of high-performance Android components designed for speed and consistency across diverse device ecosystems.
                </p>
              </div>
              <div className="mt-auto aspect-video md:aspect-[21/9] bg-surface-container rounded-2xl overflow-hidden relative border border-black/5">
                <img alt="Modern UI components" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFYVMAkrtpSIuSDZPcvQphPf5KGnVexchmvQt8Zw-xmfc-7BnWovoqs0byNTXx9oaM2kNRtCVbtBUpmH-rPIcwPs3KAC0vP9C9pAeQkopB3MN0ZQlXeDhfEsyTh6j5tyqUE8jt4y9TzADv2LGriuBqdnc62-PEW5shSI_v_R55B9KWhJpvcQFWZHaPUK7nE7FfzjZlnojoKRxeDDqpSO_SLqZHpQ9fWeuxk_bdKxpDRVPvCHogfgWi8V7IARR5sMQ8QoSamXsNky8"/>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          <div id="tech-stack" className="md:col-span-4 bg-primary text-on-primary rounded-3xl p-8 md:p-12 flex flex-col justify-between editorial-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div>
              <span className="uppercase tracking-[0.2em] opacity-60 font-bold text-[10px] block mb-8">Capabilities</span>
              <h3 className="text-3xl md:text-4xl font-headline font-extrabold mb-10">The Stack.</h3>
              <ul className="space-y-4 md:space-y-6 font-headline font-bold text-xl md:text-2xl">
                {["Java SE/EE", "Android SDK", "ReactiveX", "Kotlin MP", "Dagger/Hilt", "Jetpack Compose"].map((item) => (
                  <li key={item} className="flex items-center gap-4 group/item">
                    <span className="w-1.5 h-1.5 bg-primary-container rounded-full group-hover/item:scale-150 transition-transform" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-10">
              <p className="text-primary-container/80 text-xs leading-relaxed uppercase tracking-widest font-bold">Continuous evolution.</p>
            </div>
          </div>
          <div className="md:col-span-6 bg-surface-container-low rounded-3xl overflow-hidden editorial-shadow group border border-black/5 hover:shadow-xl transition-all duration-500">
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                  <Icon name="lan" className="text-2xl text-primary" />
                </div>
                <span className="bg-surface-container-highest/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/5">v2.4.0</span>
              </div>
              <h3 className="text-2xl font-headline font-extrabold mb-4">Reactive_Server</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed text-sm">
                A highly scalable Java backbone designed to handle millions of concurrent connections with minimal latency.
              </p>
              <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-black/5">
                <img alt="Reactive Server Visualization" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6_gcJydABHqO1iQFJTs1sAgNVL_PES0rsOd2D4N3NHzNtncrELNjigeoL2P1gobpxEpG6rIWAkkexa2NeV6gZyrMkGilDtp7Yjcg0__826_2bA9VTDXe6-BVI_MV_XN2rCTLLRQAofuFBeQuP2UbcbFlWWHgB7GQl2Xpe_6MtK2e9tlxmw1pTTFVM6q6maCNPkrBdvm7SVNpvvPtvNAD4gml0yjmKvtsCZrrKjRpYPUEqt4HH-V3AZk7cqssCnMOYVJEHl9GWsqc"/>
              </div>
            </div>
          </div>
          <div className="md:col-span-6 bg-surface-container rounded-3xl overflow-hidden editorial-shadow group border border-black/5 hover:shadow-xl transition-all duration-500">
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                  <Icon name="monitoring" className="text-2xl text-primary" />
                </div>
                <span className="bg-surface-container-highest/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/5">Stable</span>
              </div>
              <h3 className="text-2xl font-headline font-extrabold mb-4">Core_Analytics</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed text-sm">
                Lightweight, privacy-first data processing engine for Android applications to monitor engagement in real-time.
              </p>
              <div className="aspect-video rounded-2xl overflow-hidden bg-white border border-black/5">
                <img alt="Core Analytics Dashboard" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2SnlXIcKvc9ppuwG3V17qhTHaZLWN0J6TBGd_hP9HwgnEMp-FKFKuIG_iyMo7UI_ZDKUCR-euUHNunzzqy-rT-A2AiXaWpCdTQJ39z7hAdM0gc5j-QX3zL4SmMwuczj8VkZUPLwJx5JpFxBuw-oOF611JLCLgG0fPAYpRa-iqoEFQTCw15FBkYxJQdq7GoAhndBqvtkgswu_xmcOgDc2d8Qv3efaSKWyLTx_u353FtVUkNDtjCU2RhfFjAXUb3lJBtqwGlLa_1C0"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────────────────────────────────── */
const REVIEWS = [
  { name: "Rahul Sharma",   via: "Upwork",  stars: 5, text: "Absolutely outstanding. They delivered a production-ready Android app well ahead of schedule. The code quality was impeccable — best hire I've made on this platform." },
  { name: "James Thornton", via: "Upwork",  stars: 5, text: "My previous developer couldn't fix the issue for three weeks. Lakshyaveer resolved it in under two hours. Exceptional technical depth." },
  { name: "Priya Nair",     via: "Fiverr",  stars: 5, text: "Methodical, communicative, and rigorous. They explained every architectural decision clearly. Exactly the professionalism I was looking for." },
  { name: "Colin Murphy",   via: "Fiverr",  stars: 5, text: "Navigated every edge-case without complaint and delivered precisely what was scoped. A rare combination of skill and reliability." },
  { name: "Ayesha Khan",    via: "Fiverr",  stars: 5, text: "Super talented and professional. They made my exact vision come to life. I didn't know they could nail it so perfectly. Highly recommended+++" },
  { name: "David Lee",      via: "Upwork",  stars: 5, text: "The Java backend they architected scales flawlessly under heavy load. Five stars doesn't feel enough. Will work with again without hesitation." },
  { name: "Nikhil Gupta",   via: "Upwork",  stars: 5, text: "Clean, well-documented, on-time. They asked all the right questions before starting. The result was better than I imagined. Will rehire." },
  { name: "Sarah O'Brien",  via: "Fiverr",  stars: 5, text: "They jumped through a bunch of hoops and hurdles to deliver a great job. Patient and detail-oriented throughout the entire process." },
  { name: "Mannyez Torres", via: "Fiverr",  stars: 5, text: "Was on top of the project every single day. Proactive communication, no chasing needed. The final product was polished and professional." },
  { name: "Gerald Harris",  via: "Fiverr",  stars: 5, text: "Amazing service. Every time I've worked with them I know I'm in safe hands. Outstanding experience, as always. Thank you." },
  { name: "Tanvir Hossain", via: "Upwork",  stars: 5, text: "They built our entire Android app from scratch in 4 weeks. Zero bugs on launch day. I've worked with a lot of developers — this team is different." },
  { name: "Meera Patel",    via: "Fiverr",  stars: 5, text: "Brilliant at breaking down complex backend requirements into clean, maintainable code. Felt like working with a senior engineer from a top-tier firm." },
];

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#735c00">
          <polygon points="6,0.5 7.5,4.5 11.5,4.5 8.5,7 9.5,11 6,8.5 2.5,11 3.5,7 0.5,4.5 4.5,4.5" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-surface-container-lowest border border-black/5 rounded-2xl p-6 editorial-shadow" style={{ marginBottom: "1rem", cursor: "default" }}>
      <StarRating count={review.stars} />
      <p className="text-on-surface-variant text-sm leading-relaxed mt-3 mb-4">"{review.text}"</p>
      <div className="flex items-center justify-between pt-3 border-t border-black/5">
        <span className="font-headline font-bold text-xs text-on-background">{review.name}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 bg-surface-container px-2 py-1 rounded-full">{review.via}</span>
      </div>
    </div>
  );
}

function Testimonials() {
  const col1 = REVIEWS.slice(0, 4);
  const col2 = REVIEWS.slice(4, 8);
  const col3 = REVIEWS.slice(8, 12);
  const columns = [
    { reviews: col1, cls: "scroll-col-1" },
    { reviews: col2, cls: "scroll-col-2" },
    { reviews: col3, cls: "scroll-col-3" },
  ];
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.2em] text-primary font-bold text-[10px] block mb-4">Client Reviews</span>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-background">Trusted by Clients Worldwide.</h2>
          <p className="text-secondary mt-4 text-sm max-w-md mx-auto">Over 60 five-star reviews across Upwork and Fiverr.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", height: "520px", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "80px", zIndex: 10, background: "linear-gradient(to bottom, #fbf9f9, transparent)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", zIndex: 10, background: "linear-gradient(to top, #fbf9f9, transparent)", pointerEvents: "none" }} />
          {columns.map(({ reviews, cls }, ci) => (
            <div key={ci} style={{ overflow: "hidden" }}>
              <div className={cls}>
                {[...reviews, ...reviews].map((r, i) => (
                  <ReviewCard key={`${ci}-${i}`} review={r} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────────────────────── */
function Contact() {
  const people = [
    { name: "Lakshyaveer Singh", role: "Backend Architect · Android Engineer", phone: "+91 81304 17748", tel: "+918130417748", photo: LakshyaveerPhoto },
    { name: "Amit Upadhyay",     role: "Full-Stack Developer · API Engineer",   phone: "+91 91401 42098", tel: "+919140142098", photo: AmitPhoto },
  ];
  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-12 bg-surface-container-low">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="uppercase tracking-[0.2em] text-primary font-bold text-[10px] block mb-6">03. Collaboration</span>
          <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter mb-8">Initiate Project.</h2>
          <p className="text-secondary max-w-lg mx-auto">Ready to build something remarkable? Let's discuss your architectural needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {people.map((p) => (
            <div key={p.name} className="bg-surface-container-lowest rounded-2xl editorial-shadow border border-black/5 transition-transform hover:-translate-y-1 overflow-hidden flex flex-col">
              <div className="bg-surface-container-low flex items-center justify-center p-4 pt-6">
                <img src={p.photo} alt={p.name} style={{ width: "100%", maxHeight: "320px", objectFit: "contain", objectPosition: "center top", display: "block" }} />
              </div>
              <div className="mx-6 border-t border-black/5" />
              <div className="px-6 pb-6 pt-4">
                <h3 className="font-headline text-lg font-extrabold text-on-background leading-tight">{p.name}</h3>
                <p className="text-[10px] font-medium uppercase tracking-widest text-secondary mb-4 mt-0.5">{p.role}</p>
                <div className="space-y-3">
                  <a href={`tel:${p.tel}`} className="flex items-center gap-2.5 text-secondary hover:text-primary transition-colors font-medium text-sm">
                    <Icon name="call" className="text-primary text-lg" />
                    {p.phone}
                  </a>
                  <div className="flex gap-4 pt-1">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors border-b border-black/5 pb-1">LinkedIn</a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors border-b border-black/5 pb-1">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-6 md:space-y-8 bg-surface-container-lowest p-8 md:p-12 rounded-3xl editorial-shadow border border-black/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { label: "Full Name",     placeholder: "John Doe",         type: "text" },
              { label: "Email Address", placeholder: "john@company.com", type: "email" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-[10px] font-bold uppercase mb-3 text-secondary tracking-widest">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} required
                  className="w-full bg-surface-container-low border-transparent rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm outline-none" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase mb-3 text-secondary tracking-widest">Project Details</label>
            <textarea rows={5} required placeholder="How can we help you architecture your next venture?"
              className="w-full bg-surface-container-low border-transparent rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm resize-none outline-none" />
          </div>
          <div className="flex justify-center pt-4">
            <button type="button" className="w-full md:w-auto bg-primary text-on-primary rounded-full px-12 md:px-20 py-5 font-headline font-bold text-lg shadow-xl shadow-primary/10 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
              Send Inquiry
            </button>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center gap-6 text-center">
          <a href="mailto:devduality7@gmail.com" className="text-lg md:text-xl font-bold text-on-background hover:text-primary transition-colors">
            devduality7@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-surface py-12 md:py-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div className="space-y-4">
            <div className="text-xl font-bold text-on-background font-headline">
              Lakshyaveer <span className="text-primary">&amp;</span> Amit
            </div>
            <p className="text-xs text-secondary/60 max-w-xs leading-relaxed">
              A design-first development duo engineering high-performance digital ecosystems.
            </p>
          </div>
          <div className="flex items-center gap-5">
            {/* GitHub */}
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"
               style={{ display: "inline-flex", transition: "transform 0.25s, filter 0.25s" }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.12)"; e.currentTarget.style.filter = "drop-shadow(0 8px 12px rgba(0,0,0,0.25))"; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "drop-shadow(0 4px 6px rgba(0,0,0,0.15))"; }}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <defs>
                  <radialGradient id="gh-top" cx="38%" cy="28%" r="62%"><stop offset="0%" stopColor="#4a4a4a"/><stop offset="100%" stopColor="#111111"/></radialGradient>
                  <radialGradient id="gh-shine" cx="35%" cy="25%" r="45%"><stop offset="0%" stopColor="rgba(255,255,255,0.28)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></radialGradient>
                </defs>
                <circle cx="19" cy="19" r="18" fill="url(#gh-top)"/>
                <ellipse cx="19" cy="33" rx="13" ry="3.5" fill="rgba(0,0,0,0.22)"/>
                <circle cx="19" cy="19" r="18" fill="url(#gh-shine)"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M19 9.5C13.477 9.5 9 13.977 9 19.5c0 4.418 2.865 8.166 6.839 9.488.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0119 14.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C25.138 27.663 28 23.916 28 19.5c0-5.523-4.477-10-10-10z" fill="white" opacity="0.92"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
               style={{ display: "inline-flex", transition: "transform 0.25s, filter 0.25s" }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.12)"; e.currentTarget.style.filter = "drop-shadow(0 8px 12px rgba(10,102,194,0.4))"; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "drop-shadow(0 4px 6px rgba(10,102,194,0.2))"; }}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <defs>
                  <radialGradient id="li-top" cx="35%" cy="25%" r="65%"><stop offset="0%" stopColor="#2a9fd6"/><stop offset="100%" stopColor="#0a66c2"/></radialGradient>
                  <radialGradient id="li-shine" cx="32%" cy="22%" r="44%"><stop offset="0%" stopColor="rgba(255,255,255,0.3)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></radialGradient>
                </defs>
                <circle cx="19" cy="19" r="18" fill="url(#li-top)"/>
                <ellipse cx="19" cy="33" rx="13" ry="3.5" fill="rgba(0,0,0,0.15)"/>
                <circle cx="19" cy="19" r="18" fill="url(#li-shine)"/>
                <path d="M13 15.5h-2.5V27H13V15.5zM11.75 14.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM27 27h-2.5v-5.5c0-1.38-.56-2-1.63-2-1.14 0-1.87.75-1.87 2V27H18.5V15.5H21v1.2c.54-.83 1.5-1.45 2.75-1.45C26.1 15.25 27 16.7 27 19.5V27z" fill="white" opacity="0.95"/>
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"
               style={{ display: "inline-flex", transition: "transform 0.25s, filter 0.25s" }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.12)"; e.currentTarget.style.filter = "drop-shadow(0 8px 12px rgba(0,0,0,0.3))"; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "drop-shadow(0 4px 6px rgba(0,0,0,0.15))"; }}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <defs>
                  <radialGradient id="tw-top" cx="35%" cy="25%" r="65%"><stop offset="0%" stopColor="#3a3a3a"/><stop offset="100%" stopColor="#000000"/></radialGradient>
                  <radialGradient id="tw-shine" cx="32%" cy="22%" r="44%"><stop offset="0%" stopColor="rgba(255,255,255,0.22)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></radialGradient>
                </defs>
                <circle cx="19" cy="19" r="18" fill="url(#tw-top)"/>
                <ellipse cx="19" cy="33" rx="13" ry="3.5" fill="rgba(0,0,0,0.2)"/>
                <circle cx="19" cy="19" r="18" fill="url(#tw-shine)"/>
                <path d="M21.5 12h2.8l-6.1 7 7.2 9.5H21l-4.4-5.8-5 5.8H8.8l6.5-7.5L8.5 12h5.5l4 5.3L21.5 12zm-1 14.8h1.5L14 13.4h-1.6l8.1 13.4z" fill="white" opacity="0.95"/>
              </svg>
            </a>
          </div>
          <div className="text-[15px] text-secondary/60 font-bold uppercase tracking-widest text-center md:text-right">
            Powered by curiosity, code, and coffee.
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  useHead();
  return (
    <div className="bg-background text-on-background font-body">
      <Navbar />
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