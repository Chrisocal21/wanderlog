# Architecture

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 14 (App Router) | Public blog + Blogger Dashboard — single repo, two experiences |
| Deployment | Vercel | Global CDN, edge functions, auto-deploy from GitHub |
| Database | Cloudflare D1 (SQLite) | Posts, subscribers, sessions — serverless, zero config |
| API Layer | Cloudflare Workers | All backend logic — auth, post CRUD, email triggers |
| Media | Cloudflare R2 | Photo and video storage — cheap, fast, S3-compatible |
| Email | Resend | Transactional email — subscriber notifications on publish |
| Auth | Custom JWT via Workers | Single blogger account — lightweight, no OAuth complexity |
| Styling | Tailwind CSS | Utility-first — per-post themes via CSS custom properties |
| Editor State | Zustand | Canvas block state — position, size, content, unsaved changes |
| PWA | next-pwa | Service worker, offline reading, installable on mobile |

## System Flow

```
PUBLIC READER
Browser → Next.js (Vercel) → Cloudflare Worker API → D1 Database

BLOGGER (on the road)
Phone/Tablet → Dashboard (password-protected) → Worker API → D1 + R2

ON PUBLISH
Worker → Query confirmed subscribers from D1 → Resend API → Email to all subscribers

MEDIA UPLOAD
Dashboard → Worker generates R2 presigned URL → Browser uploads directly to R2 → URL stored in D1 block
```

## Routing Structure

| Route | Purpose |
|---|---|
| `/` | Public homepage — latest posts grid, about section, email signup |
| `/posts/[slug]` | Individual post — renders blocks with post-specific theme |
| `/archive` | All posts — filterable by tag, date, traveler |
| `/dashboard` | Login gate — redirects to `/dashboard/posts` if authenticated |
| `/dashboard/posts` | Post list — drafts and published with quick actions |
| `/dashboard/posts/new` | Canvas editor — create new post |
| `/dashboard/posts/[id]` | Canvas editor — edit existing post |
| `/dashboard/guide` | Blogger help guide (Section 8 of this document, rendered) |
| `/dashboard/settings` | Blog settings — bio, profile photo, password |
| `/wanderlog-admin` | Developer admin reference (Sections 6–7, separate password) |
| `/api/*` | Cloudflare Worker routes — all backend logic |
| `/unsubscribe` | One-click unsubscribe — token-based, no login required |

## The Canvas Editor — Technical Approach

The blogger's editor is a **free-position grid canvas**, not a linear block list. This is closer to Canva or Adobe Express than to Notion. Technically this means:

- Each block has an `x`, `y`, `width`, `height` stored alongside its content in the post JSON
- `react-grid-layout` handles drag, drop, and resize interactions
- Blocks snap to a responsive grid (12-column on desktop, 4-column on mobile)
- The canvas state is managed in Zustand — all changes are local until Save Draft or Publish
- On mobile, the canvas collapses to a vertical stack (blocks reorder by y-position) — drag handles move blocks up and down in order
- The published post renders the same layout using CSS Grid with the stored x/y/width/height values

### Block JSON Shape

```json
{
  "id": "block_abc123",
  "type": "text",
  "x": 0,
  "y": 2,
  "w": 8,
  "h": 4,
  "content": {
    "html": "<p>Your writing here</p>",
    "fontSize": 18,
    "fontFamily": "expedition-body",
    "color": "#1A1A1A",
    "backgroundColor": "transparent",
    "alignment": "left"
  }
}
```

## Per-Post Theme System

Themes are CSS custom property sets. Each post stores three IDs: `layoutId`, `paletteId`, `fontPairId`. On render, the matching CSS variable set is applied to the post wrapper.

```css
/* Example: desert-dusk palette */
[data-palette="desert-dusk"] {
  --color-bg:      #F7F0E8;
  --color-text:    #3D2B1F;
  --color-accent:  #C8956C;
  --color-surface: #EFE4D6;
}
```

### Layout Templates

| ID | Name | Description |
|---|---|---|
| `editorial` | Editorial | Constrained text column, generous whitespace, classic longform |
| `full-bleed` | Full Bleed | Hero image stretches full viewport, title overlaid |
| `split-screen` | Split Screen | Vertical split — image one side, text the other |
| `gallery-lead` | Gallery Lead | Post opens with photo grid, then writing begins |
| `minimal` | Minimal | No hero image — just title, date, and blocks |

### Color Palettes

| ID | Name | Colors |
|---|---|---|
| `desert-dusk` | Desert Dusk | `#C8956C, #3D2B1F, #F7F0E8` |
| `arctic` | Arctic | `#4A90B8, #1A2D3D, #F0F7FF` |
| `jungle` | Jungle | `#2D6A4F, #1B2E25, #F0FFF4` |
| `monochrome` | Monochrome | `#1A1A1A, #555555, #F5F5F5` |
| `sunset` | Sunset | `#E8485A, #FF8C42, #FFF8F0` |
| `ocean` | Ocean | `#0077B6, #00B4D8, #F0FAFF` |
| `night-market` | Night Market | `#C8956C, #FFD166, #1A1218` |
| `sage` | Sage | `#6B8F71, #A8C5A0, #F5F8F5` |

### Font Pairings

| ID | Name | Heading Font | Body Font |
|---|---|---|---|
| `expedition` | Expedition | Playfair Display | Source Serif Pro |
| `modern-trek` | Modern Trek | DM Serif Display | Inter |
| `handwritten` | Handwritten | Lora | Lato |
| `bold-story` | Bold Story | Libre Baskerville | Open Sans |
| `minimal` | Minimal | Space Grotesk | Space Grotesk |
