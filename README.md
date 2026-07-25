# LeadDesk Mini

A modern, production-quality Lead Management SaaS platform built for the **Digital Heroes Internship Qualification Task**.

LeadDesk Mini lets visitors submit qualified inquiries from a premium marketing site, while authenticated admins manage the pipeline from a polished dark dashboard.

---

## Project Overview

LeadDesk Mini is a full-stack application with:

- A public marketing website (hero, features, pricing, testimonials, contact)
- Real JWT authentication with bcrypt password hashing
- An admin dashboard with live stats, search, and status updates
- SQLite locally, Neon Postgres in production
- Clean REST API
- Deployment-ready for **Vercel** (frontend + backend together)

---

## Features

### Public Website
- Animated hero with gradient typography, glass cards, blobs, and mouse parallax
- Features, Why Choose Us, Testimonials, Pricing, Contact, Footer
- Contact form with frontend + backend validation
- Success toasts, loading states, and database persistence

### Authentication
- `POST /api/login` with JWT access tokens
- Protected admin routes
- Persistent login via localStorage
- Secure logout
- Unauthorized users cannot access the dashboard

### Admin Panel
- Modern sidebar (collapsible on desktop, drawer on mobile)
- Statistics cards: Total / New / Contacted / Closed
- Leads table with search + status filtering
- Status updates (`New`, `Contacted`, `Closed`)
- Responsive stacked cards on mobile

### UX Polish
- Loading screen + skeletons
- Empty / success / error states
- 404 page
- Smooth page transitions (Framer Motion)
- Keyboard-friendly controls and ARIA labels
- `prefers-reduced-motion` support

---

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- Lucide React
- React Hot Toast

### Backend
- Python
- Flask
- Flask-CORS
- Flask-JWT-Extended
- Flask-Bcrypt
- python-dotenv
- Gunicorn

### Database
- SQLite (local development)
- Neon Postgres (Vercel production via `DATABASE_URL`)

### Deployment
- **Recommended:** Vercel (frontend + Flask API in one project)
- Optional split: Netlify frontend + Render backend

---

## Folder Structure

```text
LeadDesk/
├── backend/
│   ├── app.py
│   ├── wsgi.py
│   ├── Procfile
│   ├── requirements.txt
│   ├── render.yaml
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/
│   ├── netlify.toml
│   ├── public/
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── utils/
│       └── assets/
└── README.md
```

---

## Installation

### Prerequisites
- Node.js 20+
- Python 3.11+
- npm

### 1) Clone and enter the project

```bash
cd LeadDesk
```

### 2) Backend setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
copy .env.example .env   # Windows
# cp .env.example .env   # macOS / Linux

python app.py
```

Backend runs at `http://127.0.0.1:5000`.

### 3) Frontend setup

```bash
cd frontend
npm install
copy .env.example .env   # Windows
# cp .env.example .env   # macOS / Linux

npm run dev
```

Frontend runs at `http://localhost:5173`.

Local API calls are proxied through Vite (`/api` → `http://127.0.0.1:5000`).

---

## Default Admin Credentials

```text
Email:    admin@leaddesk.com
Password: Admin@123456
```

Change these in `backend/.env` before deploying.

---

## API Documentation

Base URL (local): `http://127.0.0.1:5000`

### Health
```http
GET /api/health
```

### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "admin@leaddesk.com",
  "password": "Admin@123456"
}
```

**Success (200)**
```json
{
  "message": "Login successful.",
  "access_token": "<jwt>",
  "user": { "id": 1, "email": "admin@leaddesk.com" }
}
```

### Create Lead (public)
```http
POST /api/leads
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "budget": "$5,000 - $10,000",
  "message": "Interested in a lead management rollout."
}
```

**Success (201)** returns the created lead.

### Get Leads (JWT protected)
```http
GET /api/leads?search=ada&status=New
Authorization: Bearer <token>
```

### Update Lead Status (JWT protected)
```http
PATCH /api/leads/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Contacted"
}
```

### Lead Stats (JWT protected)
```http
GET /api/leads/stats
Authorization: Bearer <token>
```

### Auth Me (JWT protected)
```http
GET /api/me
Authorization: Bearer <token>
```

---

## Authentication

1. Admin logs in via `/api/login`
2. Server returns a signed JWT
3. Frontend stores token + user in `localStorage`
4. Axios attaches `Authorization: Bearer <token>` on protected requests
5. Protected React routes block unauthenticated access
6. Logout clears stored credentials

Passwords are hashed with **Flask-Bcrypt**. Tokens are issued with **Flask-JWT-Extended**.

---

## Database Schema

### `users`
| Column | Type | Notes |
|---|---|---|
| id | INTEGER | Primary key |
| email | TEXT | Unique |
| password_hash | TEXT | Bcrypt hash |
| created_at | TEXT | UTC timestamp |

### `leads`
| Column | Type | Notes |
|---|---|---|
| id | INTEGER | Primary key |
| name | TEXT | Required |
| email | TEXT | Required |
| budget | TEXT | Required |
| message | TEXT | Required |
| status | TEXT | `New` / `Contacted` / `Closed` |
| created_at | TEXT | UTC timestamp |

---

## Deployment Steps

### Recommended: Vercel (frontend + backend together)

This repo is configured for a **single Vercel project**:
- React frontend from `frontend/`
- Flask API from `api/index.py` (+ `backend/`)
- Neon Postgres via `DATABASE_URL`

#### 1) Create a Neon database
1. Go to [neon.tech](https://neon.tech) or Vercel Marketplace → **Neon**
2. Create a project/database
3. Copy the **pooled** connection string (`DATABASE_URL`)

#### 2) Deploy on Vercel
1. Import `sriiverse/LeadDesk-Mini` into Vercel
2. Use **root directory = repository root** (not `frontend/`)
3. Vercel will read root `vercel.json`
4. Add environment variables:

| Key | Value |
|---|---|
| `DATABASE_URL` | Neon pooled Postgres URL |
| `SECRET_KEY` | long random string |
| `JWT_SECRET_KEY` | long random string |
| `ADMIN_EMAIL` | `admin@leaddesk.com` |
| `ADMIN_PASSWORD` | your admin password |
| `FRONTEND_URL` | your Vercel URL (e.g. `https://leaddesk.vercel.app`) |
| `FLASK_ENV` | `production` |

Leave `VITE_API_URL` **empty** (same-origin `/api` calls).

5. Deploy
6. Test:
   - `https://YOUR-VERCEL-URL/api/health`
   - Login at `/login`

#### Local development (unchanged)
- Backend: SQLite via `python app.py` in `backend/`
- Frontend: `npm run dev` in `frontend/` (Vite proxies `/api`)

### Optional split deploy (Render + Netlify)
Still supported:
- Backend on Render (`backend/`, `gunicorn wsgi:app`)
- Frontend on Netlify (`frontend/`, set `VITE_API_URL` to Render URL)
- Set Render `FRONTEND_URL` to the Netlify domain

---

## Design Decisions

- **Dark premium aesthetic** inspired by Linear, Vercel, Stripe, Raycast, and Apple
- **Glassmorphism + gradient borders** for layered depth without Three.js
- **CSS transforms / parallax / Framer Motion** for a 3D illusion
- **Mobile-first responsive system** with stacked lead cards on small screens
- **Frontend and backend validation** so the API never trusts the client
- **SQLite** for zero-ops local/demo deployment while remaining easy to migrate later
- **Clean layered architecture** (`routes → controllers → models`) for maintainability

---

## Future Improvements

- Role-based access (viewer / manager / admin)
- Lead assignment and notes timeline
- Email notifications on new leads
- CSV export and analytics charts
- Postgres migration for multi-instance production
- Rate limiting and CAPTCHA on the public contact form
- Audit logging for status changes

---

## Scripts

### Frontend
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend
```bash
python app.py
gunicorn wsgi:app
```

---

## Footer Attribution

The site footer includes:

**Built for [Digital Heroes Training Task](https://digitalheroesco.com)**

---

## License

Built for the Digital Heroes Internship Qualification Task.
