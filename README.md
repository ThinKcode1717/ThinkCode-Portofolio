# 🌊 ThinkCode — Deep Ocean Underwater Web Portfolio

An immersive, high-performance web portfolio built for **ThinkCode** (Full Stack Developer & Submarine Tech Specialist) with an authentic deep ocean theme, WebGL fluid dynamics, interactive AI Chatbot, Light/Dark theme toggle, and multi-language support (Bahasa Indonesia & English).

![ThinkCode Underwater Portfolio](public/profile.jpg)

## 🚀 Key Features

- **🌊 Persistent Underwater Atmosphere**:
  - ReactBits `<LiquidEther />` WebGL fluid wave simulation with ocean current velocity palette.
  - ReactBits `<SideRays />` sunlight refraction beams penetrating the ocean depth.
  - Persistent full-viewport background with floating bioluminescent ocean plankton/bubbles.
- **🤖 Groq AI Interactive Submarine Chatbot**:
  - Powered by Groq AI (`llama-3.3-70b-versatile`).
  - Strict portfolio schema guardrails & out-of-scope fallback response.
  - Multi-language awareness (`ID` and `EN`).
- **🌓 Sunlit Aqua Light & Abyssal Dark Mode**:
  - Abyssal Midnight Dark Mode (`#000308`, `#00F0FF`, `#00B4D8`).
  - Sunlit Tropical Aqua Light Mode (`#F0FDFA`, `#E0F2FE`, `#0284C7`).
  - Saved in `localStorage`.
- **🌐 Multi-Language Support (`ID` / `EN`)**:
  - Full translation dictionary across all sections and AI chatbot responses.
- **💧 Water-Drip Avatar Card**:
  - Fluid SVG morphing mask container (`@keyframes waterBlobMorph`) with water droplets.
- **⚡ Performance & SEO**:
  - Next.js 16 (Turbopack), Tailwind CSS v4, Framer Motion.
  - Automated JSON-LD Structured Data Schema (`Person`, `WebSite`, `FAQPage`), `sitemap.xml`, and `robots.txt`.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI & Animations**: React 19, Tailwind CSS v4, Framer Motion, Lucide React
- **WebGL Rendering**: Three.js, OGL (ReactBits LiquidEther & SideRays)
- **AI Engine**: Groq API (Llama 3.3 70B)
- **Deployment**: Vercel / Netlify

## 💻 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/ThinKcode1717/ThinkCode-Portofolio.git
cd ThinkCode-Portofolio

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open `http://localhost:3000` to view the website.

## 🚀 Deploying to Vercel

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set root directory to `./` (default).
4. Click **Deploy**!

---

Developed with 💙 by **ThinkCode**.
