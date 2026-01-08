# Axis Social - Development Track

## Status: Competition Ready ✅

All core features implemented and tested.

---

## Completed Features

### Blog Platform

- [x] Post CRUD (create, read, update, delete)
- [x] Topic filtering (6 categories)
- [x] Reading time estimates
- [x] Members-only visibility
- [x] Character counts and validation

### Social Features

- [x] Public profiles (`/u/[username]`)
- [x] Explore writers page (`/explore`)
- [x] Following system with optimistic updates
- [x] Follower/following counts
- [x] Author name links to profiles

### Messaging

- [x] Conversations list (`/messages`)
- [x] Chat view (`/messages/[id]`)
- [x] New message picker (`/messages/new`)
- [x] Demo conversations (3 seeded)
- [x] Messages icon in header

### Auth & Profile

- [x] Email-first progressive flow
- [x] Password strength indicator
- [x] Profile editing with avatar
- [x] Avatar fullscreen viewer (1:1 ratio)

### UX Polish

- [x] Toast notifications
- [x] Custom 404 page
- [x] All footer links work
- [x] Responsive design
- [x] Header shows real avatar

---

## Pages (14 total)

| Page           | Route               |
| -------------- | ------------------- |
| Landing        | `/`                 |
| Auth           | `/auth`             |
| Blog Feed      | `/blog`             |
| Create Post    | `/blog/create`      |
| Post Detail    | `/blog/[slug]`      |
| Edit Post      | `/blog/[slug]/edit` |
| Explore        | `/explore`          |
| Messages       | `/messages`         |
| New Message    | `/messages/new`     |
| Chat           | `/messages/[id]`    |
| Profile        | `/profile`          |
| Public Profile | `/u/[username]`     |
| About          | `/about`            |
| Privacy        | `/privacy`          |
| Terms          | `/terms`            |

---

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- TypeScript
- Server Actions
- In-memory store
