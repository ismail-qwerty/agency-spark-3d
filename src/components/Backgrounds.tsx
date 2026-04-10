// GradientOrb — pure CSS, zero JS animations, only transform/opacity for GPU compositing
export function GradientOrb() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
    </div>
  );
}

/**
 * AuroraBackground — GPU-only CSS animation approach.
 *
 * WHY it was laggy before:
 *  • framer-motion drove animations via JS `requestAnimationFrame`, writing
 *    inline `transform` styles every frame → main thread work → jank.
 *  • Multiple animated blur layers compound GPU overdraw.
 *
 * HOW this version is fast:
 *  • All motion is pure CSS `@keyframes` → handed to the GPU compositor thread,
 *    zero main-thread involvement.
 *  • We use `will-change: transform` only on the two slow-moving orbs so the
 *    browser promotes them to their own compositing layer upfront.
 *  • Static decorative elements (pills, triangles, dots, leaf) have NO animation
 *    at all — they're plain DOM, painted once.
 *  • Heavy `filter: blur()` is isolated to two large orbs that move slowly
 *    (24 s / 32 s cycles) so raster invalidation is rare.
 *  • `contain: strict` on the root clips overflow and prevents layout thrash
 *    propagating upward.
 */
export function AuroraBackground() {
  return (
    <>
      <style>{`
        @keyframes orb-drift-a {
          0%   { transform: translate(0px,    0px)    scale(1);    }
          25%  { transform: translate(60px,  -80px)   scale(1.05); }
          50%  { transform: translate(-40px, -140px)  scale(0.97); }
          75%  { transform: translate(80px,  -60px)   scale(1.03); }
          100% { transform: translate(0px,    0px)    scale(1);    }
        }
        @keyframes orb-drift-b {
          0%   { transform: translate(0px,   0px)   scale(1);    }
          30%  { transform: translate(-70px, 50px)  scale(1.04); }
          60%  { transform: translate(40px,  90px)  scale(0.96); }
          100% { transform: translate(0px,   0px)   scale(1);    }
        }
        @keyframes sphere-float-0 {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }
        @keyframes sphere-float-1 {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-7px); }
        }
        @keyframes sphere-float-2 {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-6px); }
        }
        @keyframes tri-bob {
          0%, 100% { transform: translateY(0px) rotate(0deg);   }
          50%       { transform: translateY(-6px) rotate(4deg);  }
        }
        @keyframes tri-bob-b {
          0%, 100% { transform: translateY(0px) rotate(-20deg); }
          50%       { transform: translateY(6px) rotate(-24deg); }
        }
        .aurora-orb {
          position: absolute;
          border-radius: 9999px;
          will-change: transform;
          pointer-events: none;
        }
        .aurora-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, hsl(192 95% 55% / 0.07) 0%, hsl(280 80% 60% / 0.05) 40%, transparent 70%);
          filter: blur(80px);
          animation: orb-drift-a 30s ease-in-out infinite;
        }
        .aurora-orb-2 {
          width: 400px; height: 400px;
          right: 0; bottom: 0;
          background: radial-gradient(circle, hsl(280 90% 65% / 0.05) 0%, hsl(192 95% 55% / 0.04) 50%, transparent 70%);
          filter: blur(100px);
          animation: orb-drift-b 35s ease-in-out infinite;
        }
        .hero-sphere { will-change: transform; }
        .hero-sphere-0 { animation: sphere-float-0 4s ease-in-out infinite; }
        .hero-sphere-1 { animation: sphere-float-1 5s ease-in-out infinite 0.3s; }
        .hero-sphere-2 { animation: sphere-float-2 6s ease-in-out infinite 0.6s; }
        .hero-tri-a   { animation: tri-bob   8s ease-in-out infinite; will-change: transform; }
        .hero-tri-b   { animation: tri-bob-b 7s ease-in-out infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          .aurora-orb, .hero-sphere, .hero-tri-a, .hero-tri-b { animation: none !important; }
        }
      `}</style>

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ contain: "strict" }}
      >
        {/* ── Base gradient ── */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #0d1229 40%, #080d1f 100%)" }}
        />

        {/* ── Slow ambient orbs (CSS-animated, GPU compositor) ── */}
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />

        {/* ── Static diagonal pill stripes ── */}
        {([
          { width: "55%", top: "8%",  left: "-5%", opacity: 0.18 },
          { width: "65%", top: "20%", left: "5%",  opacity: 0.14 },
          { width: "70%", top: "33%", left: "15%", opacity: 0.18 },
          { width: "60%", top: "47%", left: "25%", opacity: 0.14 },
          { width: "55%", top: "60%", left: "35%", opacity: 0.18 },
          { width: "50%", top: "73%", left: "45%", opacity: 0.14 },
        ] as const).map((pill, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: pill.width,
              height: "90px",
              top: pill.top,
              left: pill.left,
              transform: "rotate(-35deg)",
              background: "rgba(18, 26, 58, 0.9)",
              opacity: pill.opacity,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          />
        ))}

        {/* ── Floating 3-D spheres (CSS keyframes, GPU only) ── */}
        {([
          { size: 110, top: "3%",  right: "5%"  },
          { size: 80,  top: "14%", right: "1%"  },
          { size: 60,  top: "8%",  right: "14%" },
        ] as const).map((s, i) => (
          <div
            key={i}
            className={`absolute rounded-full hero-sphere hero-sphere-${i}`}
            style={{
              width:  s.size,
              height: s.size,
              top:    s.top,
              right:  s.right,
              background:
                "radial-gradient(circle at 35% 35%, #1e2d5a, #0d1635 60%, #060c1e)",
              boxShadow:
                "inset -4px -4px 16px rgba(0,0,0,0.6), inset 2px 2px 8px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4)",
            }}
          />
        ))}

        {/* ── Triangle A (top-left) ── */}
        <div
          className="absolute hero-tri-a"
          style={{
            top: "2%", left: "4%",
            width: 0, height: 0,
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderBottom: "90px solid #121a3a",
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.5))",
            opacity: 0.7,
          }}
        />

        {/* ── Triangle B (bottom-right) ── */}
        <div
          className="absolute hero-tri-b"
          style={{
            bottom: "8%", right: "8%",
            width: 0, height: 0,
            borderLeft: "40px solid transparent",
            borderRight: "40px solid transparent",
            borderTop: "70px solid #121a3a",
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.5))",
            opacity: 0.6,
          }}
        />

        {/* ── Monstera leaf SVG (static) ── */}
        <svg
          aria-hidden="true"
          className="absolute"
          style={{ bottom: "0%", left: "0%", width: "340px", height: "340px", opacity: 0.07 }}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 180 C60 160, 20 120, 30 70 C40 30, 80 10, 100 30 C120 10, 160 30, 170 70 C180 120, 140 160, 100 180Z" stroke="#4a6fa5" strokeWidth="1.5" fill="none" />
          <path d="M100 180 L100 30" stroke="#4a6fa5" strokeWidth="1" fill="none" />
          <path d="M100 120 C80 100, 40 90, 30 70"  stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
          <path d="M100 120 C120 100, 160 90, 170 70" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
          <path d="M100 150 C75 135, 45 115, 35 90"  stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
          <path d="M100 150 C125 135, 155 115, 165 90" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
          <path d="M100 90 C85 75, 55 65, 45 50"   stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
          <path d="M100 90 C115 75, 145 65, 155 50"  stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
          <ellipse cx="70"  cy="110" rx="8" ry="12" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
          <ellipse cx="130" cy="110" rx="8" ry="12" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
          <ellipse cx="85"  cy="70"  rx="5" ry="8"  stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
          <ellipse cx="115" cy="70"  rx="5" ry="8"  stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        </svg>

        {/* ── X marks (static) ── */}
        {(["20%", "30%", "40%"] as const).map((top, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute text-white select-none"
            style={{ top, left: "3%", fontSize: "22px", opacity: 0.85, fontWeight: 900, lineHeight: 1 }}
          >
            ✕
          </div>
        ))}

        {/* ── Wave lines SVG (static) ── */}
        <svg
          aria-hidden="true"
          className="absolute"
          style={{ top: "5%", left: "33%", width: "80px", height: "30px", opacity: 0.5 }}
          viewBox="0 0 80 30"
        >
          <path d="M0 8 Q10 2,20 8 Q30 14,40 8 Q50 2,60 8 Q70 14,80 8"   stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M0 18 Q10 12,20 18 Q30 24,40 18 Q50 12,60 18 Q70 24,80 18" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>

        {/* ── Rectangle outline (static) ── */}
        <div
          aria-hidden="true"
          className="absolute border border-white/50"
          style={{ top: "5%", left: "50%", width: "100px", height: "28px", opacity: 0.5 }}
        />

        {/* ── Dot grid (static) ── */}
        <div className="absolute" style={{ bottom: "12%", right: "5%" }}>
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex gap-3 mb-3">
              {[0, 1, 2].map((col) => (
                <div
                  key={col}
                  className="rounded-full"
                  style={{
                    width: "10px", height: "10px",
                    background: (row + col) % 2 === 0
                      ? "rgba(200,210,230,0.6)"
                      : "rgba(100,120,160,0.3)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ── Darken overlay (static) ── */}
        <div className="absolute inset-0" style={{ background: "rgba(6, 10, 22, 0.45)" }} />
      </div>
    </>
  );
}
