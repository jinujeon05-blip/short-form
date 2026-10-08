// Inline SVG flags: emoji flags render as plain letters on Windows.

export function FlagVN() {
  return (
    <svg className="flag" viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#DA251D" />
      <polygon
        fill="#FFFF00"
        points="15,4 16.18,7.62 19.99,7.62 16.9,9.86 18.09,13.48 15,11.24 11.91,13.48 13.1,9.86 10.01,7.62 13.82,7.62"
      />
    </svg>
  );
}

export function FlagKR() {
  // Trigram bars, drawn once and rotated into each corner.
  const bar = (y: number, broken: boolean) =>
    broken ? (
      <g key={y}>
        <rect x={-3} y={y} width={2.6} height={0.9} />
        <rect x={0.4} y={y} width={2.6} height={0.9} />
      </g>
    ) : (
      <rect key={y} x={-3} y={y} width={6} height={0.9} />
    );
  const trigram = (pattern: boolean[], angle: number) => (
    <g transform={`translate(15 10) rotate(${angle}) translate(0 -8.2)`} fill="#000">
      {pattern.map((broken, i) => bar(i * 1.5 - 1.4, broken))}
    </g>
  );
  return (
    <svg className="flag" viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#FFFFFF" />
      <g transform="translate(15 10) rotate(-33.7)">
        <circle r="5" fill="#0047A0" />
        <path d="M-5 0 A5 5 0 0 1 5 0 A2.5 2.5 0 0 1 0 0 A2.5 2.5 0 0 0 -5 0 Z" fill="#CD2E3A" />
      </g>
      {trigram([false, false, false], -56.3)}
      {trigram([true, true, true], 123.7)}
      {trigram([false, true, false], 56.3)}
      {trigram([true, false, true], -123.7)}
      <rect width="30" height="20" fill="none" stroke="#d6dbe3" strokeWidth="0.6" />
    </svg>
  );
}
