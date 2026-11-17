# VI — GTA VI Launch Hub & Vice City Experience

An interactive Grand Theft Auto VI showcase and Vice City Poster Studio built with Next.js 15 App Router, React 19, Tailwind CSS v4, Motion, and the `@google/genai` SDK.

## Deploy to Vercel from GitHub

1. Push this repository to a GitHub repository.
2. Open [Vercel](https://vercel.com/new) and click **Add New... -> Project**.
3. Import your GitHub repository (Vercel automatically detects **Next.js**).
4. Under **Environment Variables**, add:
   - `GEMINI_API_KEY` — Your Google Gemini API key (required for the Vice City Poster Studio 1K / 2K / 4K generator).
5. Click **Deploy**.

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Create production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
