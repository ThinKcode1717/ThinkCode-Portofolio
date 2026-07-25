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
    <div className="relative group w-64 h-80 sm:w-80 sm:h-[400px] md:w-88 md:h-[430px] flex items-center justify-center p-2 sm:p-4 select-none">
      
      {/* ── 1. Caustic Water Glow Halo (Looping Breathing Glow) ── */}
      <motion.div 
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.45) 0%, rgba(0,180,216,0.25) 50%, rgba(0,0,0,0) 80%)'
        }}
      />

      {/* ── 2. Concentric Orbiting Water Ripple Rings ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-1 rounded-full border border-dashed border-[#00e5ff]/35 pointer-events-none z-0"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4 rounded-full border border-dotted border-[#0077b6]/40 pointer-events-none z-0"
      />

      {/* ── 3. Floating Water Droplets Orbit Loop ── */}
      <motion.div
        animate={{
          y: [-12, 10, -12],
          x: [-5, 7, -5],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-3 left-8 sm:left-12 w-4 h-5 rounded-full bg-[#00e5ff]/90 blur-[0.5px] shadow-[0_0_15px_#00e5ff] pointer-events-none z-20"
        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
      />
      <motion.div
        animate={{
          y: [8, -14, 8],
          x: [6, -5, 6],
          scale: [1.15, 0.85, 1.15],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute bottom-5 right-8 sm:right-12 w-5 h-6 rounded-full bg-[#00b4d8]/85 blur-[0.5px] shadow-[0_0_16px_#00b4d8] pointer-events-none z-20"
        style={{ borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%' }}
      />

      {/* ── 4. Main Bio-Luminescent Glass Water Avatar Capsule ── */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-1.2, 1.2, -1.2],
          scale: [0.99, 1.01, 0.99],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.035, rotate: 0 }}
        className="relative w-full h-full p-2 z-10 flex items-center justify-center cursor-pointer"
      >
        {/* Symmetrical Liquid Glass Drop Frame */}
        <div 
          className="w-full h-full relative overflow-hidden transition-all duration-700 shadow-2xl"
          style={{
            /* Smooth Symmetrical Water Drop Contour */
            borderRadius: '50% 50% 50% 50% / 62% 62% 38% 38%',
            border: '2.5px solid rgba(0, 229, 255, 0.65)',
            boxShadow: '0 16px 45px rgba(0, 180, 216, 0.45), inset 0 0 35px rgba(0, 229, 255, 0.35)'
          }}
        >
          {/* Avatar Profile Image */}
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 640px) 250px, (max-width: 768px) 320px, 380px"
            priority
            className="object-cover object-top filter contrast-[1.05] brightness-[1.02] transition-transform duration-700 group-hover:scale-108"
          />

          {/* Liquid Glass Highlight Overlays */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-70 group-hover:opacity-90 transition-opacity"
            style={{
              background: 'radial-gradient(ellipse at 35% 15%, rgba(255,255,255,0.8) 0%, rgba(0,229,255,0.3) 45%, transparent 75%)'
            }}
          />

          {/* Water Sheen Light Reflection */}
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,229,255,0.25) 100%)'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
