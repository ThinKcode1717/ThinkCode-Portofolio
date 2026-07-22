import React from 'react';
import FloatingSidebar from '@/components/ui/FloatingSidebar';
import UnderwaterBackground from '@/components/effects/UnderwaterBackground';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ChatbotSection from '@/components/sections/ChatbotSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020b14] text-slate-100 selection:bg-[#00f5d4] selection:text-[#020b14]">
      {/* Persistent Global Underwater Background (LiquidEther + SideRays) */}
      <UnderwaterBackground />

      {/* Floating Left Sidebar Navigation */}
      <FloatingSidebar />

      {/* Main Content Assembly */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <ExperienceSection />
        <ChatbotSection />
        <ContactSection />
      </main>

      {/* Deep Ocean Footer */}
      <Footer />
    </div>
  );
}
