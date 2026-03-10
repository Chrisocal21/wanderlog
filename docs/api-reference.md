# API Reference

## Posts

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/posts` | Public | List published posts — paginated, tag filter |
| GET | `/api/posts/[slug]` | Public | Single published post by slug |
| GET | `/api/posts/[id]/draft` | Blogger | Full post including blocks — for editor |
| POST | `/api/posts` | Blogger | Create new post — returns id |
| PATCH | `/api/posts/[id]` | Blogger | Update content, theme, or status |
| DELETE | `/api/posts/[id]` | Blogger | Delete post and associated R2 media |
| POST | `/api/posts/[id]/publish` | Blogger | Publish + trigger subscriber email send |

## Subscribers

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/subscribe` | Public | Add subscriber — triggers confirmation email |
| GET | `/api/subscribe/confirm` | Public | Confirm subscription via token in query param |
| GET | `/api/unsubscribe` | Public | Unsubscribe via token in query param |
| GET | `/api/subscribers` | Blogger | List confirmed subscribers and count (Phase 2) |

## Media

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/media/upload-url` | Blogger | Get R2 presigned URL for direct browser upload |
| DELETE | `/api/media` | Blogger | Delete file from R2 by key |

## Auth

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Blogger login — validates credentials, returns JWT cookie |
| POST | `/api/auth/logout` | Blogger | Clear JWT cookie |
