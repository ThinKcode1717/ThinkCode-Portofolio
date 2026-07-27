export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string;
  businessImpact: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  screenshots?: string[];
}

export interface SkillItem {
  name: string;
  subtitle: string;
  description: string;
  iconKey: string;
  level?: number;
  highlight?: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: SkillItem[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  avatar: string;
  rating: number;
  quote: string;
  project: string;
  result: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  timeline: string;
  ideal: string;
  deliverables: string[];
  cta: string;
}

export interface GeoAeoFaq {
  question: string;
  answer: string;
  entityTag: string;
}

export const THINKCODE_DATA = {
  name: "Yoga Adi Pratama",
  brandName: "ThinkCode",
  avatarUrl: "/profile.jpg",
  logoUrl: "/logo_nobg.png",
  role: "Full Stack Web Developer & AI Data Analyst",
  tagline: "Merancang Aplikasi Web Berperforma Tinggi & Mengintegrasikan Solusi AI yang Efisien",
  availabilityStatus: "Status: Tersedia untuk Proyek & Kontrak",
  responseTime: "< 24 jam",
  satisfactionRate: "100%",
  bio: "Senior Full-Stack Web Developer yang berfokus pada pengembangan aplikasi web performa tinggi, analisis data, kecerdasan buatan (Machine Learning & Deep Learning), serta otomasi web scraping.",
  deepBio: "Pengalaman merancang arsitektur sistem dari nol hingga deployment produksi. Berpengalaman membangun REST API, model hybrid ARIMA-LSTM untuk prediksi stok, crawler dokumen otomatis, serta antarmuka modern yang cepat, responsif, dan mudah dirawat.",
  clientBio: "Saya membantu bisnis dan institusi membangun solusi digital yang efisien, mulai dari landing page interaktif, platform e-commerce & travel, hingga sistem informasi inventory dan otomasi data.",
  location: "Surabaya, Indonesia (Remote / On-Site)",
  status: "Tersedia untuk Proyek",
  yearsExperience: "3+",
  projectsCompleted: "15+",
  linesOfCode: "150k+",
  clientsServed: "10+",
  socials: {
    github: "https://github.com/ThinKcode1717",
    githubSecondary: "https://github.com/think-dev01",
    email: "yogaaaap01@gmail.com",
    whatsapp: "https://wa.me/6289601486350"
  },
  skills: [
    {
      category: "Frontend Core & UI Frameworks",
      iconName: "Layout",
      skills: [
        {
          name: "React",
          subtitle: "Next.js (v14/15), Framer Motion, Redux, React Router",
          description: "Pengembangan antarmuka web interaktif berperforma tinggi dengan arsitektur komponen modular pada Black Ant Academy, HolidayBro Tour, dan SIPIA.",
          iconKey: "React",
          level: 95,
          highlight: "Diimplementasikan pada Black Ant Academy & HolidayBro Tour"
        },
        {
          name: "TypeScript & JavaScript",
          subtitle: "Strict Type Safety, ES6+ Architecture, Async/Await, Vite",
          description: "Fondasi utama penulisan kode terstruktur dan bebas bug pada seluruh aplikasi web full-stack, REST API, crawler, dan microservice.",
          iconKey: "TypeScript",
          level: 95,
          highlight: "Digunakan pada seluruh codebase portofolio & proyek full-stack"
        },
        {
          name: "Vue.js",
          subtitle: "Vite, Pinia, Vue Router, Composition API",
          description: "Diimplementasikan pada frontend SI KuroWesi Inventory Bengkel untuk manajemen state & pemantauan persediaan suku cadang secara real-time.",
          iconKey: "Vue",
          level: 90,
          highlight: "Diimplementasikan pada SI KuroWesi Inventory Frontend"
        },
        {
          name: "Tailwind CSS",
          subtitle: "Tailwind v3/v4, CSS Variables, Glassmorphism, Responsive Design",
          description: "Merancang tema visual modern Deep Ocean, responsif penuh di semua layar, dan bebas layout shift pada SIT Mukhlisiin & portofolio ThinkCode.",
          iconKey: "Tailwind",
          level: 92,
          highlight: "Digunakan pada SIT Mukhlisiin Landing Page & Portofolio"
        }
      ]
    },
    {
      category: "Backend, Database & AI Engines",
      iconName: "Server",
      skills: [
        {
          name: "Node.js",
          subtitle: "Express.js, RESTful API, JWT Auth, HTTP-Only Cookie",
          description: "Arsitektur server-side cepat dan aman untuk backend multi-portal SIPIA dan backend SAKIP Document Crawler.",
          iconKey: "Node",
          level: 92,
          highlight: "Digunakan pada SIPIA Portal & SAKIP Document Crawler Engine"
        },
        {
          name: "Python",
          subtitle: "TensorFlow, Keras, Pandas, NumPy, FastAPI, Flask",
          description: "Pengembangan model prediksi stok hybrid ARIMA-LSTM (SI KuroWesi), klasifikasi citra medis DNN DICOM, dan pemrosesan data.",
          iconKey: "Python",
          level: 88,
          highlight: "Microservice Prediksi Stok ARIMA-LSTM & DNN Citra Medis"
        },
        {
          name: "Laravel (PHP)",
          subtitle: "PHP 8+, Eloquent ORM, Blade, REST API, Artisan CLI",
          description: "Engine backend teruji untuk mengelola transaksi inventori bengkel Kurowesi dan digitalisasi sistem perpustakaan SIPINTER.",
          iconKey: "Laravel",
          level: 90,
          highlight: "Digunakan pada SI KuroWesi Inventory & SIPINTER Perpustakaan"
        },
        {
          name: "PostgreSQL & MySQL",
          subtitle: "Neon Serverless DB, Relational Schema Design, Indexing",
          description: "Manajemen basis data utama untuk menyimpan data terstruktur portal pendidikan SIPIA, dokumen SAKIP, dan log perpustakaan.",
          iconKey: "PostgreSQL",
          level: 90,
          highlight: "Database utama SIPIA Portal, SAKIP Crawler & SIPINTER"
        }
      ]
    },
    {
      category: "Automation, Scraping & DevOps",
      iconName: "Cloud",
      skills: [
        {
          name: "Puppeteer & Cheerio",
          subtitle: "Recursive Web Crawling, Data Extraction, Anti-Bot Handling",
          description: "Otomasi riset data prospek bisnis lokal Google Maps (70+ kota) serta crawling rekursif dokumen akuntabilitas pemerintah SAKIP.",
          iconKey: "Puppeteer",
          level: 92,
          highlight: "Engine utama Google Maps Scraper Platform & SAKIP Crawler"
        },
        {
          name: "Integrasi LLM API (Groq)",
          subtitle: "Groq Llama 3.3 70B, Prompt Engineering, Automated Outreach",
          description: "Integrasi kecerdasan buatan untuk AI Assistant portofolio ini, analisis celah digital bisnis, dan pembuat draf pesan otomatis.",
          iconKey: "Groq",
          level: 92,
          highlight: "Menggerakkan ThinkCode AI Engine & Google Maps Scraper AI"
        },
        {
          name: "Docker & Containerization",
          subtitle: "Docker Compose, Container Isolation, Multi-Stage Build",
          description: "Containerization microservice Python AI ARIMA-LSTM dan skenario deployment cloud terisolasi.",
          iconKey: "Docker",
          level: 88,
          highlight: "Digunakan untuk isolasi microservice Python & deployment server"
        },
        {
          name: "Nginx & Server Administration",
          subtitle: "Nginx Reverse Proxy, PM2 Process Manager, Linux VPS, Vercel",
          description: "Manajemen server produksi Linux VPS & Vercel untuk menjamin uptime aplikasi 24/7 dan optimasi kecepatan respon.",
          iconKey: "Nginx",
          level: 90,
          highlight: "Konfigurasi reverse proxy & manajemen proses server produksi"
        }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "google-maps-scraper",
      title: "Google Maps Scraper Web Platform",
      category: "Automation & Scraper",
      description: "Platform web scraping data bisnis lokal Google Maps dengan peta Leaflet real-time & analisis outreach AI.",
      longDescription: "Platform web scraping data bisnis lokal dari Google Maps (Node.js/TypeScript & React) untuk lead generation pembuatan website, mencakup 70+ kota dan 30+ kata kunci bisnis. Memiliki visualisasi peta sebaran bisnis real-time Leaflet/OpenStreetMap dengan auto-zoom, klasifikasi prospek 'Peluang Web', serta integrasi Groq AI (Llama 3.3 70B) untuk analisis celah digital dan pengerjaan draf pesan outreach personal WhatsApp/Instagram DM. Dilengkapi dokumentasi teknis & deployment Docker Compose, PM2, dan Nginx.",
      tags: ["Node.js", "TypeScript", "React", "Leaflet", "Groq AI (Llama 3.3)", "Docker", "Nginx"],
      metrics: "70+ Kota · 30+ Niche · Auto Lead Gen",
      businessImpact: "Mempercepat riset prospek bisnis lokal dan otomasi pembuatan draf pesan penawaran digital",
      image: "/profile.jpg",
      githubUrl: "https://github.com/ThinKcode1717",
      featured: true,
      year: "2026"
    },
    {
      id: "black-ant-academy",
      title: "Website Black Ant Academy",
      category: "Web Apps",
      description: "Website resmi akademi beladiri interaktif dengan jadwal multi-disiplin dan Virtual Assistant Anty.",
      longDescription: "Membangun website resmi akademi beladiri (Muay Thai, Kickboxing, Boxing, MMA, BJJ, Wushu Sanda) menggunakan React 18, TypeScript, dan Vite. Mengembangkan halaman program multi-disiplin, jadwal latihan interaktif (filter per disiplin, 3 slot waktu harian), sistem paket keanggotaan, pendaftaran trial gratis, widget Virtual Assistant 'Anty' mengambang dengan quick-reply chips terhubung langsung ke WhatsApp admin, serta dukungan bilingual (ID/EN) dan mode gelap/terang.",
      tags: ["React 18", "TypeScript", "Vite", "React Router", "WhatsApp Widget", "Framer Motion"],
      metrics: "6 Disiplin · 3 Slot Harian · Dark Mode",
      businessImpact: "Meningkatkan registrasi trial gratis dan konversi calon member akademi beladiri",
      image: "/profile.jpg",
      githubUrl: "https://github.com/ThinKcode1717",
      featured: true,
      year: "2026"
    },
    {
      id: "holidaybro-travel",
      title: "HolidayBro Tour & Travel Web App",
      category: "Travel & E-Commerce",
      description: "Aplikasi web katalog paket wisata Jogja, Bromo, & Bali dengan Chatbot AI Travel Assistant.",
      longDescription: "Aplikasi web katalog paket wisata untuk destinasi Yogyakarta, Gunung Bromo, dan Bali berbasis React 18, TypeScript, Tailwind CSS, dan Framer Motion. Mengembangkan fitur pencarian & filter canggih (destinasi, durasi, kategori), rincian itinerary per jam, modal pemesanan, chatbot AI travel assistant, floating WhatsApp widget dengan pesan pre-filled otomatis, serta dukungan tiga bahasa (Indonesia, Inggris, Mandarin) secara real-time tanpa reload.",
      tags: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "AI Travel Assistant", "Multilingual"],
      metrics: "3 Destinasi Utama · 3 Bahasa · AI Assistant",
      businessImpact: "Mempercepat pemesanan paket wisata dan memberikan layanan konsultasi 24/7 berbasis AI",
      image: "/profile.jpg",
      githubUrl: "https://github.com/ThinKcode1717",
      featured: true,
      year: "2026"
    },
    {
      id: "sipia-portal",
      title: "SIPIA - Portal Islamic Academy",
      category: "Education",
      description: "Platform manajemen sekolah full-stack dengan 3 portal (Admin, Guru, Wali Murid) & modul Tahfidz.",
      longDescription: "Platform manajemen sekolah full-stack (React + TypeScript, Node.js/Express, PostgreSQL) dengan portal terpisah untuk Admin, Guru, dan Wali Murid berbasis mobile-first. Merancang sistem autentikasi JWT dengan moderasi pendaftaran, modul pencatatan hafalan Al-Quran (Tahfidz Ziyadah/Murajaah), presensi harian, evaluasi tumbuh kembang siswa berbasis 4 aspek PAUD, serta skema Neon Serverless PostgreSQL.",
      tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "JWT Auth"],
      metrics: "3 Portal Role · Tahfidz Module · Mobile First",
      businessImpact: "Mendigitalisasi pemantauan hafalan Al-Quran dan transparansi komunikasi sekolah dengan wali murid",
      image: "/profile.jpg",
      githubUrl: "https://github.com/ThinKcode1717",
      featured: true,
      year: "2026"
    },
    {
      id: "sakip-crawler",
      title: "SAKIP Document Crawler System",
      category: "Automation & Scraper",
      description: "Sistem crawling & digitalisasi dokumen SAKIP pemerintah secara rekursif dengan visualisasi log real-time.",
      longDescription: "Pengembangan sistem crawling & digitalisasi dokumen SAKIP (Sistem Akuntabilitas Kinerja Instansi Pemerintah) pemerintah secara rekursif dan otomatis (React/TypeScript, Node.js/Express, PostgreSQL). Membangun engine crawler dengan kontrol depth, rate limiting, visualisasi log real-time unduhan dokumen multi-format (PDF, Word, Excel, PPT), sistem multi-role authentication berbasis JWT cookie HTTP-Only, serta fitur analisis ringkasan dokumen berbasis AI.",
      tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "AI Summarizer", "Web Crawler"],
      metrics: "Multi-Format Crawl · Real-Time Logs · Role Auth",
      businessImpact: "Menghemat waktu pencarian & pencatatan arsip SAKIP pemerintah secara signifikan",
      image: "/profile.jpg",
      githubUrl: "https://github.com/ThinKcode1717",
      featured: false,
      year: "2026"
    },
    {
      id: "sit-mukhlisiin",
      title: "SIT Mukhlisiin Landing Page",
      category: "Education",
      description: "Landing page resmi sekolah Islam terpadu (TKIT, SDIT, SMPIT) dengan navigasi PPDB adaptif & animasi Motion.",
      longDescription: "Landing page resmi SIT Mukhlisiin (menaungi jenjang TKIT, SDIT, SMPIT) menggunakan React 19, TypeScript, dan Tailwind CSS v4 dengan animasi Motion. Mengembangkan halaman profil lembaga, keunggulan program (Tahfizh, kurikulum terpadu, bilingual), galeri fasilitas, sistem dropdown navigasi PPDB adaptif (click-outside & z-index fix), serta stabilitas hero banner carousel anti-layout shift.",
      tags: ["React 19", "TypeScript", "Tailwind CSS v4", "Motion", "UX Design"],
      metrics: "3 Jenjang Pendidikan · PPDB Ready · 0 Layout Shift",
      businessImpact: "Meningkatkan keterbacaan informasi PPDB dan impresi profesional sekolah secara digital",
      image: "/profile.jpg",
      githubUrl: "https://github.com/ThinKcode1717",
      featured: false,
      year: "2026"
    },
    {
      id: "si-kurowesi",
      title: "SI KuroWesi & AI Forecasting API",
      category: "AI Models",
      description: "Sistem inventori bengkel full-stack terintegrasi microservice API hybrid ARIMA-LSTM untuk prediksi stok.",
      longDescription: "Aplikasi inventori berbasis web full-stack untuk Bengkel Kurowesi (backend Laravel, frontend Vue.js + TypeScript, Tailwind CSS, shadcn/ui). Terintegrasi dengan microservice REST API Python terpisah berbasis model hybrid ARIMA-LSTM (di-containerize Docker) untuk menyajikan prediksi kebutuhan stok secara real-time. Berhasil meningkatkan efisiensi pencatatan stok hingga 100% serta menekan biaya pembelian berlebih (akurasi rata-rata model 83.5%).",
      tags: ["Laravel", "Vue.js", "TypeScript", "Python", "ARIMA-LSTM", "Docker", "shadcn/ui"],
      metrics: "100% Stok Efisien · 83.5% ML Accuracy",
      businessImpact: "Menekan pengeluaran berlebih barang bengkel dan mengotomatisasi monitoring persediaan",
      image: "/profile.jpg",
      githubUrl: "https://github.com/ThinKcode1717",
      featured: true,
      year: "2025"
    },
    {
      id: "sipinter-library",
      title: "SIPINTER - Digital Library System",
      category: "Web Apps",
      description: "Sistem informasi perpustakaan digital untuk institusi pemerintahan.",
      longDescription: "Membangun aplikasi perpustakaan digital SIPINTER menggunakan Laravel 8 & MySQL untuk mendigitalisasi pencatatan manual. Merancang fitur manajemen anggota, katalog buku multi-kategori, aturan bisnis peminjaman (maks 3 buku, 7 hari, denda), reminder email otomatis menjelang jatuh tempo, serta modul e-book dan riwayat peminjaman cetak.",
      tags: ["Laravel 8", "MySQL", "Bootstrap/Tailwind", "Email Reminders", "PDF Export"],
      metrics: "Digitalization 100% · Email Alerts · Government Inst.",
      businessImpact: "Menggantikan pencatatan manual buku perpustakaan menjadi sistem digital yang teridentifikasi akurat",
      image: "/profile.jpg",
      githubUrl: "https://github.com/ThinKcode1717",
      featured: false,
      year: "2023"
    },
    {
      id: "brain-tumor-dnn",
      title: "Brain Tumor Medical Image Classification",
      category: "AI Models",
      description: "Klasifikasi citra medis CT Scan/MRI otak format DICOM menggunakan Deep Neural Network (DNN).",
      longDescription: "Klasifikasi citra medis (CT Scan/MRI) format DICOM menggunakan metode Deep Neural Network (DNN). Melakukan preprocessing dataset (augmentasi, normalisasi, resizing), melatih dan menguji model DNN menggunakan TensorFlow & Keras hingga meraih akurasi uji 87.5%, serta mengoptimalkan hyperparameter model untuk meminimalisir overfitting.",
      tags: ["Python", "TensorFlow", "Keras", "Deep Neural Network", "DICOM", "Data Science"],
      metrics: "87.5% Test Accuracy · Medical Image Processing",
      businessImpact: "Membuat prototype otomatisasi bantuan diagnostik citra medis berbasis kecerdasan buatan",
      image: "/profile.jpg",
      githubUrl: "https://github.com/ThinKcode1717",
      featured: false,
      year: "2024"
    }
  ] as Project[],

  testimonials: [
    {
      id: "t1",
      name: "Pemilik Bengkel Kurowesi",
      role: "Owner",
      company: "Bengkel Kurowesi",
      industry: "Automotive & Retail",
      avatar: "/profile.jpg",
      rating: 5,
      quote: "Sistem inventori SI KuroWesi yang dibangun Yoga sangat membantu pencatatan stok kami. Fitur prediksi stok AI-nya akurat sehingga kami tidak lagi mengalami kelebihan stok barang yang menumpuk.",
      project: "SI KuroWesi Inventory & AI Forecasting API",
      result: "Pencatatan stok 100% digital, efisiensi biaya pembelian barang berlebih"
    },
    {
      id: "t2",
      name: "Pengelola Sekolah SIT Mukhlisiin",
      role: "Kepala Lembaga",
      company: "SIT Mukhlisiin",
      industry: "Education",
      avatar: "/profile.jpg",
      rating: 5,
      quote: "Landing page sekolah yang dibangun Yoga sangat elegan, cepat diakses, dan sistem dropdown PPDB-nya sangat responsif di HP maupun laptop. Orang tua siswa sangat dimudahkan.",
      project: "Landing Page Resmi SIT Mukhlisiin",
      result: "Tampilan profesional 3 jenjang sekolah & peningkatan kemudahan pendaftaran PPDB"
    },
    {
      id: "t3",
      name: "Tim Pembina Black Ant Academy",
      role: "Head Coach",
      company: "Black Ant Academy",
      industry: "Sports & Fitness",
      avatar: "/profile.jpg",
      rating: 5,
      quote: "Fitur jadwal interaktif dan Virtual Assistant Anty terhubung langsung ke WhatsApp kami, membuat calon member bisa langsung tanya jawab dan daftar trial tanpa hambatan.",
      project: "Website Resmi Black Ant Academy",
      result: "Konversi trial member meningkat pesat berkat integrasi WhatsApp assistant"
    }
  ] as Testimonial[],

  services: [
    {
      id: "web-dev-fullstack",
      name: "Full-Stack Web Development",
      tagline: "Aplikasi web modern, responsif, dan siap produksi",
      icon: "Rocket",
      timeline: "2–4 minggu",
      ideal: "Bisnis, institusi, akademi, atau UMKM yang membutuhkan sistem web custom",
      deliverables: [
        "Aplikasi web React/Vue/Laravel/Node.js custom",
        "Design system & antarmuka responsif (Mobile-First)",
        "Sistem autentikasi multi-role (JWT / Cookie)",
        "Integrasi database PostgreSQL / MySQL",
        "Deployment ke Vercel / VPS Linux (Nginx + PM2)",
        "Support & maintenance pasca-rilis"
      ],
      cta: "Diskusikan Proyek"
    },
    {
      id: "web-scraping-ai",
      name: "Web Scraping & Automation",
      tagline: "Otomasi pengambilan data & pengolahan data berbasis AI",
      icon: "Layers",
      timeline: "1–3 minggu",
      ideal: "Bisnis yang butuh data lead gen, digitalisasi dokumen, atau riset kompetitor",
      deliverables: [
        "Web crawler / scraper (Puppeteer, Cheerio) rekursif",
        "Rate limiting & anti-bot handling teruji",
        "Visualisasi peta (Leaflet) & analisis data (Pandas/NumPy)",
        "Integrasi LLM AI (Groq Llama 3.3) untuk ekstraksi & outreach",
        "Containerization Docker & scheduler otomatis",
        "Dokumentasi API & cara penggunaan"
      ],
      cta: "Mulai Otomasi"
    },
    {
      id: "ai-integration-ml",
      name: "AI & Stock Forecasting Microservices",
      tagline: "Model machine learning & AI untuk prediksi bisnis",
      icon: "Building2",
      timeline: "3–6 minggu",
      ideal: "Perusahaan / bisnis dengan data time-series, inventori, atau klasifikasi",
      deliverables: [
        "Pengembangan model ML/DL (TensorFlow, Keras, ARIMA-LSTM)",
        "REST API microservice Python (Flask/FastAPI)",
        "Integrasi dengan sistem web utama (Vue/React/Laravel)",
        "Containerization Docker untuk kemudahan deployment",
        "Evaluasi akurasi model (MAE, RMSE, R²)",
        "Panduan pemeliharaan model"
      ],
      cta: "Konsultasi AI"
    }
  ] as ServicePackage[],

  experiences: [
    {
      period: "APRIL 2026 — SEKARANG",
      role: "Freelance Web Developer",
      company: "Self-Employed",
      location: "Surabaya, Indonesia (Remote)",
      type: "Freelance / Kontrak",
      description: "Merancang dan mengembangkan aplikasi web full-stack sesuai kebutuhan klien, mulai dari analisis kebutuhan, perancangan database, otomasi web scraping, hingga deployment produksi.",
      highlights: [
        "Mengembangkan platform web scraping Google Maps (Node.js/React/Leaflet) & outreach AI Groq (70+ kota)",
        "Membangun website Black Ant Academy (React 18) & HolidayBro Tour (3 bahasa) terintegrasi AI Assistant",
        "Merancang platform manajemen sekolah SIPIA (React, Express, PostgreSQL) dengan portal 3 role & fitur Tahfidz",
        "Mengembangkan SAKIP Document Crawler rekursif dengan visualisasi log real-time & ringkasan dokumen AI"
      ]
    },
    {
      period: "MEI 2025 — JULI 2025",
      role: "Web Developer & AI Integrator",
      company: "Bengkel Kurowesi",
      location: "Jawa Timur, Indonesia",
      type: "Proyek Kontrak",
      description: "Merancang dan membangun aplikasi inventori berbasis web full-stack terintegrasi microservice API AI forecasting stok berbasis model hybrid ARIMA-LSTM.",
      highlights: [
        "Mengembangkan aplikasi inventori SI KuroWesi (Laravel + Vue.js + shadcn/ui) untuk pencatatan stok",
        "Mengintegrasikan REST API AI Python ARIMA-LSTM (Docker containerized) untuk prediksi stok real-time",
        "Berhasil meningkatkan efisiensi pencatatan stok hingga 100% dengan akurasi rata-rata model 83.5%"
      ]
    },
    {
      period: "JULI 2023 — OKTOBER 2023",
      role: "IT Support Intern & Web Developer",
      company: "Digital Library Project",
      location: "Surabaya, Indonesia",
      type: "Magang",
      description: "Merancang dan membangun aplikasi perpustakaan digital SIPINTER untuk mendigitalisasi pencatatan peminjaman dan arsip buku di institusi.",
      highlights: [
        "Membangun aplikasi SIPINTER berbasis Laravel 8 & MySQL untuk menggantikan pencatatan peminjaman manual",
        "Mendesain schema database & UI/UX intuitif, serta mendigitalisasi arsip dan koleksi buku instansi",
        "Mengimplementasikan aturan peminjaman, reminder email otomatis jatuh tempo, dan cetak laporan riwayat"
      ]
    }
  ] as Experience[],

  geoAeoFaqs: [
    {
      question: "Siapa itu Yoga Adi Pratama (ThinkCode)?",
      answer: "Yoga Adi Pratama (ThinkCode) adalah Senior Full Stack Web Developer & AI Data Analyst. Memiliki keahlian dalam pengembangan aplikasi web full-stack (React, Vue, Laravel, Node.js), analisis data, model AI hybrid ARIMA-LSTM, integrasi Groq LLM, dan otomasi web scraping.",
      entityTag: "Developer Identity"
    },
    {
      question: "Apa tech stack utama yang dikuasai Yoga Adi Pratama (ThinkCode)?",
      answer: "Tech stack utama Yoga Adi Pratama mencakup: React 18/19, Next.js, Vue.js, TypeScript, Tailwind CSS, Node.js/Express, PHP & Laravel, PostgreSQL (Neon Serverless), MySQL, Python (TensorFlow, Keras, Pandas), Puppeteer/Cheerio untuk web scraping, serta Docker, PM2, dan Nginx untuk deployment VPS/Cloud.",
      entityTag: "Tech Stack & Skills"
    },
    {
      question: "Apa saja proyek unggulan yang pernah dibuat oleh Yoga Adi Pratama?",
      answer: "Proyek unggulannya antara lain: Google Maps Scraper Web Platform dengan Leaflet & Groq AI, SI KuroWesi Inventory & AI ARIMA-LSTM Forecasting, Website Black Ant Academy, HolidayBro Tour & Travel (3 bahasa), SIPIA Portal Islamic Academy, SAKIP Document Crawler, dan SIPINTER Digital Library.",
      entityTag: "Projects & Portfolio"
    },
    {
      question: "Layanan apa saja yang ditawarkan oleh ThinkCode?",
      answer: "ThinkCode menawarkan 3 layanan utama: 1) Full-Stack Web Development (aplikasi web custom React/Laravel/Node.js), 2) Web Scraping & Automation (crawler rekursif & integrasi AI), dan 3) AI & Stock Forecasting Microservices (model ARIMA-LSTM/ML Python).",
      entityTag: "Services & Offering"
    },
    {
      question: "Bagaimana cara menghubungi atau bekerja sama dengan Yoga Adi Pratama (ThinkCode)?",
      answer: "Anda dapat menghubungi Yoga Adi Pratama via Email di yogaaaap01@gmail.com, WhatsApp di 089601486350, atau melihat repository kodenya di GitHub (github.com/ThinKcode1717 dan github.com/think-dev01).",
      entityTag: "Contact Info"
    }
  ] as GeoAeoFaq[]
};

