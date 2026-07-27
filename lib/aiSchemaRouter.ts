import { THINKCODE_DATA } from './data';

export interface LocalAiReply {
  matched: boolean;
  reply: string;
}

// Normalize strings by converting to lowercase, replacing punctuation with spaces, and trimming
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Match keywords taking word boundaries into account for short terms (<= 3 chars)
const matchesKeywords = (norm: string, keywords: string[]): boolean => {
  return keywords.some(k => {
    if (k.length <= 3) {
      const regex = new RegExp(`\\b${k}\\b`, 'i');
      return regex.test(norm);
    }
    return norm.includes(k);
  });
};

export const getLocalSchemaReply = (message: string, lang: 'id' | 'en' = 'id'): LocalAiReply => {
  const norm = normalizeText(message);
  const isEn = lang === 'en';

  // 1. Out-of-Scope Blocker (Instantly blocks general topics unrelated to ThinkCode)
  const outOfScopeKeywords = [
    'presiden', 'president', 'cuaca', 'weather', 'politik', 'politics', 'berita', 'news', 
    'bantu coding', 'coding help', 'calculator', 'kalkulator', 'rumus', 'matematika', 'math', 
    'sejarah', 'history', 'resep', 'recipe', 'film', 'movie', 'musik', 'music'
  ];
  if (matchesKeywords(norm, outOfScopeKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "Sorry, I am ThinkCode's dedicated portfolio AI assistant.\n\nI can only assist with information regarding:\n• Developer Skills & Technical Stack\n• Built Projects & Case Studies\n• Work Experience & History\n• Service Packages & Pricing\n• Contact & Collaboration Workflow\n\nPlease feel free to ask anything related to ThinkCode!"
        : "Maaf, saya adalah asisten AI khusus portofolio ThinkCode.\n\nSaya hanya dapat membantu menjawab informasi seputar:\n• Keahlian & Tech Stack Developer\n• Studi Kasus & Proyek yang Dibangun\n• Pengalaman Kerja & Trajektori Karir\n• Penawaran Paket Jasa & Estimasi Biaya\n• Kontak & Alur Kolaborasi\n\nSilakan tanyakan topik yang berkaitan dengan ThinkCode!"
    };
  }

  // 2. Greetings & Openers
  const greetings = ['halo', 'hai', 'hi', 'pagi', 'siang', 'sore', 'malam', 'hello', 'hey', 'yo', 'welcome'];
  if (greetings.some(g => norm === g || norm.startsWith(g + ' ') || norm.endsWith(' ' + g))) {
    return {
      matched: true,
      reply: isEn
        ? "Hello! Welcome to ThinkCode AI Assistant.\n\nI am here to assist you with information about:\n• Yoga Adi Pratama's Profile & Technical Skills\n• Web, Scraping, & AI Project Case Studies\n• Work Experience & IT Background\n• Custom Software Services & Pricing\n\nHow can I help you today?"
        : "Halo! Selamat datang di ThinkCode AI Assistant.\n\nSaya siap membantu Anda dengan informasi mengenai:\n• Profil & Keahlian Yoga Adi Pratama\n• Portfolio Proyek Web, Scraping, & AI\n• Pengalaman Kerja & Latang Belakang IT\n• Layanan Jasa Pembuatan Software & Estimasi Biaya\n\nAda yang bisa saya bantu untuk proyek Anda?"
    };
  }

  // 3. Contact & Communication (Evaluated early to capture any inquiry mentioning contact)
  const contactKeywords = [
    'kontak', 'contact', 'hubungi', 'cara kontak', 'cara hubungi', 'email', 
    'whatsapp', 'wa', 'nomor hp', 'nomor wa', 'sosial media', 'social', 'github', 'linkedin'
  ];
  if (matchesKeywords(norm, contactKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**Direct Contact Channels:**\n\n• **Email:** yogaaaap01@gmail.com\n• **WhatsApp:** +62 896-0148-6350 (Fast response)\n• **GitHub Main:** github.com/ThinKcode1717\n• **GitHub Secondary:** github.com/think-dev01\n\nFeel free to contact Yoga directly via WhatsApp or Email to get started on your project!"
        : "**Informasi Kontak & Saluran Komunikasi:**\n\n• **Email:** yogaaaap01@gmail.com\n• **WhatsApp:** +62 896-0148-6350 (Respon cepat)\n• **GitHub Main:** github.com/ThinKcode1717\n• **GitHub Secondary:** github.com/think-dev01\n\nSilakan hubungi Yoga secara langsung via WhatsApp atau Email untuk merencanakan proyek Anda!"
    };
  }

  // 4. Tech Stack & Core Skills
  const techStackKeywords = [
    'tech stack', 'techstack', 'stack', 'keahlian', 'skill', 'skills', 
    'teknologi', 'arsenal', 'kemampuan', 'bahasa pemrograman', 'framework'
  ];
  if (matchesKeywords(norm, techStackKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**ThinkCode Core Technical Stack:**\n\n• **Frontend:** React (18/19), Next.js, Vue.js, Vite, TypeScript, Tailwind CSS (v3/v4), Framer Motion, shadcn/ui\n• **Backend & DB:** Node.js (Express.js), PHP & Laravel (8/10/11), PostgreSQL (Neon Serverless), MySQL, REST API, JWT Auth\n• **AI & Machine Learning:** Python, TensorFlow, Keras, Hybrid ARIMA-LSTM Model, Groq Llama 3.3 LLM API\n• **Automation & Scraping:** Puppeteer, Cheerio, Recursive Web Crawling, Anti-Bot & Rate Limiting\n• **DevOps & Infra:** Docker, Docker Compose, PM2, Nginx Reverse Proxy, VPS Linux, Vercel\n\nYoga builds secure, performant, and scalable web solutions end-to-end."
        : "**Tech Stack Utama ThinkCode:**\n\n• **Frontend:** React (18/19), Next.js, Vue.js, Vite, TypeScript, Tailwind CSS (v3/v4), Framer Motion, shadcn/ui\n• **Backend & DB:** Node.js (Express.js), PHP & Laravel (8/10/11), PostgreSQL (Neon Serverless), MySQL, REST API, JWT Auth\n• **AI & Machine Learning:** Python, TensorFlow, Keras, Model Hybrid ARIMA-LSTM, Groq Llama 3.3 LLM API\n• **Automation & Scraping:** Puppeteer, Cheerio, Web Crawling Rekursif, Anti-Bot & Rate Limiting\n• **DevOps & Infra:** Docker, Docker Compose, PM2, Nginx Reverse Proxy, VPS Linux, Vercel\n\nDengan tech stack yang luas, ThinkCode dapat mengembangkan berbagai aplikasi web yang kompleks dan berperforma tinggi."
    };
  }

  // 5. Work Experience & Career History
  const experienceKeywords = [
    'pengalaman', 'pengalaman kerja', 'karir', 'career', 'riwayat', 
    'history', 'work history', 'bekerja', 'jam terbang'
  ];
  if (matchesKeywords(norm, experienceKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**Work Experience & IT Career Track:**\n\n• **Freelance Web Developer & IT Consultant** *(April 2026 - Present)*\n  Building custom full-stack web applications, automated web scrapers, and AI microservices for clients.\n\n• **Web Developer & AI Integrator** — *Bengkel Kurowesi (May 2025 - July 2025)*\n  Engineered web inventory systems and developed a Python Hybrid ARIMA-LSTM stock forecasting model (83.5% ML Accuracy).\n\n• **IT Support & Web Developer Intern** — *Military High Court III Surabaya (July 2023 - October 2023)*\n  Built the SIPINTER digital library web portal using Laravel & MySQL for judicial document management."
        : "**Pengalaman Kerja & Trajektori Karir Yoga Adi Pratama (ThinkCode):**\n\n• **Freelance Web Developer & IT Consultant** *(April 2026 - Sekarang)*\n  Mengembangkan aplikasi web custom full-stack, crawler data otomatis, dan integrasi microservice AI untuk berbagai klien.\n\n• **Web Developer & AI Integrator** — *Bengkel Kurowesi (Mei 2025 - Juli 2025)*\n  Membangun sistem inventori web dan mengembangkan microservice AI peramalan stok barang berbasis model Hybrid ARIMA-LSTM (Akurasi 83.5%).\n\n• **IT Support & Web Developer Intern** — *Pengadilan Tinggi Militer III Surabaya (Juli 2023 - Oktober 2023)*\n  Membangun sistem perpustakaan digital SIPINTER berbasis Laravel & MySQL untuk otomasi manajemen dokumen peradilan."
    };
  }

  // 6. Built Projects & Case Studies
  const projectKeywords = [
    'proyek', 'project', 'karya', 'portofolio', 'portfolio', 'built', 
    'studi kasus', 'case study', 'tampilkan proyek', 'proyek unggulan', 
    'si kurowesi', 'kurowesi', 'maps scraper', 'gmaps scraper', 'black ant', 'holidaybro', 'sipia', 'sakip', 'sipinter'
  ];
  if (matchesKeywords(norm, projectKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**Featured Projects & Case Studies:**\n\n• **Google Maps Scraper Web Platform**\n  *Stack:* Node.js, React, Leaflet, Groq Llama 3.3 AI\n  *Features:* Lead generation crawler covering 70+ cities with AI outreach email generator\n\n• **SI KuroWesi & ARIMA-LSTM Microservice**\n  *Stack:* Laravel 10, Vue.js, Python, Docker\n  *Features:* Inventory management system + automated stock forecasting ML model (83.5% accuracy)\n\n• **Black Ant Academy Website**\n  *Stack:* React 18, Vite, Motion, WhatsApp API\n  *Features:* Interactive martial arts academy portal with 'Anty' WhatsApp AI integration\n\n• **HolidayBro Travel Web App**\n  *Stack:* React 18, Tailwind, Multilingual (ID/EN/ZH)\n  *Features:* Tour package discovery platform with AI travel assistant"
        : "**Studi Kasus & Proyek Unggulan ThinkCode:**\n\n• **Google Maps Scraper Web Platform**\n  *Stack:* Node.js, React, Leaflet, Groq Llama 3.3 AI\n  *Fitur:* Scraper lead gen 70+ kota dengan draf email outreach otomatis AI\n\n• **SI KuroWesi & Microservice ARIMA-LSTM**\n  *Stack:* Laravel 10, Vue.js, Python, Docker\n  *Fitur:* Manajamen inventori bengkel + peramalan stok otomatis (Akurasi ML 83.5%)\n\n• **Website Black Ant Academy**\n  *Stack:* React 18, Vite, Motion, WhatsApp API\n  *Fitur:* Portal akademik beladiri interaktif dengan asisten virtual 'Anty'\n\n• **HolidayBro Travel Web App**\n  *Stack:* React 18, Tailwind, Multilingual (ID/EN/ZH)\n  *Fitur:* Katalog paket tour & perencana perjalanan berbasis AI"
    };
  }

  // 7. Identity & Bio
  const identityKeywords = [
    'siapa itu thinkcode', 'siapa thinkcode', 'siapa kamu', 'siapa yoga', 'who is thinkcode', 
    'who is yoga', 'who are you', 'owner', 'pemilik', 'biodata', 'tentang yoga', 
    'about yoga', 'about thinkcode', 'tentang thinkcode', 'tentang developer', 'about developer', 'profile', 'profil'
  ];
  if (matchesKeywords(norm, identityKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**Yoga Adi Pratama (ThinkCode)**\n*Senior Full-Stack Web Developer & AI Data Analyst*\n\n**Profile Summary:**\n• **Location:** Surabaya, Indonesia\n• **Experience:** 3+ Years (15+ Released Projects, 150k+ Lines of Code)\n• **Specialization:** High-Performance Web Apps, Recursive Data Crawlers, & Time-Series AI Models\n\nYoga focuses on secure, modular, and scalable software architectures tailored for modern business needs."
        : "**Yoga Adi Pratama (ThinkCode)**\n*Senior Full-Stack Web Developer & AI Data Analyst*\n\n**Ringkasan Profil:**\n• **Lokasi:** Surabaya, Indonesia\n• **Pengalaman:** 3+ Tahun (15+ Proyek Rilis, 150k+ Baris Kode)\n• **Spesialisasi:** Web Performa Tinggi, Recursive Web Crawlers, & Time-Series AI Models\n\nYoga berfokus pada arsitektur perangkat lunak yang aman, modular, dan terukur untuk kebutuhan bisnis modern."
    };
  }

  // 8. Frontend Capabilities (Specific)
  const frontendKeywords = [
    'frontend', 'front end', 'react', 'nextjs', 'next js', 'vue', 'tailwind', 
    'ui', 'tampilan', 'styling', 'figma', 'framer', 'motion'
  ];
  if (matchesKeywords(norm, frontendKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**ThinkCode Frontend Capabilities:**\n\n• **Core Frameworks:** React (18/19), Next.js, Vue.js, Vite\n• **Languages:** TypeScript, JavaScript (ES6+)\n• **Styling & UI:** Tailwind CSS (v3/v4), shadcn/ui, CSS Modules\n• **Animation & Motion:** Framer Motion / Motion, Lucide Icons\n• **Design & UX:** Mobile-First Responsive, Pixel-Perfect Layouts, Figma\n\nYoga builds ultra-fast, accessible, and responsive web interfaces optimized across all devices."
        : "**Tech Stack Frontend ThinkCode:**\n\n• **Core Frameworks:** React (18/19), Next.js, Vue.js, Vite\n• **Bahasa:** TypeScript, JavaScript (ES6+)\n• **Styling & UI:** Tailwind CSS (v3/v4), shadcn/ui, CSS Modules\n• **Animasi & Interaksi:** Framer Motion / Motion, Lucide Icons\n• **Desain & UX:** Mobile-First Responsive, Pixel-Perfect Layouts, Figma\n\nYoga membangun antarmuka web yang cepat, aksesibel, dan responsif di seluruh perangkat."
    };
  }

  // 9. Backend & DB Capabilities (Specific)
  const backendKeywords = [
    'backend', 'back end', 'database', 'api', 'laravel', 'php', 'nodejs', 
    'node js', 'express', 'postgresql', 'mysql', 'jwt', 'auth'
  ];
  if (matchesKeywords(norm, backendKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**ThinkCode Backend & Database Stack:**\n\n• **Runtime & Frameworks:** Node.js (Express.js), PHP & Laravel (8/10/11)\n• **Databases:** PostgreSQL (Neon Serverless), MySQL\n• **API Architecture:** RESTful API, Microservices, JSON Data Pipelines\n• **Security & Auth:** Multi-Role JWT Auth, HTTP-Only Cookie Session, Input Validation\n• **DevOps & Infra:** Docker, PM2, Nginx Reverse Proxy, Linux VPS, Vercel\n\nBackend systems are engineered with a focus on data security, sub-second latency, and seamless scalability."
        : "**Tech Stack Backend & Database ThinkCode:**\n\n• **Runtime & Frameworks:** Node.js (Express.js), PHP & Laravel (8/10/11)\n• **Database:** PostgreSQL (Neon Serverless), MySQL\n• **Arsitektur API:** RESTful API, Microservices, JSON Data Pipelines\n• **Keamanan & Auth:** Multi-Role JWT Auth, HTTP-Only Cookie Session, Input Validation\n• **DevOps & Infra:** Docker, PM2, Nginx Reverse Proxy, VPS Linux, Vercel\n\nSistem backend dirancang dengan fokus pada keamanan data, kecepatan respon, dan kemudahan skalabilitas."
    };
  }

  // 10. Automation & Web Scraping
  const scrapingKeywords = [
    'scraping', 'scraper', 'crawler', 'crawling', 'ambil data', 'anti bot', 
    'anti-bot', 'puppeteer', 'cheerio', 'ekstraksi', 'otomasi', 'automation'
  ];
  if (matchesKeywords(norm, scrapingKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**Web Scraping & Data Automation Capabilities:**\n\n• **Tools & Stack:** Puppeteer, Cheerio, Node.js\n• **Crawling Scope:** Recursive Deep Web Crawling, Multi-Page Extraction\n• **Protections Handled:** Anti-Bot Bypass, Rate Limiting Management, Session Cookie Retention\n• **Output Format:** Structured JSON, CSV, or Direct Database Sync\n\nIdeal for market research, price tracking, content aggregation, and automated B2B lead generation."
        : "**Layanan Web Scraping & Otomasi Data:**\n\n• **Tools & Stack:** Puppeteer, Cheerio, Node.js\n• **Kemampuan Crawling:** Recursive Deep Web Crawling, Multi-Page Extraction\n• **Penanganan Proteksi:** Anti-Bot Handling, Rate Limiting, Cookie Session Bypass\n• **Format Output:** JSON Terstruktur, CSV, / Langsung Sinkron ke Database\n\nCocok untuk riset pasar, pemantauan harga, agregasi konten, dan pembuatan database prospek (lead generation)."
    };
  }

  // 11. AI & Machine Learning
  const aiKeywords = [
    'machine learning', 'lstm', 'arima', 'forecasting', 'prediksi', 'llm', 
    'groq', 'ai integration', 'integrasi ai', 'tensorflow', 'keras'
  ];
  if (matchesKeywords(norm, aiKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**AI Integration & Machine Learning Solutions:**\n\n• **LLM API Orchestration:** Groq Llama 3.3 (Document analysis, automated outreach, Chatbot)\n• **Time-Series Models:** Hybrid ARIMA-LSTM (Automated stock & inventory forecasting)\n• **Medical Image AI:** Deep Neural Networks (DNN) with Keras / TensorFlow (87.5% accuracy)\n• **Data Science Stack:** Python, TensorFlow, Keras, Pandas, NumPy, NLP\n\nIntegrating AI capabilities directly into web business applications to drive operational efficiency."
        : "**Solusi Integrasi AI & Peramalan Machine Learning:**\n\n• **Integrasi LLM API:** Groq Llama 3.3 (Analisis dokumen, draf outreach otomatis, Chatbot)\n• **Model Time-Series:** Hybrid ARIMA-LSTM (Peramalan stok barang & harga otomatis)\n• **Medical Image AI:** Deep Neural Networks (DNN) dengan Keras / TensorFlow (Akurasi 87.5%)\n• **Data Science Stack:** Python, TensorFlow, Keras, Pandas, NumPy, NLP\n\nMenghubungkan kecerdasan buatan langsung ke dalam sistem web bisnis untuk efisiensi operasional."
    };
  }

  // 12. Services Packages
  const servicesKeywords = [
    'layanan', 'jasa', 'jasa buat', 'bikin web', 'buat aplikasi', 'menawarkan', 
    'services', 'package', 'paket'
  ];
  if (matchesKeywords(norm, servicesKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**ThinkCode Software Service Packages:**\n\n1. **Full-Stack Web Development**\n   • Custom web applications (React / Next.js / Laravel / Node.js)\n   • Multi-role admin portals, data management systems, & custom web apps\n\n2. **Web Scraping & Data Automation**\n   • Recursive web crawlers with anti-bot & rate-limit handling\n   • Automated extraction to structured JSON / Database formats\n\n3. **AI Microservices & Stock Forecasting**\n   • LLM Integration (Groq Llama 3.3) & ARIMA-LSTM time-series models\n   • Interactive visual analytics dashboards"
        : "**Paket Layanan Software ThinkCode:**\n\n1. **Full-Stack Web Development**\n   • Aplikasi web custom (React / Next.js / Laravel / Node.js)\n   • Portal admin multi-role, sistem manajemen data, & e-commerce\n\n2. **Web Scraping & Otomasi Data**\n   • Crawler data rekursif dengan penanganan anti-bot & rate limit\n   • Ekstraksi otomatis ke format JSON / Database\n\n3. **Microservice AI & Peramalan Stok**\n   • Integrasi AI LLM (Groq Llama 3.3) & peramalan stok ARIMA-LSTM\n   • Dashboard analitik visual interaktif"
    };
  }

  // 13. Pricing, Costs, & Rates
  const priceKeywords = [
    'harga', 'biaya', 'rate', 'tarif', 'price', 'cost', 'bayar berapa', 
    'gratis', 'estimasi biaya', 'consultation cost'
  ];
  if (matchesKeywords(norm, priceKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**Pricing & Cost Transparency:**\n\n• **Initial Consultation:** 100% Free\n• **Pricing Structure:** Custom quote based on feature scope, database scale, & system complexity\n• **Project Estimates:**\n  - *Web Scraping & Automation:* Tailored to target sites & crawling complexity\n  - *Full-Stack Web Apps:* Based on user role scope & API architecture\n  - *AI / ML Integrations:* Customized to model requirements & cloud infrastructure\n\nContact Yoga directly to receive a transparent proposal and cost estimate tailored to your project."
        : "**Estimasi Biaya & Transparansi Harga:**\n\n• **Konsultasi Awal:** 100% Gratis\n• **Skema Biaya:** Disesuaikan dengan cakupan fitur, skala database, & kompleksitas sistem\n• **Kategori Estimasi:**\n  - *Web Scraping & Otomasi:* Mulai dari skala kecil hingga skala enterprise\n  - *Web App Full-Stack:* Tergantung jumlah role pengguna & spesifikasi API\n  - *Integrasi AI / ML:* Disesuaikan dengan kebutuhan model & arsitektur server\n\nDiskusi kebutuhan proyek Anda secara langsung untuk mendapatkan proposal perkiraan biaya yang transparan!"
    };
  }

  // 14. Timelines & Delivery
  const timelineKeywords = [
    'berapa lama', 'durasi', 'timeline', 'pengerjaan', 'delivery', 
    'lama pengerjaan', 'lama buat', 'waktu pengerjaan'
  ];
  if (matchesKeywords(norm, timelineKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**Standard Project Timelines:**\n\n• **Web Scraping & Data Automation:** 1 - 3 Weeks\n• **Full-Stack Web Development:** 2 - 4 Weeks\n• **AI Microservices & Forecasting:** 3 - 6 Weeks\n\n*Note: Timelines may vary depending on spec completeness and revision scopes.*"
        : "**Jadwal & Durasi Pengerjaan Proyek:**\n\n• **Web Scraping & Otomasi Data:** 1 - 3 Minggu\n• **Full-Stack Web Development:** 2 - 4 Minggu\n• **Microservice AI & Peramalan Stok:** 3 - 6 Minggu\n\n*Catatan: Durasi pengerjaan dapat bervariasi sesuai dengan kelengkapan spesifikasi dan jumlah revisi.*"
    };
  }

  // 15. Collaboration Process
  const processKeywords = [
    'cara kerja', 'mulai proyek', 'workflow', 'step', 'kolaborasi', 
    'proses', 'start project', 'how to work', 'alur kerja'
  ];
  if (matchesKeywords(norm, processKeywords)) {
    return {
      matched: true,
      reply: isEn
        ? "**Collaboration Workflow:**\n\n1. **Free Consultation** — Initial discussion to map project scope & technical requirements\n2. **Proposal & Spec** — Detailed proposal specifying deliverables, timeline, & transparent budget\n3. **Development & QA** — Modular engineering, feature testing, & client progress reviews\n4. **Deployment & Support** — Production launch to Cloud/VPS server with post-launch maintenance"
        : "**Alur Kerja & Tahap Kolaborasi:**\n\n1. **Konsultasi Gratis** — Diskusi awal untuk memetakan kebutuhan & arsitektur sistem\n2. **Proposal & Spesifikasi** — Penyusunan dokumen ruang lingkup proyek, timeline, & biaya\n3. **Pengembangan & Testing** — Proses coding modular, pengujian fitur, & peninjauan berkala\n4. **Deployment & Support** — Peluncuran ke server VPS/Cloud beserta garansi pemeliharaan pasca-rilis"
    };
  }

  return { matched: false, reply: '' };
};

