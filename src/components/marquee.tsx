const items = [
  "Reels & Shorts ads",
  "UGC creative",
  "Product films",
  "Motion graphics",
  "Flyers & posters",
  "Direct mail",
  "Meta Ads management",
  "Creative testing",
  "Offer strategy",
  "Weekly reporting",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-ink-line bg-ink-raised py-5">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-ash whitespace-nowrap"
              >
                {item}
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
