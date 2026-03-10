# Developer Setup Guide

*Everything you do before handing off. She does none of this.*

## What You're Building

You build and deploy the platform. When you're done:

- She gets a **blog URL** — her live public blog
- She gets a **dashboard URL** — her private writing and design studio
- She gets a **username and password** — the only credentials she will ever need

She opens a browser, goes to the dashboard URL, and she's in a visual editor that works like Canva. She never installs anything. She never touches code.

## Phase 1 — Create Accounts

Before writing any code, create accounts on these four services. All have free tiers.

### Cloudflare

1. Go to [cloudflare.com](https://cloudflare.com) → Create account (free)
2. Note your **Account ID** from the right sidebar
3. Go to Workers & Pages → confirm enabled

### Vercel

1. Go to [vercel.com](https://vercel.com) → Create account with GitHub (free Hobby plan)
2. No configuration yet

### Resend

1. Go to [resend.com](https://resend.com) → Create account (free: 3,000 emails/month)
2. Go to API Keys → Create Key → copy and save it
3. Go to Domains → verify your sending domain

### GitHub

1. Go to [github.com](https://github.com) → create account if needed
2. Create a new private repository called `wanderlog`

## Phase 2 — Local Dev Environment

```bash
# Verify Node.js v18+ is installed
node --version

# Install Wrangler (Cloudflare CLI)
npm install -g wrangler

# Authenticate Wrangler with Cloudflare
wrangler login

# Clone the WanderLog template
git clone https://github.com/[your-handle]/wanderlog
cd wanderlog

# Install dependencies
npm install
```

## Phase 3 — Cloudflare Setup

### Create the Database

```bash
wrangler d1 create wanderlog-db
# Copy the database_id from output → paste into wrangler.toml
```

### Run Migrations

```bash
wrangler d1 execute wanderlog-db --file=./migrations/001_init.sql --remote
```

### Create Media Storage

```bash
wrangler r2 bucket create wanderlog-media
```

### Set All Secrets

```bash
# Blogger login username
wrangler secret put BLOGGER_USERNAME

# Generate bcrypt hash for her password first:
node -e "require('bcryptjs').hash('HERPASSWORD', 10).then(console.log)"
# Then set it:
wrangler secret put BLOGGER_PASSWORD_HASH

# Random JWT signing string (any long random characters)
wrangler secret put JWT_SECRET

# Resend API key (from Resend dashboard)
wrangler secret put RESEND_API_KEY

# Verified sending email address
wrangler secret put FROM_EMAIL

# Full public blog URL (update after Vercel deploy)
wrangler secret put BLOG_BASE_URL
```

### Deploy the Workers Backend

```bash
wrangler deploy
# Note the Workers URL output — you'll need it for Vercel
```

## Phase 4 — Configure the Blog

Open `config.ts` in the project root. Edit these values:

```typescript
export const config = {
  blog: {
    name: "Your Blog Name",
    tagline: "Your tagline here",
    description: "A short description",
    baseUrl: "https://yourblog.com",
  },
  defaultTheme: {
    paletteId: "desert-dusk",
    fontPairId: "expedition",
    layoutId: "editorial",
  },
  authors: [
    {
      id: "a1",
      name: "Her Name",
      role: "Photographer & Writer",
      bio: "A short bio — 1-2 sentences",
      instagram: "@herhandle",
    },
  ],
  social: {
    instagram: "@thebloghandle",
    youtube: "",
    tiktok: "",
  },
}
```

## Phase 5 — Deploy to Vercel

### Push to GitHub

```bash
git add .
git commit -m "Initial WanderLog configuration"
git push origin main
```

### Connect Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard) → Add New Project
2. Import the `wanderlog` GitHub repository
3. Add Environment Variables:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | Workers URL from Phase 3 |
| `NEXT_PUBLIC_BLOG_NAME` | Blog name |

4. Click Deploy
5. Vercel gives you a URL — this is the live blog

### Connect Custom Domain (Recommended)

1. Vercel project → Settings → Domains → add your domain
2. Follow Vercel's DNS instructions
3. Update `BLOG_BASE_URL` secret in Cloudflare once domain is live:

```bash
wrangler secret put BLOG_BASE_URL
# Type: https://yourblog.com
```

## Phase 6 — Pre-Handoff Testing Checklist

Run through this yourself before giving her the credentials:

- [ ] Homepage loads at the public URL
- [ ] `/dashboard` shows the login page
- [ ] Login works with the credentials you set
- [ ] Create a test post — add text block, photo block, pull quote
- [ ] Try all 5 layout templates
- [ ] Try at least 3 color palettes and 2 font pairings
- [ ] Publish the test post — verify it appears on public blog
- [ ] Sign up for emails from the homepage with a personal email address
- [ ] Publish a second post — verify you receive the notification email
- [ ] Test the unsubscribe link in the email
- [ ] Open the dashboard on a phone — verify mobile editor works
- [ ] Check `/dashboard/guide` renders the blogger guide
- [ ] Check `/wanderlog-admin` requires admin password and renders dev reference
- [ ] Delete test posts before handoff (or leave as examples)

## Phase 7 — The Handoff

Give her exactly these four things:

1. **Public blog URL** — `https://yourblog.com`
2. **Dashboard URL** — `https://yourblog.com/dashboard`
3. **Username** — whatever you set in Phase 3
4. **Password** — whatever you used to generate the hash

Nothing else. She opens the dashboard URL and she's in. The guide is already inside at `/dashboard/guide`.

## Your Ongoing Responsibilities

Very little. The platform runs itself. The only things that bring you back:

| Situation | Time Required |
|---|---|
| She forgets her password | ~5 minutes — see Admin Reference |
| She wants her bio or photo updated | ~10 minutes — edit config.ts, push |
| Blog name or tagline change | ~10 minutes — edit config.ts, push |
| Resend hits daily send limit (100/day) | Upgrade Resend to $20/month plan |
| Something is broken | See Admin Reference troubleshooting |
