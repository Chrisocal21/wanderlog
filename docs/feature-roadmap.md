# Feature Roadmap

## Phase 1 — MVP (Build First)

| Feature | Description | Priority |
|---|---|---|
| Canvas block editor | Free-position grid, drag/resize, all block types below | High |
| Text block | Rich text, font picker, size slider, color picker, alignment | High |
| Photo block (single) | Upload to R2, resize on canvas, optional caption | High |
| Photo gallery block | 2–4 photo grid, per-photo captions | High |
| Pull quote block | Styled large quote, accent color, centered | High |
| Divider block | Visual separator | Med |
| Post themes | 5 layouts, 8 palettes, 5 font pairings | High |
| Draft / Publish | Save drafts, preview, one-click publish | High |
| Email subscribe | Homepage widget, double opt-in, confirmation email | High |
| Publish notification | Email all confirmed subscribers via Resend on publish | High |
| Unsubscribe | Token-based one-click, no login | High |
| Blogger auth | Username + password, JWT cookie, 30-day session | High |
| Post list dashboard | All drafts and published, edit / delete / duplicate | High |
| Media uploads | Photos to R2 via presigned URL, progress indicator | High |
| Auto-save | Canvas state saves to localStorage every 30 seconds | High |
| PWA | Installable, service worker, offline reading of cached posts | Med |
| Tags | Add tags to posts, filter archive by tag | Med |
| Reading time | Auto-calculated word count → minutes estimate | Low |
| `/dashboard/guide` | Blogger help guide rendered from markdown | Med |
| `/wanderlog-admin` | Developer admin reference rendered from markdown | Med |

## Phase 2 — Enhancements

| Feature | Description | Priority |
|---|---|---|
| Embed block | YouTube, Google Maps, Instagram via URL paste | High |
| Location card block | Destination name, country flag, stylized card | Med |
| Subscriber dashboard | Blogger sees subscriber count and recent signups | Med |
| Failed send retry | Manual resend button for failed email sends | Med |
| Post scheduling | Set future publish date — auto-publishes and notifies | Med |
| Two-author support | Posts can list one or both authors as byline | Low |
| Custom slug | Blogger can override auto-generated URL slug | Low |
| Draft preview link | Shareable preview URL for unpublished draft (expires 24h) | Low |

## Phase 3 — Template Polish

| Feature | Description |
|---|---|
| Audio block | Short ambient audio clip — uploads to R2, plays inline |
| Magazine layout | Two-column text flow for desktop |
| RSS feed | `/feed.xml` auto-generated from published posts |
| Template docs site | README + setup guide on GitHub |
| One-click deploy | Vercel + Cloudflare deploy button in README |
