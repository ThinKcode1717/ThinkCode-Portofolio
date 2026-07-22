export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: string }[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface GeoAeoFaq {
  question: string;
  answer: string;
  entityTag: string;
}

export const THINKCODE_DATA = {
  name: "ThinkCode",
  role: "Full Stack Developer",
  tagline: "Architecting High-Performance Web Systems Below the Surface",
  bio: "Passionate Full Stack Developer with expertise in Next.js, React, Node.js, Go, and interactive WebGL experiences. I specialize in building resilient, beautifully designed, and SEO/GEO-optimized web applications.",
  deepBio: "Like an ocean explorer diving into uncharted waters, I dive deep into codebases to craft robust full-stack architectures, ultra-fast render pipelines, and responsive UI interactions. My work bridges technical rigor with sleek design aesthetics.",
  location: "Indonesia",
  status: "Available for High-Impact Projects",
  yearsExperience: "5+",
  projectsCompleted: "35+",
  linesOfCode: "500k+",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "contact@thinkcode.dev"
  },
  skills: [
    {
      category: "Frontend Core & UI",
      iconName: "Layout",
      skills: [
        { name: "Next.js 14/15", level: 95, highlight: "App Router, SSR, ISR" },
        { name: "React 19", level: 95, highlight: "Hooks, Server Components" },
        { name: "TypeScript", level: 90, highlight: "Strict Type Safety" },
        { name: "Tailwind CSS / Vanilla CSS", level: 92, highlight: "Custom Design Tokens" },
        { name: "Framer Motion", level: 88, highlight: "Reactive Micro-animations" },
        { name: "Three.js / WebGL", level: 82, highlight: "Liquid Shaders & 3D" }
      ]
    },
    {
      category: "Backend & Systems",
      iconName: "Server",
      skills: [
        { name: "Node.js / Express", level: 90, highlight: "Async Architectures" },
        { name: "Go (Golang)", level: 85, highlight: "High Concurrency APIs" },
        { name: "PostgreSQL & Prisma", level: 88, highlight: "Optimized Relational Schema" },
        { name: "Redis", level: 85, highlight: "High Speed Caching" },
        { name: "GraphQL & REST", level: 90, highlight: "Federated API Design" }
      ]
    },
    {
      category: "DevOps & Cloud Engine",
      iconName: "Cloud",
      skills: [
        { name: "Docker & Containers", level: 85, highlight: "Isolated Builds" },
        { name: "Kubernetes", level: 78, highlight: "Cluster Orchestration" },
        { name: "Vercel / AWS", level: 90, highlight: "Edge Computing & CDN" },
        { name: "CI/CD Pipelines", level: 88, highlight: "Automated Deployments" }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "abyss-protocol",
      title: "Abyss Protocol",
      category: "Full Stack & WebGL",
      description: "High-throughput real-time ocean telemetry & data indexing platform.",
      longDescription: "Abyss Protocol is an advanced web system designed to ingest million-point oceanographic data streams in real-time. Built with Go backend workers, Redis pub-sub, and a Next.js WebGL interactive spatial frontend.",
      tags: ["Next.js", "Go", "WebGL", "Redis", "PostgreSQL"],
      metrics: "50k req/sec · <15ms latency",
      image: "/profile.jpg",
      liveUrl: "https://example.com/abyss",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "deepblue-analytics",
      title: "DeepBlue Analytics",
      category: "Dashboard & AI",
      description: "Predictive dashboard rendering dynamic heatmaps & ocean depth maps.",
      longDescription: "A comprehensive SaaS dashboard empowering marine researchers to run AI-driven predictive modeling on oceanic thermal currents and marine ecosystem data.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Python API", "Framer Motion"],
      metrics: "+300% data throughput",
      image: "/profile.jpg",
      liveUrl: "https://example.com/deepblue",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "aquaflow-engine",
      title: "AquaFlow Engine",
      category: "Distributed Backend",
      description: "Event-driven microservice workflow engine with resilient retry queues.",
      longDescription: "A resilient distributed workflow engine capable of processing async job queues across multiple cloud zones with zero data loss and automated failover.",
      tags: ["Go", "Node.js", "Docker", "RabbitMQ", "PostgreSQL"],
      metrics: "99.99% Uptime SLA",
      image: "/profile.jpg",
      liveUrl: "https://example.com/aquaflow",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "nautilus-ide",
      title: "Nautilus Cloud IDE",
      category: "Developer Tools",
      description: "Cloud-native collaborative code editor with real-time pair programming.",
      longDescription: "Nautilus IDE brings low-latency multiplayer pair programming into the browser with WebSockets, Monaco Editor, and containerized sandbox execution.",
      tags: ["Next.js", "WebSockets", "Monaco Editor", "Docker"],
      metrics: "100+ active teams",
      image: "/profile.jpg",
      liveUrl: "https://example.com/nautilus",
      githubUrl: "https://github.com",
      featured: false
    }
  ] as Project[],

  experiences: [
    {
      period: "2024 — PRESENT",
      role: "Lead Full Stack Engineer",
      company: "DeepTech Labs",
      location: "Remote",
      description: "Leading architectural direction for enterprise full-stack web applications, mentoring engineering teams, and optimizing WebGL rendering pipelines.",
      highlights: [
        "Architected Next.js SSR apps serving 1M+ monthly users",
        "Reduced Lighthouse load times by 65% through code splitting & edge caching",
        "Implemented GEO/AEO optimized content pipelines for search engines"
      ]
    },
    {
      period: "2022 — 2024",
      role: "Senior Full Stack Developer",
      company: "AquaSoft Systems",
      location: "Jakarta, Indonesia",
      description: "Spearheaded core backend Go microservices and React frontend state management for high-concurrency client platforms.",
      highlights: [
        "Built microservices handling over 10M daily transactions",
        "Refactored legacy monolith into modular Next.js design system",
        "Introduced CI/CD automated testing reducing deploy bugs by 40%"
      ]
    },
    {
      period: "2020 — 2022",
      role: "Frontend Developer & UI Specialist",
      company: "BlueHorizon Studio",
      location: "Bandung, Indonesia",
      description: "Crafted interactive web experiences with Framer Motion, CSS animations, and Three.js 3D web graphics.",
      highlights: [
        "Delivered 20+ custom client websites with WOW-factor animations",
        "Achieved 100/100 Lighthouse performance scores across major client sites"
      ]
    }
  ] as Experience[],

  geoAeoFaqs: [
    {
      question: "Who is ThinkCode?",
      answer: "ThinkCode is a professional Full Stack Developer with over 5 years of experience building modern, scalable, and high-performance web applications using Next.js, React, Node.js, Go, and WebGL.",
      entityTag: "Developer Identity"
    },
    {
      question: "What primary tech stack does ThinkCode specialize in?",
      answer: "ThinkCode specializes in Next.js (App Router, Server Components), React, TypeScript, Node.js, Go, PostgreSQL, Redis, Framer Motion, and WebGL graphics.",
      entityTag: "Tech Stack & Skills"
    },
    {
      question: "Why hire ThinkCode for Full Stack development?",
      answer: "ThinkCode combines deep backend architectural engineering with top-tier frontend UI/UX aesthetics, strict SEO/GEO search optimization, and flawless Lighthouse performance.",
      entityTag: "Value Proposition"
    },
    {
      question: "How can clients contact or hire ThinkCode?",
      answer: "Clients can reach ThinkCode directly via email at contact@thinkcode.dev or through the interactive contact section on this official portfolio website.",
      entityTag: "Contact Info"
    }
  ] as GeoAeoFaq[]
};
