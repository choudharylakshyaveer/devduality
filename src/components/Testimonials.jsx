import { REVIEWS } from "../static/reviews";
import ReviewCard from "./ReviewCard";

export default function Testimonials() {
  const columns = [
    { reviews: REVIEWS.slice(0, 4),  cls: "scroll-col-1" },
    { reviews: REVIEWS.slice(4, 8),  cls: "scroll-col-2" },
    { reviews: REVIEWS.slice(8, 12), cls: "scroll-col-3" },
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
                {[...reviews, ...reviews].map((r, i) => <ReviewCard key={`${ci}-${i}`} review={r} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}