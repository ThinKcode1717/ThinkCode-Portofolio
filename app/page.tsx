import React from 'react';
import FloatingSidebar from '@/components/ui/FloatingSidebar';
import UnderwaterBackground from '@/components/effects/UnderwaterBackground';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TechStackSection from '@/components/sections/TechStackSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import AiAssistantDrawer from '@/components/ui/AiAssistantDrawer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#000610] text-slate-100 selection:bg-[#00e5ff] selection:text-[#000610]">
      {/* Persistent Global Underwater Background (LiquidEther + SideRays) */}
      <UnderwaterBackground />

      {/* Floating Left Sidebar Navigation */}
      <FloatingSidebar />

      {/* Floating Global AI Assistant Drawer */}
      <AiAssistantDrawer />

      {/* Main Content Assembly — Optimized UX flow for client conversion */}
      <main className="relative z-10">
        {/* 1. Hook — Who am I + Strong CTA */}
        <HeroSection />

        {/* 2. Build trust — About + credentials */}
        <AboutSection />

        {/* 3. Social proof — Testimonials right after about */}
        <TestimonialsSection />

        {/* 4. Show capabilities — Tech Stack */}
        <TechStackSection />

        {/* 5. Show work — Projects with business impact */}
        <ProjectsSection />

        {/* 6. Convert — Services & Packages */}
        <ServicesSection />

        {/* 7. Credibility — Career Timeline */}
        <ExperienceSection />

        {/* 8. Final CTA — Contact */}
        <ContactSection />
      </main>

      {/* Deep Ocean Footer */}
      <Footer />
    </div>
  );
}


