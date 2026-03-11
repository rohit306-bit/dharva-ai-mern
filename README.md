# 🧠 Dharva AI System — Full MERN Stack Website

> Enterprise-grade artificial intelligence infrastructure platform. Built with **MongoDB**, **Express**, **React**, and **Node.js**.

---

## 📁 Project Structure

```
dharva-ai-mern/
├── backend/                    # Express.js API Server
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── launchController.js
│   │   ├── docController.js
│   │   ├── contactController.js
│   │   └── pricingController.js
│   ├── middleware/
│   │   └── errorHandler.js    # Global error handler
│   ├── models/
│   │   ├── Product.js         # AI Products schema
│   │   ├── Launch.js          # Upcoming launches schema
│   │   ├── Doc.js             # Documentation schema
│   │   ├── Contact.js         # Contact/waitlist schema
│   │   └── Pricing.js         # Pricing plans schema
│   ├── routes/
│   │   ├── products.js
│   │   ├── launches.js
│   │   ├── docs.js
│   │   ├── contact.js
│   │   └── pricing.js
│   ├── seeds/
│   │   └── seedDB.js          # Database seeder with all data
│   ├── server.js              # Main Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # React.js Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.js
│   │   │   │   └── Footer.js
│   │   │   ├── sections/
│   │   │   │   ├── Hero.js
│   │   │   │   ├── ProductsAndFeatures.js
│   │   │   │   ├── Launches.js
│   │   │   │   └── Sections.js
│   │   │   └── ui/
│   │   │       ├── DharvaLogo.js
│   │   │       └── ContactModal.js
│   │   ├── context/
│   │   │   └── AppContext.js   # Global state management
│   │   ├── hooks/
│   │   │   └── index.js        # Custom React hooks
│   │   ├── styles/
│   │   │   └── global.css      # Complete design system
│   │   ├── utils/
│   │   │   └── api.js          # Axios API configuration
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── package.json                # Root scripts (concurrently)
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ → https://nodejs.org
- **MongoDB** v6+ → https://mongodb.com/try/download
- **npm** or **yarn**

### 1. Clone & Install

```bash
git clone https://github.com/your-org/dharva-ai-system.git
cd dharva-ai-system

# Install all dependencies (root + backend + frontend)
npm run install-all
```

### 2. Configure Environment

```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and settings
```

### 3. Seed the Database

```bash
npm run seed
```

This populates MongoDB with:
- 6 AI Products (Foundation Models, Vision, Voice, Agents, Edge, Guard)
- 6 Upcoming Launches (Vision 3.0, Meridian v5, Edge Runtime, etc.)
- 8 Documentation entries
- 3 Pricing plans (Developer, Pro, Enterprise)

### 4. Run Development Servers

```bash
npm run dev
```

This starts both servers concurrently:
- **Backend API** → http://localhost:5000
- **React Frontend** → http://localhost:3000

---

## 🔌 API Endpoints

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Server health status |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products` | List all products |
| GET | `/api/v1/products/:slug` | Get product by slug |
| POST | `/api/v1/products` | Create product |
| PUT | `/api/v1/products/:id` | Update product |
| DELETE | `/api/v1/products/:id` | Delete product |

### Launches
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/launches` | List upcoming launches |
| GET | `/api/v1/launches/:id` | Get launch details |
| POST | `/api/v1/launches` | Create launch |
| PUT | `/api/v1/launches/:id` | Update launch |
| DELETE | `/api/v1/launches/:id` | Delete launch |

### Documentation
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/docs` | List all docs |
| GET | `/api/v1/docs?category=sdk` | Filter by category |
| POST | `/api/v1/docs` | Create doc entry |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/contact` | Submit contact form |
| POST | `/api/v1/contact/waitlist` | Join product waitlist |
| POST | `/api/v1/contact/newsletter` | Subscribe to newsletter |

### Pricing
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/pricing` | List all plans |
| POST | `/api/v1/pricing` | Create plan |

---

## 🏗️ Architecture

### Backend
- **Express.js** — REST API server with MVC pattern
- **MongoDB + Mongoose** — Data persistence with schema validation
- **Helmet** — Security headers
- **CORS** — Cross-origin configuration
- **Rate Limiting** — API abuse protection
- **Morgan** — HTTP request logging
- **Express Validator** — Input validation

### Frontend
- **React 18** — Component-based UI with Hooks
- **Context API** — Global state management (products, launches, docs, pricing)
- **Axios** — HTTP client with interceptors
- **Framer Motion** — Animation library
- **React Intersection Observer** — Scroll-triggered reveals
- **Custom Hooks** — `useReveal`, `useForm`, `useScrollTo`, `useCounter`

### Design System
- **Typography** — Instrument Serif (display) + DM Sans (body) + JetBrains Mono (code)
- **Colors** — Dark theme with cyan/teal accents
- **CSS Variables** — Consistent design tokens
- **Responsive** — Mobile-first with breakpoints at 768px and 900px

---

## 🏭 Production Build

```bash
# Build React frontend
npm run build

# Start production server (serves React from Express)
cd backend
NODE_ENV=production node server.js
```

### Deploy to Cloud

**Render / Railway / Heroku:**
1. Set `MONGO_URI` environment variable
2. Set `NODE_ENV=production`
3. Build command: `cd frontend && npm install && npm run build`
4. Start command: `cd backend && node server.js`

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm run install-all
RUN cd frontend && npm run build
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "backend/server.js"]
```

---

## 📋 Website Sections

| Section | Description |
|---------|-------------|
| **Hero** | Animated orbs, stats bar, floating Python code snippet |
| **Marquee** | Auto-scrolling tech capabilities banner |
| **Products** | 6 product cards with live/beta/alpha/coming-soon tags |
| **Features** | 6-cell grid of platform capabilities |
| **Launches** | Vertical timeline of 6 upcoming product launches |
| **Documentation** | 8 doc cards (Quick Start, API, SDKs, Tutorials, etc.) |
| **API Showcase** | REST endpoints + JSON response preview |
| **Stats** | Animated counter for key metrics |
| **Integrations** | 12 platform/tool integration cards |
| **Pricing** | 3-tier pricing (Free, Pro $99/mo, Enterprise) |
| **CTA** | Final call-to-action with gradient text |
| **Contact Modal** | Form with API submission (contact/demo/waitlist) |

---

## 📄 License

MIT License — Dharva AI System © 2026
