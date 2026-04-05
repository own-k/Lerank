# Lerank

Escrow-backed EdTech marketplace where students compare and hire international education consultants — filtered by specialization, budget, destination country, and academic profile. Consultants get paid only when they deliver.

<!-- Demo: https://youtu.be/YOUR_VIDEO_ID -->
<!-- Live: https://lerank.com or YOUR_URL -->

---

## Problem

Students in Central Asia and emerging markets have no reliable way to find, compare, or trust education consultants. Fees are paid upfront with no accountability. There is no transparency on what a consultant actually specializes in — which countries, which degree levels, which score ranges, what they charge. Students gamble thousands of dollars on guesswork.

## Solution

Lerank makes consultants comparable and accountable. Filter by what matters. Pay through escrow. Funds release only on milestone delivery.

---

## Features

### Consultant Comparison

Students find the right consultant by filtering across real criteria:

- **Academic profile match** — Filter consultants by the GPA, IELTS, and SAT score ranges they work with
- **Degree level** — Bachelor's, Master's, PhD — see who specializes in your level
- **Major / field of study** — Find consultants experienced in your discipline
- **Destination country** — Filter by the countries a consultant covers
- **Budget filters** — Compare consulting fees, and see estimated tuition and living costs for programs they place students into
- **Side-by-side comparison** — Evaluate consultants on specialization, pricing, success rate, and verified reviews

### Escrow Marketplace

- **Escrow payments** — Funds held securely and released on milestone completion
- **Milestone tracking** — Structured service delivery with verifiable checkpoints
- **Consultant verification** — Profile validation and reputation scoring based on completed engagements
- **Student dashboard** — Real-time visibility into application progress and payment status

### Platform

- **Email OTP authentication** — Secure login flow with bot protection
- **Responsive landing page** — Scroll-driven experience with 3D globe mapping student-consultant connections worldwide

---

## Architecture

```
Client (Next.js 14 / React / TypeScript)
        ↓
  Middleware (bot detection, rate limiting)
        ↓
  API Routes (Next.js server-side)
        ↓
┌──────────────────────────────────────────────┐
│              Supabase Backend                │
│  ┌─────────┐  ┌────────────────────────────┐ │
│  │ Auth /   │  │ PostgreSQL + RLS           │ │
│  │ OTP      │  │                            │ │
│  │          │  │ - Consultant profiles       │ │
│  │          │  │   (countries, degree levels,│ │
│  │          │  │   majors, GPA/IELTS/SAT    │ │
│  │          │  │   ranges, fees, tuition &   │ │
│  │          │  │   living cost estimates)     │ │
│  │          │  │ - Student profiles           │ │
│  │          │  │ - Escrow transactions        │ │
│  │          │  │ - Milestone state machine    │ │
│  └─────────┘  └────────────────────────────┘ │
└──────────────────────────────────────────────┘
        ↓                ↓
  Resend / AWS SES    Cloudflare WAF
  (email delivery)    (bot protection)
        ↓
  Vercel (deployment)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| Backend | Supabase (PostgreSQL, Auth, Row-Level Security) |
| Email | Resend / AWS SES — OTP verification |
| Security | Cloudflare WAF, Next.js middleware (bot/crawler mitigation) |
| Deployment | Vercel |
| Design | Fraunces (display font), espresso/caramel/cream brand palette |

---

## Data Model

```
Consultants
├── verified_status
├── countries_covered[]
├── degree_levels[] (BSc, MSc, PhD)
├── majors_covered[]
├── gpa_range (min–max they work with)
├── ielts_range
├── sat_range
├── consulting_fee
├── avg_tuition_estimate
├── avg_living_cost_estimate
├── completed_engagements
├── rating
└── escrow_transactions[]

Students
├── gpa
├── ielts_score
├── sat_score
├── target_degree_level
├── target_major
├── preferred_countries[]
├── budget (consulting + tuition + living)
└── active_engagements[]

Escrow
├── student_id
├── consultant_id
├── total_amount
├── milestones[]
│   ├── description
│   ├── amount
│   └── status (pending / completed / released)
└── state (active / completed / disputed)
```

---

## Key Technical Decisions

- **Row-Level Security (RLS)** on all Supabase tables — users access only their own data
- **Cloudflare WAF rules** + Next.js middleware for layered bot protection on auth flows
- **Email OTP over password auth** — reduces friction, eliminates password management
- **Escrow logic server-side** — payment state machine prevents premature fund release
- **Composite filtering** — query-level filtering across consultant specializations, scores, budget, and country in a single request

---

## Screenshots

<img width="2922" height="1746" alt="Shot Dia221915" src="https://github.com/user-attachments/assets/b91b739a-6335-463f-8200-962aacdcc4b6" />

<!-- ![Consultant Comparison](./screenshots/comparison.png) -->
<!-- ![Filter Panel](./screenshots/filters.png) -->
<!-- ![Student Dashboard](./screenshots/dashboard.png) -->
<!-- ![Consultant Profile](./screenshots/consultant.png) -->
<!-- ![Milestone Tracking](./screenshots/milestones.png) -->
<!-- ![3D Globe](./screenshots/globe.png) -->

---

## Status

In development. Preparing for launch across Central Asia.

---

## About

Founded by [Komron Keldiyorov](https://github.com/own-k) — Founder & CTO.

Built to solve a problem I watched students around me face firsthand.
