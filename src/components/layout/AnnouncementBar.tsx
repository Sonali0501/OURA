const MESSAGES = [
  "Free delivery for orders above ₹399",
  "Trusted by 22,000+ Customers",
  "Same day or next day delivery in eligible pincodes*",
];

// Enough copies that one run is wider than any screen; the track then holds
// two identical runs and slides -50%, so the loop is seamless.
const RUN = [...MESSAGES, ...MESSAGES];

function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {RUN.map((m, i) => (
        <li
          key={i}
          className="flex items-center whitespace-nowrap text-xs sm:text-[13px] font-sans-ui font-medium tracking-[0.02em] text-ivory"
        >
          <span className="px-6 sm:px-10">{m}</span>
          <span className="text-ivory/50" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="bg-gold h-8 flex items-center overflow-hidden" role="region" aria-label="Announcements">
      <div className="marquee w-full group">
        <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
          <Run />
          <Run hidden />
        </div>
      </div>
    </div>
  );
}
