# Axis - Social Blog Platform

A modern social blogging platform built with Next.js 15, featuring 1:1 messaging, user profiles, and a clean minimal design.

## ✨ Features

### Core Blog

- **Posts** - Create, edit, delete with visibility controls (public/members-only)
- **Topics** - Filter by Technology, Design, Lifestyle, Productivity, Career, Thoughts
- **Rich Profiles** - Avatar, bio, member since date
- **Feed** - Browse latest posts with topic filtering

### Social Features

- **1:1 Messaging** - Direct chat between users with real-time updates
- **Public Profiles** - View any user's posts and info at `/u/[username]`
- **Following** - Follow users to prioritize their content (coming soon)

### User Experience

- **Progressive Auth** - Email-first flow with password strength indicator
- **Validation** - Real-time feedback with character counts
- **Toast Notifications** - Success/error feedback
- **Reading Time** - Estimated time for each post
- **Dark Mode Ready** - CSS variables configured

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## � Demo Accounts

| Name         | Email             | Password    |
| ------------ | ----------------- | ----------- |
| Alex Chen    | alex@example.com  | password123 |
| Jamie Wilson | jamie@example.com | password123 |
| Sam Rivera   | sam@example.com   | password123 |

Demo conversations are pre-loaded between users.

## 📁 Project Structure

```
app/
├── auth/          # Authentication flow
├── blog/          # Feed, post detail, create, edit
├── messages/      # Conversations list, chat view
├── profile/       # User profile page
└── u/[username]/  # Public profiles (coming soon)

components/
├── auth/          # AuthForm
├── blog/          # PostCard, PostEditor, PostContent
├── layout/        # Header, Footer, MainLayout
├── messages/      # MessageThread
├── profile/       # ProfileCard
└── ui/            # Button, Input, Card, Toast, Avatar

lib/
├── actions/       # Server actions (auth, posts, messages, profile)
├── data/          # In-memory store, seed data, session
└── types.ts       # TypeScript interfaces
```

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **State**: Server Actions + Cookies
- **Storage**: In-memory (demo purposes)

## 📋 Roadmap

### In Progress

- [ ] Public profile pages (`/u/[username]`)
- [ ] Follow/unfollow system

### Planned

- [ ] Likes on posts
- [ ] Comments
- [ ] Bookmarks
- [ ] Search
- [ ] Dark mode toggle
- [ ] Notifications

## License

MIT
