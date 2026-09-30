# 💀 Worst UI for Any Web Browser

> **The Ultimate Intentionally Dysfunctional, Comedic, and Chaotic Anti-UX Experience.**

A full-stack, production-grade web application engineered to deliberately violate conventional UI/UX principles while remaining **technically functional, stable, accessible, and completely safe**.

---

## 🌟 Key Anti-UX Features

1. **Delayed Hyperlinks (800ms – 2500ms):**
   - Every major navigation link hesitates before loading.
   - Shows misleading progress bars and hilarious status messages (*“Still thinking…”*, *“Almost.”*, *“Why did you click that?”*).

2. **Evasive Moving Buttons:**
   - Buttons jitter or leap away when the mouse approaches or hovers over them.
   - Uses bounded physics so buttons never escape off-screen.
   - Features escape counters showing how many times the button evaded the cursor.

3. **₹9,999.99 Fake Payment Tollgate:**
   - Attempting to log in or access privileged zones claims a mandatory admission fee.
   - **100% Simulated:** Clearly identified with explicit safety disclaimers. No credit cards or real banking credentials are ever accepted or requested.
   - Multi-stage universe contact sequence (*“Initializing payment…”*, *“Contacting payment universe…”*, *“Wallet status: unfortunate.”*, *“Payment accepted because we said so.”*).

4. **+10,000 Free AI Tokens Reward:**
   - After the simulated payment, users receive a shower of confetti and +10,000 fictional AI tokens.

5. **“HI POOR FELLOW” Popup:**
   - An obnoxious wobbly popup appears immediately after the token transaction greeting the user with comedic affection.
   - Contains an evasive dismiss button that hops away before allowing closure.

6. **Hallucinating Mist-and-Black Background:**
   - Multi-layered visual system combining deep black, dark gray gradients, animated translucent mist blobs, and subtle noise grain.
   - Smooth, non-seizure motion respecting `prefers-reduced-motion`.

7. **Permanent Malfunctioning Hologram:**
   - A glowing retro-cyber hologram companion (`HOLO-9000`) that floats, emits scanlines, flickers, and permanently stays on screen.
   - The close button (`X`) refuses to remove the hologram and instead produces witty rage-bait reactions.
   - Clicking on the hologram pokes it to trigger randomized comedic commentary.

8. **Malfunctioning AI Interface (`/ai`):**
   - Interactive chat terminal powered securely by **server-side Gemini** (`@google/genai`).
   - Deducts 1 simulated token per interaction.
   - Produces structured JSON responses validated with **Zod**, displaying hallucinated confidence meters and companion commentary.
   - Includes deterministic, hilarious fallback responses if API keys are missing or offline.

9. **Confusing Navigation & Harmless Mischief:**
   - Shuffled link ordering, inverted nested submenus, and rotating buttons (*“Don't press again”*).
   - Custom **404 page** celebrating the user's navigational failure.

10. **Inverted Color Psychology (Red for Yes, Green for No) & Paradox Engine:**
    - Cognitive disorientation through inverted colors (Hazard Red for Affirmative/Confirm, Friendly Green for Negative/Reject).
    - Double-negative dilemma quizzes (*“Are you sure you do not want to not cancel this non-action?”*).

11. **Dynamic Red & Blue UI Depiction Switcher:**
    - Interactive color switcher flipping the entire screen's mist and button styling between glowing Neon Red and Electric Blue.

12. **Educational & Practical Use Cases (`/use-cases`):**
    - Negative-example pedagogy for UX/UI design courses.
    - Developer & coworker office pranks.
    - Mental fortitude & patience training.
    - Browser DOM thrashing and layout benchmark.
    - AI alignment comedy research.

13. **Emergency Recovery & Accessibility:**
    - Emergency Reset button in the footer and modal controls to instantly restore sanity and reset state.
    - Reduced motion accessibility switch.
    - Synthesized 8-bit sound effects using native Web Audio API (with mute toggle).

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript & Vite
- **Styling:** Tailwind CSS with custom scanlines, glows, and keyframe animations
- **Routing:** React Router v6
- **Validation:** Zod schemas
- **Effects:** Canvas Confetti & Web Audio API synthesizer
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js & Express with TypeScript (`tsx` dev runner)
- **AI SDK:** `@google/genai` (server-side only, never exposed to client)
- **Security:** Helmet, CORS, and Express Rate Limiters (for `/api/ai/chat` & `/api/payment/simulate`)
- **Validation:** Zod schemas for all request payloads and AI outputs

### Database & Auth
- **Database:** Supabase PostgreSQL with Row Level Security (RLS)
- **Migrations:** SQL schema located at `supabase/migrations/20260930000000_init_worst_ui_schema.sql`
- **Fallback Mode:** Built-in in-memory session/profile store allowing 100% full-featured standalone execution out-of-the-box!

---

## 🚀 Quick Start

### 1. Installation
Install all dependencies for root, server, and client:
```bash
npm run install:all
```

### 2. Environment Configuration
Create a `.env` file in the root directory (or in `server/`):
```bash
cp .env.example .env
```
Populate `.env` with your credentials:
```env
NODE_ENV=development
PORT=3000

# Optional Supabase credentials:
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Optional Gemini API Key:
GEMINI_API_KEY=

CLIENT_URL=http://localhost:5173
```
*(Note: If `GEMINI_API_KEY` or `SUPABASE_URL` are not set, the application automatically uses its deterministic anti-UX fallback intelligence and safe local session store, providing a 100% complete and fully demonstrable experience).*

### 3. Running Locally
Run both client and server concurrently:
```bash
npm run dev
```

Or run them individually in separate terminals:
```bash
# Terminal 1 - Backend API (Port 3000)
npm run dev:server

# Terminal 2 - Frontend App (Port 5173)
npm run dev:client
```

Open your browser to:
```
http://localhost:5173
```

---

## 🗄️ Database Schema & RLS

Run the migration script in `supabase/migrations/20260930000000_init_worst_ui_schema.sql` in your Supabase SQL editor:
- `public.profiles`: Stores display name, token balance, and timestamps.
- `public.ai_conversations`: Tracks user conversation sessions.
- `public.ai_messages`: User and AI message history.
- `public.demo_payment_events`: Logs simulated payment records (simulation only).
- Row Level Security (RLS) enabled on all tables ensuring users can only read and write their own data.

---

## 🧪 Testing Checklist

- [x] **Delayed Hyperlinks:** Clicking navigation links induces 800ms–2500ms delay with humorous loading banners.
- [x] **Moving Buttons:** Approaching or hovering buttons moves them smoothly within bounds.
- [x] **Simulated Payment Gate:** Accessing login or tollgate initiates the ₹9999.99 simulation sequence without real payment risk.
- [x] **Token Reward:** Awards +10,000 simulated tokens with confetti fanfare.
- [x] **“HI POOR FELLOW”:** Obnoxious wobbly popup triggers post-payment with an evasive dismiss button.
- [x] **Permanent Hologram:** Hologram companion remains present, emits scanlines, reacts to clicks, and refuses to close.
- [x] **AI Chat:** Spends 1 token per chat, connects to backend, validates with Zod, and returns comedic unhelpful responses.
- [x] **Emergency Reset:** Clicking "EMERGENCY RESET" in footer restores default factory parameters.
- [x] **Accessibility:** Reduced motion toggle disables intrusive animations.
