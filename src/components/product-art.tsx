interface ProductArtProps {
  swatch: string;
  accent: string;
  label: string;
  seed?: number;
  className?: string;
}

function seededPath(seed: number, accent: string) {
  const a = 60 + (seed % 5) * 20;
  const b = 180 + (seed % 7) * 15;
  return (
    <>
      <circle cx={a} cy="90" r="130" fill={accent} opacity="0.12" />
      <path
        d={`M -20 ${b} Q 200 ${b - 120} 420 ${b - 20}`}
        stroke={accent}
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
      <path
        d={`M -20 ${b + 60} Q 200 ${b - 60} 420 ${b + 40}`}
        stroke={accent}
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />
    </>
  );
}

export function ProductArt({ swatch, accent, label, seed = 1, className }: ProductArtProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
    >
      <rect width="400" height="500" fill={swatch} />
      {seededPath(seed, accent)}
      <rect x="16" y="16" width="368" height="468" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
      <text
        x="32"
        y="52"
        fill={accent}
        fontFamily="var(--font-sans)"
        fontSize="11"
        letterSpacing="2.5"
        opacity="0.85"
      >
        ĐỨC CHINH
      </text>
      <text
        x="32"
        y="470"
        fill={accent}
        fontFamily="var(--font-display)"
        fontSize="42"
        opacity="0.9"
      >
        ĐC
      </text>
    </svg>
  );
}
