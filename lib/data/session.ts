// Server-side session management using cookies
// Simple approach: store user ID in an encrypted cookie

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
    const userId = decode(sessionCookie.value);
    const user = store.findUserById(userId);

    if (!user) {
      return null;
    }

    // Return user without password
    const { password, ...sessionUser } = user;
    return sessionUser;
  } catch {
    return null;
  }
}

export async function createSession(userId: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, encode(userId), {
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
