import { useRef, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 300, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const move = (e: globalThis.MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-primary/60 pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
