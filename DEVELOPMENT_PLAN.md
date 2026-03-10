# WanderLog — Development Plan

**Complete phase-by-phase build order for WanderLog MVP**

## Overview

This document outlines the complete build sequence for WanderLog Phase 1 MVP. **Strategy: Build UI/UX first with mock data, then integrate backend later.** This allows rapid iteration on design and user experience before committing to infrastructure.

**Estimated Total Time:** 40-60 hours (depending on experience level)

### Build Strategy

**Part 1: Design & Frontend (Phases 1-6)** — Build everything visual with mock data
- Design system, themes, layouts
- Public blog UI with sample posts
- Canvas editor with localStorage
- All block components
- Mobile responsive

**Part 2: Backend Integration (Phases 7+)** — Add Cloudflare, auth, database, email
- Cloudflare Workers, D1, R2
- Authentication system
- Email subscriptions
- Production deployment

---

## Phase 1 — Project Setup & Design System

**Goal:** Initialize Next.js project and create the design foundation

**Time Estimate:** 3-4 hours

### Tasks

#### 1.1 Initialize Next.js Project

```bash
npx create-next-app@latest wanderlog --typescript --tailwind --app --no-src-dir
cd wanderlog
```

- [ ] Configure TypeScript with strict mode
- [ ] Create folder structure: `lib/`, `components/`, `types/`, `styles/`, `data/`
- [ ] Install core dependencies:
  ```bash
  npm install zustand react-grid-layout date-fns uuid
  npm install -D @types/uuid @types/react-grid-layout
  ```

#### 1.2 Configure Tailwind

Update `tailwind.config.js`:

- [ ] Add custom colors (neutrals, accent colors)
- [ ] Add custom fonts (import Google Fonts in layout)
- [ ] Set up responsive breakpoints
- [ ] Add custom spacing if needed

#### 1.3 Create Design System Files

- [ ] Create `styles/globals.css` with CSS reset and base styles
- [ ] Create `styles/themes.css` with all 8 color palette CSS variables
- [ ] Create `styles/fonts.css` with all 5 font pairing definitions
- [ ] Import Google Fonts: Playfair Display, Source Serif Pro, DM Serif Display, Inter, Lora, Lato, Libre Baskerville, Open Sans, Space Grotesk

#### 1.4 Theme System CSS

Create CSS custom properties for each palette (copy from architecture docs):

```css
[data-palette="desert-dusk"] { /* ... */ }
[data-palette="arctic"] { /* ... */ }
/* etc for all 8 palettes */
```

And font pairings:

```css
[data-font="expedition"] {
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Source Serif Pro', serif;
}
/* etc for all 5 font pairs */
```

**Deliverable:** Next.js project with complete design system and theme CSS

---

## Phase 2 — TypeScript Types & Mock Data

**Goal:** Set up configuration system and TypeScript types

**Time Estimate:** 2-3 hours

### Tasks

#### 2.1 Create Configuration System

- [ ] Create `lib/config.ts` with blog configuration structure
- [ ] Define theme system (layouts, palettes, font pairings)
- [ ] Add author configuration
- [ ] Set up social links configuration

#### 2.2 Define TypeScript Types

Create `types/index.ts` with:

- [ ] `Post` type (all columns from schema + computed fields)
- [ ] `Block` type (base + specific types: TextBlock, PhotoBlock, GalleryBlock, PullQuoteBlock, DividerBlock, HeadingBlock)
- [ ] `Subscriber` type
- [ ] `Author` type
- [ ] `Theme` types (Layout, Palette, FontPair)
- [ ] API request/response types

#### 2.3 Set Up Environment Variables

- [ ] Create `.env.local` for Next.js (with `.env.example`)
- [ ] Document all required Cloudflare secrets
- [ ] Create `lib/env.ts` for type-safe environment access

**Deliverable:** Complete type system, configuration file, environment setup documented

---

## Phase 3 — Public Blog Layout Components

**Goal:** Build reusable UI components for the public blog

**Time Estimate:** 4-5 hours

### Tasks

#### 3.1 Worker Auth Endpoints

Create `workers/auth.ts`:

- [ ] `POST /api/auth/login` — validate credentials, sign JWT, return httpOnly cookie
- [ ] `POST /api/auth/logout` — clear cookie
- [ ] `verifyToken()` helper function
- [ ] `hashPassword()` and `comparePassword()` using bcrypt

#### 3.2 Set Cloudflare Secrets

```bash
wrangler secret put BLOGGER_USERNAME
wrangler secret put BLOGGER_PASSWORD_HASH
wrangler secret put JWT_SECRET
```

- [ ] Generate secure password hash
- [ ] Generate random JWT secret (32+ characters)
- [ ] Test auth endpoint with curl/Postman

#### 3.3 Next.js Auth Middleware

- [ ] Create `middleware.ts` for route protection
- [ ] Create `/dashboard/login` page with form
- [ ] Create auth context/hook for client-side auth state
- [ ] Implement login form with error handling
- [ ] Add logout button to dashboard header

#### 3.4 Protected Routes

- [ ] Verify middleware redirects unauthenticated users from `/dashboard/*`
- [ ] Test login → dashboard navigation flow
- [ ] Test logout → login redirect

**Deliverable:** Working authentication system with login, logout, and route protection

---

## Phase 4 — Public Blog Pages (with Mock Data)

**Goal:** Build all public-facing pages using mock data

**Time Estimate:** 5-6 hours

### Tasks

#### 4.1 Posts Worker Routes

Create `workers/posts.ts`:

- [ ] `GET /api/posts` — list published posts (paginated, with tag filter)
- [ ] `GET /api/posts/:slug` — get single published post by slug
- [ ] `GET /api/posts/:id/draft` — get post with full blocks (auth required)
- [ ] `POST /api/posts` — create new post (auth required)
- [ ] `PATCH /api/posts/:id` — update post (auth required)
- [ ] `DELETE /api/posts/:id` — delete post (auth required)

#### 4.2 Utility Functions

- [ ] `generateSlug(title)` — URL-safe slug generation
- [ ] `calculateReadTime(blocks)` — word count → minutes
- [ ] `validatePostData()` — input validation
- [ ] Error handling wrapper for all endpoints

#### 4.3 Deploy & Test

```bash
wrangler deploy
```

- [ ] Test each endpoint with sample data
- [ ] Verify auth protection on protected routes
- [ ] Check error responses

**Deliverable:** Complete posts API deployed and tested

---

## Phase 5 — Editor State Management & Canvas Layout

**Goal:** Build the editor scaffolding with Zustand state management

**Time Estimate:** 4-5 hours

### Tasks

#### 5.1 Editor State Store

Create `lib/stores/editorStore.ts` with Zustand:

State:
- [ ] `postId: string | null`
- [ ] `blocks: Block[]`
- [ ] `postMeta: { title, subtitle, tags[], heroImage, layoutId, paletteId, fontPairId }`
- [ ] `isDirty: boolean` — tracks unsaved changes
- [ ] `isSaving: boolean` — save in progress
- [ ] `lastSaved: Date | null`

Actions:
- [ ] `loadPost(postId)` — load from localStorage or mock data
- [ ] `addBlock(type, position)` — add new block
- [ ] `updateBlock(blockId, updates)` — update block content or position
- [ ] `deleteBlock(blockId)` — remove block
- [ ] `moveBlock(blockId, newPosition)` — change x, y
- [ ] `resizeBlock(blockId, newSize)` — change w, h
- [ ] `updatePostMeta(updates)` — change title, theme, etc
- [ ] `saveDraft()` — save to localStorage for now
- [ ] `setIsDirty(boolean)` — track changes

#### 5.2 localStorage Persistence

- [ ] Save draft to localStorage on every change
- [ ] Auto-save every 30 seconds (use debounce)
- [ ] Load draft from localStorage on mount
- [ ] Show "Draft saved" indicator with timestamp

#### 5.3 Dashboard Layout

Create `app/dashboard/layout.tsx`:

- [ ] Simple header with logo and "Preview | Save | Publish" buttons
- [ ] Navigation: Posts | Settings | Guide
- [ ] No auth check yet (add later)
- [ ] Mobile-friendly header

#### 5.4 Post List Page

Create `app/dashboard/posts/page.tsx`:

- [ ] Display list of postswith react-grid-layout

**Goal:** Build the drag-and-drop canvas with all block typesblished), last edited
- [ ] "New Post" button → creates empty draft → redirects to editor
- [ ] Click post → opens editor
- [ ] Delete button (with confirmation)

#### 5.5 Editor Route Setup

Create `app/dashboard/posts/[id]/page.tsx`:

- [ ] Empty canvas container (will add react-grid-layout in next phase)
- [ ] Top toolbar placeholder
- [ ] Load post into editor store on mount
- [ ] Display post title (editable)

**Deliverable:** Dashboard scaffolding with working state management and localStorage persistence

---

## Phase 6 — Canvas Editor Frontend

**Goal:** Build the visual block editor for the dashboard

**Time Estimate:** 10-12 hours

### Tasks

#### 6.1 Editor State Management (Zustand)

Create `lib/stores/editorStore.ts`:

- [ ] State: `blocks`, `postMeta`, `isDirty`, `isSaving`
- [ ] Actions: `addBlock`, `updateBlock`, `deleteBlock`, `moveBlock`, `resizeBlock`, `setPostMeta`, `saveDraft`, `publish`
- [ ] Auto-save logic (30-second interval with debounce)
- [ ] localStorage persistence for draft recovery

#### 6.2 Canvas Layout (`app/dashboard/posts/[id]/page.tsx`)

- [ ] Install and configure `react-grid-layout`
- [ ] Create desktop canvas (12-column grid)
- [ ] Create mobile canvas (vertical stack with drag handles)
- [ ] Responsive breakpoint switching
- [ ] Add toolbar (layout, theme, save, preview, publish buttons)

#### 6.3 Block Components

Create editable block components in `components/editor/blocks/`:

- [ ] `TextBlock` — contentEditable with formatting toolbar (bold, italic, font picker, color picker, size slider, alignment)
- [ ] `HeadingBlock` — same as TextBlock but larger default size
- [ ] `PhotoBlock` — file upload, resize handles, caption input, loading state
- [ ] `GalleryBlock` — 2-4 photo slots, per-photo captions, grid layout
- [ ] `PullQuoteBlock` — large centered quote with accent color
- [ ] `DividerBlock` — visual separator line

#### 6.4 Block Toolbar

- [ ] Floating toolbar on text selection (bold, italic, font, size, color)
- [ ] Block-level settings menu (alignment, width, background)
- [ ] Delete block button
- [ ] Duplicate block button

#### 6.5 Add Block Menu

- [ ] Floating `+` button on hover/tap
- [ ] Block type picker modal
- [ ] Insert block at position

#### 6.6 Top Toolbar

- [ ] Layout picker (5 templates with preview thumbnails)
- [ ] Theme picker (palette + font pair pickers)
- [ ] Post info tab (title, subtitle, tags, hero image)
- [ ] Preview button (opens modal)
- [ ] Save Draft button
- [ ] Publish button

#### 6.7 Preview Modal

- [ ] Render post exactly as it will appear on public site
- [ ] Desktop/mobile toggle
- [ ] Close button

**Deliverable:** Fully functional canvas editor with all block types, drag/drop, and theme controls

---

## Phase 7 — Polish & Mobile Optimization

**Goal:** Refine UI, add animations, perfect mobile experience

**Time Estimate:** 4-5 hours

### Tasks

#### 7.1 UI Polish

- [ ] Add loading states (skeleton loaders for post lists)
- [ ] Add transitions (smooth theme changes, modal animations)
- [ ] Polish typography (line heights, letter spacing)
- [ ] Add hover states to all interactive elements
- [ ] Improve color contrast for accessibility
- [ ] Add focus states for keyboard navigation

#### 7.2 Mobile Optimization

- [ ] Test all public pages on mobile
- [ ] Test editor on mobile (touch interactions)
- [ ] Optimize canvas for phone screens
- [ ] Test all modals on mobile
- [ ] Fix any overflow issues
- [ ] Optimize image sizes for mobile

#### 7.3 Empty States

- [ ] Empty post list (no drafts yet)
- [ ] Empty canvas (no blocks yet)
- [ ] Empty archive (no posts with selected tag)
- [ ] Each should have helpful message and action

#### 7.4 Error Handling UI

- [ ] Create error boundary component
- [ ] Add error messages for failed operations
- [ ] Add retry buttons where appropriate
- [ ] Toast notifications for success/error (use a library like react-hot-toast)

#### 7.5 Performance

- [ ] Use `next/image` for all images
- [ ] Lazy load components where appropriate
- [ ] Code split large dependencies
- [🎉 Frontend Complete — Demo Ready!

At this point, you have a fully functional design prototype with:
- Beautiful public blog with multiple layouts and themes
- Working canvas editor with drag-and-drop
- All block types functional
- Mobile responsive
- Local persistence with localStorage

**This is perfect for:**
- User testing and feedback
- Design iteration
- Demonstrating to stakeholders
- Portfolio piece

---

## Part 2: Backend Integration

*The following phases add Cloudflare Workers, database, authentication, email, and production deployment.*

---

## Phase 8 — Account Setup & Infrastructure

**Goal:** Create all third-party accounts and cloud resources

**Time Estimate:** 2-3
- [ ] Add ARIA labels to buttons and inputs
- [ ] Test keyboard navigation
- [ ] Ensure proper heading hierarchy
- [ ] Add alt text to all images
- [ ] Check color contrast ratios

**Deliverable:** Polished, accessible, mobile-optimized application

---

## Phase 8 — Dashboard Post Management

**Goal:** Build post list and management UI

**Time Estimate:** 3-4 hours

### Tasks

#### 8.1 Post List Page (`app/dashboard/posts/page.tsx`)

- [ ] Fetch all posts (drafts + published) from API
- [ ] Display as list/grid with thumbnails
- [ ] Show status badge (draft/published)
- [ ] Add "New Post" button
- [ ] Quick actions: Edit, Delete, Duplicate

#### 8.2 New Post Flow

- [ ] "New Post" button creates empty post via API
- [ ] Redirect to editor with new post ID
- [ ] Initialize with default theme from config

#### 8.3 Delete Post Confirmation
Authentica
- [ ] Modal confirmation dialog
- [ ] Delete API call
- [ ] Remove from list on success
- [ ] Delete associated R2 media (call media delete endpoint for each image)

#### 8.4 Duplicate Post

- [ ] Copy all post data except slug and dates
- [ ] Create new post via API
- [ ] Add " (Copy)" to title
- [ ] Redirect to editor

#### 8.5 Settings Page (`app/dashboard/settings/page.tsx`)

- [ ] Change password form
- [ ] View/edit author bio (updates config — requires rebuild for now, Phase 2 can make it dynamic)
- [ ] Profile photo upload

**Deliverable:** Complete dashboard post management interface

---

## Phase 9 — Email Subscription System

**Goal:** Implement subscriber signup, confirmation, and management

**Time Estimate:** 5-6 hours

### Tasks

#### 9.1 Subscriber Worker Endpoints

Create `workers/subscribers.ts`:

- [ ] `POST /api/subscribe` — add subscriber, send confirmation email
  - Validate email
  - Generate confirmation and unsubscribe tokens
  - Store with `confirmed = 0`
  - Send confirmation email via Resend
- [ ] `GET /api/subscribe/confirm?token=xxx` — confirm subscription
  - Verify token
  - Update `confirmed = 1`, set `subscribed_at`
  - Return success page
- [ ] `GET /api/unsubscribe?token=xxx` — unsubscribe
  - Verify token
  - Delete subscriber or set `confirmed = 0`
  - Return confirmation page

#### 9.2 Set Resend Secrets

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put FROM_EMAIL
```

#### 9.3 Email Templates

Create email HTML templates:

- [ ] Confirmation email — welcome message, confirm button with token link
- [ ] Post notification email — hero image, title, excerpt, "Read More" link, unsubscribe link
- [ ] Unsubscribe confirmation — simple message

#### 9.4 Resend Integration

Create `workers/lib/sendEmail.ts`:

- [ ] `sendConfirmationEmail(subscriber)` — call Resend API
- [ ] `sendPostNotification(post, subscribers)` — bulk send
- [ ] Error handling and retry logic

#### 9.5 Homepage Subscribe Widget

- [ ] Form with name and email inputs
- [ ] Submit to `/api/subscribe`
- [ ] Show success message ("Check your email to confirm")
- [ ] Handle errors (duplicate email, invalid format)

#### 9.6 Confirmation & Unsubscribe Pages

- [ ] Create `app/(public)/subscribe/confirm/page.tsx` — "You're subscribed!"
- [ ] Create `app/(public)/unsubscribe/page.tsx` — "You've been unsubscribed"

**Deliverable:** Complete subscription flow from signup through confirmation to unsubscribe

---

**Goal:** Replace localStorage with D1 database for post storage

**Time Estimate:** 5-6 hours

### Tasks

#### 10.1 Posts Worker Endpoints

Create `workers/posts.ts`:

- [ ] `GET /api/posts` — list published posts (with pagination, tag filter)
- [ ] `GET /api/posts/:slug` — get single published post by slug
- [ ] `GET /api/posts/:id/draft` — get post with full blocks (auth required)
- [ ] `POST /api/posts` — create new post (auth required)
- [ ] `PATCH /api/posts/:id` — update post (auth required)
- [ ] `DELETE /api/posts/:id` — delete post (auth required)

#### 10.2 Utility Functions

Create `workers/lib/utils.ts`:

- [ ] `generateSlug(title)` — URL-safe slug from title
- [ ] `calculateReadTime(blocks)` — word count → minutes
- [ ] `generateId()` — UUID generation
- [ ] `serializeBlocks(blocks)` — JSON stringify with validation

#### 10.3 Update Frontend to Use API

Update editor store (`lib/stores/editorStore.ts`):

- [ ] Replace localStorage calls with API calls
- [ ] `loadPost(id)` → fetch from `/api/posts/:id/draft`
- [ ] `saveDraft()` → POST/PATCH to API
- [ ] Keep local state for optimistic updates

Update post list (`app/dashboard/posts/page.tsx`):

- [ ] Fetch posts from API instead of localStorage
- [ ] Handle loading states

Update public pages:

- [ ] Homepage → fetch from `/api/posts`
- [ ] Post page → fetch from `/api/posts/:slug`
- [ ] Archive → fetch from `/api/posts` with filters

#### 10.4 Environment Variables

- [ ] Add `NEXT_PUBLIC_API_URL` to `.env.local`
- [ ] Point to Workers dev URL for now: `http://localhost:8787`
- [ ] Create API client helper: `lib/api.ts`

#### 10.5 Test API Integration

```bash
# Terminal 1
npm run dev

# Terminal 2
wrangler dev
```

- [ ] Test creating a post
- [ ] Test saving draft
- [ ] Test loading draft
- [ ] Test deleting post
- [ ] Test public pages with API data

**Deliverable:** Full CRUD operations working with D1 database, localStorage removed

---

## Phase 11 — Media Upload to R2

**Goal:** Make the blog installable and offline-capable

**Time Estimate:** 2-3 hours

### Tasks

#### 11.1 Install next-pwa

```bash
npm install next-pwa
npm install -D webpack
```

#### 11.2 Configure PWA

- [ ] Update `next.config.js` with next-pwa plugin
- [ ] Create `public/manifest.json` with app metadata
- [ ] Generate PWA icons (192×192, 512×512) and add to public/icons/
- [ ] Add manifest link to root layout

#### 11.3 Service Worker Strategy

- [ ] Cache posts for offline reading
- [ ] Cache static assets (CSS, JS, fonts)
- [ ] Network-first for API calls
- [ ] Cache-first for images

#### 11.4 Testing

- [ ] Test installation on mobile (Chrome, Safari)
- [ ] Verify offline reading works
- [ ] Test "Add to Home Screen" prompt

**Deliverable:** Installable PWA with offline reading capability

---

**Goal:** Add email subscriptions and post notifications via Resend

**Time Estimate:** 5-6 hours

### Tasks

#### 12.1 Tags in Editor

- [ ] Add tags input to post info panel (comma-separated or tag chips)
- [ ] Store tags as JSON array in database
- [ ] Validate and sanitize tag input

#### 12.2 Archive Filtering

Update `app/(public)/archive/page.tsx`:

- [ ] Get all unique tags from published posts
- [ ] Add tag filter dropdown/buttons
- [ ] Filter posts by selected tag
- [ ] Update URL query param for shareable filtered links

#### 12.3 Tag Display

- [ ] Show tags on post pages
- [ ] Make tags clickable → link to filtered archive
- [ ] Style tag chips/badges

**Deliverable:** Working tag system with archive filtering

---

## Phase 13 — PWA Configuration

**Goal:** Auto-calculate and display reading time

**Time Estimate:** 1-2 hours

### Tasks

#### 13.1 Calculation Function

Create `lib/calculateReadTime.ts`:

- [ ] Extract text from all text and heading blocks
- [ ] Count words
- [ ] Divide by 200 (average reading speed)
- [ ] Round to nearest minute

#### 13.2 Auto-Update on Save

- [ ] Call `calculateReadTime(blocks)` before saving post
- [ ] Store result in `read_time` column
- [ ] Update on every draft save and publish

#### 13.3 Display

- [ ] Add to post metadata on public post pages
- [ ] Add to post cards on homepage and archive
- [ ] Format: "5 min read"

**Deliverable:** Automatic reading time calculation and display

---

**Goal:** Add final polish and small features

**Time Estimate:** 3-4 hours

### Tasks

#### 14.1 Blogger Guide (`app/dashboard/guide/page.tsx`)

- [ ] Copy content from `docs/blogger-guide.md`
- [ ] Render as styled page (use Markdown parser or convert to JSX)
- [ ] Add to dashboard navigation
- [ ] Make mobile-friendly

#### 14.2 Admin Reference (`app/wanderlog-admin/page.tsx`)

- [ ] Combine `docs/developer-setup.md` + `docs/admin-reference.md`
- [ ] Add separate password protection (different from blogger auth)
- [ ] Create admin login page
- [ ] Render documentation with syntax highlighting for code blocks

#### 14.3 Styling

- [ ] Consistent typography for docs
- [ ] Code block styling with copy button
- [ ] Table styling
- [ ] Internal navigation links

**Deliverable:** In-app documentation accessible from dashboard and admin URL

---

## Phase 15 — Production Deployment

**Goal:** Comprehensive testing and production deployment

**Time Estimate:** 4-5 hours

### Tasks

#### 16.1 Manual Testing Checklist

Run through complete user flows:

- [ ] **Public blog**
  - Homepage loads, posts display correctly
  - Post pages render with all block types
  - All 5 layouts render correctly
  - All 8 palettes apply correctly
  - All 5 font pairs display correctly
  - Tags filter archive correctly
  - Email signup form works
  
- [ ] **Authentication**
  - Login with correct credentials
  - Login fails with wrong credentials
  - Logout works
  - Protected routes redirect to login
  - Session persists across page reloads
  
- [ ] **Editor**
  - Create new post
  - Add all block types
  - Drag and drop blocks
  - Resize photo blocks
  - Text formatting toolbar works
  - Layout switching preserves content
  - Theme switching applies immediately
  - Auto-save works
  - Manual save draft works
  - Preview shows correct layout
  
- [ ] **Media uploads**
  - Upload photos to single photo block
  - Upload photos to gallery block
  - Upload hero image
  - Progress indicator shows
  - Large files upload successfully
  
- [ ] **Publishing**
  - Publish button shows subscriber count
  - Publish completes successfully
  - Post appears on public blog immediately
  - Subscribers receive email notification
  - Email contains correct content and links
  
- [ ] **Subscription flow**
  - Subscribe from homepage
  - Receive confirmation email
  - Click confirm link, see success message
  - Receive post notification email
  - Unsubscribe link works
  
- [ ] **Mobile**
  - Editor works on phone (touch interactions)
  - Canvas collapses to vertical layout
  - All forms work on mobile
  - Public blog is responsive
  - Install as PWA works
  - Offline reading works

#### 16.2 Edge Cases & Error Scenarios

- [ ] Test with no internet connection
- [ ] Test with slow 3G connection
- [ ] Test with very large images (10MB+)
- [ ] Test with very long post (100+ blocks)
- [ ] Test empty states (no posts, no subscribers)
- [ ] Test duplicate email subscription
- [ ] Test invalid email formats
- [ ] Test expired tokens (confirmation, unsubscribe)

#### 16.3 Browser Testing

- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

#### 16.4 Production Deployment

##### Deploy Workers

```bash
# Set all production secrets if not already done
wrangler secret put BLOGGER_USERNAME
wrangler secret put BLOGGER_PASSWORD_HASH
wrangler secret put JWT_SECRET
wrangler secret put RESEND_API_KEY
wrangler secret put FROM_EMAIL

# Deploy to production
wrangler deploy
```

- [ ] Note Workers URL for Vercel env vars

##### Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Production-ready WanderLog"
git push origin main
```

- [ ] Import repository in Vercel dashboard
- [ ] Set environment variables:
  - `NEXT_PUBLIC_API_URL` → Workers URL
  - `NEXT_PUBLIC_BLOG_NAME` → from config
- [ ] Deploy
- [ ] Test live site
- [ ] Add custom domain (if applicable)
- [ ] Update `BLOG_BASE_URL` secret in Cloudflare

##### Update Configuration

- [ ] Update `config.ts` with production URLs
- [ ] Update email templates with production URLs
- [ ] Commit and redeploy

#### 16.5 Post-Deployment Verification

- [ ] All public pages load correctly
- [ ] Dashboard login works
- [ ] Create and publish a real test post
- [ ] Verify email delivery
- [ ] Check PWA installation
- [ ] Monitor Cloudflare Workers dashboard for errors
- [ ] Check Resend dashboard for email analytics

#### 16.2 Create Sample Content

- [ ] Create 2-3 polished sample posts
- [ ] Use all different layouts and themes
- [ ] Demonstrate best practices
- [ ] Or keep clean for blogger to start

#### 16.3 Handoff Documentation

Prepare for handoff:

- [ ] Blogger credentials (username + password)
- [ ] Dashboard URL
- [ ] Point to `/dashboard/guide`
- [ ] Password reset instructions

#### 16.4 Backup & Monitoring

- [ ] Export subscriber list
- [ ] Document all secrets
- [ ] Set up error monitoring (optional)
- [ ] Set up analytics (optional)

**Deliverable:** Production-ready platform ready for handoff

---

## Summary Checklist

### Part 1: Frontend (Phases 1-7)
- [ ] Design system with all themes
- [ ] Public blog with mock data
- [ ] Canvas editor with localStorage
- [ ] All block types working
- [ ] Drag and drop functional
- [ ] Theme switching live
- [ ] Mobile responsive
- [ ] Polished and tested

### Part 2: Backend (Phases 8-16)
- [ ] Cloudflare accounts created
- [ ] Workers deployed
- [ ] D1 database migrated
- [ ] R2 bucket created
- [ ] Authentication working
- [ ] Posts API complete
- [ ] Media uploads to R2
- [ ] Email subscriptions
- [ ] Publish notifications
- [ ] PWA configured
- [ ] Production deployed

---

## Recommended Build Schedule

### Fast Track (Most Common)

**Week 1: Frontend Only**
- Days 1-2: Phases 1-3 (Setup, design system, components)
- Days 3-4: Phase 4-5 (Public blog, editor state)
- Days 5-7: Phase 6-7 (Canvas editor, polish)

**→ Demo-ready prototype, perfect for feedback**

**Week 2: Backend Integration**  
- Days 1-2: Phases 8-10 (Infrastructure, auth, API)
- Days 3-4: Phases 11-12 (Media, email)
- Days 5-7: Phases 13-16 (PWA, polish, deploy)

**→ Production-ready platform**

### Relaxed Pace

**Phase 1-7:** Frontend — 20-25 hours over 2-3 weeks
**Phase 8-16:** Backend — 20-25 hours over 2-3 weeks

### Sprint Mode

**Phases 1-7:** 3-4 full days → working prototype
**Phases 8-16:** 3-4 full days → production deploy

### Common Pitfalls to Avoid

1. **Don't skip the types phase** — proper TypeScript types will save hours of debugging
2. **Test auth early** — don't build the whole dashboard before testing login
3. **Start with one block type** — get the canvas working with text blocks before adding photos
4. **Use real content while building** — Lorem ipsum won't show layout issues
5. **Test mobile continuously** — don't wait until the end to check responsive design
6. **Deploy Workers frequently** — test in production environment to catch issues early
7. **Keep secrets organized** — document every secret you create immediately
8. **Backup frequently** — commit to Git after every completed phase

### Development Environment Tips

```bash
# Run Next.js dev server
npm run dev

# Run Workers locally (separate terminal)
wrangler dev

# Watch Workers logs in production
wrangler tail

# Quick test API endpoints
curl http://localhost:8787/api/posts

# Quick check D1 database
wrangler d1 execute wanderlog-db --command "SELECT * FROM posts" --remote
```

---

## Support & Resources

---

## Development Tips

### Key Success Factors

1. **Build visuals first** — You can iterate on UI/UX quickly with mock data
2. **Test mobile early** — Don't wait; check responsive behavior as you build
3. **One block type at a time** — Get TextBlock perfect before adding photos
4. **Use realistic content** — Mock posts should have real travel stories, not Lorem ipsum
5. **Commit frequently** — Git commit after each completed phase
6. **Demo early** — Show Phase 7 prototype to get feedback before backend work

### Why This Order Works

**Frontend-First Approach:**
- Fast iteration on design
- Get feedback early
- No waiting on API responses
- See the full vision quickly
- Can pivot before infrastructure commitment

**Backend-Later Approach:**
- Infrastructure is straightforward once UI is solid
- API shapes are obvious from frontend needs
- No rework of UI to fit backend constraints

**Ready to build? Start with Phase 0 and work through sequentially. Good luck!** 🚀
