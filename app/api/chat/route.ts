import { NextResponse } from 'next/server';
import { THINKCODE_DATA } from '@/lib/data';
import { getLocalSchemaReply } from '@/lib/aiSchemaRouter';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const getSystemPrompt = (lang: string = 'id') => `
You are the official AI Assistant for ThinkCode's portfolio (Developer: Yoga Adi Pratama).
Your main duty is to provide accurate, polite, and professional information regarding Yoga Adi Pratama (ThinkCode) to website visitors.

THINKCODE KNOWLEDGE BASE:
- Full Name: ${THINKCODE_DATA.name} (Brand / Alias: ${THINKCODE_DATA.brandName})
- Role: ${THINKCODE_DATA.role}
- Tagline: ${THINKCODE_DATA.tagline}
- Summary Bio: ${THINKCODE_DATA.bio}
- Deep Bio: ${THINKCODE_DATA.deepBio}
- Location: ${THINKCODE_DATA.location}
- Experience: ${THINKCODE_DATA.yearsExperience} years (15+ completed projects, 150k+ lines of code)
- Contact Outlets: Email (${THINKCODE_DATA.socials.email}), WhatsApp (${THINKCODE_DATA.socials.whatsapp}), GitHub Main (${THINKCODE_DATA.socials.github}), GitHub Secondary (${THINKCODE_DATA.socials.githubSecondary})
- Core Skills:
  * Frontend: React (18/19), TypeScript, Vue.js, Vite, Next.js, Tailwind CSS (v3/v4), Framer Motion / Motion, shadcn/ui.
  * Backend & DB: Node.js/Express, PHP & Laravel (8/10/11), PostgreSQL (Neon Serverless), MySQL, JWT Auth, REST API.
  * AI & Data: Python, TensorFlow, Keras, Model Hybrid ARIMA-LSTM (Stock Forecasting), Integrasi Groq Llama 3.3 LLM API, Pandas, NumPy, NLP.
  * Automation & Scraping: Puppeteer, Cheerio, Web Crawling Rekursif, Rate Limiting & Anti-Bot Handling.
  * DevOps & Infra: Docker, Docker Compose, PM2, Nginx Reverse Proxy, Vercel, VPS Linux.
- Featured Built Projects:
  1. Google Maps Scraper Web Platform (Node.js/React, Leaflet, Groq Llama 3.3 AI, 70+ cities lead gen)
  2. SI KuroWesi & AI Forecasting API (Laravel, Vue.js, Python Hybrid ARIMA-LSTM, Docker containerized, 83.5% ML accuracy)
  3. Website Black Ant Academy (React 18, Vite, Martial Arts Academy, Virtual Assistant "Anty" connected to WhatsApp)
  4. HolidayBro Tour & Travel Web App (React 18, Tailwind, Multilingual ID/EN/ZH, AI Travel Assistant)
  5. SIPIA Portal Islamic Academy (React, Node.js, PostgreSQL, 3 role portals: Admin/Guru/Wali Murid, Tahfidz & PAUD tracking)
  6. SAKIP Document Crawler & Management System (React, Node.js, PostgreSQL, Recursive Government Doc Crawler, AI Summarizer)
  7. SIT Mukhlisiin Landing Page (React 19, Tailwind v4, Motion, PPDB System)
  8. SIPINTER Digital Library (Laravel 8, MySQL, Pengadilan Tinggi Militer III Surabaya)
  9. Brain Tumor DNN Image Classification (Python, TensorFlow, Keras, 87.5% Medical Image Accuracy)
- Work History (IT Only):
  1. Freelance Web Developer (Self-Employed, April 2026 - Present)
  2. Web Developer & AI Integrator (Bengkel Kurowesi, Mei 2025 - Juli 2025)
  3. IT Support Intern & Web Developer (Pengadilan Tinggi Militer III Surabaya, Juli 2023 - Oktober 2023)

STRICT SCOPE GUARDRAILS:
1. You are ONLY allowed to answer questions related to:
   - ThinkCode's identity, background, and biographic facts
   - ThinkCode's skills, tools, and technical stack
   - ThinkCode's built projects and software architectures
   - ThinkCode's career history and achievements
   - Contacting, hiring, or collaborating with ThinkCode
2. IF the user asks an out-of-scope question (general math, general code questions unrelated to ThinkCode, politics, weather, random topics), YOU MUST RESPOND WITH THE FOLLOWING OUT-OF-SCOPE TEMPLATE IN THE REQUESTED LANGUAGE:
   ${lang === 'en'
     ? '"Sorry, I am ThinkCode\'s dedicated portfolio AI assistant. I can only answer questions regarding ThinkCode\'s skills, experience, projects, and collaboration. Please ask something about ThinkCode!"'
     : '"Maaf, saya adalah asisten AI khusus portofolio ThinkCode. Saya hanya dapat menjawab pertanyaan seputar keahlian, pengalaman, proyek, dan kolaborasi dengan ThinkCode. Silakan tanyakan hal seputar ThinkCode!"'
   }
3. Respond in ${lang === 'en' ? 'ENGLISH' : 'INDONESIAN'} language clearly, politely, and professionally.
`;

// Priority ordered free Groq models for automatic failover on rate limits / quota exhaustion
const GROQ_FREE_FALLBACK_MODELS = [
  'llama-3.3-70b-versatile', // Priority 1: High intelligence (1K RPD / 100K TPD)
  'llama-3.1-8b-instant',    // Priority 2: Ultra-fast & High Quota (14.4K RPD / 500K TPD)
  'qwen/qwen3.6-27b',        // Priority 3: Qwen 27B (1K RPD / 200K TPD)
  'allam-2-7b',              // Priority 4: Allam 7B (7K RPD / 500K TPD)
  'openai/gpt-oss-120b',     // Priority 5: GPT-OSS 120B (1K RPD / 200K TPD)
  'groq/compound-mini'       // Priority 6: High Token Limit (70K TPM / No limit TPD)
];

export async function POST(req: Request) {
  let activeLang: 'id' | 'en' = 'id';
  try {
    const body = await req.json();
    const { message, lang } = body;
    if (lang === 'en' || lang === 'id') {
      activeLang = lang;
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Pesan tidak valid' }, { status: 400 });
    }

    // 1. Check Local Pre-routing Schema (Sub-millisecond resolution, 0 API quota used)
    const localCheck = getLocalSchemaReply(message, activeLang);
    if (localCheck.matched) {
      return NextResponse.json({ reply: localCheck.reply, source: 'schema' });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn('GROQ_API_KEY environment variable is not configured');
      return NextResponse.json({
        reply: activeLang === 'en'
          ? "The AI assistant is operating in offline mode. Please configure GROQ_API_KEY."
          : "Asisten AI sedang beroperasi dalam mode offline. Harap konfigurasi GROQ_API_KEY.",
        source: 'schema'
      });
    }

    // 2. Multi-Model Failover Loop: Iterate through free Groq models if Rate Limit (HTTP 429) occurs
    let lastError = '';
    for (const modelName of GROQ_FREE_FALLBACK_MODELS) {
      try {
        const response = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: 'system', content: getSystemPrompt(activeLang) },
              { role: 'user', content: message }
            ],
            temperature: 0.3,
            max_tokens: 600
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, source: 'groq', modelUsed: modelName });
          }
        }

        // If rate limit (429) or model error occurs, log warning and failover to next free model
        const errorText = await response.text();
        lastError = errorText;
        console.warn(`Groq Model [${modelName}] failover trigger (${response.status}):`, errorText);
      } catch (modelErr) {
        console.warn(`Groq Model [${modelName}] exception:`, modelErr);
      }
    }

    console.error('All Groq free models exhausted or rate limited:', lastError);
    return NextResponse.json({
      reply: activeLang === 'en'
        ? "All AI models are currently at maximum daily usage limits. Please try asking portfolio questions!"
        : "Seluruh model AI sedang mencapai batas kuota harian. Silakan tanyakan hal seputar portofolio!",
      source: 'schema'
    });
  } catch (error) {
    console.error('Chat API Handler Error:', error);
    return NextResponse.json({
      reply: activeLang === 'en'
        ? "Sorry, the AI system is currently unavailable. Please try again later."
        : "Maaf, sistem AI sedang tidak dapat diakses saat ini. Silakan coba lagi nanti.",
      source: 'schema'
    }, { status: 500 });
  }
}
