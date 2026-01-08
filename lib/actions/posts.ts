"use server";

import { store } from "../data/store";
import { getSession } from "../data/session";
import { Post, TopicId, PostVisibility } from "../types";

/**
 * Get all posts, optionally filtered by topic
 * Filters out authenticated-only posts for guests
 */
export async function getPosts(topicId?: TopicId): Promise<Post[]> {
  const session = await getSession();
  const isAuthenticated = !!session;

  let posts: Post[];
  if (topicId) {
    posts = store.getPostsByTopic(topicId);
  } else {
    posts = store.getAllPosts();
  }

  // Filter out authenticated-only posts for guests
  if (!isAuthenticated) {
    posts = posts.filter((post) => post.visibility === "public");
  }

  return posts;
}

/**
 * Get a single post by slug
 * Returns null if post is authenticated-only and user is not logged in
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = store.getPostBySlug(slug);

  if (!post) return null;

  // Check visibility
  if (post.visibility === "authenticated") {
    const session = await getSession();
    if (!session) {
      return null; // Guest can't see authenticated-only posts
    }
  }

  return post;
}

/**
 * Get posts by a specific author
 */
export async function getUserPosts(userId: string): Promise<Post[]> {
  return store.getPostsByAuthor(userId);
}

/**
 * Get posts by the current logged-in user
 */
export async function getMyPosts(): Promise<Post[]> {
  const session = await getSession();

  if (!session) {
    return [];
  }

  return store.getPostsByAuthor(session.id);
}

export interface CreatePostResult {
  success: boolean;
  post?: Post;
  error?: string;
}

/**
 * Create a new post
 */
export async function createPost(
  title: string,
  content: string,
  topicId: TopicId,
  visibility: PostVisibility = "public"
): Promise<CreatePostResult> {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to create a post.",
    };
  }

  // Validate inputs
  if (!title.trim()) {
    return {
      success: false,
      error: "Please enter a title.",
    };
  }

  if (!content.trim()) {
    return {
      success: false,
      error: "Please enter some content.",
    };
  }

  const newPost = store.createPost(
    title.trim(),
    content.trim(),
    topicId,
    session.id,
    session.name,
    visibility
  );

  return {
    success: true,
    post: newPost,
  };
}
