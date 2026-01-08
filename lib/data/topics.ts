// Predefined topics for blog categorization

import { Topic, TopicId } from "../types";

export const BLOG_TOPICS: readonly Topic[] = [
  { id: "technology", label: "Technology", color: "#3b82f6" },
  { id: "design", label: "Design", color: "#8b5cf6" },
  { id: "lifestyle", label: "Lifestyle", color: "#10b981" },
  { id: "productivity", label: "Productivity", color: "#f59e0b" },
  { id: "career", label: "Career", color: "#ef4444" },
  { id: "thoughts", label: "Thoughts", color: "#6366f1" },
] as const;

export function getTopicById(id: TopicId): Topic | undefined {
  return BLOG_TOPICS.find((topic) => topic.id === id);
}

export function getTopicLabel(id: TopicId): string {
  return getTopicById(id)?.label ?? id;
}
