// Top-view car as inline SVG (no external assets). Swap for an <img> of your own PNG if you want.
export default function CarSvg() {
  return (
    <svg viewBox="0 0 100 220" xmlns="http://www.w3.org/2000/svg" className="block h-auto w-full overflow-visible drop-shadow-[0_18px_20px_rgba(0,0,0,0.6)]">
      <defs>
        <linearGradient id="body" x1="0" x2="1">
          <stop offset="0" stopColor="#e5600a" /><stop offset=".5" stopColor="#ff8a2b" /><stop offset="1" stopColor="#e5600a" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff3c4" stopOpacity=".35" /><stop offset="1" stopColor="#fff3c4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="22,14 78,14 112,-170 -12,-170" fill="url(#beam)" />
      <rect x="4" y="40" width="13" height="34" rx="4" fill="#0b0b0d" />
      <rect x="83" y="40" width="13" height="34" rx="4" fill="#0b0b0d" />
      <rect x="4" y="148" width="13" height="36" rx="4" fill="#0b0b0d" />
      <rect x="83" y="148" width="13" height="36" rx="4" fill="#0b0b0d" />
      <path d="M50 4C74 4 85 30 85 70L87 160C87 200 70 216 50 216C30 216 13 200 13 160L15 70C15 30 26 4 50 4Z" fill="url(#body)" />
      <path d="M30 82Q50 66 70 82L66 110Q50 102 34 110Z" fill="#0b1220" />
      <rect x="34" y="112" width="32" height="34" rx="6" fill="#ffa24d" />
      <path d="M34 150Q50 156 66 150L70 174Q50 182 30 174Z" fill="#0b1220" />
      <rect x="47" y="8" width="6" height="60" rx="3" fill="rgba(255,255,255,.18)" />
      <ellipse cx="29" cy="15" rx="7" ry="3" fill="#fff6d1" />
      <ellipse cx="71" cy="15" rx="7" ry="3" fill="#fff6d1" />
      <rect x="26" y="208" width="14" height="3" rx="1.5" fill="#ff2b2b" />
      <rect x="60" y="208" width="14" height="3" rx="1.5" fill="#ff2b2b" />
    </svg>
  )
}
