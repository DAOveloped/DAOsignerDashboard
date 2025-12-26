// src/components/WaveBackground.jsx
import React from "react";

export default function WaveBackground() {
  return (
    <div className="wave-container absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="wave-svg absolute bottom-0 w-full h-64"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          className="wave-path fill-teal-500 opacity-70"
          d="M0,160 C360,100 720,220 1080,160 1440,100 1440,160 1440,320 L0,320 Z"
        />
      </svg>
    </div>
  );
}
