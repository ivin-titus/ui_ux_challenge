"use server";

import { redirect } from "next/navigation";
import { store } from "../data/store";
import { createSession, destroySession } from "../data/session";

export interface CheckEmailResult {
  exists: boolean;
  email: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  shouldRedirect?: "login" | "register";
  message?: string;
}

/**
 * Check if an email exists in the system
 */
export async function checkEmail(email: string): Promise<CheckEmailResult> {
  const normalizedEmail = email.toLowerCase().trim();
  const user = store.findUserByEmail(normalizedEmail);

  return {
    exists: !!user,
    email: normalizedEmail,
  };
}

/**
 * Attempt to log in a user
 */
export async function login(
  email: string,
  password: string
): Promise<AuthResult> {
  const normalizedEmail = email.toLowerCase().trim();
  const user = store.findUserByEmail(normalizedEmail);

  // Edge case: No user found with this email
  if (!user) {
    return {
      success: false,
      error: "No account found with this email.",
      shouldRedirect: "register",
      message: "No account found. Creating one for you...",
    };
  }

  // Validate password
  if (!store.validatePassword(user, password)) {
    return {
      success: false,
      error: "Incorrect password. Please try again.",
    };
  }

  // Create session
  await createSession(user.id);

  return {
    success: true,
  };
}

/**
 * Register a new user
 */
export async function register(
  email: string,
  name: string,
  password: string
): Promise<AuthResult> {
  const normalizedEmail = email.toLowerCase().trim();

  // Edge case: User already exists
  const existingUser = store.findUserByEmail(normalizedEmail);
  if (existingUser) {
    return {
      success: false,
      error: "An account with this email already exists.",
      shouldRedirect: "login",
      message: "You already have an account! Taking you to login...",
    };
  }

  // Validate inputs
  if (!name.trim()) {
    return {
      success: false,
      error: "Please enter your name.",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: "Password must be at least 6 characters.",
    };
  }

  // Generate username from name (lowercase, no spaces)
  const username = name.trim().toLowerCase().replace(/\s+/g, "");

  // Create user
  const newUser = store.createUser(
    normalizedEmail,
    username,
    name.trim(),
    password
  );

  // Create session
  await createSession(newUser.id);

  return {
    success: true,
  };
}

/**
 * Log out the current user
 */
export async function logout(): Promise<void> {
  await destroySession();
  redirect("/");
}
