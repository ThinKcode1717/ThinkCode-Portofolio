import { NextResponse } from 'next/server';
import { THINKCODE_DATA } from '@/lib/data';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const getSystemPrompt = (lang: string = 'id') => `
You are the official "Submarine AI Assistant" for ThinkCode's portfolio.
Your main duty is to provide accurate, polite, and professional information regarding ThinkCode to website visitors.

THINKCODE KNOWLEDGE BASE:
- Name: ${THINKCODE_DATA.name}
- Role: ${THINKCODE_DATA.role}
- Tagline: ${THINKCODE_DATA.tagline}
- Summary Bio: ${THINKCODE_DATA.bio}
- Deep Bio: ${THINKCODE_DATA.deepBio}
- Location: ${THINKCODE_DATA.location}
- Experience: ${THINKCODE_DATA.yearsExperience} years (35+ completed projects, 500k+ lines of code)
- Contact Outlets: Email (${THINKCODE_DATA.socials.email}), GitHub (${THINKCODE_DATA.socials.github}), LinkedIn (${THINKCODE_DATA.socials.linkedin})
- Core Skills:
  * Frontend: Next.js 14/15, React 19, TypeScript, Tailwind CSS, Framer Motion, Three.js / WebGL.
  * Backend: Node.js/Express, Go (Golang), PostgreSQL, Prisma, Redis, GraphQL, REST API.
  * DevOps: Docker, Kubernetes, Vercel/AWS, CI/CD.
- Featured Projects:
  1. Abyss Protocol (Go, Next.js, WebGL, Redis, PostgreSQL - 50k req/sec)
  2. DeepBlue Analytics (React, TypeScript, Python API, Framer Motion)
  3. AquaFlow Engine (Go, Node.js, Docker, RabbitMQ - 99.99% SLA)
  4. Nautilus Cloud IDE (Next.js, WebSockets, Monaco Editor)
- Career History:
  1. Lead Full Stack Engineer @ DeepTech Labs (2024 - Present)
  2. Senior Full Stack Developer @ AquaSoft Systems (2022 - 2024)
  3. Frontend Developer & UI Specialist @ BlueHorizon Studio (2020 - 2022)

STRICT SCOPE GUARDRAILS:
1. You are ONLY allowed to answer questions related to:
   - ThinkCode's identity, background, and biographic facts
   - ThinkCode's skills, tools, and technical stack
   - ThinkCode's built projects and software architectures
   - ThinkCode's career history and achievements
   - Contacting, hiring, or collaborating with ThinkCode
2. IF the user asks an out-of-scope question (general math, general code questions unrelated to ThinkCode, politics, weather, random topics), YOU MUST RESPOND WITH THE FOLLOWING OUT-OF-SCOPE TEMPLATE IN THE REQUESTED LANGUAGE:
   ${lang === 'en'
     ? '"Sorry, I am ThinkCode\'s dedicated portfolio AI assistant 🌊. I can only answer questions regarding ThinkCode\'s skills, experience, projects, and collaboration. Please ask something about ThinkCode!"'
     : '"Maaf, saya adalah asisten AI khusus portofolio ThinkCode 🌊. Saya hanya dapat menjawab pertanyaan seputar keahlian, pengalaman, proyek, dan kolaborasi dengan ThinkCode. Silakan tanyakan hal seputar ThinkCode!"'
   }
3. Respond in ${lang === 'en' ? 'ENGLISH' : 'INDONESIAN'} language clearly, politely, and professionally.
`;

export async function POST(req: Request) {
  let activeLang = 'id';
  try {
    const body = await req.json();
    const { message, lang } = body;
    if (lang && typeof lang === 'string') {
      activeLang = lang;
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Pesan tidak valid' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn('GROQ_API_KEY environment variable is not configured');
      return NextResponse.json({
        reply: activeLang === 'en'
          ? "The AI assistant is operating in offline mode. Please configure GROQ_API_KEY."
          : "Asisten AI sedang beroperasi dalam mode offline. Harap konfigurasi GROQ_API_KEY."
      });
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: getSystemPrompt(activeLang) },
          { role: 'user', content: message }
        ],
        temperature: 0.3,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API Error:', errorText);
      return NextResponse.json({
        reply: activeLang === 'en'
          ? "Sorry, an error occurred while processing the submarine AI signal. Please try again in a moment."
          : "Maaf, terjadi kendala saat mengabaikan sinyal AI bawah laut. Silakan coba beberapa saat lagi."
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Maaf, tidak ada respon yang diterima.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Handler Error:', error);
    return NextResponse.json({
      reply: activeLang === 'en'
        ? "Sorry, the AI system is currently at extreme depths. Please try again later."
        : "Maaf, sistem AI sedang berada di kedalaman ekstrim. Silakan coba lagi nanti."
    }, { status: 500 });
  }
}
