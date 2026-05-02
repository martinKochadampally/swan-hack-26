# Voiced 🎙️
> *"Finally, someone's listening."*

**SwanHacks 2025 — Theme: Accessibility for Students**

---

## Table of Contents

1. [What Is Voiced](#what-is-voiced)
2. [The Problem](#the-problem)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Cost Breakdown](#cost-breakdown)
6. [Team Roles](#team-roles)
7. [File Structure — Frontend](#file-structure--frontend)
8. [File Structure — Backend](#file-structure--backend)
9. [API Contracts](#api-contracts)
10. [Database Schema](#database-schema)
11. [Environment Variables](#environment-variables)
12. [24-Hour Build Timeline](#24-hour-build-timeline)
13. [Demo Script](#demo-script)
14. [Judging Criteria Map](#judging-criteria-map)

---

## What Is Voiced

Voiced is a voice-first AI platform that helps college students with disabilities discover what academic accommodations they are legally entitled to, navigate the paperwork to get them, and track that their professors actually follow through — all starting from a single spoken sentence.

It is not a transcription tool. It is not a chatbot. It is a full self-advocacy pipeline that takes a student from **"I don't know what's wrong"** to **"my letter is sent and my professors are notified"** in under 10 minutes.

---

## The Problem

- **21%** of college students have a documented disability
- **92%** of low-income students with disabilities receive no or inadequate legal help
- Most students don't know they qualify for accommodations
- Most don't know what to say, what documentation to bring, or who to contact
- Up until college, parents handled all of this — now students are completely on their own
- ISU's SAS website tells you the office exists. It cannot tell you if you qualify, write your letter, or chase your professors.

**Voiced replaces the parent. It is the knowledgeable friend in every student's corner.**

---

## Features

### 1. Voice Intake
- Student clicks mic and speaks naturally in plain English
- No forms, no jargon, no appointments needed
- Live waveform animation plays while they speak
- Real-time transcript appears word-by-word via OpenAI Whisper
- If the student says something vague like "I'm just stressed", Voiced asks intelligent follow-up questions before making any recommendations
- Routes to counselling if the issue is not academic/disability-related

### 2. AI Follow-Up Question Flow
- Multi-turn conversation if intake is unclear
- Three follow-up questions: academic impact, duration, existing diagnosis
- Three routing paths:
  - Has diagnosis → go straight to accommodation recommendations
  - Suspects diagnosis → help prepare doctor visit questions
  - General stress → route to ISU Student Counseling Services
- AI never recommends accommodations without sufficient information

### 3. Accommodation Card Selector
- AI surfaces interactive cards for every accommodation the student likely qualifies for
- Cards include: extended test time, distraction-reduced room, note-taking support, priority seating, etc.
- Each card has an icon, plain-English description, and what it means day-to-day
- Student selects or deselects — selections feed directly into letter generation
- All recommendations framed as "likely qualifies" — always recommends confirming with SAS

### 4. University-Specific Roadmap
- 4-step animated timeline personalised to ISU
- Real office name: Student Accessibility Services (SAS)
- Real address: 1060 Hixson Lied Student Success Center, 215 Beach Rd, Ames IA 50011
- Real email: accessibility@iastate.edu
- Real phone: 515-294-7220
- Estimated timelines based on ISU's actual process (5–7 business days)
- Each step has a live status badge: Complete / In Progress / Upcoming

### 5. Auto-Generated Accommodation Request Letter
- Pulls in student name, university, student ID, diagnosis, and selected accommodations
- Written in correct legal language referencing ADA and Section 504
- Generated fields highlighted in the preview so student can see what AI filled in
- Three actions: Download PDF / Edit Letter / Email Directly to accessibility@iastate.edu
- Includes disclaimer: "This letter is a starting point. Please confirm all accommodations with ISU SAS."

### 6. Doctor Note Generator
- Pre-filled one-page template the student gives to their physician
- Doctor just signs it — removes the single biggest documentation barrier
- Specific to the detected disability
- Includes the exact documentation format ISU SAS accepts

### 7. Professor Accommodation Tracker
- Dashboard showing every class as a row
- Color-coded status dots:
  - Green — professor confirmed accommodation
  - Yellow — letter sent, no reply yet (after 3 days)
  - Red — letter not sent yet
- One-click "Send Letter" generates and sends personalised email to each professor
- One-click "Follow Up" generates a firm, polite follow-up citing ADA when no reply
- One-click "Escalate" generates a formal complaint to department chair if professor continues to ignore

### 8. Semester Renewal Reminder
- Accommodations must be renewed every semester at ISU
- Voiced sends a reminder 2 weeks before each semester starts
- One-click renewal reactivates all approved accommodations for the new term

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend framework | Next.js 14 (App Router) + TypeScript | Full-stack React framework |
| Styling | Tailwind CSS | Utility-first CSS |
| Authentication | Clerk | Login, signup, session management |
| Voice transcription | OpenAI Whisper API | Speech to text |
| AI responses + letter | OpenAI GPT-4o | Natural language understanding and generation |
| AI testing | OpenAI GPT-4o-mini | Use during development to save costs |
| PDF generation | react-pdf | Client-side PDF export |
| Database | Supabase (PostgreSQL) | Persistent storage with RLS |
| Backend | Node.js + Express | REST API server |
| Frontend deploy | Vercel | One-click deploy from GitHub |
| Backend deploy | Railway | Simple Node.js hosting |

---

## Cost Breakdown

| Item | Cost |
|---|---|
| OpenAI Whisper | ~$0.006 per minute of audio — basically free |
| OpenAI GPT-4o | ~$1–3 for entire hackathon build + testing |
| OpenAI GPT-4o-mini | Use this during dev — ~15x cheaper |
| Supabase | Free tier (500MB) — more than enough |
| Clerk | Free tier (10,000 MAU) — more than enough |
| Vercel | Free hobby tier |
| Railway | $5 free trial credit — more than enough |
| **Total** | **$5–10 split four ways = ~$2.50 each** |

**Important:** Set a hard spend limit of $20 in OpenAI dashboard before starting.
Go to: OpenAI → Settings → Billing → Usage Limits → Set Hard Limit = $20

---

## Team Roles

---

### Frontend 1 — Landing Page + Voice UI

**Owns:** Everything in the first half of the user experience

**Pages/Components:**
- Landing page with hero, stat strip, and CTA
- `/intake` — microphone UI, waveform, transcript display, AI response bubble
- Accommodation card selector component
- Connection to `/api/transcribe` and `/api/analyze` backend endpoints

**Tasks:**
- [ ] Landing page — hero section, tagline, stat strip (21%, 92%, 3 min), CTA button
- [ ] Navigation bar with Voiced logo
- [ ] Microphone button with pulse ring animation
- [ ] Live waveform animation (10 animated bars) while recording
- [ ] Real-time transcript display — text appears as Whisper returns chunks
- [ ] AI response bubble with animated typing effect (character by character)
- [ ] Follow-up question flow UI — if intake is vague, show follow-up cards
- [ ] Accommodation cards grid — icon, name, description, select/deselect toggle with checkmark
- [ ] Connect mic button to POST /api/transcribe
- [ ] Connect transcript to POST /api/analyze
- [ ] Handle loading states for all API calls
- [ ] Handle error states (mic permission denied, API failure)

**Estimated hours:**

| Task | Time |
|---|---|
| Landing page + hero | 2 hrs |
| Mic button + waveform animation | 2 hrs |
| Real-time transcript display | 2 hrs |
| AI response bubble + typing effect | 1 hr |
| Follow-up question flow UI | 1 hr |
| Accommodation cards UI | 1.5 hrs |
| API hookup + error/loading states | 1 hr |
| **Total** | **~10.5 hrs** |

---

### Frontend 2 — Dashboard + Letter + Timeline

**Owns:** The second half of the user journey — roadmap, tracking, documents

**Pages/Components:**
- `/dashboard` — professor tracker, class rows, status dots, action buttons
- `/roadmap` — animated 4-step timeline with status badges
- `/letter` — letter preview, highlighted fields, download/edit/email buttons
- PDF export integration

**Tasks:**
- [ ] Animated 4-step roadmap with status badges (Complete / In Progress / Upcoming)
- [ ] Step connector lines with correct colors per status
- [ ] Professor tracker dashboard — class rows, color-coded status dots
- [ ] Follow Up button — triggers email generation
- [ ] Send Letter button — sends accommodation email to professor
- [ ] Escalate button — generates complaint letter to department chair
- [ ] Letter preview — styled document with green-highlighted generated fields
- [ ] Edit letter inline functionality
- [ ] Download PDF button using react-pdf
- [ ] Email directly button (mailto link pre-filled with letter content)
- [ ] Semester renewal reminder banner
- [ ] Page transitions and loading states
- [ ] Seed realistic demo data (Jordan's profile, 4 ISU classes, mixed statuses)
- [ ] Mobile responsiveness across all screens
- [ ] Final polish pass before demo

**Estimated hours:**

| Task | Time |
|---|---|
| Animated roadmap / timeline | 2 hrs |
| Professor tracker dashboard | 2 hrs |
| Follow up / send / escalate buttons | 1 hr |
| Letter preview UI | 1.5 hrs |
| PDF download integration | 1 hr |
| Demo data seeding | 0.5 hrs |
| Polish + responsiveness | 1.5 hrs |
| **Total** | **~9.5 hrs** |

---

### Backend 1 — AI Pipeline

**Owns:** Every AI-powered endpoint — transcription, analysis, letter generation, emails

**Tasks:**
- [ ] POST `/api/transcribe` — receives audio blob, sends to Whisper, returns transcript
- [ ] POST `/api/analyze` — takes transcript, runs follow-up question logic, returns disability category + accommodation list + AI response text
- [ ] POST `/api/generate-letter` — takes student info + selected accommodations, returns formatted letter
- [ ] POST `/api/doctor-note` — generates pre-filled physician documentation template
- [ ] POST `/api/professor-email` — generates initial accommodation notification email per professor
- [ ] POST `/api/followup-email` — generates follow-up email when professor hasn't replied
- [ ] POST `/api/escalate-email` — generates formal complaint to department chair
- [ ] Prompt engineering for all GPT-4o calls — warm tone, legally accurate, ISU-specific
- [ ] Follow-up question logic — detect vague intake, generate clarifying questions
- [ ] Routing logic — counselling vs. health center vs. accommodation path
- [ ] Use GPT-4o-mini during development, switch to GPT-4o for final demo
- [ ] Streaming response for letter generation (text appears word by word on frontend)

**Estimated hours:**

| Task | Time |
|---|---|
| Whisper transcription endpoint | 1.5 hrs |
| GPT-4o intake analysis + follow-up logic | 3 hrs |
| Letter generation + prompt engineering | 2 hrs |
| Doctor note generator | 1 hr |
| Professor email + follow-up + escalation | 1.5 hrs |
| Streaming setup | 1 hr |
| **Total** | **~10 hrs** |

---

### Backend 2 — Database + Auth + API Glue

**Owns:** Everything that persists — database, auth, CRUD endpoints, deployment

**Tasks:**
- [ ] Supabase project setup and database schema
- [ ] Row Level Security (RLS) policies on all tables
- [ ] Clerk authentication setup and middleware
- [ ] Connect Clerk user ID to Supabase student profile on first login
- [ ] GET/POST/PATCH student profile endpoints
- [ ] POST/GET class list endpoints
- [ ] PATCH professor status endpoints (not_sent → sent → confirmed)
- [ ] GET/POST accommodation selection endpoints
- [ ] CORS configuration
- [ ] Environment variable setup and sharing with team
- [ ] Deploy backend to Railway
- [ ] Deploy frontend to Vercel
- [ ] Integration testing — full flow from voice input to professor dashboard
- [ ] Set OpenAI spend limit to $20

**Estimated hours:**

| Task | Time |
|---|---|
| Supabase setup + schema + RLS | 2 hrs |
| Clerk auth + middleware | 1.5 hrs |
| Student profile CRUD | 1.5 hrs |
| Class list + professor status CRUD | 2 hrs |
| Accommodation selection CRUD | 1 hr |
| CORS + env vars | 0.5 hrs |
| Deploy frontend + backend | 1 hr |
| Integration testing | 1 hr |
| **Total** | **~10.5 hrs** |

---

## File Structure — Frontend

```
voiced-frontend/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — Clerk provider, global fonts, navbar
│   ├── page.tsx                  # Landing page — hero, stat strip, CTA
│   ├── globals.css               # Global styles, Tailwind base
│   │
│   ├── intake/
│   │   └── page.tsx              # Voice intake page — mic, transcript, AI response, accommodation cards
│   │
│   ├── roadmap/
│   │   └── page.tsx              # 4-step animated timeline — ISU-specific steps and statuses
│   │
│   ├── letter/
│   │   └── page.tsx              # Generated letter preview — edit, download PDF, email
│   │
│   ├── dashboard/
│   │   └── page.tsx              # Professor tracker — class rows, status dots, action buttons
│   │
│   └── api/                      # Next.js API routes (proxy to Express backend)
│       ├── transcribe/
│       │   └── route.ts          # Forwards audio blob to Express /api/transcribe
│       ├── analyze/
│       │   └── route.ts          # Forwards transcript to Express /api/analyze
│       ├── generate-letter/
│       │   └── route.ts          # Forwards student info to Express /api/generate-letter
│       ├── doctor-note/
│       │   └── route.ts          # Forwards diagnosis to Express /api/doctor-note
│       └── professor-email/
│           └── route.ts          # Forwards class info to Express /api/professor-email
│
├── components/
│   │
│   ├── layout/
│   │   ├── Navbar.tsx            # Top nav — Voiced logo, links, CTA button
│   │   └── Footer.tsx            # Minimal footer
│   │
│   ├── landing/
│   │   ├── Hero.tsx              # Tagline, subtext, Get Started button
│   │   └── StatStrip.tsx         # Three stats — 21%, 92%, 3 min
│   │
│   ├── intake/
│   │   ├── MicButton.tsx         # Mic button with pulse ring — active/inactive state
│   │   ├── Waveform.tsx          # 10 animated bars — plays while recording
│   │   ├── TranscriptDisplay.tsx # Text appears word-by-word as Whisper returns chunks
│   │   ├── AIResponseBubble.tsx  # Green bubble — AI reply types itself out character by character
│   │   └── FollowUpFlow.tsx      # Follow-up question cards when intake is vague
│   │
│   ├── accommodations/
│   │   └── AccommodationCard.tsx # Single card — icon, name, description, select/deselect toggle
│   │
│   ├── roadmap/
│   │   ├── RoadmapTimeline.tsx   # Full 4-step timeline container
│   │   └── RoadmapStep.tsx       # Single step — dot (done/active/todo), title, description, badge
│   │
│   ├── letter/
│   │   ├── LetterPreview.tsx     # Styled document — green highlighted generated fields
│   │   ├── LetterActions.tsx     # Download PDF, Edit, Email buttons
│   │   └── LetterPDF.tsx         # react-pdf component for PDF export
│   │
│   └── dashboard/
│       ├── ProfessorTracker.tsx  # Full dashboard container
│       ├── ClassRow.tsx          # Single class row — status dot, name, professor, action button
│       └── StatusBadge.tsx       # Green/yellow/red pill — Confirmed / Sent / Not sent
│
├── hooks/
│   ├── useMicrophone.ts          # Manages mic recording — start, stop, get audio blob
│   ├── useTranscribe.ts          # Calls /api/transcribe, returns transcript string
│   ├── useAnalyze.ts             # Calls /api/analyze, returns accommodations + AI response
│   └── useStreamLetter.ts        # Calls /api/generate-letter with streaming, returns letter chunks
│
├── lib/
│   ├── supabase.ts               # Supabase client initialisation
│   ├── clerk.ts                  # Clerk client config
│   └── api.ts                    # Fetch wrapper for all backend API calls
│
├── types/
│   └── index.ts                  # All shared TypeScript types
│                                 # StudentProfile, Accommodation, ClassStatus, LetterData, etc.
│
├── constants/
│   └── isu.ts                    # All ISU-specific data
│                                 # Office name, address, email, phone, building, process timelines
│
├── public/
│   └── voiced-logo.svg           # Logo SVG
│
├── .env.local                    # Local environment variables (never commit this)
├── .env.example                  # Template showing required env vars (safe to commit)
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

---

## File Structure — Backend

```
voiced-backend/
│
├── src/
│   │
│   ├── index.ts                  # Entry point — creates Express app, applies middleware, starts server
│   │
│   ├── middleware/
│   │   ├── auth.ts               # Clerk JWT verification middleware — protects all routes
│   │   ├── cors.ts               # CORS config — allows requests from Vercel frontend URL
│   │   └── errorHandler.ts       # Global error handler — catches all unhandled errors
│   │
│   ├── routes/
│   │   ├── transcribe.ts         # POST /api/transcribe — audio blob → Whisper → transcript
│   │   ├── analyze.ts            # POST /api/analyze — transcript → GPT-4o → accommodations + response
│   │   ├── generateLetter.ts     # POST /api/generate-letter → GPT-4o → formatted letter text
│   │   ├── doctorNote.ts         # POST /api/doctor-note → GPT-4o → physician template
│   │   ├── professorEmail.ts     # POST /api/professor-email → GPT-4o → notification email
│   │   ├── followupEmail.ts      # POST /api/followup-email → GPT-4o → follow-up email
│   │   ├── escalateEmail.ts      # POST /api/escalate-email → GPT-4o → department chair complaint
│   │   ├── students.ts           # GET/POST/PATCH /api/students — student profile CRUD
│   │   ├── classes.ts            # GET/POST /api/classes — class list CRUD
│   │   ├── professorStatus.ts    # GET/PATCH /api/professor-status — update sent/confirmed status
│   │   └── accommodations.ts     # GET/POST /api/accommodations — save selected accommodations
│   │
│   ├── services/
│   │   ├── openai.ts             # OpenAI client initialisation and shared helper functions
│   │   ├── whisper.ts            # Whisper-specific logic — receives blob, calls Whisper, returns text
│   │   ├── gpt.ts                # GPT-4o wrapper — handles streaming and non-streaming calls
│   │   └── supabase.ts           # Supabase client initialisation and DB helper functions
│   │
│   ├── prompts/
│   │   ├── analyzePrompt.ts      # System prompt for intake analysis — disability detection + routing
│   │   ├── followupPrompt.ts     # System prompt for follow-up question generation
│   │   ├── letterPrompt.ts       # System prompt for accommodation request letter generation
│   │   ├── doctorNotePrompt.ts   # System prompt for physician documentation template
│   │   ├── professorEmailPrompt.ts     # System prompt for initial professor notification email
│   │   ├── followupEmailPrompt.ts      # System prompt for professor follow-up email
│   │   └── escalateEmailPrompt.ts      # System prompt for department chair complaint letter
│   │
│   └── types/
│       └── index.ts              # All shared TypeScript types for backend
│                                 # TranscribeRequest, AnalyzeRequest, LetterRequest, etc.
│
├── .env                          # Local environment variables (never commit this)
├── .env.example                  # Template showing required env vars (safe to commit)
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── railway.json                  # Railway deployment config
```

---

## API Contracts

These must be agreed by B1 and F1 in the **first hour** of the hackathon.

```typescript
// POST /api/transcribe
// Receives audio recording, returns text transcript
Request:  { audio: Blob }
Response: {
  transcript: string    // "I have ADHD and I always run out of time on exams..."
}

// POST /api/analyze
// Receives transcript, returns AI analysis
Request:  { transcript: string }
Response: {
  needsFollowUp: boolean            // true if intake is too vague
  followUpQuestion?: string         // question to ask if needsFollowUp is true
  routing?: "accommodations"        // go to accommodation recommendations
           | "counselling"          // route to ISU counselling services
           | "health-center"        // route to Thielen Student Health Center
  disability?: string               // "ADHD" | "Anxiety" | "Dyslexia" etc.
  accommodations?: string[]         // ["Extended test time", "Distraction-reduced room"]
  aiResponse: string                // warm conversational response text
}

// POST /api/generate-letter
// Receives student info, returns formatted letter
Request:  {
  studentName: string               // "Jordan Williams"
  studentId: string                 // "ISU-2024-88312"
  university: string                // "Iowa State University"
  diagnosis: string                 // "ADHD"
  accommodations: string[]          // ["Extended test time", "Distraction-reduced room"]
  doctorName?: string               // "Dr. Maria Santos"
}
Response: {
  letterText: string                // Full formatted letter as plain text
}

// POST /api/doctor-note
// Receives diagnosis, returns physician template
Request:  {
  studentName: string
  diagnosis: string
  accommodations: string[]
}
Response: {
  noteText: string                  // Pre-filled physician documentation template
}

// POST /api/professor-email
// Receives class info, returns notification email
Request:  {
  studentName: string
  professorName: string
  className: string                 // "COMS 227 — Object-Oriented Programming"
  accommodations: string[]
}
Response: {
  emailSubject: string
  emailBody: string
}

// PATCH /api/professor-status
// Updates the status of a professor's response
Request:  {
  classId: string
  status: "not_sent" | "sent" | "confirmed"
}
Response: {
  success: boolean
}
```

---

## Database Schema

```sql
-- Users table (linked to Clerk auth)
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id    TEXT UNIQUE NOT NULL,
  name        TEXT,
  email       TEXT,
  university  TEXT DEFAULT 'Iowa State University',
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Student profiles (disability and accommodation info)
CREATE TABLE student_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  diagnosis       TEXT,                         -- "ADHD", "Anxiety", "Dyslexia"
  accommodations  TEXT[],                       -- ["Extended test time", "Distraction-reduced room"]
  letter_text     TEXT,                         -- Generated accommodation request letter
  doctor_note     TEXT,                         -- Generated physician documentation template
  status          TEXT DEFAULT 'draft',         -- "draft" | "submitted" | "approved"
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- Classes (one row per class per student)
CREATE TABLE classes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  class_name      TEXT NOT NULL,                -- "COMS 227 — Object-Oriented Programming"
  professor_name  TEXT NOT NULL,                -- "Prof. Rosie Steelman"
  professor_email TEXT,                         -- "rsteelman@iastate.edu"
  status          TEXT DEFAULT 'not_sent',      -- "not_sent" | "sent" | "confirmed"
  sent_at         TIMESTAMP,                    -- when letter was sent to professor
  confirmed_at    TIMESTAMP,                    -- when professor confirmed
  created_at      TIMESTAMP DEFAULT NOW()
);

-- Row Level Security — users can only see their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own data" ON users
  FOR ALL USING (clerk_id = auth.uid()::text);

CREATE POLICY "Students see own profile" ON student_profiles
  FOR ALL USING (user_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Students see own classes" ON classes
  FOR ALL USING (user_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text));
```

---

## Environment Variables

### Frontend `.env.local`
```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/intake
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/intake

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Backend
NEXT_PUBLIC_API_URL=http://localhost:3001   # change to Railway URL after deploy
```

### Backend `.env`
```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...            # use service role key on backend

# Clerk
CLERK_SECRET_KEY=sk_test_...
CLERK_PUBLISHABLE_KEY=pk_test_...

# Server
PORT=3001
FRONTEND_URL=http://localhost:3000          # change to Vercel URL after deploy
NODE_ENV=development
```

---

## 24-Hour Build Timeline

```
HOUR 0–2 │ SETUP (all 4 together)
         │ - Create GitHub repo, invite all teammates
         │ - Scaffold Next.js app (npx create-next-app@latest voiced-frontend)
         │ - Scaffold Express app (voiced-backend)
         │ - Set up Supabase project + paste schema
         │ - Set up Clerk project + get keys
         │ - Share .env files over Discord/iMessage
         │ - Set OpenAI hard spend limit to $20
         │ - F1 + B1 agree on API contracts (15 mins together)
         │ - Everyone on their own task by Hour 2

HOUR 2–8 │ PARALLEL BUILD (everyone solo)
         │ F1: Landing page + mic button + waveform animation
         │ F2: Roadmap timeline layout + professor dashboard layout
         │ B1: Whisper endpoint + GPT-4o analyze endpoint
         │ B2: Supabase schema live + Clerk auth + student profile CRUD

HOUR 8–9 │ FIRST SYNC CHECK
         │ - Everyone shares progress in group chat
         │ - F1 + B1: Test transcribe endpoint with real audio
         │ - Fix any blockers before continuing

HOUR 9–14│ CONNECT + INTEGRATE
         │ F1 + B1: Wire voice pipeline — mic → transcribe → analyze → cards
         │ F2 + B2: Wire dashboard — class rows pull from DB, status updates work
         │ B1: Letter generation endpoint + streaming setup
         │ F2: Letter preview UI + PDF export
         │ B2: Classes CRUD + professor status CRUD

HOUR 14–15│ SECOND SYNC CHECK
          │ - Test full student journey start to finish
          │ - Jordan's demo flow must work end to end
          │ - Fix any broken connections

HOUR 15–20│ POLISH + DEMO PREP
          │ F1: Loading states, error states, mic permission denied state
          │ F2: Demo data seeded (Jordan's profile, 4 classes, mixed statuses)
          │ B1: Prompt engineering — make AI responses warm and ISU-specific
          │ B2: Deploy backend to Railway, deploy frontend to Vercel
          │ All: Test on deployed URLs (not just localhost)

HOUR 20–22│ FULL REHEARSAL
          │ - Run the 2-minute demo script twice as a team
          │ - Time it (must be under 2 minutes)
          │ - Fix anything that looks broken or confusing

HOUR 22–24│ SLEEP + BUFFER
          │ - At least 2 people sleep
          │ - 1 person on standby for last-minute bugs
          │ - Nobody touches the codebase after Hour 23
```

---

## Demo Script

**Total time: 2 minutes**

| Time | Action |
|---|---|
| 0:00 | Show a photo of Jordan. Speak: *"Jordan is a first-year CS student at Iowa State. He has ADHD. He just failed his first midterm. He studied for 3 days. He has no idea help exists."* |
| 0:20 | Open Voiced. Show landing page. Point to the stat: *"92% of students with disabilities never get the help they're entitled to. Jordan is one of them."* |
| 0:35 | Click Get Started. Click the mic. Speak as Jordan: *"I have ADHD and I always run out of time on exams. I studied so hard but I still failed. I don't know what to do."* |
| 0:50 | Show transcript appearing live. Show AI response typing out. Read it aloud. |
| 1:05 | Show accommodation cards appearing. Click Extended Test Time and Distraction-Reduced Room. |
| 1:15 | Show the ISU-specific roadmap. Point to Step 1 already checked off. Point to Step 2 with the exact SAS address. |
| 1:30 | Click Generate Letter. Show letter appearing with green highlighted fields. *"Ready to send to accessibility@iastate.edu — in under 10 minutes."* |
| 1:45 | Show professor dashboard. Prof. Cochran has no reply. Click Follow Up. Show email generating instantly. |
| 1:55 | Close with: *"Jordan knew his rights in 8 minutes. Without Voiced, he might have dropped out."* |

---

## Judging Criteria Map

| Criterion | How Voiced Delivers |
|---|---|
| **User experience** | Voice-first, warm and human, no forms, no jargon, clear visual feedback at every step |
| **Complexity** | Whisper + GPT-4o pipeline, multi-turn conversation logic, streaming responses, Supabase with RLS, Clerk auth, PDF generation, professor tracking system |
| **Functionality** | Full end-to-end working product — voice in, letter out, professor dashboard live, all connected to real DB |
| **Creativity** | Nobody has built student self-advocacy with voice-first AI — the pipeline from "I'm struggling" to "letter sent and professors tracked" does not exist anywhere |

---

## Key Answers For Judges

| Question | Answer |
|---|---|
| Why not just use the ISU SAS website? | The ISU website is a brochure. It tells you the office exists. Voiced gets you through the door. |
| Isn't this just ChatGPT? | ChatGPT doesn't know ISU's office, track your professors, remember next semester, or produce a ready-to-send letter in one flow. |
| Is this giving legal advice? | No. It provides information, not advice — same as WebMD. ISU SAS still approves everything. Always includes a disclaimer. |
| What if the student says something vague? | Voiced asks follow-up questions. It never recommends accommodations without enough information. It routes to counselling if the issue isn't disability-related. |
| How does a student find Voiced? | University distribution through SAS pages and student orientation emails. |
| What about privacy? | All data encrypted, stored in Supabase with row-level security, never shared, deletable at any time. |

---

*Built at SwanHacks 2025 — Accessibility for Students*
*Team: [your names here]*
