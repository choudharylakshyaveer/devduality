import { useState } from "react";
import Icon from "./Icon";

export default function Navbar({ onAdminClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("mobile-menu-open");
  };
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
    <>
      {/* ── Navbar bar ── */}
      <nav style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", position: "sticky", top: 0, width: "100%", zIndex: 50, borderBottom: "1px solid rgba(27,28,28,0.1)", boxShadow: "0 1px 8px rgba(27,28,28,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "1rem 1.5rem", maxWidth: "1536px", margin: "0 auto", boxSizing: "border-box" }}>

          {/* Logo */}
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#1b1c1c", userSelect: "none" }}>
            Lakshyaveer <span style={{ color: "#735c00", fontStyle: "italic", fontWeight: 300 }}>&amp;</span> Amit
          </div>

          {/* Desktop links — hidden on mobile */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "2.5rem" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="
                  relative inline-block
                  text-[13px] font-bold uppercase tracking-[0.13em]
                  text-secondary
                  transition-all duration-200 ease-out
                  hover:text-primary hover:scale-110
                  after:absolute after:bottom-[-3px] after:left-0
                  after:h-[2px] after:w-0 after:rounded-full after:bg-primary
                  after:transition-all after:duration-200
                  hover:after:w-full
                "
              >
                {label}
              </a>
            ))}

            {/* Get in Touch */}
            <button
              className="bg-primary text-on-primary rounded-full font-bold tracking-tight transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.75rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Get in Touch
            </button>

            {/* Admin */}
            <button
              onClick={onAdminClick}
              style={{
                display: "flex", alignItems: "center", gap: "0.45rem",
                background: "none", border: "1.5px solid rgba(27,28,28,0.14)",
                borderRadius: "999px", padding: "0.5rem 1.1rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.09em", textTransform: "uppercase",
                color: "#546066", cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#735c00"; e.currentTarget.style.color = "#735c00"; e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(115,92,0,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(27,28,28,0.14)"; e.currentTarget.style.color = "#546066"; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Admin
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", color: "#1b1c1c" }}
          >
            <Icon name="menu" />
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── rendered OUTSIDE <nav> so it escapes the stacking context ── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,                          // top:0 right:0 bottom:0 left:0
            zIndex: 9999,                      // above everything
            background: "#fbf9f9",             // solid — no transparency
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Close button */}
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            style={{
              position: "absolute", top: "1.25rem", right: "1.25rem",
              background: "none", border: "none", cursor: "pointer",
              color: "#1b1c1c", padding: "0.5rem",
            }}
          >
            <Icon name="close" className="text-3xl" />
          </button>

          {/* Brand inside overlay */}
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "0.5rem" }}>
            Lakshyaveer &amp; Amit
          </div>

          {/* Nav links */}
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "2rem",
                color: "#1b1c1c",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#735c00"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#1b1c1c"}
            >
              {label}
            </a>
          ))}

          {/* Divider */}
          <div style={{ width: "40px", height: "2px", background: "rgba(27,28,28,0.1)", borderRadius: "999px" }} />

          {/* Admin button */}
          <button
            onClick={() => { closeMenu(); onAdminClick(); }}
            style={{
              background: "none",
              border: "1.5px solid #735c00",
              borderRadius: "999px",
              padding: "0.65rem 2.25rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.85rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#735c00", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#735c00"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#735c00"; }}
          >
            Admin
          </button>
        </div>
      )}
    </>
  );
}