'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  parallaxOffset?: number;
}

export default function ScrollSectionWrapper({
  children,
  className = '',
  id,
  parallaxOffset = 40,
}: ScrollSectionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Real-time Parallax Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth vertical parallax shift and scale/opacity ease-in and reverse exit
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [parallaxOffset, 0, 0, -parallaxOffset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.35]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section
      id={id}
      ref={containerRef}
      style={{ opacity, scale, y }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
