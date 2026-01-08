// Validation utilities for user inputs

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function getEmailError(email: string): string | null {
  if (!email.trim()) return null; // Don't show error for empty
  if (!isValidEmail(email)) return "Please enter a valid email address";
  return null;
}

// Password validation
export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4; // 0 = very weak, 4 = very strong
  label: string;
  color: string;
  feedback: string[];
}

export function getPasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 6) score++;
  else feedback.push("At least 6 characters");

  if (password.length >= 10) score++;

  if (/[A-Z]/.test(password)) score++;
  else if (password.length >= 6) feedback.push("Add uppercase letters");

  if (/[0-9]/.test(password)) score++;
  else if (password.length >= 6) feedback.push("Add numbers");

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else if (password.length >= 6) feedback.push("Add special characters");

  // Cap at 4
  const finalScore = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;

  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"];

  return {
    score: finalScore,
    label: labels[finalScore],
    color: colors[finalScore],
    feedback: feedback.slice(0, 2), // Show max 2 suggestions
  };
}

// Name validation
export function getNameError(name: string): string | null {
  if (!name.trim()) return null;
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  if (name.trim().length > 50) return "Name must be less than 50 characters";
  return null;
}

// Post validation
export const POST_LIMITS = {
  title: { min: 5, max: 100 },
  content: { min: 50, max: 10000 },
};

export function getTitleError(title: string): string | null {
  if (!title.trim()) return null;
  if (title.trim().length < POST_LIMITS.title.min) {
    return `Title must be at least ${POST_LIMITS.title.min} characters`;
  }
  if (title.trim().length > POST_LIMITS.title.max) {
    return `Title must be less than ${POST_LIMITS.title.max} characters`;
  }
  return null;
}

export function getContentError(content: string): string | null {
  if (!content.trim()) return null;
  if (content.trim().length < POST_LIMITS.content.min) {
    return `Content must be at least ${POST_LIMITS.content.min} characters`;
  }
  if (content.trim().length > POST_LIMITS.content.max) {
    return `Content must be less than ${POST_LIMITS.content.max} characters`;
  }
  return null;
}

// Reading time estimate
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Format character count
export function formatCharCount(current: number, max: number): string {
  return `${current}/${max}`;
}
