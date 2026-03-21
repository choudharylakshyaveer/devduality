// src/static/ChatbotIcon.jsx
export default function ChatbotIcon({ size = 60 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <style>{`
          .cb-float  { animation: cbFloat 3.5s ease-in-out infinite; }
          .cb-blink  { animation: cbBlink 3s ease-in-out infinite; }
          .cb-pulse  { animation: cbPulse 2s ease-in-out infinite; }
          .cb-pulse2 { animation: cbPulse 2s ease-in-out 0.7s infinite; }
          .cb-pulse3 { animation: cbPulse 2s ease-in-out 1.4s infinite; }
          .cb-wave1  { animation: cbWave 1.4s ease-in-out infinite; transform-origin: center; }
          .cb-wave2  { animation: cbWave 1.4s ease-in-out 0.25s infinite; transform-origin: center; }
          .cb-wave3  { animation: cbWave 1.4s ease-in-out 0.5s infinite; transform-origin: center; }
          .cb-spin   { animation: cbSpin 6s linear infinite; transform-origin: 50px 50px; }
          @keyframes cbFloat {
            0%,100% { transform: translateY(0px); }
            50%     { transform: translateY(-5px); }
          }
          @keyframes cbBlink {
            0%,88%,100% { transform: scaleY(1); transform-origin: center; }
            94%         { transform: scaleY(0.08); transform-origin: center; }
          }
          @keyframes cbPulse {
            0%,100% { opacity: 0.25; }
            50%     { opacity: 1; }
          }
          @keyframes cbWave {
            0%,100% { transform: scaleY(0.35); }
            50%     { transform: scaleY(1); }
          }
          @keyframes cbSpin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>

        <radialGradient id="cb-bodyGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#2a3f7a" />
          <stop offset="100%" stopColor="#0f1a3a" />
        </radialGradient>
        <radialGradient id="cb-eyeGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <radialGradient id="cb-topGrad" cx="50%" cy="0%" r="100%">
          <stop offset="0%"   stopColor="#3b5bdb" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b5bdb" stopOpacity="0" />
        </radialGradient>
        <filter id="cb-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Spinning orbit ring ── */}
      <g className="cb-spin">
        <circle cx="50" cy="8"  r="3" fill="#4f8ef7" opacity="0.7" filter="url(#cb-glow)" />
        <circle cx="92" cy="50" r="2" fill="#a78bfa" opacity="0.6" />
        <circle cx="50" cy="92" r="3" fill="#4f8ef7" opacity="0.7" filter="url(#cb-glow)" />
        <circle cx="8"  cy="50" r="2" fill="#a78bfa" opacity="0.6" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#3b5bdb" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.3" />
      </g>

      {/* ── Floating robot body ── */}
      <g className="cb-float">
        {/* Drop shadow */}
        <rect x="22" y="34" width="56" height="48" rx="12" fill="#060e24" opacity="0.5" />
        {/* Body */}
        <rect x="20" y="30" width="60" height="48" rx="12" fill="url(#cb-bodyGrad)" stroke="#3b5bdb" strokeWidth="1.2" />
        {/* Top sheen */}
        <rect x="20" y="30" width="60" height="20" rx="12" fill="url(#cb-topGrad)" />
        {/* Glass highlight */}
        <rect x="22" y="31" width="56" height="6" rx="8" fill="white" opacity="0.07" />
        {/* Left edge highlight */}
        <rect x="20" y="34" width="3" height="40" rx="1.5" fill="white" opacity="0.05" />

        {/* ── Antenna ── */}
        <rect x="48" y="18" width="4" height="14" rx="2" fill="#1e3a6e" />
        <circle cx="50" cy="15" r="5" fill="#1d4ed8" filter="url(#cb-glow)" />
        <circle cx="50" cy="15" r="3" fill="#3b82f6" className="cb-pulse" />
        <circle cx="50" cy="15" r="1.5" fill="#bfdbfe" />

        {/* ── Eyes (blinking) ── */}
        <g className="cb-blink">
          {/* Left eye */}
          <circle cx="36" cy="50" r="9"   fill="#0a0f1e" />
          <circle cx="36" cy="50" r="7"   fill="url(#cb-eyeGrad)" />
          <circle cx="36" cy="50" r="4"   fill="#93c5fd" />
          <circle cx="36" cy="50" r="2"   fill="#dbeafe" />
          <circle cx="38.5" cy="47.5" r="1.2" fill="white" opacity="0.9" />
          <circle cx="36" cy="50" r="8.5" fill="none" stroke="#60a5fa" strokeWidth="0.6" opacity="0.7" />
          {/* Right eye */}
          <circle cx="64" cy="50" r="9"   fill="#0a0f1e" />
          <circle cx="64" cy="50" r="7"   fill="url(#cb-eyeGrad)" />
          <circle cx="64" cy="50" r="4"   fill="#93c5fd" />
          <circle cx="64" cy="50" r="2"   fill="#dbeafe" />
          <circle cx="66.5" cy="47.5" r="1.2" fill="white" opacity="0.9" />
          <circle cx="64" cy="50" r="8.5" fill="none" stroke="#60a5fa" strokeWidth="0.6" opacity="0.7" />
        </g>

        {/* ── Mouth / wave bars ── */}
        <rect x="33" y="66" width="34" height="8" rx="4" fill="#0a0f1e" />
        <rect x="36" y="68" width="4" height="4" rx="2" fill="#3b82f6" className="cb-wave1" />
        <rect x="42" y="68" width="4" height="4" rx="2" fill="#3b82f6" className="cb-wave2" />
        <rect x="48" y="68" width="4" height="4" rx="2" fill="#3b82f6" className="cb-wave3" />
        <rect x="54" y="68" width="4" height="4" rx="2" fill="#3b82f6" className="cb-wave1" />
        <rect x="60" y="68" width="4" height="4" rx="2" fill="#3b82f6" className="cb-wave2" />

        {/* ── Ear studs ── */}
        <circle cx="22" cy="45" r="2" fill="#1e3a6e" />
        <circle cx="78" cy="45" r="2" fill="#1e3a6e" />

        {/* ── Top status dots ── */}
        <circle cx="29" cy="37" r="2" fill="#3b82f6" className="cb-pulse" />
        <circle cx="36" cy="37" r="2" fill="#3b82f6" className="cb-pulse2" />
        <circle cx="43" cy="37" r="2" fill="#3b82f6" className="cb-pulse3" />
      </g>
    </svg>
  );
}