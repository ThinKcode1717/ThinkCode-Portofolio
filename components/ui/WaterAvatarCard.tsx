'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface WaterAvatarCardProps {
  imageSrc: string;
  altText: string;
}

export default function WaterAvatarCard({ imageSrc, altText }: WaterAvatarCardProps) {
  const finalImageSrc = imageSrc && imageSrc.trim() !== '' ? imageSrc : '/profile.jpg';

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="water-bubble-container relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex-shrink-0 flex items-center justify-center select-none"
    >
      {/* Outer Ambient Bioluminescent Caustic Glow */}
      <motion.div 
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[-40px] rounded-full blur-3xl pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.45) 0%, rgba(0,180,216,0.25) 50%, rgba(0,0,0,0) 80%)'
        }}
      />

      {/* Concentric Liquid Morphing Ripples */}
      <div className="water-ripple-ring" />
      <div className="water-ripple-ring-2" />

      {/* Rising Underwater Air Bubbles with Glow Physics */}
      <div className="rising-bubble w-4 h-4 bottom-4 left-6" style={{ '--dur': '3.8s', '--delay': '0s', '--drift': '22px' } as React.CSSProperties} />
      <div className="rising-bubble w-6 h-6 bottom-2 right-8" style={{ '--dur': '4.5s', '--delay': '1.2s', '--drift': '-25px' } as React.CSSProperties} />
      <div className="rising-bubble w-3 h-3 bottom-10 left-16" style={{ '--dur': '3.2s', '--delay': '2.1s', '--drift': '16px' } as React.CSSProperties} />
      <div className="rising-bubble w-5 h-5 bottom-8 right-16" style={{ '--dur': '5.0s', '--delay': '0.7s', '--drift': '-20px' } as React.CSSProperties} />

      {/* Fluid Liquid Morphing Water Avatar Frame */}
      <div className="relative w-full h-full p-2 z-10 flex items-center justify-center">
        <Image
          src={finalImageSrc}
          alt={altText}
          width={384}
          height={384}
          sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
          priority
          className="water-bubble-avatar w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
        />

        {/* Liquid Glass Highlight Sheen Overlay */}
        <div 
          className="absolute inset-2 pointer-events-none mix-blend-overlay opacity-65 group-hover:opacity-85 transition-opacity"
          style={{
            background: 'radial-gradient(ellipse at 35% 15%, rgba(255,255,255,0.75) 0%, rgba(0,229,255,0.35) 45%, transparent 80%)',
            borderRadius: 'inherit'
          }}
        />
      </div>
    </motion.div>
  );
}
