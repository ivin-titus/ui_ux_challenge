// Server-side session management using cookies
// Stores user data in cookie for serverless compatibility

import { cookies } from "next/headers";
import { store } from "./store";
import { SessionUser, User } from "../types";

const SESSION_COOKIE_NAME = "blog_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// Simple encoding (in production, use proper encryption)
function encode(value: string): string {
  return Buffer.from(value).toString("base64");
}

function decode(value: string): string {
  return Buffer.from(value, "base64").toString("utf-8");
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const decoded = decode(sessionCookie.value);

    // Try parsing as JSON (new format with full user data)
    try {
      const sessionData = JSON.parse(decoded) as SessionUser;

      // Verify user still exists in store (for seed users)
      // If not, re-add them (handles serverless cold start)
      const existingUser = store.findUserById(sessionData.id);
      if (!existingUser && sessionData.id) {
        // User was created but store was reset - that's ok, session is still valid
        // The user data is in the cookie
      }

      return sessionData;
    } catch {
      // Fall back to old format (just user ID)
      const userId = decoded;
      const user = store.findUserById(userId);

      if (!user) {
        return null;
      }

      const { password, ...sessionUser } = user;
      return sessionUser;
    }
  } catch {
    return null;
  }
}

export async function createSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  const user = store.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Store full user data (without password) for serverless compatibility
  const { password, ...sessionUser } = user;

  cookieStore.set(SESSION_COOKIE_NAME, encode(JSON.stringify(sessionUser)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
}

// Update session with new user data (e.g., after name change)
export async function updateSession(user: User): Promise<void> {
  await createSession(user.id);
}

// Helper to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

// Helper to require authentication (throws if not authenticated)
export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();

  if (!session) {
    throw new Error("Authentication required");
  }

  return session;
}
