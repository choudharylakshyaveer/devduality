export default 
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
          <h3 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">Crafting solutions with precision and editorial intent.</h3>
          <div className="w-20 h-1.5 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}
