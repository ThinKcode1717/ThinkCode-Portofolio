'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineRocketLaunch, HiOutlineSquares2X2, HiOutlineBuildingOffice, HiOutlineCheckCircle, HiOutlineClock, HiOutlineUsers, HiOutlineArrowRight, HiStar } from 'react-icons/hi2';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

const iconMap: Record<string, React.ElementType> = {
  Rocket: HiOutlineRocketLaunch,
  Layers: HiOutlineSquares2X2,
  Building2: HiOutlineBuildingOffice,
};

export default function ServicesSection() {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <ScrollSectionWrapper id="services" className="relative py-12 lg:py-16 min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xs font-mono font-semibold tracking-widest uppercase ${
              isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'
            }`}
          >
            Layanan &amp; Paket Proyek
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Apa yang Bisa{' '}
            <span className={isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}>
              Kita Bangun
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xs sm:text-sm max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Dari aplikasi web custom hingga otomatisasi data &amp; AI — setiap proyek dibangun dengan arsitektur tangguh.
          </motion.p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {THINKCODE_DATA.services.map((service, idx) => {
            const IconComp = iconMap[service.icon] || HiOutlineRocketLaunch;
            const isMiddle = idx === 1;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative group rounded-2xl border p-6 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${
                  isMiddle
                    ? isDark
                      ? 'bg-gradient-to-b from-[#00e5ff]/10 to-[#0077b6]/5 border-[#00e5ff]/50'
                      : 'bg-gradient-to-b from-[#e0f2fe] to-white border-[#0284c7]/60 shadow-lg'
                    : isDark
                      ? 'bg-[#031729]/30 border-[#0077b6]/30 hover:border-[#00e5ff]/40'
                      : 'bg-white/80 border-slate-200 hover:border-[#0284c7]/50 hover:shadow-lg'
                }`}
              >
                {/* Popular badge */}
                {isMiddle && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold font-mono flex items-center gap-1 ${
                    isDark
                      ? 'bg-[#00e5ff] text-[#000610]'
                      : 'bg-[#0284c7] text-white'
                  }`}>
                    <HiStar className="w-3 h-3 fill-current" />
                    <span>PALING POPULER</span>
                  </div>
                )}

                <div className="space-y-4 flex-1">
                  {/* Icon & Name */}
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                      isDark
                        ? 'bg-gradient-to-br from-[#00e5ff]/20 to-[#0077b6]/30 border-[#00e5ff]/40 text-[#00e5ff]'
                        : 'bg-gradient-to-br from-[#e0f2fe] to-[#38bdf8]/30 border-[#0284c7]/40 text-[#0284c7]'
                    }`}>
                      <motion.div whileHover={{ rotate: 15, scale: 1.15 }}>
                        <IconComp className="w-4 h-4" />
                      </motion.div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-1 text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <HiOutlineClock className="w-3 h-3" />
                        {service.timeline}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-bold mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {service.name}
                    </h3>
                    <p className={`text-xs font-medium ${isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}`}>
                      {service.tagline}
                    </p>
                  </div>

                  {/* Ideal for */}
                  <div className={`flex items-start gap-1.5 text-[11px] rounded-lg p-2.5 ${
                    isDark ? 'bg-[#031729]/60 text-slate-300' : 'bg-slate-50 text-slate-600'
                  }`}>
                    <HiOutlineUsers className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{service.ideal}</span>
                  </div>

                  {/* Deliverables */}
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className={`flex items-start gap-1.5 text-[11px] font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <HiOutlineCheckCircle className={`w-3 h-3 shrink-0 mt-0.5 ${isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href="#contact"
                  className={`mt-4 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all duration-300 group-hover:gap-3 ${
                    isMiddle
                      ? isDark
                        ? 'bg-[#00e5ff] text-[#000610] hover:bg-[#00b4d8]'
                        : 'bg-[#0284c7] text-white hover:bg-[#0f766e]'
                      : isDark
                        ? 'bg-[#031729] text-white border border-[#0077b6]/30 hover:border-[#00e5ff]'
                        : 'bg-slate-100 text-slate-800 border border-slate-300 hover:border-[#0284c7]'
                  }`}
                >
                  <span>{service.cta}</span>
                  <HiOutlineArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

      </div>
    </ScrollSectionWrapper>
  );
}
