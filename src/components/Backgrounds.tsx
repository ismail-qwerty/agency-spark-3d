import { motion } from "framer-motion";

export function GradientOrb() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, hsl(192 95% 55%) 0%, hsl(280 80% 60%) 40%, hsl(340 80% 55%) 70%, transparent 100%)", filter: "blur(80px)" }}
        animate={{ x: [0, 300, -200, 100, 0], y: [0, -200, 150, -100, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, hsl(280 90% 65%) 0%, hsl(192 95% 55%) 50%, transparent 100%)", filter: "blur(100px)" }}
        animate={{ x: [0, -250, 150, -50, 0], y: [0, 150, -200, 100, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark navy base */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #0d1229 40%, #080d1f 100%)" }}
      />

      {/* Diagonal rounded pill shapes - matching the reference image */}
      {[
        { width: "55%", height: "90px", top: "8%", left: "-5%", rotate: "-35deg", opacity: 0.18 },
        { width: "65%", height: "90px", top: "20%", left: "5%", rotate: "-35deg", opacity: 0.14 },
        { width: "70%", height: "90px", top: "33%", left: "15%", rotate: "-35deg", opacity: 0.18 },
        { width: "60%", height: "90px", top: "47%", left: "25%", rotate: "-35deg", opacity: 0.14 },
        { width: "55%", height: "90px", top: "60%", left: "35%", rotate: "-35deg", opacity: 0.18 },
        { width: "50%", height: "90px", top: "73%", left: "45%", rotate: "-35deg", opacity: 0.14 },
      ].map((pill, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: pill.width,
            height: pill.height,
            top: pill.top,
            left: pill.left,
            transform: `rotate(${pill.rotate})`,
            background: "rgba(18, 26, 58, 0.9)",
            opacity: pill.opacity,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        />
      ))}

      {/* 3D spheres - top right cluster */}
      {[
        { size: 110, top: "3%", right: "5%", delay: 0 },
        { size: 80, top: "14%", right: "1%", delay: 0.3 },
        { size: 60, top: "8%", right: "14%", delay: 0.6 },
      ].map((sphere, i) => (
        <motion.div
          key={`sphere-${i}`}
          className="absolute rounded-full"
          style={{
            width: sphere.size,
            height: sphere.size,
            top: sphere.top,
            right: sphere.right,
            background: `radial-gradient(circle at 35% 35%, #1e2d5a, #0d1635 60%, #060c1e)`,
            boxShadow: "inset -4px -4px 16px rgba(0,0,0,0.6), inset 2px 2px 8px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4)",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: sphere.delay }}
        />
      ))}

      {/* 3D triangles / cone shapes */}
      <motion.div
        className="absolute"
        style={{
          top: "2%",
          left: "4%",
          width: 0,
          height: 0,
          borderLeft: "50px solid transparent",
          borderRight: "50px solid transparent",
          borderBottom: "90px solid #121a3a",
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.5))",
          opacity: 0.7,
        }}
        animate={{ rotate: [0, 5, -3, 0], y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom left triangle */}
      <motion.div
        className="absolute"
        style={{
          bottom: "8%",
          right: "8%",
          width: 0,
          height: 0,
          borderLeft: "40px solid transparent",
          borderRight: "40px solid transparent",
          borderTop: "70px solid #121a3a",
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.5))",
          opacity: 0.6,
          transform: "rotate(-20deg)",
        }}
        animate={{ rotate: [-20, -15, -25, -20], y: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Monstera leaf outline - bottom left */}
      <svg
        className="absolute"
        style={{ bottom: "0%", left: "0%", width: "340px", height: "340px", opacity: 0.07 }}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 180 C60 160, 20 120, 30 70 C40 30, 80 10, 100 30 C120 10, 160 30, 170 70 C180 120, 140 160, 100 180Z"
          stroke="#4a6fa5"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M100 180 L100 30" stroke="#4a6fa5" strokeWidth="1" fill="none" />
        <path d="M100 120 C80 100, 40 90, 30 70" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        <path d="M100 120 C120 100, 160 90, 170 70" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        <path d="M100 150 C75 135, 45 115, 35 90" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        <path d="M100 150 C125 135, 155 115, 165 90" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        <path d="M100 90 C85 75, 55 65, 45 50" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        <path d="M100 90 C115 75, 145 65, 155 50" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        {/* Holes in leaf */}
        <ellipse cx="70" cy="110" rx="8" ry="12" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        <ellipse cx="130" cy="110" rx="8" ry="12" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        <ellipse cx="85" cy="70" rx="5" ry="8" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
        <ellipse cx="115" cy="70" rx="5" ry="8" stroke="#4a6fa5" strokeWidth="0.8" fill="none" />
      </svg>

      {/* X marks - left side */}
      {[{ top: "20%", left: "3%" }, { top: "30%", left: "3%" }, { top: "40%", left: "3%" }].map((pos, i) => (
        <div
          key={`x-${i}`}
          className="absolute text-white font-bold select-none"
          style={{
            top: pos.top,
            left: pos.left,
            fontSize: "22px",
            opacity: 0.85,
            lineHeight: 1,
            fontWeight: 900,
          }}
        >
          ✕
        </div>
      ))}

      {/* Wave lines - top center */}
      <svg
        className="absolute"
        style={{ top: "5%", left: "33%", width: "80px", height: "30px", opacity: 0.5 }}
        viewBox="0 0 80 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 8 Q10 2, 20 8 Q30 14, 40 8 Q50 2, 60 8 Q70 14, 80 8" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M0 18 Q10 12, 20 18 Q30 24, 40 18 Q50 12, 60 18 Q70 24, 80 18" stroke="white" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Rectangle outline - top center */}
      <div
        className="absolute border border-white/50"
        style={{ top: "5%", left: "50%", width: "100px", height: "28px", opacity: 0.5 }}
      />

      {/* Small dot grid - bottom right */}
      <div className="absolute" style={{ bottom: "12%", right: "5%" }}>
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex gap-3 mb-3">
            {[0, 1, 2].map((col) => (
              <div
                key={col}
                className="rounded-full"
                style={{
                  width: "10px",
                  height: "10px",
                  background: (row + col) % 2 === 0 ? "rgba(200,210,230,0.6)" : "rgba(100,120,160,0.3)",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Subtle overall overlay to darken and unify */}
      <div className="absolute inset-0" style={{ background: "rgba(6, 10, 22, 0.45)" }} />
    </div>
  );
}
