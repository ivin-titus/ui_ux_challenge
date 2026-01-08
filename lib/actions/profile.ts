"use server";

import { revalidatePath } from "next/cache";
import { store } from "../data/store";
import { getSession, updateSession } from "../data/session";

export interface UpdateProfileResult {
  success: boolean;
  error?: string;
}

/**
 * Update user profile (name, bio)
 */
export async function updateProfile(
  name: string,
  bio: string
): Promise<UpdateProfileResult> {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to update your profile.",
    };
  }

  // Validate name
  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    return {
      success: false,
      error: "Name must be at least 2 characters.",
    };
  }
  if (trimmedName.length > 50) {
    return {
      success: false,
      error: "Name must be less than 50 characters.",
    };
  }

  // Validate bio
  const trimmedBio = bio.trim();
  if (trimmedBio.length > 300) {
    return {
      success: false,
      error: "Bio must be less than 300 characters.",
    };
  }

  const updated = store.updateUser(session.id, {
    name: trimmedName,
    bio: trimmedBio,
  });

  if (!updated) {
    return {
      success: false,
      error: "Failed to update profile.",
    };
  }

  // Update session with new name
  await updateSession(updated);

  revalidatePath("/profile");
  revalidatePath("/blog");

  return { success: true };
}

/**
 * Update user avatar
 */
export async function updateAvatar(
  avatarDataUrl: string | null
): Promise<UpdateProfileResult> {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to update your avatar.",
    };
  }

  // Validate avatar size (max 500KB for base64)
  if (avatarDataUrl && avatarDataUrl.length > 500 * 1024) {
    return {
      success: false,
      error: "Image is too large. Please use an image under 500KB.",
    };
  }

  const updated = store.updateUser(session.id, {
    avatar: avatarDataUrl,
  });

  if (!updated) {
    return {
      success: false,
      error: "Failed to update avatar.",
    };
  }

  revalidatePath("/profile");

  return { success: true };
}

/**
 * Delete user avatar
 */
export async function deleteAvatar(): Promise<UpdateProfileResult> {
  return updateAvatar(null);
}

/**
 * Get current user's full profile
 */
export async function getMyProfile() {
  const session = await getSession();
  if (!session) return null;

  const user = store.findUserById(session.id);
  if (!user) return null;

  // Return without password
  const { password, ...profile } = user;
  return profile;
}
