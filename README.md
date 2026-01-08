# Axis - Social Blog Platform

A modern social blogging platform built with Next.js 15, featuring 1:1 messaging, public profiles, following system, and a clean minimal design.

## ✨ Features

### Blog

- **Create Posts** - Rich editor with topic selection and visibility controls
- **Edit/Delete Posts** - Full CRUD with confirmation dialogs
- **Topic Filtering** - Technology, Design, Lifestyle, Productivity, Career, Thoughts
- **Reading Time** - Automatic estimates on all posts
- **Members-Only Posts** - Visibility controls for authenticated content

### Social

- **Public Profiles** - `/u/[username]` with avatar, bio, and posts
- **Explore Writers** - `/explore` to discover and follow all users
- **Following System** - Follow/unfollow with optimistic updates
- **1:1 Messaging** - Direct chat with real-time conversation
- **Author Links** - Click any author name to visit their profile

### User Experience

- **Progressive Auth** - Email-first flow with password strength
- **Toast Notifications** - Success/error feedback throughout
- **Character Counts** - Real-time validation on all forms
- **Custom 404** - Friendly error page with navigation
- **Responsive Design** - Mobile-first, works on all devices

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 👤 Demo Accounts

| Name         | Email             | Password    |
| ------------ | ----------------- | ----------- |
| Alex Chen    | alex@example.com  | password123 |
| Jamie Wilson | jamie@example.com | password123 |
| Sam Rivera   | sam@example.com   | password123 |

Demo conversations and posts are pre-loaded.

## 📁 Pages

| Route               | Description                               |
| ------------------- | ----------------------------------------- |
| `/`                 | Landing page with hero and featured posts |
| `/auth`             | Login/register flow                       |
| `/blog`             | Post feed with topic filters              |
| `/blog/create`      | Create new post                           |
| `/blog/[slug]`      | Post detail with author link              |
| `/blog/[slug]/edit` | Edit post (owner only)                    |
| `/explore`          | Discover and follow writers               |
| `/messages`         | Conversations list                        |
| `/messages/new`     | Start new conversation                    |
| `/messages/[id]`    | Chat view                                 |
| `/profile`          | Your profile with edit                    |
| `/u/[username]`     | Public profile                            |
| `/about`            | About Axis                                |
| `/privacy`          | Privacy policy                            |
| `/terms`            | Terms of service                          |

## 🛠 Tech Stack

- **Next.js 15** - App Router, Server Components
- **Tailwind CSS 4** - Utility-first styling
- **TypeScript** - Full type safety
- **Server Actions** - Form handling, mutations
- **In-memory Store** - Demo data persistence

## 📋 Competition Info

Built for PIXELCRAFT UI/UX Challenge:

- 3+ designed screens ✅
- Live landing page ✅
- GitHub repo ✅

## License

MIT
