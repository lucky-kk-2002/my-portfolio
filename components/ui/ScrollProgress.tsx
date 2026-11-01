"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // برای نرم‌تر شدن حرکت نوار، از useSpring استفاده می‌کنیم
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-lavender z-[100] origin-left shadow-[0_0_15px_rgba(184,161,255,0.8)]"
      style={{ scaleX }}
    />
  );
}