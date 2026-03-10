# Product Overview

## The Concept

WanderLog is a travel blog platform built for two people: the **developer** (who builds and maintains it) and the **blogger** (who writes and publishes from anywhere in the world).

The blogger's experience is a single URL, a password, and a Canva-style visual editor. She never touches code, never logs into Cloudflare or Vercel, never installs anything. She opens a browser and she's in her studio.

The developer builds it once and hands it off. After that, the only reasons she needs to contact you are a forgotten password, a billing question, or a bug — everything else she handles herself.

## The Three Parts

### Public Blog — `yourblog.com`

What readers see. Fast, installable as a PWA, offline-readable. Every post renders with its own visual theme chosen by the blogger. Email signup widget on the homepage.

### Blogger Dashboard — `yourblog.com/dashboard`

Password-protected. A visual, canvas-based editor that works like Canva or Adobe Express. The blogger writes, places blocks, picks colors and fonts, previews, and publishes. Fully standalone — no developer involvement after setup.

### Backend — Cloudflare Workers + D1 + R2

Invisible to the blogger. Stores all posts, subscribers, and media. Triggers subscriber email notifications on every publish. Managed entirely by the developer through Cloudflare and Vercel dashboards.

## Template Philosophy

WanderLog is built as a reusable template. A developer with the same stack can deploy a fresh instance for a new blogger in under two hours. The only file that needs editing for a new deployment is `config.ts` — blog name, author profiles, default theme, social links.

Everything else — the editor, the email system, the public blog, the theme engine — is ready out of the box.

## Core Design Principles

### For the blogger:

- Zero technical knowledge required
- Works on phone or laptop — same experience
- Every post can look completely different (different layout, palette, fonts)
- Auto-saves constantly — nothing is ever lost

### For the developer:

- Build once, maintain rarely
- One config file for all customization
- Self-sustaining backend — no intervention needed for routine use
- Clean upgrade path for new features in later phases
