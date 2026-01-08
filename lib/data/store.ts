// In-memory data store (persists during server runtime)
// This is a singleton that maintains state across requests

import { User, Post, TopicId, Follow, Message, Conversation } from "../types";
import { seedUsers, seedPosts } from "./seed";

class DataStore {
  private users: User[] = [];
  private posts: Post[] = [];
  private follows: Follow[] = [];
  private messages: Message[] = [];
  private conversations: Conversation[] = [];
  private initialized: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (this.initialized) return;

    // Clone seed data to avoid mutations affecting originals
    this.users = [...seedUsers];
    this.posts = [...seedPosts];

    // Seed demo conversations and messages
    this.initializeSeedConversations();

    this.initialized = true;
  }

  private initializeSeedConversations() {
    // Demo conversation between Alex (user-1) and Jamie (user-2)
    const conv1: Conversation = {
      id: "conv-demo-1",
      participants: ["user-1", "user-2"],
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    };
    this.conversations.push(conv1);

    // Messages for Alex-Jamie conversation
    const messages1: Message[] = [
      {
        id: "msg-demo-1",
        conversationId: "conv-demo-1",
        senderId: "user-2", // Jamie
        content:
          "Hey Alex! Loved your post about Next.js App Router. Really helped me understand server components.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        read: true,
      },
      {
        id: "msg-demo-2",
        conversationId: "conv-demo-1",
        senderId: "user-1", // Alex
        content:
          "Thanks Jamie! Glad it was helpful. Your design articles are always so insightful too.",
        createdAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 15
        ),
        read: true,
      },
      {
        id: "msg-demo-3",
        conversationId: "conv-demo-1",
        senderId: "user-2", // Jamie
        content:
          "Want to collab on something? I've been thinking about a design systems article.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60),
        read: true,
      },
      {
        id: "msg-demo-4",
        conversationId: "conv-demo-1",
        senderId: "user-1", // Alex
        content:
          "That sounds great! Let's chat more about it. I have some ideas for interactive examples.",
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
      },
    ];
    this.messages.push(...messages1);

    // Demo conversation between Jamie (user-2) and Sam (user-3)
    const conv2: Conversation = {
      id: "conv-demo-2",
      participants: ["user-2", "user-3"],
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    };
    this.conversations.push(conv2);

    const messages2: Message[] = [
      {
        id: "msg-demo-5",
        conversationId: "conv-demo-2",
        senderId: "user-3", // Sam
        content:
          "Hey Jamie! Your minimal design post really resonated with me.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: true,
      },
      {
        id: "msg-demo-6",
        conversationId: "conv-demo-2",
        senderId: "user-2", // Jamie
        content:
          "Thanks Sam! I think minimalism and productivity go hand in hand. Would love to hear your perspective!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: false,
      },
    ];
    this.messages.push(...messages2);

    // Demo conversation between Alex (user-1) and Sam (user-3)
    const conv3: Conversation = {
      id: "conv-demo-3",
      participants: ["user-1", "user-3"],
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    };
    this.conversations.push(conv3);

    const messages3: Message[] = [
      {
        id: "msg-demo-7",
        conversationId: "conv-demo-3",
        senderId: "user-1", // Alex
        content:
          "Hey Sam! I read your article on digital minimalism - really inspiring stuff!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
        read: true,
      },
      {
        id: "msg-demo-8",
        conversationId: "conv-demo-3",
        senderId: "user-3", // Sam
        content:
          "Thanks Alex! Your tech posts always make complex topics so approachable.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10),
        read: true,
      },
      {
        id: "msg-demo-9",
        conversationId: "conv-demo-3",
        senderId: "user-1", // Alex
        content:
          "Would you be interested in being a guest on my podcast sometime?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
      },
    ];
    this.messages.push(...messages3);
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

  getAllUsers(): User[] {
    return [...this.users];
  }

  createUser(
    email: string,
    username: string,
    name: string,
    password: string
  ): User {
    const id = `user-${Date.now()}`;
    const newUser: User = {
      id,
      email,
      username,
      name,
      bio: "",
      avatar: null,
      password,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(
    userId: string,
    updates: { name?: string; bio?: string; avatar?: string | null }
  ): User | null {
    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) return null;

    const user = this.users[userIndex];
    if (updates.name !== undefined) user.name = updates.name;
    if (updates.bio !== undefined) user.bio = updates.bio;
    if (updates.avatar !== undefined) user.avatar = updates.avatar;

    // Also update author name in their posts if name changed
    if (updates.name !== undefined) {
      this.posts.forEach((post) => {
        if (post.authorId === userId) {
          post.authorName = updates.name!;
        }
      });
    }

    return user;
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

  getPostById(id: string): Post | undefined {
    return this.posts.find((post) => post.id === id);
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
    authorUsername: string,
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
      authorUsername,
      createdAt: new Date(),
      visibility,
    };

    this.posts.push(newPost);
    return newPost;
  }

  updatePost(
    postId: string,
    authorId: string,
    updates: {
      title?: string;
      content?: string;
      topicId?: TopicId;
      visibility?: "public" | "authenticated";
    }
  ): Post | null {
    const postIndex = this.posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) return null;

    const post = this.posts[postIndex];

    // Only author can update their own post
    if (post.authorId !== authorId) return null;

    if (updates.title !== undefined) {
      post.title = updates.title;
      post.slug = this.generateSlug(updates.title);
    }
    if (updates.content !== undefined) {
      post.content = updates.content;
      post.excerpt = this.generateExcerpt(updates.content);
    }
    if (updates.topicId !== undefined) post.topicId = updates.topicId;
    if (updates.visibility !== undefined) post.visibility = updates.visibility;

    return post;
  }

  deletePost(postId: string, authorId: string): boolean {
    const postIndex = this.posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) return false;

    const post = this.posts[postIndex];

    // Only author can delete their own post
    if (post.authorId !== authorId) return false;

    this.posts.splice(postIndex, 1);
    return true;
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

  // ========== SOCIAL METHODS ==========

  // Follow methods
  follow(followerId: string, followingId: string): boolean {
    if (followerId === followingId) return false;
    if (this.isFollowing(followerId, followingId)) return false;

    this.follows.push({
      followerId,
      followingId,
      createdAt: new Date(),
    });
    return true;
  }

  unfollow(followerId: string, followingId: string): boolean {
    const index = this.follows.findIndex(
      (f) => f.followerId === followerId && f.followingId === followingId
    );
    if (index === -1) return false;
    this.follows.splice(index, 1);
    return true;
  }

  isFollowing(followerId: string, followingId: string): boolean {
    return this.follows.some(
      (f) => f.followerId === followerId && f.followingId === followingId
    );
  }

  getFollowers(userId: string): User[] {
    const followerIds = this.follows
      .filter((f) => f.followingId === userId)
      .map((f) => f.followerId);
    return this.users.filter((u) => followerIds.includes(u.id));
  }

  getFollowing(userId: string): User[] {
    const followingIds = this.follows
      .filter((f) => f.followerId === userId)
      .map((f) => f.followingId);
    return this.users.filter((u) => followingIds.includes(u.id));
  }

  getFollowerCount(userId: string): number {
    return this.follows.filter((f) => f.followingId === userId).length;
  }

  getFollowingCount(userId: string): number {
    return this.follows.filter((f) => f.followerId === userId).length;
  }

  // Conversation methods
  createConversation(user1Id: string, user2Id: string): Conversation {
    // Check if conversation already exists
    const existing = this.getConversationBetween(user1Id, user2Id);
    if (existing) return existing;

    const conversation: Conversation = {
      id: `conv-${Date.now()}`,
      participants: [user1Id, user2Id],
      lastMessageAt: new Date(),
      createdAt: new Date(),
    };
    this.conversations.push(conversation);
    return conversation;
  }

  getConversation(id: string): Conversation | undefined {
    return this.conversations.find((c) => c.id === id);
  }

  getConversationBetween(
    user1Id: string,
    user2Id: string
  ): Conversation | undefined {
    return this.conversations.find(
      (c) =>
        c.participants.includes(user1Id) && c.participants.includes(user2Id)
    );
  }

  getConversationsForUser(userId: string): Conversation[] {
    return this.conversations
      .filter((c) => c.participants.includes(userId))
      .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
  }

  // Message methods
  sendMessage(
    conversationId: string,
    senderId: string,
    content: string
  ): Message | null {
    const conversation = this.getConversation(conversationId);
    if (!conversation) return null;
    if (!conversation.participants.includes(senderId)) return null;

    const message: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      content,
      createdAt: new Date(),
      read: false,
    };
    this.messages.push(message);

    // Update conversation lastMessageAt
    conversation.lastMessageAt = new Date();

    return message;
  }

  getMessages(conversationId: string): Message[] {
    return this.messages
      .filter((m) => m.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  markMessagesAsRead(conversationId: string, userId: string): void {
    this.messages
      .filter(
        (m) => m.conversationId === conversationId && m.senderId !== userId
      )
      .forEach((m) => (m.read = true));
  }

  getUnreadCount(userId: string): number {
    const userConversations = this.getConversationsForUser(userId);
    const conversationIds = userConversations.map((c) => c.id);

    return this.messages.filter(
      (m) =>
        conversationIds.includes(m.conversationId) &&
        m.senderId !== userId &&
        !m.read
    ).length;
  }

  findUserByUsername(username: string): User | undefined {
    return this.users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
}

// Export singleton instance
// Using globalThis to persist across hot reloads in development
const globalForStore = globalThis as unknown as { store: DataStore };

// Force new instance if store is missing new methods (development hot reload)
if (
  globalForStore.store &&
  typeof globalForStore.store.getConversationsForUser !== "function"
) {
  globalForStore.store = new DataStore();
}

export const store = globalForStore.store ?? new DataStore();
globalForStore.store = store;

if (process.env.NODE_ENV !== "production") globalForStore.store = store;
