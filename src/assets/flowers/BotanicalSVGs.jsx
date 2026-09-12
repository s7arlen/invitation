// ============================================================
// BOTANICAL SVG COMPONENTS
// Reusable SVG assets for floral decorations
// ============================================================

// Rose Branch — for corners and section headers
export const RoseBranch = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 160 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Main stem */}
    <path
      d="M20 190 Q40 150 60 120 Q80 90 100 60 Q120 30 140 10"
      stroke="#B9828C"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
    {/* Large rose bloom */}
    <g transform="translate(95, 50)" opacity="0.85">
      <circle cx="0" cy="0" r="18" fill="#F2D0D7" stroke="#B9828C" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="12" fill="#F5DDE2" />
      <circle cx="0" cy="0" r="7" fill="#E8C0C8" />
      <circle cx="-3" cy="-3" r="3" fill="#D6A8B2" opacity="0.7" />
      {/* Petals */}
      <ellipse cx="0" cy="-16" rx="5" ry="8" fill="#F2D0D7" opacity="0.7" />
      <ellipse cx="13" cy="-9" rx="5" ry="8" fill="#F2D0D7" opacity="0.7" transform="rotate(50)" />
      <ellipse cx="14" cy="6" rx="5" ry="8" fill="#F2D0D7" opacity="0.7" transform="rotate(110)" />
      <ellipse cx="0" cy="16" rx="5" ry="8" fill="#F2D0D7" opacity="0.7" transform="rotate(180)" />
      <ellipse cx="-14" cy="6" rx="5" ry="8" fill="#F2D0D7" opacity="0.7" transform="rotate(230)" />
      <ellipse cx="-13" cy="-9" rx="5" ry="8" fill="#F2D0D7" opacity="0.7" transform="rotate(310)" />
    </g>
    {/* Smaller bloom */}
    <g transform="translate(58, 112)" opacity="0.75">
      <circle cx="0" cy="0" r="12" fill="#F5DDE2" stroke="#B9828C" strokeWidth="0.5" />
      <circle cx="0" cy="0" r="7" fill="#F2D0D7" />
      <circle cx="0" cy="0" r="4" fill="#D6A8B2" />
      <ellipse cx="0" cy="-10" rx="4" ry="6" fill="#F2D0D7" opacity="0.6" />
      <ellipse cx="9" cy="-5" rx="4" ry="6" fill="#F2D0D7" opacity="0.6" transform="rotate(60)" />
      <ellipse cx="9" cy="5" rx="4" ry="6" fill="#F2D0D7" opacity="0.6" transform="rotate(120)" />
      <ellipse cx="0" cy="10" rx="4" ry="6" fill="#F2D0D7" opacity="0.6" transform="rotate(180)" />
      <ellipse cx="-9" cy="5" rx="4" ry="6" fill="#F2D0D7" opacity="0.6" transform="rotate(240)" />
    </g>
    {/* Leaves */}
    <path d="M110 68 Q125 55 135 45 Q120 50 110 68Z" fill="#8A9A82" opacity="0.6" />
    <path d="M100 80 Q85 70 75 60 Q90 68 100 80Z" fill="#8A9A82" opacity="0.5" />
    <path d="M65 125 Q80 115 90 105 Q77 112 65 125Z" fill="#8A9A82" opacity="0.55" />
    <path d="M55 138 Q40 130 32 120 Q45 128 55 138Z" fill="#8A9A82" opacity="0.5" />
    {/* Small buds */}
    <circle cx="42" cy="158" r="4" fill="#F5DDE2" stroke="#B9828C" strokeWidth="0.5" opacity="0.7" />
    <circle cx="130" cy="32" r="3" fill="#F5DDE2" stroke="#B9828C" strokeWidth="0.5" opacity="0.6" />
    {/* Tiny flowers */}
    {[0, 72, 144, 216, 288].map((deg, i) => (
      <g key={i} transform={`translate(42, 158) rotate(${deg}) translate(0, -6)`}>
        <ellipse cx="0" cy="0" rx="2" ry="3" fill="#F2D0D7" opacity="0.7" />
      </g>
    ))}
  </svg>
);

// Blossom Cluster — small flower group
export const BlossomCluster = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Stems */}
    <path d="M60 110 Q50 80 40 55" stroke="#8A9A82" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M60 110 Q65 75 72 50" stroke="#8A9A82" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M60 110 Q55 85 30 70" stroke="#8A9A82" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M60 110 Q65 90 90 75" stroke="#8A9A82" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />
    {/* Main blooms */}
    {[
      { cx: 40, cy: 48, r: 14 },
      { cx: 73, cy: 43, r: 12 },
      { cx: 28, cy: 68, r: 10 },
      { cx: 91, cy: 72, r: 10 },
    ].map(({ cx, cy, r }, i) => (
      <g key={i} transform={`translate(${cx}, ${cy})`}>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy={-r * 0.75}
            rx={r * 0.35}
            ry={r * 0.55}
            fill="#F5DDE2"
            opacity="0.8"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r={r * 0.3} fill="#D6B77A" opacity="0.9" />
      </g>
    ))}
    {/* Leaves */}
    <path d="M50 78 Q38 72 32 64 Q44 70 50 78Z" fill="#8A9A82" opacity="0.5" />
    <path d="M70 80 Q82 73 88 65 Q76 72 70 80Z" fill="#8A9A82" opacity="0.5" />
  </svg>
);

// Leaf Vine — flowing botanical line
export const LeafVine = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 200 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 40 Q50 20 100 40 Q150 60 190 40"
      stroke="#8A9A82"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
      strokeLinecap="round"
    />
    {/* Leaves along vine */}
    {[
      { x: 35, y: 30, rot: -20 },
      { x: 60, y: 38, rot: 15 },
      { x: 100, y: 42, rot: -10 },
      { x: 140, y: 38, rot: 20 },
      { x: 165, y: 32, rot: -15 },
    ].map(({ x, y, rot }, i) => (
      <g key={i} transform={`translate(${x}, ${y}) rotate(${rot})`}>
        <ellipse cx="0" cy="0" rx="8" ry="14" fill="#8A9A82" opacity="0.45" />
        <line x1="0" y1="-12" x2="0" y2="12" stroke="#6B7A64" strokeWidth="0.5" opacity="0.6" />
      </g>
    ))}
    {/* Small blossoms */}
    {[
      { x: 20, y: 38 },
      { x: 80, y: 30 },
      { x: 120, y: 48 },
      { x: 178, y: 36 },
    ].map(({ x, y }, i) => (
      <g key={i} transform={`translate(${x}, ${y})`}>
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="0" cy="-5" rx="2" ry="4" fill="#F5DDE2" opacity="0.75" transform={`rotate(${deg})`} />
        ))}
        <circle cx="0" cy="0" r="2" fill="#D6B77A" opacity="0.8" />
      </g>
    ))}
  </svg>
);

// Single Petal — for floating animation
export const SinglePetal = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <ellipse
      cx="10"
      cy="14"
      rx="7"
      ry="12"
      fill="#F5DDE2"
      opacity="0.8"
    />
    <path
      d="M10 4 Q12 10 10 20 Q8 14 10 4"
      stroke="#D6A8B2"
      strokeWidth="0.5"
      fill="none"
      opacity="0.6"
    />
  </svg>
);

// Corner Wreath Quarter — for corners of invitation
export const CornerWreath = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Branch arcs */}
    <path
      d="M10 170 Q40 80 170 10"
      stroke="#8A9A82"
      strokeWidth="1.2"
      fill="none"
      opacity="0.5"
      strokeLinecap="round"
    />
    <path
      d="M5 170 Q50 100 160 15"
      stroke="#8A9A82"
      strokeWidth="0.7"
      fill="none"
      opacity="0.35"
      strokeLinecap="round"
    />
    {/* Rose */}
    <g transform="translate(148, 22)">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse key={deg} cx="0" cy="-14" rx="5" ry="9" fill="#F2D0D7" opacity="0.8" transform={`rotate(${deg})`} />
      ))}
      <circle cx="0" cy="0" r="7" fill="#F5DDE2" />
      <circle cx="0" cy="0" r="4" fill="#E8C0C8" />
    </g>
    {/* Medium bloom */}
    <g transform="translate(80, 88)">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="0" cy="-10" rx="3.5" ry="7" fill="#F5DDE2" opacity="0.75" transform={`rotate(${deg})`} />
      ))}
      <circle cx="0" cy="0" r="4" fill="#D6B77A" opacity="0.85" />
    </g>
    {/* Small bloom */}
    <g transform="translate(35, 138)">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="0" cy="-8" rx="3" ry="5.5" fill="#F5DDE2" opacity="0.7" transform={`rotate(${deg})`} />
      ))}
      <circle cx="0" cy="0" r="3.5" fill="#D6B77A" opacity="0.8" />
    </g>
    {/* Leaves */}
    <path d="M120 50 Q135 38 148 28 Q133 40 120 50Z" fill="#8A9A82" opacity="0.55" />
    <path d="M100 70 Q85 58 78 45 Q92 58 100 70Z" fill="#8A9A82" opacity="0.5" />
    <path d="M60 108 Q75 98 88 88 Q73 98 60 108Z" fill="#8A9A82" opacity="0.5" />
    <path d="M42 128 Q28 118 20 105 Q34 116 42 128Z" fill="#8A9A82" opacity="0.45" />
    {/* Buds */}
    <circle cx="165" cy="45" r="4" fill="#F5DDE2" stroke="#B9828C" strokeWidth="0.5" opacity="0.7" />
    <circle cx="20" cy="155" r="3" fill="#F5DDE2" stroke="#B9828C" strokeWidth="0.5" opacity="0.65" />
    {/* Tiny scattered flowers */}
    {[
      { x: 55, y: 118, deg: 0 },
      { x: 110, y: 62, deg: 30 },
    ].map(({ x, y, deg }, i) => (
      <g key={i} transform={`translate(${x}, ${y}) rotate(${deg})`}>
        {[0, 72, 144, 216, 288].map((d) => (
          <ellipse key={d} cx="0" cy="-5" rx="2" ry="3.5" fill="#F2D0D7" opacity="0.65" transform={`rotate(${d})`} />
        ))}
        <circle cx="0" cy="0" r="2" fill="#D6B77A" opacity="0.7" />
      </g>
    ))}
  </svg>
);

// Countdown Wreath — circular wreath
export const CountdownWreath = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 280 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Outer circular guide (invisible) */}
    {/* Leaves arranged in a circle */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * 360;
      const rad = (angle * Math.PI) / 180;
      const cx = 140 + Math.cos(rad) * 110;
      const cy = 140 + Math.sin(rad) * 110;
      return (
        <g key={i} transform={`translate(${cx}, ${cy}) rotate(${angle + 90})`}>
          <ellipse cx="0" cy="0" rx="5" ry="10" fill="#8A9A82" opacity="0.5" />
        </g>
      );
    })}
    {/* Flowers at intervals */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const cx = 140 + Math.cos(rad) * 105;
      const cy = 140 + Math.sin(rad) * 105;
      return (
        <g key={i} transform={`translate(${cx}, ${cy})`}>
          {[0, 72, 144, 216, 288].map((d) => (
            <ellipse key={d} cx="0" cy="-9" rx="4" ry="7" fill="#F5DDE2" opacity="0.85" transform={`rotate(${d})`} />
          ))}
          <circle cx="0" cy="0" r="5" fill="#D6B77A" opacity="0.9" />
        </g>
      );
    })}
    {/* Corner roses */}
    {[45, 135, 225, 315].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const cx = 140 + Math.cos(rad) * 108;
      const cy = 140 + Math.sin(rad) * 108;
      return (
        <g key={i} transform={`translate(${cx}, ${cy})`}>
          {[0, 60, 120, 180, 240, 300].map((d) => (
            <ellipse key={d} cx="0" cy="-13" rx="5" ry="9" fill="#F2D0D7" opacity="0.8" transform={`rotate(${d})`} />
          ))}
          <circle cx="0" cy="0" r="6" fill="#F5DDE2" />
          <circle cx="0" cy="0" r="3.5" fill="#E8C0C8" />
        </g>
      );
    })}
  </svg>
);
