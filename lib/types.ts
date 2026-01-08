// Shared TypeScript types for the blog application

export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // In real app, this would be hashed
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
