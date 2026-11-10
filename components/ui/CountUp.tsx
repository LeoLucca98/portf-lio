"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Server renders the final value (correct without JS and for crawlers).
 * Counts once, only if the number starts outside the viewport.
 */
export function CountUp({ value, count }: { value: string; count?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const armed = useRef(false);

  useEffect(() => {
    if (count === undefined || count === 0 || reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    armed.current = true;
    setDisplay(value.replace(String(count), "0"));
  }, [count, reduce, value]);

  useEffect(() => {
    if (!inView || !armed.current || count === undefined) return;
    const controls = animate(0, count, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(value.replace(String(count), String(Math.round(v)))),
    });
    return () => controls.stop();
  }, [inView, count, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
