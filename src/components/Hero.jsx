import AmitPhoto from "../static/Amit_Upadhyay.png";
import LakshyaveerPhoto from "../static/Lakshyaveer.jpeg";

export default function Hero() {
    const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);
  return (
    <section className="relative overflow-hidden pt-12 md:pt-24 pb-20 md:pb-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-20">
        <div className="w-full lg:w-3/5 space-y-6 md:space-y-8 animate-fade-in-up">
          <span className="inline-block px-3 py-1 bg-primary-container/30 text-primary uppercase tracking-[0.2em] font-bold text-[10px] rounded">Architecting Digital Sanctuaries</span>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tighter text-on-background">
            Lakshyaveer <br /><span className="text-primary italic font-light">&amp;</span> Amit
          </h1>
          <p className="text-lg md:text-2xl text-secondary max-w-xl leading-relaxed font-light">Full-stack craftsmen specializing in robust Java architectures and fluid Android experiences.</p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="inline-flex items-center justify-center gap-3 bg-primary text-on-primary rounded-full px-8 py-4 font-headline font-bold text-base transition-all hover:scale-105 hover:shadow-xl active:scale-95">
              View Selected Works <Icon name="arrow_forward" className="text-xl" />
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