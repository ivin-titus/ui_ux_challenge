import Link from "next/link";
import { Post } from "@/lib/types";
import { getTopicById } from "@/lib/data/topics";
import { Card, CardContent } from "@/components/ui";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const topic = getTopicById(post.topicId);

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.createdAt));

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card as="article" interactive className="h-full">
        <CardContent className="space-y-3">
          {/* Topic badge and title */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {topic && (
                <span
                  className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${topic.color}15`,
                    color: topic.color,
                  }}
                >
                  {topic.label}
                </span>
              )}
              {post.visibility === "authenticated" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  <svg
                    className="w-3 h-3"
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
                  Members
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors line-clamp-2">
              {post.title}
            </h2>
          </div>

          {/* Meta info */}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {post.authorName} · {formattedDate}
          </p>

          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Read more */}
          <span className="inline-flex items-center text-sm font-medium text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
            Read more
            <svg
              className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
