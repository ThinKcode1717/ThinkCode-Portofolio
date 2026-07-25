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
      
      {/* ── 1. Outer Deep Sea Ambient Caustic Glow (Continuous Pulse Loop) ── */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.45) 0%, rgba(0,180,216,0.25) 50%, rgba(0,0,0,0) 80%)'
        }}
      />

      {/* ── 2. Rotating Water Splash Aura Ring ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-2 rounded-full border border-dashed border-[#00e5ff]/30 pointer-events-none z-0"
      />

      {/* ── 3. Floating Micro Water Droplets (Orbit Loop) ── */}
      <motion.div
        animate={{
          y: [-14, 12, -14],
          x: [-6, 8, -6],
          scale: [0.9, 1.25, 0.9],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 left-6 sm:left-10 w-4 h-5 rounded-full bg-[#00e5ff]/90 blur-[0.5px] shadow-[0_0_15px_#00e5ff] pointer-events-none z-20"
        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
      />
      <motion.div
        animate={{
          y: [10, -16, 10],
          x: [8, -6, 8],
          scale: [1.2, 0.85, 1.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        className="absolute bottom-4 right-8 sm:right-12 w-5 h-6 rounded-full bg-[#00b4d8]/80 blur-[0.5px] shadow-[0_0_18px_#00b4d8] pointer-events-none z-20"
        style={{ borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%' }}
      />
      <motion.div
        animate={{
          y: [-8, 14, -8],
          scale: [0.8, 1.3, 0.8],
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        className="absolute top-1/2 -right-3 sm:-right-5 w-4 h-4.5 rounded-full bg-[#0077b6]/90 blur-[0.5px] shadow-[0_0_14px_#0077b6] pointer-events-none z-20"
        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
      />

      {/* ── 4. Main Water Drop Avatar Capsule (Continuous Loop Animation) ── */}
      <motion.div
        animate={{
          y: [-9, 9, -9],
          rotate: [-1.8, 1.8, -1.8],
          scale: [0.985, 1.015, 0.985],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.04, rotate: 0 }}
        className="relative w-full h-full p-2 z-10 flex items-center justify-center cursor-pointer"
      >
        {/* Bio-Luminescent Water Drop Frame */}
        <div 
          className="w-full h-full relative overflow-hidden transition-all duration-700 shadow-2xl"
          style={{
            /* Elegant Water Droplet Capsule Contour */
            borderRadius: '50% 50% 50% 50% / 68% 68% 34% 34%',
            border: '2.5px solid rgba(0, 229, 255, 0.6)',
            boxShadow: '0 15px 45px rgba(0, 180, 216, 0.5), inset 0 0 35px rgba(0, 229, 255, 0.4)'
          }}
        >
          {/* Avatar Profile Image */}
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 640px) 250px, (max-width: 768px) 320px, 380px"
            priority
            className="object-cover object-top filter contrast-[1.06] brightness-[1.03] transition-transform duration-700 group-hover:scale-110"
          />

          {/* Liquid Glass Highlight Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-65 group-hover:opacity-85 transition-opacity"
            style={{
              background: 'radial-gradient(ellipse at 35% 15%, rgba(255,255,255,0.75) 0%, rgba(0,229,255,0.35) 45%, transparent 80%)'
            }}
          />

          {/* Water Surface Ripple Overlay */}
          <motion.div 
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%, rgba(0,229,255,0.25) 100%)'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
