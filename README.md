# Axis Blog

A modern, minimal blog platform built with Next.js 15 — focusing on **UX clarity**, **accessibility**, and **clean design**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

## ✨ Features

### Core

- **Progressive Auth Flow** — Email-first, no tabs/toggles
- **Topic Filtering** — Browse by Technology, Design, Lifestyle, etc.
- **Post Visibility** — Public or Members-Only posts
- **Reading Time** — Estimated read duration on all posts

### UX Polish

- **Password Strength Indicator** — Real-time feedback during signup
- **Character Counts** — Live limits with color warnings
- **Toast Notifications** — Feedback on actions
- **Reduced Motion** — Respects `prefers-reduced-motion`
- **Skip to Content** — Keyboard accessibility

### Design Philosophy

> Calm, minimal, clarity-first. No animations, glassmorphism, or visual noise.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication flow
│   ├── blog/              # Blog feed, detail, create
│   ├── profile/           # User profile
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable primitives
│   ├── layout/            # Header, Footer, MainLayout
│   ├── auth/              # AuthForm
│   ├── blog/              # PostCard, PostEditor, etc.
│   └── profile/           # ProfileCard
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── actions/           # Server actions
│   ├── data/              # Store, session, seed data
│   └── utils/             # Validation helpers
└── track.md               # Development progress
```

## 🔐 Demo Accounts

| Email               | Password      | Notes              |
| ------------------- | ------------- | ------------------ |
| `sarah@example.com` | `password123` | Has existing posts |
| `alex@example.com`  | `password123` | Has existing posts |

Or create a new account with any email.

## 🛠 Tech Stack

- **Next.js 15** — App Router, Server Actions
- **TypeScript** — Full type safety
- **Tailwind CSS 4** — Utility-first styling
- **Cookies** — Session management (base64 encoded)
- **In-Memory Store** — Persists during server runtime

## 📋 Validation Rules

| Field        | Constraints           |
| ------------ | --------------------- |
| Email        | Valid format required |
| Password     | Min 6 characters      |
| Name         | 2-50 characters       |
| Post Title   | 5-100 characters      |
| Post Content | 50-10,000 characters  |

## 🎯 Roadmap

See [track.md](./track.md) for development progress and backlog.

## 📄 License

MIT
