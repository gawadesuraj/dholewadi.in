import React, { useState, useEffect, useMemo, useRef } from "react";
// Importing the custom chevron icons for clean styling
import { ChevronRight, ChevronLeft, Zap } from "lucide-react";

const BAR_HEIGHT = 125; // Slightly increased height for better visual space
const QUOTE_BG_COLOR = "#059669"; // Emerald green (This constant is unused in the new structure, but retained)

const quotes = [
  "सर्वांसाठी विकास ग्रामविकास आमची प्राथमिकता.",
  "प्रत्येक कार्यामध्ये पारदर्शकता आणि सेवा.",
  "स्वच्छ गाव, निरोगी समाज.",
  "सहभागातून मजबूत ग्रामपंचायत तयार होते.",
];

// --- Custom Chevron Icon Component (Replaced the internal SVG) ---
function CustomChevron({ dir = "left", onClick, ariaLabel }) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      // Glassmorphism controls: highly visible, large touch target
      className={`
        absolute top-1/2 -translate-y-1/2 z-10 p-3 
        flex items-center justify-center
        w-10 h-10 rounded-full md:w-12 md:h-12
        bg-white/20 hover:bg-white/40 active:bg-white/50
        shadow-xl border border-white/40 backdrop-blur-sm
        focus:outline-none focus:ring-4 focus:ring-white/80 transition-all duration-200
        ${dir === "left" ? "left-3" : "right-3"}
      `}
    >
      <Icon size={24} className="text-white drop-shadow-md" />
    </button>
  );
}

export default function QuoteStrip() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const prefersReducedMotion = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
    []
  );
  const timer = useRef(null);
  const INTERVAL = 5000; // Increased autoplay interval to 5 seconds

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
      setAnimKey((k) => k + 1);
    }, INTERVAL);
    return () => clearInterval(timer.current);
  }, [paused]);

  const goPrev = () => {
    setIndex((i) => (i - 1 + quotes.length) % quotes.length);
    setAnimKey((k) => k + 1);
  };
  const goNext = () => {
    setIndex((i) => (i + 1) % quotes.length);
    setAnimKey((k) => k + 1);
  };

  const onKey = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  // Use a class name for animation states
  const animationClass = prefersReducedMotion ? "" : "animate-quote-enter";

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Inspiring quotes slider"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // 🎨 CHANGED BG COLOR: Deep Indigo/Violet gradient for high contrast
      className="w-full bg-gradient-to-r from-green-800 to-lime-700 relative overflow-hidden"
      data-aos="fade-up"
    >
      {/* Subtle background texture for depth */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#ffffff20 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      ></div>

      <div
        className="max-w-7xl mx-auto px-4 relative flex items-center justify-center"
        style={{ height: BAR_HEIGHT }}
      >
        {/* Controls (Now using the styled CustomChevron component) */}
        <CustomChevron dir="left" onClick={goPrev} ariaLabel="Previous quote" />
        <CustomChevron dir="right" onClick={goNext} ariaLabel="Next quote" />

        {/* Viewport for Quotes */}
        <div className="h-full w-full overflow-hidden flex items-center justify-center">
          <div className="px-16 text-center w-full">
            {/* We use key={animKey} to force a re-render and restart the CSS animation. */}
            <div
              key={animKey}
              className={`text-white text-base md:text-xl lg:text-2xl font-bold leading-tight drop-shadow-lg opacity-0 ${animationClass}`}
              style={{ animationDuration: "600ms" }} // Apply duration inline
            >
              {/* Zap icon retains the bright yellow-300 color for strong theme contrast */}
              <Zap className="inline-block w-6 h-6 mr-3 text-yellow-300 drop-shadow-md" />
              “{quotes[index]}”
            </div>
          </div>
        </div>
      </div>

      {/* 🎨 CSS for smooth animation (moved out of component for cleaner JSX) */}
      <style>{`
        .animate-quote-enter {
          animation-name: quote-enter-fade;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
        @keyframes quote-enter-fade {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        /* Hide controls on very small screens if necessary to prevent overlap */
        @media (max-width: 400px) {
            .absolute.left-3, .absolute.right-3 {
                padding: 0.5rem; /* Smaller padding */
                width: 3rem; /* Smaller button size */
                height: 3rem;
            }
        }
      `}</style>
    </section>
  );
}
