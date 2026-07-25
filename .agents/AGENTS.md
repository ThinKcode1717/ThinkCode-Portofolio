# Design Rules — ThinkCode Portfolio

## Fundamental Design Anti-Patterns (NEVER USE)

### 1. No Emoticons / Emoji in UI
- NEVER use emoticons or emoji as visual elements in any UI component
- ALWAYS use a proper icon framework (Lucide Icons, Heroicons, or Phosphor Icons)
- Icons should be SVG-based and from a consistent framework

### 2. No "AI-Generated" Badge Patterns
- NEVER use badges that contain only label text with a number prefix:
  - "01 • TENTANG DEVELOPER" NO
  - "02 • TECH ARSENAL" NO
  - "Open to Projects — Q3 2025" NO
  - Any "XX • SECTION LABEL" pattern NO
- Badges/pills should carry meaningful interactive states or actual data
- If a section needs a label, use clean typographic elements (small caps, overline), NOT a pill/badge

### 3. No Neon / Glow Effects
- NEVER use CSS neon-glow effects on text or buttons
- No shadow-[0_0_Xpx_#HEXCOLOR] color glows
- No pulsing colored light rings around elements
- Design style: Deep Ocean + Glassmorphism — subtle depth via blur, opacity, gradients
- Exception: Sidebar active indicator can have max 10px shadow at opacity <=20%

### 4. No Ocean-Themed Copywriting
- NEVER use ocean/underwater metaphors in section titles or body text
- "Bawah Laut", "Submarine", "Sinyal Bawah Laut", "Deep Water Projects" are BANNED from copy
- The underwater effect is VISUAL ONLY (background animations, bubble effects)
- All written content must focus on: value proposition, technical capability, business outcomes

## Icon Interaction Rules
- Icons in interactive UI components SHOULD have hover animations
- Preferred: subtle rotation (+-15deg), scale (1.1x), or translate (+-2px)
- Use Framer Motion whileHover for consistent smooth micro-interactions
- Animation duration: 150-250ms, easing: easeOut

## Applied to Project: thinker-portofolio-2

## Code Efficiency & Pragmatism (Ponytail Rules)
- **Think like an efficient senior developer**: The best code is the code never written.
- **Decision Ladder** before writing new code:
  1. *Does this need to exist?* (YAGNI)
  2. *Already in codebase?* Reuse existing helpers, components, and patterns.
  3. *Stdlib / Framework built-in?* Use native Next.js/React/HTML capabilities.
  4. *Installed dependency?* Use packages in `package.json` before considering new ones.
  5. *One line?* Prefer clean, surgical one-liners when suitable.
  6. *Minimum that works*: Shortest working diff wins while understanding the full problem.
- **No unnecessary abstractions, boilerplate, or extra npm packages.**
- **Quality & Safety bounds**: Input validation, error handling, security, accessibility, and design standards are NEVER compromised.

## Anti-AI-Generated Website Rules (Anti-AI Slop Guidelines)
- **No AI Copywriting Telltales & Em-Dash Overhead**:
  - NEVER use robotic AI buzzwords: *seamless*, *delve*, *tapestry*, *empower*, *cutting-edge*, *leverage*, *paradigm*.
  - NEVER excessively use em-dash symbols (" — ") in subtitles, titles, or body text as a lazy clause separator. Use natural human punctuation (commas, periods, clean subtext).
  - All written copy MUST sound like a direct, authoritative, pragmatic senior software engineer—never generic AI marketing fluff.
- **No Generic "AI Slop" Layouts**:
  - Avoid identical 3-card bento layouts without strong visual hierarchy.
  - Avoid uncurated stock illustrations or generic 3D assets.
  - Maintain strong typography contrast (Archivo display for headers, Inter for copy, JetBrains Mono for technical specs).
- **Authentic Technical Evidence**:
  - Ground all claims with real metrics, real GitHub projects (`CoffeePOS`, `SI_KuroWesi`, `AI_KuroWesi_API`), and actual technical outcomes.
- **Contextual Error Handling & Transparent AI UX**:
  - Never use generic "Something went wrong" error messages. Always provide actionable context.


