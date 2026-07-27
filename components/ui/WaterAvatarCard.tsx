'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useSpring, useTransform } from 'framer-motion';

import MetaBalls from './MetaBalls';
import { useApp } from '@/context/AppContext';

interface WaterAvatarCardProps {
  imageSrc: string;
  altText: string;
}

export default function WaterAvatarCard({ imageSrc, altText }: WaterAvatarCardProps) {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const finalImageSrc = imageSrc && imageSrc.trim() !== '' ? imageSrc : '/profile.jpg';

  // Ref untuk kontainer agar bisa mendeteksi posisi mouse relatif terhadap avatar
  const containerRef = useRef<HTMLDivElement>(null);

  // Konfigurasi fisika pegas (spring) yang halus untuk pergerakan mengikuti mouse
  const springConfig = { damping: 15, stiffness: 120, mass: 0.8 };

  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Direct magnetic sensitivity so blobs track pointer movement clearly
    const moveX = (e.clientX - centerX) * 0.35;
    const moveY = (e.clientY - centerY) * 0.35;

    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  const handleMouseLeave = () => {
    // Kembali ke posisi tengah (0) saat mouse keluar
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group w-72 h-80 sm:w-80 sm:h-[400px] md:w-96 md:h-[450px] flex items-center justify-center p-4 select-none overflow-visible"
    >
      {/* ── 0. ReactBits MetaBalls Dynamic Background Layer (Light / Dark Sunny Ocean Palette) ── */}
      <div className="absolute -inset-16 sm:-inset-20 md:-inset-24 pointer-events-none z-0 opacity-80 mix-blend-screen overflow-visible">
        <MetaBalls
          color={isDark ? "#005f73" : "#0284c7"}
          cursorBallColor={isDark ? "#0a9396" : "#38bdf8"}
          cursorBallSize={8}
          ballCount={12}
          animationSize={30}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothness={0.06}
          clumpFactor={1.1}
          speed={0.3}
        />
      </div>

      {/* ── 1. Caustic Water Ambient Depth Halo ── */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-6 rounded-full blur-3xl pointer-events-none z-0 will-change-transform"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(10, 147, 150, 0.3) 0%, rgba(4, 29, 61, 0.25) 60%, transparent 85%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(186, 230, 253, 0.35) 60%, transparent 85%)'
        }}
      />

      {/* ── 2. Interactive Magnetic Border / Solid Wobbly Blob 1 (Liquid Wave Morphing) ── */}
      <motion.div
        animate={{
          borderRadius: [
            '62% 38% 54% 46% / 44% 56% 40% 60%',
            '35% 65% 60% 40% / 60% 40% 60% 40%',
            '68% 32% 42% 58% / 48% 52% 62% 38%',
            '42% 58% 68% 32% / 62% 38% 32% 68%',
            '62% 38% 54% 46% / 44% 56% 40% 60%'
          ],
          scale: [1, 1.08, 0.94, 1.06, 1],
          rotate: [0, -8, 9, -6, 0],
          skewX: [0, 4, -4, 3, 0],
          skewY: [0, -3, 4, -2, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ x: mouseX, y: mouseY }}
        className={isDark
          ? "absolute inset-5 sm:inset-7 md:inset-8 bg-gradient-to-br from-[#041d3d] via-[#003554] to-[#005f73] border border-[#0077b6]/70 pointer-events-none z-0 shadow-2xl transition-colors duration-500 group-hover:border-[#0a9396] will-change-transform"
          : "absolute inset-5 sm:inset-7 md:inset-8 bg-gradient-to-br from-[#38bdf8] via-[#0284c7] to-[#0077b6] border border-white/70 pointer-events-none z-0 shadow-xl shadow-[#0284c7]/25 transition-colors duration-500 group-hover:border-white will-change-transform"
        }
      />

      {/* ── 3. Interactive Magnetic Border / Solid Wobbly Blob 2 (Liquid Wave Morphing - Counter Motion) ── */}
      <motion.div
        animate={{
          borderRadius: [
            '38% 62% 68% 32% / 60% 40% 50% 50%',
            '72% 28% 46% 54% / 32% 68% 60% 40%',
            '32% 68% 38% 62% / 65% 35% 55% 45%',
            '54% 46% 62% 38% / 40% 60% 42% 58%',
            '38% 62% 68% 32% / 60% 40% 50% 50%'
          ],
          scale: [1, 0.94, 1.08, 0.96, 1],
          rotate: [0, 9, -8, 6, 0],
          skewX: [0, -4, 3, -3, 0],
          skewY: [0, 3, -4, 3, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4
        }}
        style={{
          x: useTransform(mouseX, val => val * 1.5),
          y: useTransform(mouseY, val => val * 1.5)
        }}
        className={isDark
          ? "absolute inset-7 sm:inset-9 md:inset-10 bg-gradient-to-tr from-[#005f73] via-[#0a9396] to-[#0096c7] border border-[#0a9396]/70 pointer-events-none z-0 shadow-xl transition-colors duration-500 group-hover:border-[#94d2bd] will-change-transform"
          : "absolute inset-7 sm:inset-9 md:inset-10 bg-gradient-to-tr from-[#7dd3fc] via-[#38bdf8] to-[#0284c7] border border-white/80 pointer-events-none z-0 shadow-lg shadow-[#0284c7]/20 transition-colors duration-500 group-hover:border-white will-change-transform"
        }
      />

      {/* ── 4. Floating Water Droplets Orbit Loop ── */}
      <motion.div
        animate={{
          y: [-14, 12, -14],
          x: [-6, 8, -6],
          scale: [0.95, 1.15, 0.95],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -top-3 -left-3 sm:-left-1 w-4 h-5 rounded-full border border-white/30 blur-[0.2px] shadow-lg pointer-events-none z-20 will-change-transform ${
          isDark ? 'bg-gradient-to-br from-[#0a9396] to-[#003554]' : 'bg-gradient-to-br from-[#38bdf8] to-[#0284c7]'
        }`}
        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
      />
      <motion.div
        animate={{
          y: [10, -16, 10],
          x: [8, -6, 8],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className={`absolute -bottom-3 -right-3 sm:-right-1 w-5 h-6 rounded-full border border-white/30 blur-[0.2px] shadow-lg pointer-events-none z-20 will-change-transform ${
          isDark ? 'bg-gradient-to-br from-[#0096c7] to-[#005f73]' : 'bg-gradient-to-br from-[#0284c7] to-[#0077b6]'
        }`}
        style={{ borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%' }}
      />

      {/* ── 5. Main Glass Water Avatar Capsule ── */}
      <motion.div
        animate={{
          y: [-7, 7, -7],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          x: useTransform(mouseX, val => val * 0.4),
          y: useTransform(mouseY, val => val * 0.4),
        }}
        className="relative w-[85%] h-[85%] z-10 flex items-center justify-center cursor-pointer will-change-transform"
      >
        {/* Kontainer Image Foto Avatar */}
        <motion.div
          animate={{
            borderRadius: [
              '48% 52% 38% 62% / 60% 40% 60% 40%',
              '65% 35% 58% 42% / 40% 60% 38% 62%',
              '36% 64% 68% 32% / 58% 42% 64% 36%',
              '58% 42% 34% 66% / 36% 64% 46% 54%',
              '48% 52% 38% 62% / 60% 40% 60% 40%'
            ],
            scale: [1, 1.09, 0.93, 1.07, 1],
            rotate: [0, -8, 9, -6, 0],
            skewX: [0, -4, 5, -3, 0],
            skewY: [0, 4, -4, 3, 0]
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-full h-full relative overflow-hidden transition-all duration-700 shadow-2xl will-change-transform"
          style={{
            border: isDark ? '2.5px solid rgba(10, 147, 150, 0.65)' : '2.5px solid rgba(255, 255, 255, 0.9)',
            boxShadow: isDark
              ? '0 20px 50px rgba(4, 29, 61, 0.5), inset 0 0 30px rgba(10, 147, 150, 0.3)'
              : '0 20px 50px rgba(2, 132, 199, 0.35), inset 0 0 30px rgba(255, 255, 255, 0.4)'
          }}
        >
          {/* Avatar Profile Image */}
          <Image
            src={finalImageSrc}
            alt={altText}
            fill
            sizes="(max-width: 640px) 250px, (max-width: 768px) 320px, 380px"
            priority
            className="object-cover object-top filter contrast-[1.03] brightness-[1.01] transition-transform duration-700 group-hover:scale-105"
          />

          {/* Liquid Glass Highlight Overlays */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            style={{
              background: 'radial-gradient(ellipse at 35% 15%, rgba(255,255,255,0.75) 0%, rgba(56,189,248,0.25) 45%, transparent 75%)'
            }}
          />

          {/* Water Sheen Light Reflection */}
          <motion.div
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(2,132,199,0.2) 100%)'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
