// Shared TypeScript types for the blog application

export interface User {
  id: string;
  email: string;
  username: string; // unique, lowercase, for /u/[username]
  name: string;
  bio: string;
  avatar: string | null; // Base64 data URL or null if no avatar
  password: string; // In real app, this would be hashed
  createdAt: Date;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  topicId: TopicId;
  authorId: string;
  authorName: string;
  authorUsername: string;
  createdAt: Date;
  visibility: PostVisibility;
}

export type PostVisibility = "public" | "authenticated";

export interface Topic {
  id: string;
  label: string;
  color: string;
}

export type TopicId =
  | "technology"
  | "design"
  | "lifestyle"
  | "productivity"
  | "career"
  | "thoughts";

// Session user (without password)
export type SessionUser = Omit<User, "password">;

// Auth flow states
export type AuthStep = "email" | "login" | "register" | "redirecting";

export interface AuthState {
  step: AuthStep;
  email: string;
  error?: string;
  message?: string;
  redirectCountdown?: number;
}

// Social types

export interface Follow {
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: [string, string]; // exactly 2 user IDs
  lastMessageAt: Date;
  createdAt: Date;
}
