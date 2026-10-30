"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 22,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 22,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
