'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useApp } from '@/context/AppContext';

const DynamicLiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false });
const DynamicSideRays = dynamic(() => import('./SideRays'), { ssr: false });

export default function UnderwaterBackground() {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-700 ${
      isDark ? 'bg-[#000308]' : 'bg-[#f0fdfa]'
    }`}>
      {/* Persistent LiquidEther Wave Currents */}
      <div className={`fixed inset-0 pointer-events-auto z-0 transition-opacity duration-700 ${
        isDark ? 'opacity-80' : 'opacity-65'
      }`}>
        <DynamicLiquidEther
          colors={
            isDark
              ? ['#001220', '#002855', '#0077B6', '#00F0FF', '#000308']
              : ['#e0f2fe', '#38bdf8', '#0284c7', '#0f766e', '#f0fdfa']
          }
          mouseForce={32}
          cursorSize={150}
          isViscous={true}
          viscous={35}
          resolution={0.5}
          autoDemo={true}
          autoSpeed={0.45}
          autoIntensity={2.2}
        />
      </div>

      {/* Persistent Ocean Rays Penetrating Water from Top-Right */}
      <div className={`fixed top-0 right-0 w-full h-full pointer-events-none z-10 transition-opacity duration-700 ${
        isDark ? 'opacity-90' : 'opacity-80'
      }`}>
        <DynamicSideRays
          origin="top-right"
          rayColor1={isDark ? "#00B4D8" : "#38bdf8"}
          rayColor2={isDark ? "#00F0FF" : "#0284c7"}
          intensity={isDark ? 2.8 : 2.2}
          spread={3.2}
          speed={2.2}
          tilt={-6}
          saturation={isDark ? 1.6 : 1.3}
          blend={0.8}
          falloff={1.4}
          opacity={1.0}
        />
      </div>

      {/* Floating Bioluminescent Ocean Plankton / Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-2 overflow-hidden">
        <div className={`absolute bottom-10 left-[15%] w-2.5 h-2.5 rounded-full blur-[1px] animate-float-bubble ${
          isDark ? 'bg-[#00f0ff]/40 shadow-[0_0_10px_#00f0ff]' : 'bg-[#0284c7]/40 shadow-[0_0_10px_#0284c7]'
        }`} style={{ animationDuration: '10s' }} />
        <div className={`absolute bottom-20 left-[45%] w-3.5 h-3.5 rounded-full blur-[1px] animate-float-bubble ${
          isDark ? 'bg-[#00b4d8]/50 shadow-[0_0_12px_#00b4d8]' : 'bg-[#0f766e]/40 shadow-[0_0_12px_#0f766e]'
        }`} style={{ animationDuration: '13s', animationDelay: '2s' }} />
        <div className={`absolute bottom-5 left-[75%] w-2 h-2 rounded-full blur-[1px] animate-float-bubble ${
          isDark ? 'bg-[#0077b6]/60 shadow-[0_0_8px_#0077b6]' : 'bg-[#0284c7]/50 shadow-[0_0_8px_#0284c7]'
        }`} style={{ animationDuration: '12s', animationDelay: '4s' }} />
      </div>

      {/* Caustics Water Ambient Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-1"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 80% 0%, rgba(0, 180, 216, 0.22) 0%, rgba(0, 52, 89, 0.45) 45%, rgba(0, 3, 8, 0.95) 85%)'
            : 'radial-gradient(ellipse at 80% 0%, rgba(56, 189, 248, 0.25) 0%, rgba(224, 242, 254, 0.5) 45%, rgba(240, 253, 250, 0.9) 85%)'
        }}
      />
    </div>
  );
}
