# Data Schema

## posts

| Column | Type | Notes |
|---|---|---|
| `id` | TEXT (UUID) | Primary key |
| `slug` | TEXT UNIQUE | URL-safe, auto-generated from title |
| `title` | TEXT | Post headline |
| `subtitle` | TEXT | Optional subheading |
| `status` | TEXT | `draft` / `published` / `archived` |
| `blocks` | TEXT (JSON) | Serialized array of block objects (x, y, w, h, type, content) |
| `layout_id` | TEXT | `editorial` / `full-bleed` / `split-screen` / `gallery-lead` / `minimal` |
| `palette_id` | TEXT | `desert-dusk` / `arctic` / `jungle` / `monochrome` / `sunset` / `ocean` / `night-market` / `sage` |
| `font_pair_id` | TEXT | `expedition` / `modern-trek` / `handwritten` / `bold-story` / `minimal` |
| `hero_image` | TEXT | R2 URL — used as post thumbnail and OG image |
| `tags` | TEXT (JSON) | Array of tag strings |
| `read_time` | INTEGER | Minutes — auto-calculated from block text word count |
| `author_id` | TEXT | References authors table |
| `published_at` | TEXT | ISO 8601 timestamp, null if draft |
| `created_at` | TEXT | ISO 8601 |
| `updated_at` | TEXT | ISO 8601 |

## subscribers

| Column | Type | Notes |
|---|---|---|
| `id` | TEXT (UUID) | Primary key |
| `email` | TEXT UNIQUE | Subscriber email |
| `name` | TEXT | First name for email personalization |
| `confirmed` | INTEGER | `0` = pending, `1` = confirmed |
| `confirmation_token` | TEXT | Used in confirmation email link |
| `unsubscribe_token` | TEXT | Used in unsubscribe link |
| `subscribed_at` | TEXT | ISO 8601 — when they confirmed |
| `created_at` | TEXT | ISO 8601 — when they first submitted |

## authors

| Column | Type | Notes |
|---|---|---|
| `id` | TEXT (UUID) | Primary key |
| `name` | TEXT | Display name |
| `bio` | TEXT | Short bio — shown on About section and post byline |
| `photo` | TEXT | R2 URL for headshot |
| `instagram` | TEXT | Optional handle |
| `role` | TEXT | e.g. Photographer, Writer |

## email_sends

| Column | Type | Notes |
|---|---|---|
| `id` | TEXT (UUID) | Primary key |
| `post_id` | TEXT | References posts.id |
| `subscriber_id` | TEXT | References subscribers.id |
| `status` | TEXT | `sent` / `failed` |
| `sent_at` | TEXT | ISO 8601 |
| `resend_id` | TEXT | Resend message ID for delivery tracking |
