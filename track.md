# Axis Blog - Development Track

## Current Status: ✅ Full CRUD Complete

### Completed This Sprint

- [x] **Post CRUD**
  - [x] Create post
  - [x] Read posts (feed, detail)
  - [x] Update own posts (server action)
  - [x] Delete own posts (server action)
- [x] **Profile CRUD**
  - [x] Read profile with avatar display
  - [x] Update display name and bio
  - [x] Profile picture upload/view/delete
  - [x] Fullscreen avatar preview

### Up Next

- [ ] Post edit UI page (`/blog/[slug]/edit`)
- [ ] Delete post confirmation dialog
- [ ] Copy link button on post detail
- [ ] Draft auto-save to localStorage

---

## Completed Features

### Core Infrastructure ✅

- TypeScript types (User, Post, Topic, Auth)
- In-memory data store with full CRUD operations
- Cookie-based session management
- Server actions for auth, posts, and profile
- Both public and authenticated-only seed posts
- Demo avatar images for seed users

### Components ✅

- **UI**: Button, Input, TextArea, Card, Toast, Avatar, ProfileEditor
- **Layout**: Header, Footer, MainLayout
- **Blog**: PostCard, PostList, PostEditor, PostContent
- **Auth**: AuthForm with password strength
- **Profile**: ProfileCard with avatar and edit modal

### Pages ✅

- `/` — Landing with hero + featured posts
- `/auth` — Progressive email-first auth
- `/blog` — Feed with topic filtering
- `/blog/[slug]` — Post detail with reading time
- `/blog/create` — Editor with visibility toggle
- `/profile` — Avatar, bio, edit modal, posts list

### UX Polish ✅

- Email, password, name validation
- Password strength indicator
- Character counts with limits
- Reading time estimates
- Toast notifications
- Post visibility (Public / Members Only)
- Reduced motion support

---

## Backlog

### High Priority

- [ ] Post edit UI page
- [ ] Delete confirmation dialog
- [ ] Copy link button on post detail

### Medium Priority

- [ ] Draft auto-save to localStorage
- [ ] Preview mode before publish
- [ ] Search posts by title/author
- [ ] Dark mode toggle

### Low Priority

- [ ] Comments system
- [ ] Rich text editor
- [ ] Social meta tags

---

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- TypeScript
- Server Actions + Cookies
- In-memory data store
