# Axis Blog - Development Track

## Current Status: ✅ Core Implementation Complete

## Completed Features

### Phase 1: Planning ✅

- Information architecture with 7 routes
- Component breakdown (UI, Layout, Feature)
- Mock data strategy with in-memory store

### Phase 2: Core Infrastructure ✅

- TypeScript types for User, Post, Topic, Auth states
- In-memory data store with CRUD operations
- Cookie-based session management
- Server actions for auth and posts

### Phase 3: Shared Components ✅

- **UI Primitives:** Button, Input, TextArea, Card
- **Layout:** Header, Footer, MainLayout
- **Feedback:** Toast notifications, PasswordStrengthIndicator

### Phase 4: Pages ✅

- `/` — Landing page with hero and featured posts
- `/auth` — Progressive email-first auth flow
- `/blog` — Feed with topic filtering
- `/blog/[slug]` — Post detail with reading time
- `/blog/create` — Editor with visibility toggle
- `/profile` — User info, posts, and logout

### Phase 5: UX Polish ✅

- Email, password, name validation
- Character counts with color indicators
- Reading time estimates
- Toast notifications
- Reduced motion support
- Post visibility (Public / Members Only)

---

## Backlog / Ideas

### High Priority

- [ ] Copy link button on post detail
- [ ] Edit/delete own posts
- [ ] Draft auto-save to localStorage

### Medium Priority

- [ ] Preview mode before publish
- [ ] Search posts by title/author
- [ ] Dark mode toggle (currently system)
- [ ] Bookmark/save posts

### Low Priority

- [ ] Comments system
- [ ] User avatars/profile pictures
- [ ] Rich text editor
- [ ] Social sharing meta tags

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **State:** Server Actions + Cookies
- **Data:** In-memory (persists during runtime)
