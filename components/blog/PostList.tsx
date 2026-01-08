"use client";

import { Post, TopicId } from "@/lib/types";
import { BLOG_TOPICS } from "@/lib/data/topics";
import { PostCard } from "./PostCard";
import { useState, useMemo } from "react";

interface PostListProps {
  posts: Post[];
  showFilters?: boolean;
}

export function PostList({ posts, showFilters = true }: PostListProps) {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | "all">("all");

  const filteredPosts = useMemo(() => {
    if (selectedTopic === "all") return posts;
    return posts.filter((post) => post.topicId === selectedTopic);
  }, [posts, selectedTopic]);

  return (
    <div className="space-y-6">
      {/* Topic filter pills */}
      {showFilters && (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by topic"
        >
          <button
            onClick={() => setSelectedTopic("all")}
            className={`
              px-4 py-2 text-sm font-medium rounded-full transition-colors
              focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
              ${
                selectedTopic === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }
            `}
            aria-pressed={selectedTopic === "all"}
          >
            All
          </button>
          {BLOG_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id as TopicId)}
              className={`
                px-4 py-2 text-sm font-medium rounded-full transition-colors
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  selectedTopic === topic.id
                    ? "text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                }
              `}
              style={
                selectedTopic === topic.id
                  ? ({
                      backgroundColor: topic.color,
                      "--tw-ring-color": topic.color,
                    } as React.CSSProperties)
                  : ({ "--tw-ring-color": topic.color } as React.CSSProperties)
              }
              aria-pressed={selectedTopic === topic.id}
            >
              {topic.label}
            </button>
          ))}
        </div>
      )}

      {/* Posts grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No posts found
            {selectedTopic !== "all"
              ? ` in ${BLOG_TOPICS.find((t) => t.id === selectedTopic)?.label}`
              : ""}
            .
          </p>
        </div>
      )}
    </div>
  );
}
