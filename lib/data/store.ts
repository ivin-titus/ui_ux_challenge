// In-memory data store (persists during server runtime)
// This is a singleton that maintains state across requests

import { User, Post, TopicId } from "../types";
import { seedUsers, seedPosts } from "./seed";

class DataStore {
  private users: User[] = [];
  private posts: Post[] = [];
  private initialized: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (this.initialized) return;

    // Clone seed data to avoid mutations affecting originals
    this.users = [...seedUsers];
    this.posts = [...seedPosts];
    this.initialized = true;
  }

  // User methods
  findUserByEmail(email: string): User | undefined {
    return this.users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  findUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(email: string, name: string, password: string): User {
    const id = `user-${Date.now()}`;
    const newUser: User = { id, email, name, password };
    this.users.push(newUser);
    return newUser;
  }

  validatePassword(user: User, password: string): boolean {
    return user.password === password;
  }

  // Post methods
  getAllPosts(): Post[] {
    // Return posts sorted by date, newest first
    return [...this.posts].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  getPostsByTopic(topicId: TopicId): Post[] {
    return this.getAllPosts().filter((post) => post.topicId === topicId);
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.posts.find((post) => post.slug === slug);
  }

  getPostsByAuthor(authorId: string): Post[] {
    return this.getAllPosts().filter((post) => post.authorId === authorId);
  }

  createPost(
    title: string,
    content: string,
    topicId: TopicId,
    authorId: string,
    authorName: string,
    visibility: "public" | "authenticated" = "public"
  ): Post {
    const id = `post-${Date.now()}`;
    const slug = this.generateSlug(title);
    const excerpt = this.generateExcerpt(content);

    const newPost: Post = {
      id,
      slug,
      title,
      content,
      excerpt,
      topicId,
      authorId,
      authorName,
      createdAt: new Date(),
      visibility,
    };

    this.posts.push(newPost);
    return newPost;
  }

  private generateSlug(title: string): string {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check for duplicate slugs and add suffix if needed
    let slug = baseSlug;
    let counter = 1;
    while (this.posts.some((post) => post.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  private generateExcerpt(content: string, maxLength: number = 150): string {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  }
}

// Export singleton instance
// Using globalThis to persist across hot reloads in development
const globalForStore = globalThis as unknown as { store: DataStore };
export const store = globalForStore.store ?? new DataStore();
if (process.env.NODE_ENV !== "production") globalForStore.store = store;
