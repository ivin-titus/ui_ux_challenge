# Axis Social - Development Track

## Current Status: Phase 2 Complete ✅

### Phase 1: Data Models ✅

- Added username to User, authorUsername to Post
- Created Follow, Message, Conversation types
- Implemented all social store methods

### Phase 2: 1:1 Messaging ✅

- `/messages` - Conversations list
- `/messages/[id]` - Chat with optimistic sending
- Messages icon in header nav

### Phase 3: Following System (Next)

- [ ] Follow/unfollow server actions
- [ ] Get followers/following lists
- [ ] Feed prioritizes followed users

### Phase 4: Public Profiles

- [ ] `/u/[username]` route
- [ ] Follow + Message buttons
- [ ] Link author names to profiles

---

## Feature Backlog

### High Priority

- [ ] Likes on posts
- [ ] Comments
- [ ] Bookmarks
- [ ] Search
- [ ] Dark mode toggle
- [ ] Notifications

### Medium Priority

- [ ] Trending posts
- [ ] Suggested users
- [ ] Topic subscriptions

### Low Priority

- [ ] Cover images
- [ ] Block/mute
- [ ] Rich text editor

---

## Completed ✅

- Auth: email-first flow
- Posts: CRUD, visibility toggle
- Profile: avatar, bio, edit
- Feed: topic filtering
- UX: validation, toasts
- 1:1 Messaging

---

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- TypeScript
- Server Actions + Cookies
- In-memory data store
