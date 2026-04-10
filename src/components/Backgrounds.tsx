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
      <motion.div
        className="absolute -top-1/4 left-1/2 w-[160vw] h-[100vh] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 40%, hsl(192 95% 55% / 0.32) 0%, hsl(210 90% 60% / 0.18) 40%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ scaleX: [1, 1.25, 0.9, 1.1, 1], scaleY: [1, 0.85, 1.2, 0.95, 1], x: ["-50%", "-42%", "-58%", "-46%", "-50%"], rotate: [0, 6, -5, 3, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-1/3 left-0 w-[110vw] h-[80vh] rounded-full"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, hsl(280 75% 58% / 0.26) 0%, hsl(250 80% 65% / 0.14) 45%, transparent 70%)", filter: "blur(70px)" }}
        animate={{ scaleX: [1.1, 0.85, 1.15, 1, 1.1], x: ["0%", "12%", "-8%", "5%", "0%"], y: ["0%", "-10%", "6%", "-4%", "0%"], rotate: [0, -8, 10, -4, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[90vw] h-[70vh] rounded-full"
        style={{ background: "radial-gradient(ellipse 55% 45% at 70% 40%, hsl(160 80% 50% / 0.15) 0%, hsl(140 70% 48% / 0.08) 45%, transparent 70%)", filter: "blur(80px)" }}
        animate={{ scaleX: [0.9, 1.2, 0.85, 1.1, 0.9], x: ["0%", "-10%", "8%", "-5%", "0%"], rotate: [0, -10, 8, -3, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
