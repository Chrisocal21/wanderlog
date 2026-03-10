# Admin Reference

*Your private reference. Renders at `/wanderlog-admin` with separate admin password.*

## Quick Links

| Resource | URL |
|---|---|
| Public blog | `yourblog.com` |
| Blogger dashboard | `yourblog.com/dashboard` |
| This page | `yourblog.com/wanderlog-admin` |
| Cloudflare | [dash.cloudflare.com](https://dash.cloudflare.com) |
| Vercel | [vercel.com/dashboard](https://vercel.com/dashboard) |
| Resend | [resend.com](https://resend.com) |
| GitHub repo | `github.com/[your-handle]/wanderlog` |

## Reset Blogger Password

```bash
# Generate a new bcrypt hash
node -e "require('bcryptjs').hash('NEWPASSWORD', 10).then(console.log)"

# Update the secret — Workers picks it up immediately
wrangler secret put BLOGGER_PASSWORD_HASH
```

## Update Blog Name or Tagline

```bash
# Edit config.ts → update blog.name and/or blog.tagline
git add config.ts
git commit -m "Update blog config"
git push origin main
# Vercel auto-deploys in ~60 seconds
```

## Update Author Bio or Profile Photo

**Bio:** Edit `config.ts` → update `authors[].bio` → push to GitHub

**Profile Photo:**

```bash
# Upload new photo to R2
wrangler r2 object put wanderlog-media/authors/[filename].jpg --file ./[filename].jpg

# Update config.ts authors[].photo with the R2 URL
git add config.ts && git commit -m "Update author photo" && git push
```

## Export Subscriber List

```bash
# View in terminal
wrangler d1 execute wanderlog-db \
  --command "SELECT email, name, subscribed_at FROM subscribers WHERE confirmed = 1 ORDER BY subscribed_at DESC" \
  --remote

# Export as JSON (convert to CSV with any online tool)
wrangler d1 execute wanderlog-db \
  --command "SELECT email, name, subscribed_at FROM subscribers WHERE confirmed = 1" \
  --remote --json > subscribers.json
```

## Manually Resend a Publish Notification

```bash
curl -X POST https://wanderlog-api.[yourname].workers.dev/api/posts/[POST_ID]/notify \
  -H "Authorization: Bearer [your-jwt]" \
  -H "Content-Type: application/json"
```

## Deactivate or Delete a Subscriber

```bash
# Deactivate (preserves history)
wrangler d1 execute wanderlog-db \
  --command "UPDATE subscribers SET confirmed = 0 WHERE email = 'their@email.com'" \
  --remote

# Full delete
wrangler d1 execute wanderlog-db \
  --command "DELETE FROM subscribers WHERE email = 'their@email.com'" \
  --remote
```

## View Recent Email Log

```bash
wrangler d1 execute wanderlog-db \
  --command "SELECT es.sent_at, es.status, s.email, p.title FROM email_sends es JOIN subscribers s ON es.subscriber_id = s.id JOIN posts p ON es.post_id = p.id ORDER BY es.sent_at DESC LIMIT 50" \
  --remote
```

## Live Worker Logs

```bash
wrangler tail
# Streams all requests and errors in real time
```

## Deploy Commands Reference

```bash
wrangler deploy                          # Deploy Workers backend
wrangler d1 execute wanderlog-db \
  --file=./migrations/001_init.sql \
  --remote                               # Run a migration
wrangler tail                            # Live log stream
git push origin main                     # Triggers Vercel auto-deploy
wrangler secret put [KEY]               # Add or update a secret
wrangler secret list                     # List all secret names (not values)
wrangler d1 info wanderlog-db           # Database info and storage usage
```

## Troubleshooting

### Blog is down

→ Vercel dashboard → project → Deployments → check for failed deploy → fix code → push

### API errors

→ `wrangler tail` — live stream shows every request and error

### Database not responding

```bash
wrangler d1 execute wanderlog-db --command "SELECT * FROM posts LIMIT 5" --remote
```

### Emails not delivering

→ Resend dashboard → Logs → look for bounces or failures
→ Verify `FROM_EMAIL` domain is verified in Resend
→ Check if daily send limit (100/day free tier) has been hit

## Service Limits

| Service | Free Tier Limit | Upgrade When |
|---|---|---|
| Cloudflare Workers | 100,000 req/day | Sustained traffic exceeds ~70 req/min |
| Cloudflare D1 | 5M reads/day, 100K writes/day | High concurrent reader traffic |
| Cloudflare R2 | 10GB storage, 1M reads/month | Storage approaches 8GB |
| Vercel | 100GB bandwidth/month | High traffic — unlikely for a personal blog |
| Resend | 3,000 emails/month, 100/day | Subscriber list approaches 80–90 active |

## Phase 2 Build Order

When returning to add the next round of features, build in this order:

1. YouTube / Maps / Instagram embed block
2. Location card block
3. Subscriber count visible in dashboard settings
4. Post scheduling (set future publish date)
5. Two separate blogger login accounts
6. Custom URL slug editor
7. Shareable draft preview link (expires 24h)
