// src/components/FanIcon.jsx
import React from "react";

/**
 * FanIcon
 * props:
 *  - size (px)
 *  - speed (0-3)
 *  - on (boolean)
 *
 * YOUR logic is kept exactly, but:
 * - spin only when (on && speed > 0)
 * - glow only when on
 * - speed 0 OR on=false → animation stops
 */
export default function FanIcon({ size = 64, speed = 0, on = false }) {
  // calculate duration using YOUR formula
  const baseDuration = speed === 0 ? 0 : Math.max(0.5, 3 - speed * 0.8);

  // final animation duration:
  // spin only if speed>0 AND on === true
  const duration = on && speed > 0 ? baseDuration : 0;

  const style = {
    width: size,
    height: size,
    transition: "filter 300ms, transform 300ms",
    animation: duration ? `spin ${duration}s linear infinite` : "none",
    filter: on
      ? "drop-shadow(0 6px 18px rgba(124,58,237,0.55))"
      : "none",
    willChange: duration ? "transform" : "auto",
  };

  return (
    <>
      <style>
        {`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        `}
      </style>

      <svg
        viewBox="0 0 64 64"
        style={style}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bladeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#bde0fe" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </radialGradient>
        </defs>

        {/* outer ring */}
        <circle cx="32" cy="32" r="30" fill="url(#hubGrad)" opacity="0.06" />

        {/* blades */}
        <g transform="translate(32,32)">
          <path
            d="M0,-2 L18,-6 L16,2 z"
            fill="url(#bladeGrad)"
            transform="rotate(0)"
          />
          <path
            d="M0,-2 L18,-6 L16,2 z"
            fill="url(#bladeGrad)"
            transform="rotate(120)"
          />
          <path
            d="M0,-2 L18,-6 L16,2 z"
            fill="url(#bladeGrad)"
            transform="rotate(240)"
          />
        </g>

        {/* center hub */}
        <circle cx="32" cy="32" r="6" fill="url(#hubGrad)" />
      </svg>
    </>
  );
}
