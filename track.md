# Axis Blog - Development Track

## Current Status: ✅ High Priority Complete

### Just Completed ✅

- [x] Post edit UI page (`/blog/[slug]/edit`)
- [x] Delete confirmation dialog
- [x] Copy link button on post detail
- [x] Edit button for post authors

---

## Completed Features

### Core Infrastructure ✅

- TypeScript types (User, Post, Topic, Auth)
- In-memory data store with full CRUD operations
- Cookie-based session management
- Server actions for auth, posts, and profile
- Both public and authenticated-only seed posts
- Demo avatar images for seed users

### CRUD ✅

- Post: Create, Read, Update, Delete (full UI)
- Profile: Read, Update name/bio, Avatar upload/delete/fullscreen

### Components ✅

- **UI**: Button, Input, TextArea, Card, Toast, Avatar, ProfileEditor
- **Layout**: Header, Footer, MainLayout
- **Blog**: PostCard, PostList, PostEditor, PostContent, PostEditForm, PostActions
- **Auth**: AuthForm with password strength
- **Profile**: ProfileCard with avatar and edit modal

### Pages ✅

- `/` — Landing with hero + featured posts
- `/auth` — Progressive email-first auth
- `/blog` — Feed with topic filtering
- `/blog/[slug]` — Post detail with copy link, edit button
- `/blog/[slug]/edit` — Edit post with delete option
- `/blog/create` — Editor with visibility toggle
- `/profile` — Avatar, bio, edit modal, posts list

### UX Polish ✅

- Validation with user feedback
- Password strength indicator
- Character counts, reading time
- Toast notifications
- Post visibility badges
- Reduced motion support

---

## Backlog

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
