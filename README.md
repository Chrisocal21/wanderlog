# WanderLog

A modern, mobile-first travel blog platform with a visual canvas editor.

## Overview

WanderLog is a reusable travel blog PWA built for two people: the **developer** (who builds and maintains it) and the **blogger** (who writes and publishes from anywhere in the world).

### Key Features

- 🎨 **Visual Canvas Editor** — Canva-style block editor with free positioning
- 📱 **Mobile-First** — Works seamlessly on phone, tablet, and desktop
- 🎭 **Per-Post Themes** — Every post can have its own layout, colors, and fonts
- 📧 **Email Subscribers** — Automatic notifications on publish via Resend
- 🚀 **Fast & Offline** — PWA with service worker for offline reading
- 🔒 **Simple Auth** — Single password, no complex user management

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Database | Cloudflare D1 (SQLite) |
| API | Cloudflare Workers |
| Storage | Cloudflare R2 |
| Email | Resend |
| Deployment | Vercel (frontend) + Cloudflare (backend) |
| Editor State | Zustand |
| PWA | next-pwa |

## Documentation

| Document | Purpose |
|---|---|
| [Product Overview](docs/product-overview.md) | Concept, philosophy, and design principles |
| [Architecture](docs/architecture.md) | Stack decisions, system flow, routing structure |
| [Feature Roadmap](docs/feature-roadmap.md) | Phase 1 MVP through future enhancements |
| [Data Schema](docs/data-schema.md) | Complete D1 database schema |
| [API Reference](docs/api-reference.md) | All Worker endpoint specifications |
| [Developer Setup](docs/developer-setup.md) | Step-by-step setup and deployment guide |
| [Admin Reference](docs/admin-reference.md) | Ongoing maintenance and troubleshooting |
| [Blogger Guide](docs/blogger-guide.md) | End-user guide (non-technical) |
| [Development Plan](DEVELOPMENT_PLAN.md) | **Phase-by-phase build plan** |

## Quick Start

See [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md) for the complete build order and [Developer Setup Guide](docs/developer-setup.md) for detailed configuration steps.

```bash
# Install dependencies
npm install

# Set up Cloudflare resources
wrangler d1 create wanderlog-db
wrangler r2 bucket create wanderlog-media

# Run migrations
wrangler d1 execute wanderlog-db --file=./migrations/001_init.sql --remote

# Deploy Workers
wrangler deploy

# Start Next.js development
npm run dev
```

## Project Structure

```
wanderlog/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public blog routes
│   ├── dashboard/         # Blogger dashboard
│   └── api/              # API route handlers (proxy to Workers)
├── components/            # React components
├── lib/                  # Utilities, types, config
├── workers/              # Cloudflare Workers
├── migrations/           # D1 database migrations
├── docs/                 # Documentation
└── public/              # Static assets
```

## License

[Your License Here]
