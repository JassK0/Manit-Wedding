/**
 * Original SVG motifs inspired by phulkari "bagh" embroidery: repeating
 * diamonds, chevrons and a woven ribbon trim, built from geometry rather
 * than sourced artwork.
 */

const DIAMOND_COLORS = ["#e8a233", "#4c6b3d", "#d9897d", "#1f7a78"];

/** A row of alternating stitched diamonds, used between day sections. */
export function DayDivider({ className }: { className?: string }) {
  const count = 7;
  const spacing = 44;
  const width = spacing * count;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} 36`}
      width="100%"
      height="36"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points={Array.from({ length: count + 1 }, (_, i) =>
          `${i * spacing},${i % 2 === 0 ? 26 : 10}`,
        ).join(" ")}
        fill="none"
        stroke="var(--maroon)"
        strokeWidth={2}
        strokeDasharray="1 7"
        strokeLinecap="round"
        opacity={0.7}
      />
      {Array.from({ length: count }, (_, i) => {
        const cx = i * spacing + spacing / 2;
        const cy = 18;
        const size = 10;
        const color = DIAMOND_COLORS[i % DIAMOND_COLORS.length];
        return (
          <polygon
            key={i}
            points={`${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`}
            fill={color}
            stroke="var(--maroon)"
            strokeWidth={0.75}
            strokeOpacity={0.4}
          />
        );
      })}
    </svg>
  );
}

/** A woven ribbon trim, alternating triangles like a phulkari fabric edge. */
export function WovenTrim({ className }: { className?: string }) {
  const colors = ["#7c1f31", "#e8a233", "#4c6b3d", "#1f7a78", "#d9897d"];
  const teeth = 24;
  const toothWidth = 100 / teeth;

  return (
    <svg
      className={className}
      viewBox="0 0 100 6"
      width="100%"
      height="10"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: teeth }, (_, i) => {
        const x = i * toothWidth;
        const color = colors[i % colors.length];
        return (
          <polygon
            key={i}
            points={`${x},0 ${x + toothWidth},0 ${x + toothWidth / 2},6`}
            fill={color}
          />
        );
      })}
    </svg>
  );
}

/** A diamond lattice tile, used both for the hero backdrop and the full-page backdrop. */
export function PhulkariBackdrop({
  className,
  opacity = 0.14,
}: {
  className?: string;
  opacity?: number;
}) {
  const patternId = "phulkari-lattice";
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={patternId}
          width={56}
          height={56}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          <polygon
            points="28,4 48,28 28,52 8,28"
            fill="none"
            stroke="var(--maroon)"
            strokeWidth={1.5}
          />
          <circle cx={28} cy={28} r={3} fill="var(--marigold)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity={opacity} />
    </svg>
  );
}

/** A small stitched knot marker used where the thread meets each day header. */
export function ThreadKnot({ color = "var(--maroon)" }: { color?: string }) {
  return (
    <svg width={26} height={26} viewBox="0 0 26 26" aria-hidden="true" focusable="false">
      <circle cx={13} cy={13} r={11} fill="var(--surface)" stroke={color} strokeWidth={3} />
      <circle cx={13} cy={13} r={4.5} fill="var(--marigold)" />
    </svg>
  );
}

/** A tiny corner motif for event cards, echoing the flower used in the app icon. */
export function CardMotif({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={22}
      height={22}
      viewBox="0 0 22 22"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="11,2 15,11 11,20 7,11" fill="var(--marigold)" opacity={0.9} />
      <polygon points="2,11 11,7 20,11 11,15" fill="var(--mehndi)" opacity={0.7} />
      <circle cx="11" cy="11" r="2.2" fill="var(--ferozi)" />
    </svg>
  );
}
