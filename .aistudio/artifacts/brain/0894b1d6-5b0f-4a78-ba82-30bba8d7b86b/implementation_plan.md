# GTA VI: Leonida Chronicle & Vice City Fan Experience

An interactive, launch-week (November 17, 2026) web experience dedicated to Grand Theft Auto VI, blending a Miami twilight and *banafsh* (deep amethyst/violet) aesthetic with an animated Rockstar & GTA anthology, a 5-card rotating fan shoutout wall, a 10-question compatibility survey, email-only instant authorization, and a high-resolution (1K / 2K / 4K) Vice City key-art generator.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> All four architectural and aesthetic preferences from your clarification answers are locked into this plan and govern every design and engineering choice below.

- **Hybrid Single-Page Home + Dedicated Routes (Confirmed)**: The root landing page delivers the full end-to-end GTA VI experience in one continuous scroll, while dedicated pages for **About Us**, **Blogs**, **Game & Website Info**, and **Links & Socials** provide deep editorial content accessible from the top navigation bar and footer.
- **Deep Banafsh Night + Warm Coral Sunset Palette (Confirmed)**: The visual system centers on deep obsidian-plum surfaces (`#0B0613` / `#130921`), royal *banafsh* violet accents (`#8B5CF6` / `#A855F7`), and warm Miami sunset coral-amber highlights (`#FB7185` / `#F59E0B`), paired with high-contrast ivory typography.
- **Email-Only Authorization with Optional Nickname (Confirmed)**: Visitors authorize immediately with a valid email address and an optional display nickname (with clean auto-formatting from the email handle if omitted) — zero verification codes or passwords sent.
- **Dedicated Creator Spotlight & Challenge Story (Confirmed)**: Both the home showcase and the **About Us** / **Links** pages spotlight your Instagram web-design challenge series, documenting how this launch-week site was engineered for Vercel deployment.

---

## 1. Overview & Core Concept

- **What It Does**: Celebrates GTA VI's release week (November 2026) through a rich interactive showcase: a cinematic hero featuring bespoke GTA VI key art and live launch-week framing, a responsive 5-card Thank You wall that rotates every 10 seconds with names of authorized fans, a deeply animated Rockstar Games & GTA series timeline covering every mainline title, an interactive 10-question GTA VI hype & playstyle survey with personalized results, an email-only Vice Pass check-in, and a custom 1K/2K/4K Vice City Art Studio powered by `gemini-3-pro-image-preview`.
- **Target Audience / Persona**: GTA fans, gamers visiting from your Instagram programming-challenge channel, and web design enthusiasts exploring a Vercel-ready showcase.
- **Key Value**: Combines editorial storytelling, high-energy scroll and hover motion, real community participation, and interactive AI poster creation without forcing logins, verification codes, or disjointed templates.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **First Paint & Hero Launch Stage**: Visitors land on a 1440px-tuned hero showcasing a bespoke 16:9 GTA VI Miami Ocean Drive twilight key-art frame alongside a live launch-week framing banner, clear primary CTA (`Get Vice Pass` / `Take the Survey`), and a smooth 3-zone header (`LEONIDA SIX` wordmark — 5 single-line links — 1 primary CTA).
2. **Responsive 5 / 3 / 1–2 Card 10-Second Thank-You Wall**: Immediately visible on the first page, displaying **5 cards on laptop/desktop**, **3 cards on iPad/tablet**, and **1 to 2 cards on mobile**. Every 10 seconds, cards smoothly fade out and back in to display a personalized `"Thank You"` message alongside a randomly drawn name from the pool of email-authorized visitors (and any visitor who just authorized themselves enters the active pool immediately).
3. **Instant Email-Only Authorization (Vice Pass)**: Clicking `Get Vice Pass` (or using the inline authorization bar) opens a clean email + optional nickname form. Validating a real email authorizes the user on the spot with no OTP/code sent, updates the header status to their Vice Pass handle, and injects their name into the Thank You wall pool.
4. **Animated Rockstar History & Full GTA Anthology**: Scrolling into the chronicle reveals choreographed `motion/react` animations — scroll-linked timeline progress, kinetic era typography, and interactive 3D-tilt era cards spanning **DMA Design (1997)**, **GTA 1 & 2**, **GTA III (2001)**, **Vice City (2002)**, **San Andreas (2004)**, **GTA IV (2008)**, **GTA V (2013)**, and **GTA VI (2026)**, each paired with authentic photographic/editorial imagery and animated detail transitions.
5. **10-Question, 4-Option GTA VI Survey & Results**: Visitors answer 10 curated questions (each with 4 clear choices covering map exploration, Lucia & Jason dynamics, nightlife/radio, physics, heists, multiplayer, visuals, story tone, day-one plans, and expectations). Submitting displays an animated results report: overall **Leonida Compatibility %**, a custom **Player Archetype**, **4 Category Affinity Bars**, and a personalized breakdown of what they'll love most about the game (plus a retake option).
6. **Vice City Art Studio (`gemini-3-pro-image-preview`)**: Visitors type a prompt or choose a Miami/Leonida preset, select output resolution (**1K**, **2K**, or **4K**) and aspect ratio, and generate high-resolution GTA VI-inspired twilight artwork via a secure server-side endpoint.
7. **Dedicated Sub-Pages**:
   - **About Us**: Features the creator spotlight, the Instagram programming challenge story, design architecture, and behind-the-scenes build notes.
   - **Blogs**: Interactive editorial dispatches on GTA VI's Leonida regions, RAGE 9 atmospheric rendering, and Vice City music culture with a full article reader view.
   - **Game & Website Info**: Structured GTA VI launch-week dossier (protagonists, districts, specs) alongside the site's Vercel deployment and architecture summary.
   - **Links & Socials**: Curated hub for your Instagram channel, YouTube/TikTok/Discord/GitHub links, and official Rockstar resources with one-click copy/share actions.

### Visual Identity & Theme

- **Aesthetic Direction**: Atmospheric Miami coastal dusk meets modern editorial showcase — expressive *banafsh* twilight gradients and crisp architectural hairlines without noisy neon-cyan cyberpunk clichés or cluttered pill-badge spam.
- **Color Palette & Mood**:
  - `--background`: `#0B0613` (deep obsidian-plum canvas, 60% dominant field)
  - `--surface`: `#150C24` / `#1D1132` (smoked amethyst structural cards, 30% structural field, `1px` `rgba(196, 167, 255, 0.14)` hairline borders)
  - `--primary`: `#8B5CF6` -> `#A855F7` (royal *banafsh* violet, 10% high-intent accent for primary CTAs and active states)
  - `--accent`: `#FB7185` / `#F59E0B` (warm Miami coral-sunset highlights for launch badges, progress rings, and key imagery scrims)
  - `--foreground`: `#FAF7FF` primary text, `#C4B5FD` secondary prose, `#9484B8` muted unboxed metadata with `·` separators
- **Typography & Hierarchy**:
  - *Display*: `Barlow Condensed` (600, 700, 800) with tight tracking (`tracking-tight`) and `text-wrap: balance` to eliminate orphan words.
  - *Body*: `Plus Jakarta Sans` (400, 500, 600) at 15–16px with generous line-height.
  - *Tabular Figures*: `JetBrains Mono` with `tabular-nums` strictly for countdown digits, release years, survey percentages, and 10-second rotation timers.

### Interactive Feedback & Motion

- **Section-Level Choreography**: Scroll-triggered staggered reveals (`whileInView`), shared `layoutId` tab underlines across the GTA game selector, smooth `AnimatePresence` crossfades for the 10-second 5-card Thank You wall, interactive hover tilt/depth on media cards, and compositor-only (`transform`, `opacity`) motion respecting `prefers-reduced-motion`.
- **Resilience & States**: Every image uses locally generated assets with styled CSS fallback containers; survey, email auth, and AI image generation include explicit validation errors, loading skeletons/spinners, and clear confirmation states.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Email-Only Authorization Storage (No Verification Code)**
  - *Chosen Approach*: Server-validated API route (`/api/auth/email`) paired with client `localStorage` persistence and a curated initial pool of community names.
  - *Why*: Meets the explicit requirement to authorize instantaneously with just an email and no verification code, works reliably across Vercel serverless deployments with zero external database setup, and guarantees the 5-card Thank You wall always has real names while immediately spotlighting newly authorized visitors.
  - *Alternatives Considered*: Full Firebase Authentication (rejected because email-link auth requires sending verification codes and adds friction).
- **Decision 2: High-Resolution Art Generation Model (`gemini-3-pro-image-preview`)**
  - *Chosen Approach*: Next.js server-side API route invoking `@google/genai` with `gemini-3-pro-image-preview` and explicit `imageSize` selection (`1K`, `2K`, `4K`), alongside pre-generated static photorealistic artwork for Hero, Rockstar History, and GTA Eras.
  - *Why*: Ensures instant, zero-broken-image first paint across all devices while giving visitors a real, interactive 1K/2K/4K Vice City poster studio powered server-side without exposing credentials to the browser.
- **Decision 3: Hybrid Navigation Architecture**
  - *Chosen Approach*: Full multi-section single-page landing page at `/` plus dedicated Next.js App Router pages for About Us, Blogs, Info, and Links sharing a consistent 3-zone top bar and footer.
  - *Why*: Preserves the seamless single-page storytelling flow while giving shareable, SEO-friendly URLs for every requested secondary page on Vercel.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         Shared App Shell & Theme                          │
│  Top Bar (3-Zone: Brand Wordmark | 5 Single-Line Links | Vice Pass CTA)   │
└───────────────┬───────────────────────────────────────────┬───────────────┘
                │                                           │
                ▼                                           ▼
┌───────────────────────────────────────┐   ┌───────────────────────────────┐
│        Single-Page Home (/)           │   │      Dedicated Routes         │
│  ┌─────────────────────────────────┐  │   │  • /about (Creator Challenge) │
│  │ Hero: GTA VI Key Art + Countdown│  │   │  • /blogs (Dispatches + Reader│
│  └─────────────────────────────────┘  │   │  • /info  (Game & Vercel Info)│
│  ┌─────────────────────────────────┐  │   │  • /links (Instagram & Hub)   │
│  │ 5/3/1-2 Rotating Thank-You Wall │◄─┼───┼──┐                            │
│  │ (10s Fade Cycle + Random Fan)   │  │   │  │                            │
│  └─────────────────────────────────┘  │   │  │                            │
│  ┌─────────────────────────────────┐  │   └──┼────────────────────────────┘
│  │ Rockstar History & All GTA Games│  │      │
│  │ (Animated Era Stage & Timeline) │  │      │
│  └─────────────────────────────────┘  │      │
│  ┌─────────────────────────────────┐  │      │
│  │ 10-Question / 4-Option Survey   │  │      │
│  │ (Archetype & Match Results)     │  │      │
│  └─────────────────────────────────┘  │      │
│  ┌─────────────────────────────────┐  │      │
│  │ Vice City Art Studio (1K/2K/4K) │  │      │
│  └──────────────┬──────────────────┘  │      │
└─────────────────┼─────────────────────┘      │
                  │                            │
                  ▼                            ▼
┌───────────────────────────────────┐  ┌────────────────────────────────────┐
│  POST /api/generate-art           │  │  POST /api/auth/email              │
│  • Server-side @google/genai      │  │  • Validates email + nickname      │
│  • Model: gemini-3-pro-image-prev │  │  • Updates authorized fan pool     │
│  • imageSize: 1K | 2K | 4K        │  │  • Syncs client Vice Pass state    │
└───────────────────────────────────┘  └────────────────────────────────────┘
```

### Data Model & State

- **AuthorizedFan**: `{ id, email, displayName, authorizedAt }` — stored in browser `localStorage` and hydrated with an initial verified community roster so the 5-card Thank You wall rotates smoothly on initial load and updates immediately on sign-in.
- **SurveyState & Result**: `{ currentStep (0..9), answers: Record<questionId, optionIndex> }` -> pure scoring engine produces `{ matchPercentage, archetypeTitle, archetypeSummary, categoryScores (4 axes), dayOneRecommendation }`.
- **RockstarEra & GTATitle**: Structured chronological catalog from 1997 to 2026 containing release year, setting, technical breakthrough, music mood, and visual assets.
- **ArtGenerationRequest**: `{ prompt, aspectRatio, imageSize: "1K" | "2K" | "4K" }` -> returns `{ imageDataUrl, textNote }` or structured error message.

### Interactive Component & State Mapping

- **Rotating Fan Wall**: A single `10000ms` interval drives a phase flip (`fadeOut -> pick 5 distinct random authorized names + thank-you templates -> fadeIn`), while responsive Tailwind visibility classes enforce **5 cards on laptop (`lg`)**, **3 cards on iPad (`md`)**, and **1–2 cards on mobile (`base`/`sm`)**.
- **Email-Only Auth Flow**: Email regex validation + optional nickname field -> submits to `/api/auth/email` -> persists `AuthorizedFan` -> updates header CTA badge and inserts the user directly into the Fan Wall rotation pool.
- **Survey Engine**: Step-by-step controlled state (`Back`, `Select Option`, `Next / See Results`), requires an answer before advancing, computes archetype and compatibility breakdown cleanly, and supports instant reset.
- **Vice City Art Studio**: Prompt input + quick presets + `1K` / `2K` / `4K` resolution selector + aspect selector -> loading state -> renders generated poster with download button and graceful error banner if the API returns an error.
