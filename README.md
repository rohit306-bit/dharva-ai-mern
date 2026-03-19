# Dharva AI — AI Governance, Observability & Accountability Platform

> The control layer for enterprise AI systems — monitoring every decision, detecting hallucinations, bias, and drift in real time, and making AI audit-ready before regulators come knocking.

**Stack:** MongoDB · Express.js · React 18 · Node.js
**Branch:** `feat/enterprise-ui-redesign` | **API:** `localhost:5000` | **Frontend:** `localhost:3000`

---

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Local Setup](#local-setup)
5. [Environment Variables](#environment-variables)
6. [Running the App](#running-the-app)
7. [Database Seeding](#database-seeding)
8. [Frontend Pages & Routes](#frontend-pages--routes)
9. [Frontend Components](#frontend-components)
10. [State Management & Hooks](#state-management--hooks)
11. [Backend API Reference](#backend-api-reference)
12. [MongoDB Data Models](#mongodb-data-models)
13. [Design System](#design-system)
14. [Dashboard Modules](#dashboard-modules)
15. [Authentication Flow](#authentication-flow)
16. [Production Build & Deployment](#production-build--deployment)
17. [Contributing](#contributing)

---

## Overview

Dharva AI is an **AI governance SaaS platform** targeting CTOs, ML Leads, and Compliance Heads at enterprises deploying AI in regulated industries (Fintech, Healthtech, Enterprise SaaS).

### What it does
- **Risk Monitoring** — Real-time detection of hallucination, bias, model drift, and unsafe outputs across connected AI systems
- **Compliance Automation** — Auto-generates audit-ready documentation for EU AI Act, RBI, CDSCO, NABH, HIPAA, and EEOC
- **Immutable Audit Trails** — Every AI decision logged with tamper-proof cryptographic hashes
- **Impact Scoring** — Per-decision risk scores with fairness metrics
- **Regulator Portal** — Exportable compliance reports in PDF or JSON

### Target users
| Role | Pain point Dharva solves |
|------|--------------------------|
| CTO / VP Engineering | Zero visibility into AI risk posture across the portfolio |
| ML Lead / ML Engineer | No tooling to detect drift, bias, or hallucination in production |
| Head of Compliance | Cannot produce audit-ready AI documentation on demand |
| Chief Risk Officer | AI decisions affecting customers with no governance layer |

---

## Project Structure

```
dharva-ai-mern/
│
├── backend/                          # Express.js REST API
│   ├── config/
│   │   └── db.js                     # MongoDB connection via Mongoose
│   ├── controllers/
│   │   ├── authController.js         # Register, login, profile
│   │   ├── productController.js      # AI product catalog CRUD
│   │   ├── launchController.js       # Product roadmap/launches CRUD
│   │   ├── docController.js          # Documentation entries CRUD
│   │   ├── pricingController.js      # Pricing plan CRUD
│   │   ├── contactController.js      # Contact form, waitlist, newsletter
│   │   ├── aiSystemController.js     # AI system registry CRUD
│   │   ├── impactController.js       # Decision capture, risk scoring
│   │   ├── complianceController.js   # Compliance doc generation
│   │   ├── auditController.js        # Audit log queries + integrity verification
│   │   └── regulatoryController.js   # Regulatory intelligence feed
│   ├── middleware/
│   │   ├── auth.js                   # JWT protect + role authorize
│   │   └── errorHandler.js           # Global error handler
│   ├── models/
│   │   ├── User.js                   # User account schema
│   │   ├── Organization.js           # Organization/tenant schema
│   │   ├── Product.js                # AI product schema
│   │   ├── Launch.js                 # Roadmap launch schema
│   │   ├── Doc.js                    # Documentation schema
│   │   ├── Pricing.js                # Pricing plan schema
│   │   ├── Contact.js                # Contact/waitlist schema
│   │   ├── AISystem.js               # Connected AI system schema
│   │   ├── ImpactReport.js           # Decision impact report schema
│   │   ├── ComplianceDocument.js     # Generated compliance doc schema
│   │   └── AuditLog.js               # Immutable audit trail schema
│   ├── routes/
│   │   ├── auth.js                   # /api/v1/auth
│   │   ├── products.js               # /api/v1/products
│   │   ├── launches.js               # /api/v1/launches
│   │   ├── docs.js                   # /api/v1/docs
│   │   ├── pricing.js                # /api/v1/pricing
│   │   ├── contact.js                # /api/v1/contact
│   │   ├── aiSystems.js              # /api/v1/ai-systems (protected)
│   │   ├── impact.js                 # /api/v1/impact (protected)
│   │   ├── compliance.js             # /api/v1/compliance (protected)
│   │   ├── audit.js                  # /api/v1/audit (protected)
│   │   └── regulatory.js             # /api/v1/regulatory (protected)
│   ├── seeds/
│   │   └── seedDB.js                 # Seeds all collections with demo data
│   ├── server.js                     # App entry point
│   ├── .env                          # Local env vars (git-ignored)
│   └── package.json
│
├── frontend/                         # React 18 SPA
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardLayout.js          # Sidebar + topbar shell
│   │   │   │   └── modules/
│   │   │   │       ├── Overview.js             # Stats, charts, system table
│   │   │   │       ├── AISystemRegistry.js     # Connected AI systems list
│   │   │   │       ├── ImpactMonitoring.js     # Decision feed + risk filters
│   │   │   │       ├── ImpactScoreEngine.js    # Score calculation UI
│   │   │   │       ├── ComplianceGenerator.js  # Generate compliance docs
│   │   │   │       ├── AuditTrail.js           # Immutable audit log viewer
│   │   │   │       └── RegulatoryMonitoring.js # Regulation intelligence feed
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.js         # Fixed nav with dropdown, scroll detection
│   │   │   │   └── Footer.js         # Multi-column footer with trust badges
│   │   │   ├── sections/             # Landing page section components
│   │   │   │   ├── Hero.js           # Animated dashboard preview, urgency hook
│   │   │   │   ├── Problem.js        # 5 AI risk categories + urgency banner
│   │   │   │   ├── DemoSection.js    # 4-step code walkthrough + demo video
│   │   │   │   ├── ProductsAndFeatures.js  # Product grid + features + marquee
│   │   │   │   ├── UseCases.js       # 4 industry use cases with tabs
│   │   │   │   ├── Launches.js       # Product roadmap timeline
│   │   │   │   ├── Testimonials.js   # Auto-scrolling testimonial carousel
│   │   │   │   ├── Sections.js       # Docs, API showcase, pricing, CTA
│   │   │   │   └── SecuritySection.js
│   │   │   └── ui/
│   │   │       ├── ContactModal.js   # Contact/demo request modal form
│   │   │       └── DharvaLogo.js     # SVG logo component
│   │   ├── context/
│   │   │   ├── AppContext.js         # Global state: products/launches/docs/pricing
│   │   │   └── AuthContext.js        # Auth state: user/token/isAuthenticated
│   │   ├── hooks/
│   │   │   └── index.js              # useReveal, useForm, useScrollTo, useCounter
│   │   ├── pages/
│   │   │   ├── LoginPage.js          # Login form
│   │   │   ├── RegisterPage.js       # Registration form
│   │   │   ├── DashboardPage.js      # Protected dashboard router
│   │   │   ├── ProductPage.js        # /product — platform deep dive
│   │   │   ├── FinTechPage.js        # /verticals/fintech
│   │   │   ├── HealthtechPage.js     # /verticals/healthtech
│   │   │   ├── EnterprisePage.js     # /verticals/enterprise
│   │   │   ├── DocsPage.js           # /docs — 5-minute quickstart
│   │   │   └── BlogPage.js           # /blog — 10 SEO articles
│   │   ├── styles/
│   │   │   ├── global.css            # Core design system + all component styles
│   │   │   └── upgrade.css           # New component styles (auto-imported)
│   │   ├── utils/
│   │   │   └── api.js                # Axios instance + API namespace helpers
│   │   ├── App.js                    # BrowserRouter + all routes
│   │   └── index.js                  # React entry point
│   └── package.json
│
├── package.json                      # Root: concurrently dev script
└── README.md
```

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | v18+ | [nodejs.org](https://nodejs.org) |
| npm | v9+ | Bundled with Node |
| MongoDB | v6+ (local) OR Atlas URI | [mongodb.com/atlas](https://www.mongodb.com/atlas/database) |
| Git | Any | [git-scm.com](https://git-scm.com) |

> **Tip:** MongoDB Atlas free tier (M0) is the fastest way to get started — no local installation needed. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas/database), create a cluster, and get a connection string in ~2 minutes.

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/rohit306-bit/dharva-ai-mern.git
cd dharva-ai-mern

# Switch to the main feature branch
git checkout feat/enterprise-ui-redesign
```

### 2. Install all dependencies

```bash
# Installs root, backend, and frontend dependencies in one command
npm run install-all
```

Or install manually:

```bash
npm install                   # root (concurrently)
cd backend && npm install     # Express + Mongoose + auth
cd ../frontend && npm install # React + Framer Motion + Recharts
```

### 3. Configure environment

```bash
# The .env file already exists with local defaults:
cat backend/.env
```

Update `MONGO_URI` to your connection string (see [Environment Variables](#environment-variables) below).

### 4. Seed the database

```bash
npm run seed
```

Seeds MongoDB with:
- 6 AI Products (Impact Scoring, Decision Monitoring, Compliance Docs, Audit Trails, Risk Detection, Regulatory Intelligence)
- 6 Roadmap launches (Q2 2026 → Q1 2027)
- 8 Documentation entries
- 3 Pricing plans

### 5. Run development servers

```bash
npm run dev
```

Starts both servers concurrently:
- **Frontend** → [http://localhost:3000](http://localhost:3000)
- **Backend API** → [http://localhost:5000](http://localhost:5000)
- **API health check** → [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)

---

## Environment Variables

All variables live in `backend/.env`. The file is already created with local defaults.

```env
# ─── Server ───────────────────────────────────
NODE_ENV=development
PORT=5000

# ─── Database ─────────────────────────────────
# Local MongoDB:
MONGO_URI=mongodb://localhost:27017/dharva-ai

# MongoDB Atlas (recommended):
# MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/dharva-ai?retryWrites=true&w=majority

# ─── Authentication ───────────────────────────
JWT_SECRET=dharva_ai_super_secret_jwt_key_change_in_production_2026
JWT_EXPIRES_IN=7d

# ─── CORS ─────────────────────────────────────
CLIENT_URL=http://localhost:3000

# ─── Rate Limiting ────────────────────────────
RATE_LIMIT_WINDOW=15        # minutes
RATE_LIMIT_MAX=200          # requests per window

# ─── Email (optional — for contact forms) ─────
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your@gmail.com
# SMTP_PASS=your-app-password
```

> **Production:** Never commit `.env`. Set all variables as environment secrets in your hosting provider (Render, Railway, Vercel, etc.).

---

## Running the App

### Development (both servers)

```bash
npm run dev
# Backend:  nodemon server.js  → port 5000
# Frontend: react-scripts start → port 3000
```

### Backend only

```bash
cd backend
npm run dev        # with nodemon (auto-reload)
npm start          # without nodemon
```

### Frontend only

```bash
cd frontend
npm start
```

### Production build

```bash
npm run build      # builds React → frontend/build/
cd backend
NODE_ENV=production node server.js   # serves React static files from Express
```

### Seed / reset database

```bash
npm run seed       # runs backend/seeds/seedDB.js
```

---

## Frontend Pages & Routes

All routes are defined in `frontend/src/App.js`.

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomeWrapper` | Full landing page — hero, problem, demo, products, pricing, testimonials |
| `/product` | `ProductPage` | Platform deep dive — architecture, 5 risk categories, before/after story |
| `/verticals/fintech` | `FinTechPage` | Fintech & Banking — RBI/EU AI Act, credit scoring, fraud detection use cases |
| `/verticals/healthtech` | `HealthtechPage` | Healthtech & Clinical — CDSCO/NABH, triage AI, patient safety |
| `/verticals/enterprise` | `EnterprisePage` | Enterprise SaaS — EU AI Act compliance, LLM observability |
| `/docs` | `DocsPage` | 5-minute quickstart guide with tabbed Python/Node.js/REST code blocks |
| `/blog` | `BlogPage` | 10 SEO-optimised articles with category filter and newsletter signup |
| `/login` | `LoginPage` | Authentication — email + password |
| `/register` | `RegisterPage` | Registration — name, work email, org, industry, password |

### Protected Routes (requires JWT)

| Route | Module | Description |
|-------|--------|-------------|
| `/dashboard` | `Overview` | Stats cards, 30-day chart, risk distribution pie, system table |
| `/dashboard/ai-systems` | `AISystemRegistry` | Connected AI systems list and management |
| `/dashboard/impact` | `ImpactMonitoring` | Decision feed with risk filters and live alerts |
| `/dashboard/score-engine` | `ImpactScoreEngine` | Risk score calculation and breakdown |
| `/dashboard/compliance` | `ComplianceGenerator` | Generate and download compliance documents |
| `/dashboard/audit` | `AuditTrail` | Immutable audit log with integrity verification |
| `/dashboard/regulatory` | `RegulatoryMonitoring` | Active regulatory framework monitoring |

---

## Frontend Components

### Landing Page Sections (`src/components/sections/`)

| Component | Location | Key props |
|-----------|----------|-----------|
| `Hero` | `sections/Hero.js` | `onOpenContact` — opens contact modal |
| `Problem` | `sections/Problem.js` | None — static, 5 risk categories |
| `DemoSection` | `sections/DemoSection.js` | None — 4-step code walkthrough |
| `Marquee` | `sections/ProductsAndFeatures.js` | None |
| `Products` | `sections/ProductsAndFeatures.js` | `products` — array from AppContext |
| `Features` | `sections/ProductsAndFeatures.js` | None |
| `UseCases` | `sections/UseCases.js` | None — tabbed, 4 industries |
| `Launches` | `sections/Launches.js` | `launches` — array from AppContext |
| `Testimonials` | `sections/Testimonials.js` | None — auto-scrolling carousel |
| `Docs` | `sections/Sections.js` | `docs` — array from AppContext |
| `APIShowcase` | `sections/Sections.js` | None |
| `Pricing` | `sections/Sections.js` | `pricing`, `onOpenContact` |
| `CTA` | `sections/Sections.js` | `onOpenContact` |

### Layout Components (`src/components/layout/`)

**`Navbar.js`**
- Fixed position with blur backdrop and scroll progress bar
- Desktop: anchor scroll links (home), page links (Product/Docs/Blog), Verticals dropdown
- Verticals dropdown: Fintech / Healthtech / Enterprise — closes on outside click
- Mobile: full-screen overlay with all links + dividers
- Auth state: shows Dashboard/Sign Out when authenticated, Sign In/Connect when not

**`Footer.js`**
- 5-column grid: Brand, Platform, Solutions, Resources, Company
- Trust badges: SOC 2 Type II · ISO 27001 · EU Data Residency
- Social links: GitHub · X · LinkedIn · Discord

### UI Components (`src/components/ui/`)

**`ContactModal.js`**
- Fields: Full Name, Email, Company, Inquiry Type (dropdown), Message
- Inquiry types: General · Demo Request · Enterprise Sales · Waitlist
- Submits to `POST /api/v1/contact`
- Shows success state on submission

**`DharvaLogo.js`**
- SVG logo — concentric impact arcs
- Props: `size` (number, default 34)
- Gradient: teal → violet

---

## State Management & Hooks

### AppContext (`src/context/AppContext.js`)

Global state for landing page data fetched from the API. Uses `Promise.allSettled` so the page renders with fallback data even if the API is unavailable.

```js
// Access anywhere inside AppProvider
const { state } = useAppContext();

state.products   // Product[]
state.launches   // Launch[]
state.docs       // Doc[]
state.pricing    // Pricing[]
state.loading    // boolean
state.error      // string | null
```

### AuthContext (`src/context/AuthContext.js`)

JWT-based auth state stored in `localStorage`.

```js
const { isAuthenticated, user, login, register, logout } = useAuth();

// user shape:
// { name, email, organization, role, _id }

// login(email, password) → sets token + user in state
// register({ name, email, organization, industry, password }) → auto-logs in
// logout() → clears state + localStorage
```

### Custom Hooks (`src/hooks/index.js`)

| Hook | Signature | Use case |
|------|-----------|----------|
| `useReveal` | `() → [ref, isVisible]` | Scroll-triggered fade-in animation via IntersectionObserver |
| `useForm` | `(initialValues) → [values, handleChange, reset]` | Form state with change handler |
| `useScrollTo` | `() → scrollTo(id)` | Smooth scroll to a section by element ID |
| `useCounter` | `(target, duration) → count` | Animated number counter (use with useReveal) |

**`useReveal` example:**
```jsx
import { useReveal } from '../hooks';

function MySection() {
  const [ref, isVisible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'all .6s var(--ease)',
    }}>
      Content
    </div>
  );
}
```

### API Client (`src/utils/api.js`)

Axios instance with base URL `/api/v1`. Automatically attaches JWT from `localStorage`.

```js
import { productAPI, authAPI, aiSystemAPI } from '../utils/api';

// All return Axios promises
productAPI.getAll()
productAPI.getBySlug(slug)

authAPI.login({ email, password })
authAPI.register({ name, email, organization, industry, password })
authAPI.getMe()

aiSystemAPI.getAll()
aiSystemAPI.create(data)
aiSystemAPI.update(id, data)
aiSystemAPI.delete(id)
```

---

## Backend API Reference

Base URL: `http://localhost:5000/api/v1`

> Routes marked **🔒** require `Authorization: Bearer <token>` header.

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Returns server status, version, timestamp, environment |

### Authentication (`/auth`)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | `{ name, email, organization, industry, password }` | Create account, returns JWT |
| POST | `/auth/login` | `{ email, password }` | Returns JWT + user object |
| GET | `/auth/me` | — 🔒 | Returns current user profile |
| PUT | `/auth/profile` | `{ name, organization }` 🔒 | Update profile |

**Response shape:**
```json
{
  "success": true,
  "token": "eyJhbGci...",
  "user": {
    "_id": "...",
    "name": "Jane Smith",
    "email": "jane@company.com",
    "organization": "Acme Corp",
    "role": "user"
  }
}
```

### Products (`/products`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/products` | Public | List all products |
| GET | `/products/:slug` | Public | Get product by slug |
| POST | `/products` | 🔒 Admin | Create product |
| PUT | `/products/:id` | 🔒 Admin | Update product |
| DELETE | `/products/:id` | 🔒 Admin | Delete product |

### Launches (`/launches`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/launches` | Public | List all roadmap launches |
| GET | `/launches/:id` | Public | Get single launch |
| POST | `/launches` | 🔒 Admin | Create launch |
| PUT | `/launches/:id` | 🔒 Admin | Update launch |
| DELETE | `/launches/:id` | 🔒 Admin | Delete launch |

### Documentation (`/docs`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/docs` | Public | List all docs (filter: `?category=sdk`) |
| GET | `/docs/:id` | Public | Get single doc entry |
| POST | `/docs` | 🔒 Admin | Create doc entry |

### Contact (`/contact`)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/contact` | `{ name, email, company, type, message }` | Submit contact/demo request |
| POST | `/contact/waitlist` | `{ email, name }` | Join waitlist |
| POST | `/contact/newsletter` | `{ email }` | Subscribe to newsletter |

### Pricing (`/pricing`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/pricing` | Public | List all pricing plans |
| POST | `/pricing` | 🔒 Admin | Create plan |

### AI Systems (`/ai-systems`) 🔒

All routes require authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/ai-systems` | List all AI systems for authenticated org |
| POST | `/ai-systems` | Register a new AI system |
| GET | `/ai-systems/:id` | Get single AI system with risk summary |
| PUT | `/ai-systems/:id` | Update AI system configuration |
| DELETE | `/ai-systems/:id` | Delete AI system (admin/superadmin only) |

**Create AI system body:**
```json
{
  "name": "loan-approval-v3",
  "description": "Credit scoring model for retail lending",
  "useCase": "credit-scoring",
  "environment": "production",
  "riskTier": "HIGH"
}
```

### Impact (`/impact`) 🔒

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/impact/calculate` | Calculate impact score for a decision |
| GET | `/impact/reports` | List impact reports for the org |
| GET | `/impact/dashboard` | Aggregated dashboard stats |

### Compliance (`/compliance`) 🔒

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/compliance/generate` | Generate compliance document for a system + framework |
| GET | `/compliance/documents` | List all generated compliance documents |

**Generate compliance body:**
```json
{
  "systemId": "sys_9f3k2m8x",
  "framework": "EU_AI_ACT",
  "periodStart": "2026-01-01",
  "periodEnd": "2026-03-31"
}
```

### Audit Trail (`/audit`) 🔒

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/audit/logs` | Query audit logs (filter: `?systemId=&limit=&page=`) |
| GET | `/audit/stats` | Aggregated audit statistics |
| GET | `/audit/verify/:id` | Verify integrity of a specific audit log entry |

### Regulatory (`/regulatory`) 🔒

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/regulatory` | Active regulatory frameworks and compliance status |

---

## MongoDB Data Models

### User

```js
{
  name:         String (required),
  email:        String (required, unique),
  password:     String (hashed, bcrypt),
  organization: String,
  industry:     String (enum: banking|healthcare|insurance|...),
  role:         String (enum: user|admin|superadmin, default: user),
  createdAt:    Date
}
```

### AISystem

```js
{
  name:         String (required),
  description:  String,
  useCase:      String,
  environment:  String (enum: development|staging|production),
  riskTier:     String (enum: LOW|MEDIUM|HIGH|CRITICAL),
  organization: ObjectId → Organization,
  createdBy:    ObjectId → User,
  status:       String (enum: active|paused|decommissioned),
  createdAt:    Date
}
```

### ImpactReport

```js
{
  system:       ObjectId → AISystem,
  decisionId:   String,
  input:        Mixed,
  output:       Mixed,
  impactScore:  Number (0–100),
  riskLevel:    String (enum: LOW|MODERATE|HIGH|CRITICAL),
  fairnessRisk: { score: Number, flag: String },
  compliance:   { euAiAct: String, auditHash: String },
  metadata:     Mixed,
  createdAt:    Date
}
```

### ComplianceDocument

```js
{
  system:      ObjectId → AISystem,
  framework:   String (enum: EU_AI_ACT|RBI|CDSCO|HIPAA|EEOC|...),
  period:      { start: Date, end: Date },
  content:     Mixed,
  auditHash:   String,
  status:      String (enum: draft|final|submitted),
  createdBy:   ObjectId → User,
  createdAt:   Date
}
```

### AuditLog

```js
{
  system:      ObjectId → AISystem,
  action:      String,
  decisionId:  String,
  payload:     Mixed,
  hash:        String (SHA-256, tamper-proof),
  prevHash:    String (chain integrity),
  createdBy:   ObjectId → User,
  createdAt:   Date (immutable)
}
```

---

## Design System

All design tokens are CSS custom properties in `frontend/src/styles/global.css`.

### Colours

```css
--bg:       #06080d   /* Page background */
--bg2:      #0b0f18   /* Section alternate background */
--bg3:      #111827   /* Card backgrounds */
--surface:  #161d2e   /* Elevated surfaces */
--border:   #1e293b   /* Border colour */

--text:     #e2e8f0   /* Primary text */
--text2:    #94a3b8   /* Secondary text */
--text3:    #64748b   /* Muted text */

--accent:   #00e5c8   /* Teal — primary brand */
--accent2:  #00b8d4   /* Secondary teal */
--violet:   #8b5cf6   /* Purple — gradient partner */
--warm:     #f59e0b   /* Amber */
--rose:     #f43f5e   /* Red/pink — critical alerts */
--green:    #22c55e   /* Green — success/low risk */
--blue:     #3b82f6   /* Blue */
```

### Typography

```css
--serif: 'Instrument Serif'  /* Display headings */
--sans:  'DM Sans'           /* Body text */
--mono:  'JetBrains Mono'    /* Code, metrics, badges */
```

### Utility Classes

| Class | Use |
|-------|-----|
| `.container` | Max-width wrapper (1280px) with horizontal padding |
| `.section` | Section with 7rem top/bottom padding |
| `.section-label` | Small uppercase label above headings |
| `.section-title` | Large section heading |
| `.section-desc` | Section description paragraph |
| `.gradient-text` | Cyan → violet gradient text |
| `.badge` | Animated badge with pulse dot |
| `.glow-line` | Horizontal accent divider |
| `.btn.btn-primary` | Filled teal button |
| `.btn.btn-ghost` | Bordered ghost button |
| `.code-window` | Dark code block with macOS dots |

### Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `900px` | Hide desktop nav → show hamburger, single-column API grid |
| `768px` | 2-column stats, footer column stacking |
| `640px` | Before/After grid goes single column |
| `480px` | Auth form adjustments, hide mobile CTA text |

---

## Dashboard Modules

The dashboard is a protected SPA at `/dashboard/*` built with `DashboardLayout.js` (sidebar + topbar).

### Overview (`/dashboard`)

- **4 stat cards:** Registered AI Systems · Decisions/Day · Avg Risk Score · Critical Systems
- **Area chart:** Daily decisions and risk index (30-day, using Recharts)
- **Pie chart:** Risk distribution (minimal/low/medium/high/critical)
- **System table:** Name · Use Case · Environment · Risk Level · Score · Status

### AI System Registry (`/dashboard/ai-systems`)

- List all connected AI systems for the authenticated organization
- Register new systems (name, description, use case, environment, risk tier)
- Edit and decommission systems

### Impact Monitoring (`/dashboard/impact`)

- Live decision feed with risk score for each decision
- Filter by risk level, time range, AI system
- Real-time alerts for bias, drift, and threshold violations

### Compliance Generator (`/dashboard/compliance`)

- Select AI system + compliance framework (EU AI Act, RBI, CDSCO, HIPAA, EEOC)
- Choose reporting period
- Generate and download PDF compliance report

### Audit Trail (`/dashboard/audit`)

- Chronological immutable log of all AI decisions
- SHA-256 hash chain for tamper detection
- Verify integrity of any log entry
- Filter by system, date, action type

### Regulatory Monitoring (`/dashboard/regulatory`)

- Active regulatory frameworks relevant to the org's industry
- Compliance status per framework
- Upcoming regulation change calendar

---

## Authentication Flow

```
Register → POST /api/v1/auth/register
         ← { token, user }
         → store in localStorage
         → redirect to /dashboard

Login    → POST /api/v1/auth/login
         ← { token, user }
         → store in localStorage
         → redirect to /dashboard

Protected request:
         → Authorization: Bearer <token>  (added by Axios interceptor)
         ← data or 401 Unauthorized

Logout   → clear localStorage
         → redirect to /
```

JWT is stored as `dharva_token` in `localStorage`. The Axios request interceptor in `src/utils/api.js` automatically reads and attaches it.

Token expiry defaults to `7d` (configurable via `JWT_EXPIRES_IN` in `.env`).

---

## Production Build & Deployment

### Build for production

```bash
# 1. Build React frontend
npm run build
# Output: frontend/build/

# 2. Start Express in production mode (serves static React build)
cd backend
NODE_ENV=production node server.js
# Visits to / and all routes are served by React
# /api/v1/* routes are handled by Express
```

### Deploy to Render (recommended)

1. Push to GitHub
2. Create new **Web Service** on [render.com](https://render.com)
3. Connect your repo
4. Set build command: `cd frontend && npm install && npm run build`
5. Set start command: `cd backend && npm install && node server.js`
6. Add environment variables:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your-secret
   CLIENT_URL=https://your-app.onrender.com
   ```

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli
railway login
railway init
railway up
```

Set the same environment variables in the Railway dashboard.

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm run install-all
RUN cd frontend && npm run build
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "backend/server.js"]
```

```bash
docker build -t dharva-ai .
docker run -p 5000:5000 \
  -e MONGO_URI=your-atlas-uri \
  -e JWT_SECRET=your-secret \
  dharva-ai
```

---

## Contributing

### Branch naming

```
feat/<feature-name>       # New features
fix/<bug-description>     # Bug fixes
chore/<task>              # Tooling, config, deps
docs/<topic>              # Documentation only
```

### Commit style

```
feat: add hallucination detection to risk score engine
fix: resolve bias metric calculation for intersectional groups
chore: upgrade mongoose to v8.2
docs: update API reference for compliance endpoint
```

### Development workflow

```bash
# 1. Create a branch from master
git checkout master && git pull
git checkout -b feat/your-feature

# 2. Make changes, then check build passes
cd frontend && npm run build

# 3. Stage and commit (exclude lock files unless intentional)
git add frontend/src/ backend/src/
git commit -m "feat: your change"

# 4. Push and open PR → master
git push origin feat/your-feature
gh pr create --base master
```

### Key things to know before contributing

| Thing | Detail |
|-------|--------|
| **Fallback data** | `Sections.js`, `ProductsAndFeatures.js`, `Launches.js` all define `fallback*` arrays. If the API returns empty, these render instead. This is intentional — the site works without a DB. |
| **CSS convention** | New component styles go in `upgrade.css`, imported at the top of `global.css`. Use BEM-style class names (`component-element--modifier`). |
| **No React import needed** | Project uses React 17+ JSX transform. Don't add `import React from 'react'` — it will trigger a lint warning. |
| **Auth middleware** | `protect` (any authenticated user) and `authorize('admin')` (role check) are in `backend/middleware/auth.js`. Apply them per-route. |
| **`Promise.allSettled`** | `AppContext` uses `allSettled` not `all` — individual API failures don't crash the page. |

---

## License

MIT License — Dharva AI © 2026
