export default function Footer() {
  return (
    <footer className="bg-surface py-12 md:py-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div className="space-y-4">
            <div className="text-xl font-bold text-on-background font-headline">Lakshyaveer <span className="text-primary">&amp;</span> Amit</div>
            <p className="text-xs text-secondary/60 max-w-xs leading-relaxed">A design-first development duo engineering high-performance digital ecosystems.</p>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ display: "inline-flex", transition: "transform 0.25s, filter 0.25s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.12)"; e.currentTarget.style.filter = "drop-shadow(0 8px 12px rgba(0,0,0,0.25))"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "drop-shadow(0 4px 6px rgba(0,0,0,0.15))"; }}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none"><defs><radialGradient id="gh-top" cx="38%" cy="28%" r="62%"><stop offset="0%" stopColor="#4a4a4a"/><stop offset="100%" stopColor="#111111"/></radialGradient><radialGradient id="gh-shine" cx="35%" cy="25%" r="45%"><stop offset="0%" stopColor="rgba(255,255,255,0.28)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></radialGradient></defs><circle cx="19" cy="19" r="18" fill="url(#gh-top)"/><ellipse cx="19" cy="33" rx="13" ry="3.5" fill="rgba(0,0,0,0.22)"/><circle cx="19" cy="19" r="18" fill="url(#gh-shine)"/><path fillRule="evenodd" clipRule="evenodd" d="M19 9.5C13.477 9.5 9 13.977 9 19.5c0 4.418 2.865 8.166 6.839 9.488.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0119 14.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C25.138 27.663 28 23.916 28 19.5c0-5.523-4.477-10-10-10z" fill="white" opacity="0.92"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ display: "inline-flex", transition: "transform 0.25s, filter 0.25s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.12)"; e.currentTarget.style.filter = "drop-shadow(0 8px 12px rgba(10,102,194,0.4))"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "drop-shadow(0 4px 6px rgba(10,102,194,0.2))"; }}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none"><defs><radialGradient id="li-top" cx="35%" cy="25%" r="65%"><stop offset="0%" stopColor="#2a9fd6"/><stop offset="100%" stopColor="#0a66c2"/></radialGradient><radialGradient id="li-shine" cx="32%" cy="22%" r="44%"><stop offset="0%" stopColor="rgba(255,255,255,0.3)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></radialGradient></defs><circle cx="19" cy="19" r="18" fill="url(#li-top)"/><ellipse cx="19" cy="33" rx="13" ry="3.5" fill="rgba(0,0,0,0.15)"/><circle cx="19" cy="19" r="18" fill="url(#li-shine)"/><path d="M13 15.5h-2.5V27H13V15.5zM11.75 14.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM27 27h-2.5v-5.5c0-1.38-.56-2-1.63-2-1.14 0-1.87.75-1.87 2V27H18.5V15.5H21v1.2c.54-.83 1.5-1.45 2.75-1.45C26.1 15.25 27 16.7 27 19.5V27z" fill="white" opacity="0.95"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" style={{ display: "inline-flex", transition: "transform 0.25s, filter 0.25s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.12)"; e.currentTarget.style.filter = "drop-shadow(0 8px 12px rgba(0,0,0,0.3))"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "drop-shadow(0 4px 6px rgba(0,0,0,0.15))"; }}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none"><defs><radialGradient id="tw-top" cx="35%" cy="25%" r="65%"><stop offset="0%" stopColor="#3a3a3a"/><stop offset="100%" stopColor="#000000"/></radialGradient><radialGradient id="tw-shine" cx="32%" cy="22%" r="44%"><stop offset="0%" stopColor="rgba(255,255,255,0.22)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></radialGradient></defs><circle cx="19" cy="19" r="18" fill="url(#tw-top)"/><ellipse cx="19" cy="33" rx="13" ry="3.5" fill="rgba(0,0,0,0.2)"/><circle cx="19" cy="19" r="18" fill="url(#tw-shine)"/><path d="M21.5 12h2.8l-6.1 7 7.2 9.5H21l-4.4-5.8-5 5.8H8.8l6.5-7.5L8.5 12h5.5l4 5.3L21.5 12zm-1 14.8h1.5L14 13.4h-1.6l8.1 13.4z" fill="white" opacity="0.95"/></svg>
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
