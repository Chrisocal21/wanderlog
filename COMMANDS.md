# WanderLog Quick Start Scripts

This file contains helpful commands for setting up and managing WanderLog.

## Initial Setup

### Install Dependencies
```bash
npm install
```

### Cloudflare Setup
```bash
# Login to Cloudflare
wrangler login

# Create D1 Database
wrangler d1 create wanderlog-db
# Copy the database_id and add to wrangler.toml

# Create R2 Bucket
wrangler r2 bucket create wanderlog-media

# Run Database Migration
wrangler d1 execute wanderlog-db --file=./migrations/001_init.sql --remote
```

### Set Secrets
```bash
# Blogger username
wrangler secret put BLOGGER_USERNAME

# Generate password hash (run this first, then copy the output)
node -e "require('bcryptjs').hash('YOUR_PASSWORD_HERE', 10).then(console.log)"
# Then set it:
wrangler secret put BLOGGER_PASSWORD_HASH

# JWT secret (generate random string)
wrangler secret put JWT_SECRET

# Resend API key (from resend.com dashboard)
wrangler secret put RESEND_API_KEY

# From email (verified in Resend)
wrangler secret put FROM_EMAIL

# Blog base URL (set after Vercel deploy)
wrangler secret put BLOG_BASE_URL
```

## Development

### Run Next.js Dev Server
```bash
npm run dev
# Opens on http://localhost:3000
```

### Run Workers Locally
```bash
wrangler dev
# Opens on http://localhost:8787
```

### Watch Workers Logs (Production)
```bash
wrangler tail
```

## Database Management

### View Tables
```bash
wrangler d1 execute wanderlog-db --command "SELECT name FROM sqlite_master WHERE type='table'" --remote
```

### View Posts
```bash
wrangler d1 execute wanderlog-db --command "SELECT id, title, status, published_at FROM posts ORDER BY created_at DESC LIMIT 10" --remote
```

### View Subscribers
```bash
wrangler d1 execute wanderlog-db --command "SELECT email, name, confirmed, subscribed_at FROM subscribers ORDER BY created_at DESC" --remote
```

### Export Subscribers (JSON)
```bash
wrangler d1 execute wanderlog-db --command "SELECT email, name, subscribed_at FROM subscribers WHERE confirmed = 1" --remote --json > subscribers.json
```

### View Recent Emails
```bash
wrangler d1 execute wanderlog-db --command "SELECT es.sent_at, es.status, s.email, p.title FROM email_sends es JOIN subscribers s ON es.subscriber_id = s.id JOIN posts p ON es.post_id = p.id ORDER BY es.sent_at DESC LIMIT 20" --remote
```

### Run New Migration
```bash
# Create migration file: migrations/002_your_change.sql
# Then run:
wrangler d1 execute wanderlog-db --file=./migrations/002_your_change.sql --remote
```

## R2 Management

### List Files
```bash
wrangler r2 object list wanderlog-media
```

### Upload File Manually
```bash
wrangler r2 object put wanderlog-media/path/to/file.jpg --file ./local-file.jpg
```

### Delete File
```bash
wrangler r2 object delete wanderlog-media/path/to/file.jpg
```

## Deployment

### Deploy Workers
```bash
wrangler deploy
```

### Deploy to Vercel (via Git)
```bash
git add .
git commit -m "Your commit message"
git push origin main
# Vercel auto-deploys from GitHub
```

### Check Deployment Status
```bash
# Vercel
vercel ls

# Workers
wrangler deployments list
```

## Secret Management

### List All Secrets (names only)
```bash
wrangler secret list
```

### Update a Secret
```bash
wrangler secret put SECRET_NAME
```

### Delete a Secret
```bash
wrangler secret delete SECRET_NAME
```

## Troubleshooting

### Check Worker Logs
```bash
wrangler tail
# Keep running to see real-time logs
```

### Test API Endpoint
```bash
curl https://your-worker-url.workers.dev/api/posts
```

### Check Database Connection
```bash
wrangler d1 execute wanderlog-db --command "SELECT 1" --remote
```

### Clear Local Cache
```bash
rm -rf .next
rm -rf node_modules/.cache
npm run dev
```

### Reset Local Development
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## Useful One-Liners

### Generate UUID
```bash
node -e "console.log(require('crypto').randomUUID())"
```

### Generate Random Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Generate Password Hash
```bash
node -e "require('bcryptjs').hash('PASSWORD', 10).then(console.log)"
```

### Count Posts
```bash
wrangler d1 execute wanderlog-db --command "SELECT COUNT(*) as total FROM posts" --remote
```

### Count Subscribers
```bash
wrangler d1 execute wanderlog-db --command "SELECT COUNT(*) as total FROM subscribers WHERE confirmed = 1" --remote
```

### Get Database Info
```bash
wrangler d1 info wanderlog-db
```

## Testing

### Test Email Sending (Manual)
```bash
# You'll need to call your API endpoint with proper auth
curl -X POST https://your-worker-url.workers.dev/api/posts/POST_ID/publish \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### Test Subscribe Flow
```bash
curl -X POST https://your-worker-url.workers.dev/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

## Maintenance

### Update All Dependencies
```bash
npm update
npm audit fix
```

### Check for Outdated Packages
```bash
npm outdated
```

### Clean Install
```bash
rm -rf node_modules package-lock.json
npm install
```

## Production Checklist

Before going live, verify:

```bash
# 1. All secrets are set
wrangler secret list

# 2. Database is migrated
wrangler d1 execute wanderlog-db --command "SELECT name FROM sqlite_master WHERE type='table'" --remote

# 3. Workers are deployed
wrangler deployments list

# 4. R2 bucket exists
wrangler r2 bucket list

# 5. Test API
curl https://your-worker-url.workers.dev/api/posts

# 6. Git is clean
git status
```

---

**Tip:** Bookmark this file and keep it open in a terminal window for quick reference during development.
