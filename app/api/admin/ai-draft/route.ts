import { NextResponse } from 'next/server';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const GROQ_FALLBACK_MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'qwen/qwen3.6-27b'
];

function isValidAuth(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return decoded.startsWith('thinkcode_admin_') && decoded.endsWith('_authenticated');
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isValidAuth(request)) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki otorisasi' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, existingDescription, action } = body;

    if (!title && !existingDescription) {
      return NextResponse.json({ success: false, error: 'Judul atau deskripsi proyek diperlukan' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'GROQ_API_KEY tidak ditemukan di env server. Pastikan API key terpasang.'
        },
        { status: 500 }
      );
    }

    const prompt = `
You are an expert Senior Software Engineer & Technical Copywriter for ThinkCode portfolio.
Generate structured JSON data for a web/AI/automation project based on the input provided.

INPUT:
- Project Title: "${title || ''}"
- Existing Raw Description: "${existingDescription || ''}"
- Requested Action: "${action || 'generate_draft'}"

RULES & INSTRUCTIONS:
1. Generate complete, compelling, professional project data in strict JSON format.
2. Produce BOTH Indonesian ('id') and English ('en') versions for all text fields.
3. Keep copywriting direct, authoritative, and value-focused (NO generic AI buzzwords like 'seamless', 'cutting-edge', 'paradigm', 'tapestry').
4. The output MUST be a valid JSON object matching the following structure exactly (without markdown backticks):

{
  "category": "Company Profile" | "POS (Point of Sale)" | "E-commerce" | "Ekspedisi/Logistik" | "ERP" | "CRM" | "HRIS/HRM" | "LMS (Learning Management System)" | "Marketplace" | "Booking/Reservation System" | "Chatbot/Customer Service" | "CMS (Content Management System)" | "Forum/Community Platform" | "Social Media Platform" | "Job Portal" | "Real Estate Platform" | "Food Delivery" | "Ride-hailing" | "Project Management Tool" | "Inventory/Warehouse Management" | "Accounting/Finance App" | "Healthcare/Telemedicine" | "Event Management" | "Survey/Form Builder" | "Analytics Dashboard" | "Payment Gateway/Wallet" | "Rental/Sewa Platform" | "Auction Platform" | "Crowdfunding Platform" | "News/Media Portal" | "Ticketing/Helpdesk System" | "Fleet Management" | "School/Campus Management" | "POS + Inventory Hybrid" | "Multi-tenant SaaS",
  "year": "2026",
  "metrics": "Production Ready / 99.9% Uptime",
  "tags": ["React", "TypeScript", "Node.js", "PostgreSQL"],
  "id": {
    "title": "${title || 'Judul Proyek'}",
    "tagline": "Ringkasan fokus solusi dalam 1 kalimat",
    "description": "Deskripsi singkat 2-3 kalimat mengenai keunggulan proyek",
    "longDescription": "Penjelasan mendalam mengenai arsitektur sistem, modul utama, dan solusi teknis yang diimplementasikan",
    "businessImpact": "Dampak bisnis nyata (misal: Meningkatkan efisiensi riset prospek 80%)"
  },
  "en": {
    "title": "${title || 'Project Title'}",
    "tagline": "Single sentence solution tagline",
    "description": "Short 2-3 sentence overview of project highlights",
    "longDescription": "In-depth overview of system architecture, core modules, and technical solutions implemented",
    "businessImpact": "Real business impact (e.g. Accelerates lead research by 80%)"
  }
}
`;

    let aiResultText = '';
    let successModel = '';

    for (const model of GROQ_FALLBACK_MODELS) {
      try {
        const response = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'system',
                content: 'You are a JSON generator. Always return strictly valid JSON without codeblocks.'
              },
              { role: 'user', content: prompt }
            ],
            temperature: 0.3,
            max_tokens: 1500
          })
        });

        if (response.ok) {
          const data = await response.json();
          aiResultText = data.choices?.[0]?.message?.content || '';
          successModel = model;
          if (aiResultText) break;
        }
      } catch (err) {
        console.warn(`Model ${model} failed, trying fallback...`, err);
      }
    }

    if (!aiResultText) {
      return NextResponse.json({ success: false, error: 'Gagal mendapatkan respon dari AI LLM.' }, { status: 500 });
    }

    // Clean markdown wrapper if present
    const cleanedJson = aiResultText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsedData = JSON.parse(cleanedJson);

    return NextResponse.json({
      success: true,
      draft: parsedData,
      model: successModel
    });
  } catch (error: any) {
    console.error('AI Draft Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal memproses draf AI' },
      { status: 500 }
    );
  }
}
