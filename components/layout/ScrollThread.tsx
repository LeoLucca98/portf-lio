"use client";

import { m, useScroll, useSpring } from "motion/react";

/** A thin progress line in the left gutter that ties the home sections together. */
export function ScrollThread() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <div aria-hidden className="pointer-events-none fixed bottom-10 left-5 top-[calc(var(--nav-h)+40px)] z-30 hidden w-px 2xl:block">
      <div className="absolute inset-0 bg-line" />
      <m.div
        className="absolute inset-0 origin-top bg-gradient-to-b from-negocio via-produto to-tecnologia"
        style={{ scaleY }}
      />
    </div>
  );
}
