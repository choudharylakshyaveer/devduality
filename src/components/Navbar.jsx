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
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 w-full z-50 border-b border-black/10 shadow-sm">
      <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-screen-2xl mx-auto">

        {/* Logo */}
        <div className="text-xl md:text-2xl font-bold tracking-tighter text-on-background font-headline select-none">
          Lakshyaveer{" "}
          <span className="text-primary italic font-light">&amp;</span> Amit
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
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
          <button className="bg-primary text-on-primary rounded-full px-5 py-2 font-label text-[12px] font-bold tracking-tight transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95">
            Get in Touch
          </button>

          {/* Admin */}
          <button
            onClick={onAdminClick}
            style={{
              display: "flex", alignItems: "center", gap: "0.45rem",
              background: "none",
              border: "1.5px solid rgba(27,28,28,0.14)",
              borderRadius: "999px",
              padding: "0.5rem 1.1rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.09em", textTransform: "uppercase",
              color: "#546066", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#735c00";
              e.currentTarget.style.color = "#735c00";
              e.currentTarget.style.transform = "scale(1.06)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(115,92,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(27,28,28,0.14)";
              e.currentTarget.style.color = "#546066";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Admin
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-on-background" onClick={toggleMenu} aria-label="Toggle menu">
          <Icon name="menu" />
        </button>
      </div>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-background z-[60] flex flex-col items-center justify-center gap-8 md:hidden">
          <button className="absolute top-6 right-6 p-2" onClick={closeMenu} aria-label="Close menu">
            <Icon name="close" className="text-3xl" />
          </button>

          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              className="text-4xl font-headline font-extrabold tracking-tight text-on-background hover:text-primary transition-colors duration-200"
            >
              {label}
            </a>
          ))}

          <button
            onClick={() => { closeMenu(); onAdminClick(); }}
            className="text-2xl font-headline font-bold text-primary hover:opacity-75 transition-opacity duration-200"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            Admin
          </button>
        </div>
      )}
    </nav>
  );
}