'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface WaterAvatarCardProps {
  imageSrc: string;
  altText: string;
}

export default function WaterAvatarCard({ imageSrc, altText }: WaterAvatarCardProps) {
  return (
    <div className="relative group w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center p-2 sm:p-4">
      {/* Outer ambient deep sea caustic glow */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.35) 0%, rgba(0,180,216,0.25) 45%, rgba(0,3,8,0) 80%)'
        }}
      />

      {/* Floating water drip droplets */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          x: [-4, 4, -4],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 left-6 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#00f0ff]/80 blur-[1px] shadow-[0_0_15px_#00f0ff] pointer-events-none z-20"
      />
      <motion.div
        animate={{
          y: [6, -10, 6],
          x: [4, -6, 4],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-2 right-8 sm:right-12 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#00b4d8]/70 blur-[1px] shadow-[0_0_18px_#00b4d8] pointer-events-none z-20"
      />
      <motion.div
        animate={{
          y: [-6, 12, -6],
          scale: [0.8, 1.25, 0.8],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 -right-2 sm:-right-4 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#0077b6]/80 blur-[1px] shadow-[0_0_12px_#0077b6] pointer-events-none z-20"
      />

      {/* Main morphing water blob container */}
      <div className="relative w-full h-full p-2 rounded-full overflow-hidden z-10">
        {/* Animated SVG Fluid Morph Mask Frame */}
        <div 
          className="w-full h-full relative overflow-hidden transition-transform duration-700 group-hover:scale-105"
          style={{
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
            animation: 'waterBlobMorph 12s ease-in-out infinite',
            border: '2px solid rgba(0, 240, 255, 0.4)',
            boxShadow: '0 0 35px rgba(0, 180, 216, 0.5), inset 0 0 25px rgba(0, 240, 255, 0.3)'
          }}
        >
          {/* Profile Image */}
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, 400px"
            priority
            className="object-cover object-top filter contrast-[1.08] brightness-[1.03] transition-all duration-700 group-hover:scale-110"
          />

          {/* Water reflection highlight overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(0,240,255,0.25) 40%, transparent 70%)'
            }}
          />

          {/* Water ripples wave overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-35 group-hover:opacity-55 transition-opacity"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 65%)',
              animation: 'waterRipple 8s linear infinite'
            }}
          />
        </div>
      </div>
    </div>
  );
}
