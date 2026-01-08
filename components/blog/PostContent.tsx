import { Post } from "@/lib/types";
import { getTopicById } from "@/lib/data/topics";
import { getReadingTime } from "@/lib/utils/validation";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  const topic = getTopicById(post.topicId);
  const readingTime = getReadingTime(post.content);

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.createdAt));

  return (
    <article className="max-w-2xl mx-auto">
      {/* Header */}
      <header className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {topic && (
            <span
              className="inline-block px-3 py-1 text-sm font-medium rounded-full"
              style={{
                backgroundColor: `${topic.color}15`,
                color: topic.color,
              }}
            >
              {topic.label}
            </span>
          )}
          {post.visibility === "authenticated" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              <svg
                className="w-3.5 h-3.5"
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
              Members Only
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
          {post.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          By{" "}
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {post.authorName}
          </span>
          {" · "}
          <time dateTime={post.createdAt.toISOString()}>{formattedDate}</time>
          {" · "}
          <span>{readingTime} min read</span>
        </p>
      </header>

      {/* Separator */}
      <hr className="border-slate-200 dark:border-slate-800 mb-8" />

      {/* Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {/* Render content with preserved paragraphs */}
        {post.content.split("\n\n").map((paragraph, index) => {
          // Check if it's a heading (starts with **)
          if (paragraph.startsWith("**") && paragraph.includes("**")) {
            const headingMatch = paragraph.match(/^\*\*(.+?)\*\*$/);
            if (headingMatch) {
              return (
                <h2
                  key={index}
                  className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4"
                >
                  {headingMatch[1]}
                </h2>
              );
            }
          }

          // Regular paragraph, handle inline bold
          const processedContent = paragraph
            .split(/\*\*(.+?)\*\*/g)
            .map((part, i) => {
              if (i % 2 === 1) {
                return (
                  <strong
                    key={i}
                    className="font-semibold text-slate-900 dark:text-white"
                  >
                    {part}
                  </strong>
                );
              }
              return part;
            });

          return (
            <p
              key={index}
              className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4"
            >
              {processedContent}
            </p>
          );
        })}
      </div>
    </article>
  );
}
