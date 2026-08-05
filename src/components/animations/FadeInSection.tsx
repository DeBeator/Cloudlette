"use client";

import React, { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export function FadeInSection({
  children,
  delay = 0,
  className = "",
  yOffset = 20,
}: FadeInSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0], // smooth cubic-bezier
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
