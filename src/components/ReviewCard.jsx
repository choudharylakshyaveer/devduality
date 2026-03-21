import StarRating from "./StarRating";

export default function ReviewCard({ review }) {
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