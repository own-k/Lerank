# Lerank Platform

## Overview

Lerank is a trust-first marketplace connecting international students with verified education consultants. Features real-time process monitoring and escrow-protected payments.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/lerank)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Brand

- Primary: Warm caramel #C4956A
- Background: Deep roast #1A0F0A → Espresso #2C1810
- Text: Cream #F5EDE4
- Success: Sage #6B8F71 / Danger: Burnt sienna #C0392B

## Pages

- `/` — Landing page with hero, feature sections, animations
- `/compare` — Sign-up + multi-step onboarding + consultant comparison grid
- `/dashboard` — Student dashboard with application tracker + activity feed
- `/admin/company` — Company admin: student management + milestone updates
- `/admin/super` — Super admin: platform analytics + company management

## Demo Accounts

- **Super Admin**: admin@lerank.com / admin123
- **Company Admin**: company@edupathglobal.com / company123
- **Student**: student@example.com / student123

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── lerank/          # React + Vite frontend (at /)
│   └── api-server/      # Express API server (at /api)
├── lib/
│   ├── api-spec/        # OpenAPI spec + Orval codegen config
│   ├── api-client-react/ # Generated React Query hooks
│   ├── api-zod/         # Generated Zod schemas from OpenAPI
│   └── db/              # Drizzle ORM schema + DB connection
└── scripts/             # Utility scripts (seed, etc.)
```

## Database Schema

- `users` — students, company admins, super admins (role-based)
- `student_profiles` — scores, budget, preferences
- `companies` — consultant companies with ratings, countries, pricing
- `applications` — consulting engagements between students and companies
- `milestones` — per-application milestone tracking
- `transactions` — escrow transaction records
- `activity_feed` — real-time activity log per student
- `milestone_templates` — reusable milestone templates for companies

## Auth

JWT-based. Token stored in localStorage as `lerank_token`. All protected API routes check `Authorization: Bearer <token>` header.

## API Routes

- `GET/POST /api/auth/*` — register, login, logout, me, profile
- `GET /api/consultants` — list/filter companies
- `GET/POST /api/applications` — student applications
- `GET /api/dashboard/stats` — student stats
- `GET /api/dashboard/activity` — activity feed
- `GET/PUT /api/milestones/:id` — milestone updates
- `GET /api/transactions` — transaction list
- `GET /api/company/students` — company's students
- `GET/POST /api/company/milestone-templates`
- `GET/POST/PUT /api/admin/companies`
- `GET /api/admin/users`
- `GET /api/admin/analytics`

## Development Commands

- `pnpm --filter @workspace/db run push` — push DB schema
- `pnpm --filter @workspace/scripts run seed` — seed sample data
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API types
