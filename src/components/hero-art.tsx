export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 1000"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
    >
      <rect width="1600" height="1000" fill="#171310" />
      <rect width="1600" height="1000" fill="url(#hero-vignette)" />
      <g opacity="0.55" stroke="#a9824c" strokeWidth="1" fill="none">
        <path d="M -100 700 C 300 500 700 900 1100 620 S 1700 380 1900 520" />
        <path d="M -100 800 C 320 640 760 980 1140 720 S 1720 480 1900 640" opacity="0.6" />
        <path d="M -100 560 C 260 420 640 700 1020 480 S 1660 260 1900 400" opacity="0.35" />
      </g>
      <circle cx="1220" cy="260" r="340" fill="#a9824c" opacity="0.08" />
      <circle cx="260" cy="120" r="220" fill="#cba86a" opacity="0.06" />
      <text
        x="800"
        y="560"
        textAnchor="middle"
        fill="#f7f3ec"
        fontFamily="var(--font-display)"
        fontSize="360"
        opacity="0.05"
      >
        ĐC
      </text>
      <defs>
        <radialGradient id="hero-vignette" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#171310" stopOpacity="0" />
          <stop offset="100%" stopColor="#0c0a08" stopOpacity="0.55" />
        </radialGradient>
      </defs>
    </svg>
  );
}
