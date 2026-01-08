"use server";

import { store } from "../data/store";
import { getSession } from "../data/session";
import { User } from "../types";

export type PublicUser = Pick<
  User,
  "id" | "username" | "name" | "bio" | "avatar" | "createdAt"
>;

/**
 * Get user by username for public profile
 */
export async function getUserByUsername(
  username: string
): Promise<PublicUser | null> {
  const user = store.findUserByUsername(username);
  if (!user) return null;

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    bio: user.bio,
    avatar: user.avatar,
    createdAt: user.createdAt,
  };
}

/**
 * Follow a user
 */
export async function followUser(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "You must be logged in." };
  }

  if (session.id === userId) {
    return { success: false, error: "You cannot follow yourself." };
  }

  const success = store.follow(session.id, userId);
  return { success };
}

/**
 * Unfollow a user
 */
export async function unfollowUser(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "You must be logged in." };
  }

  const success = store.unfollow(session.id, userId);
  return { success };
}

/**
 * Check if current user is following another user
 */
export async function checkIsFollowing(userId: string): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;

  return store.isFollowing(session.id, userId);
}

/**
 * Get follow stats for a user
 */
export async function getFollowStats(
  userId: string
): Promise<{ followers: number; following: number }> {
  return {
    followers: store.getFollowerCount(userId),
    following: store.getFollowingCount(userId),
  };
}
