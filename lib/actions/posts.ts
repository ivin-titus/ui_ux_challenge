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
    session.username,
    visibility
  );

  return {
    success: true,
    post: newPost,
  };
}

export interface UpdatePostResult {
  success: boolean;
  post?: Post;
  error?: string;
}

/**
 * Update an existing post (only by author)
 */
export async function updatePost(
  postId: string,
  updates: {
    title?: string;
    content?: string;
    topicId?: TopicId;
    visibility?: PostVisibility;
  }
): Promise<UpdatePostResult> {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to update a post.",
    };
  }

  // Validate title if provided
  if (updates.title !== undefined && !updates.title.trim()) {
    return {
      success: false,
      error: "Title cannot be empty.",
    };
  }

  // Validate content if provided
  if (updates.content !== undefined && !updates.content.trim()) {
    return {
      success: false,
      error: "Content cannot be empty.",
    };
  }

  const updatedPost = store.updatePost(postId, session.id, {
    title: updates.title?.trim(),
    content: updates.content?.trim(),
    topicId: updates.topicId,
    visibility: updates.visibility,
  });

  if (!updatedPost) {
    return {
      success: false,
      error: "Post not found or you don't have permission to edit it.",
    };
  }

  return {
    success: true,
    post: updatedPost,
  };
}

export interface DeletePostResult {
  success: boolean;
  error?: string;
}

/**
 * Delete a post (only by author)
 */
export async function deletePost(postId: string): Promise<DeletePostResult> {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to delete a post.",
    };
  }

  const deleted = store.deletePost(postId, session.id);

  if (!deleted) {
    return {
      success: false,
      error: "Post not found or you don't have permission to delete it.",
    };
  }

  return { success: true };
}

/**
 * Get a post by ID (for editing)
 */
export async function getPostById(postId: string): Promise<Post | null> {
  const post = store.getPostById(postId);
  return post ?? null;
}
