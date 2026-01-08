"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TopicId, PostVisibility } from "@/lib/types";
import { BLOG_TOPICS } from "@/lib/data/topics";
import { createPost } from "@/lib/actions/posts";
import {
  Input,
  TextArea,
  Button,
  Card,
  CardContent,
  useToast,
} from "@/components/ui";
import {
  getTitleError,
  getContentError,
  POST_LIMITS,
  getReadingTime,
} from "@/lib/utils/validation";

export function PostEditor() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topicId, setTopicId] = useState<TopicId>("thoughts");
  const [visibility, setVisibility] = useState<PostVisibility>("public");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ title: false, content: false });

  // Validation
  const titleError = useMemo(
    () => (touched.title ? getTitleError(title) : null),
    [title, touched.title]
  );
  const contentError = useMemo(
    () => (touched.content ? getContentError(content) : null),
    [content, touched.content]
  );

  // Character counts
  const titleCharCount = title.length;
  const contentCharCount = content.length;

  // Reading time
  const readingTime = useMemo(() => getReadingTime(content), [content]);

  // Form validity
  const isValid =
    title.trim().length >= POST_LIMITS.title.min &&
    title.trim().length <= POST_LIMITS.title.max &&
    content.trim().length >= POST_LIMITS.content.min &&
    content.trim().length <= POST_LIMITS.content.max;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, content: true });
    setError("");

    if (!isValid) return;

    startTransition(async () => {
      const result = await createPost(title, content, topicId, visibility);

      if (result.success && result.post) {
        showToast("Post published successfully!", "success");
        router.push(`/blog/${result.post.slug}`);
      } else {
        setError(result.error ?? "Something went wrong");
        showToast(result.error ?? "Failed to publish", "error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-6">
          {/* Error message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Title input */}
          <div className="space-y-1">
            <Input
              label="Title"
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
              error={titleError ?? undefined}
              required
              disabled={isPending}
              maxLength={POST_LIMITS.title.max}
            />
            <div className="flex justify-end">
              <span
                className={`text-xs ${
                  titleCharCount > POST_LIMITS.title.max
                    ? "text-red-500"
                    : titleCharCount >= POST_LIMITS.title.max * 0.9
                    ? "text-amber-500"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {titleCharCount}/{POST_LIMITS.title.max}
              </span>
            </div>
          </div>

          {/* Topic selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Topic
            </label>
            <div
              className="flex flex-wrap gap-2"
              role="radiogroup"
              aria-label="Select topic"
            >
              {BLOG_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  role="radio"
                  aria-checked={topicId === topic.id}
                  onClick={() => setTopicId(topic.id as TopicId)}
                  disabled={isPending}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-full transition-colors
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    disabled:opacity-50
                    ${
                      topicId === topic.id
                        ? "text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    }
                  `}
                  style={
                    topicId === topic.id
                      ? ({
                          backgroundColor: topic.color,
                          "--tw-ring-color": topic.color,
                        } as React.CSSProperties)
                      : ({
                          "--tw-ring-color": topic.color,
                        } as React.CSSProperties)
                  }
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content textarea */}
          <div className="space-y-1">
            <TextArea
              label="Content"
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, content: true }))}
              error={contentError ?? undefined}
              required
              disabled={isPending}
              className="min-h-[300px]"
            />
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 dark:text-slate-500">
                {content.trim() && `~${readingTime} min read`}
              </span>
              <span
                className={`${
                  contentCharCount > POST_LIMITS.content.max
                    ? "text-red-500"
                    : contentCharCount >= POST_LIMITS.content.max * 0.9
                    ? "text-amber-500"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {contentCharCount.toLocaleString()}/
                {POST_LIMITS.content.max.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Visibility toggle */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Who can see this post?
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setVisibility("public")}
                disabled={isPending}
                className={`
                  flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
                  disabled:opacity-50
                  ${
                    visibility === "public"
                      ? "border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center shrink-0
                    ${
                      visibility === "public"
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }
                  `}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <span
                    className={`
                      block font-medium
                      ${
                        visibility === "public"
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-700 dark:text-slate-300"
                      }
                    `}
                  >
                    Public
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Anyone can read this post
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setVisibility("authenticated")}
                disabled={isPending}
                className={`
                  flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
                  disabled:opacity-50
                  ${
                    visibility === "authenticated"
                      ? "border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center shrink-0
                    ${
                      visibility === "authenticated"
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }
                  `}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <span
                    className={`
                      block font-medium
                      ${
                        visibility === "authenticated"
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-700 dark:text-slate-300"
                      }
                    `}
                  >
                    Members Only
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Only logged-in users can see
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !isValid}>
              {isPending ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
