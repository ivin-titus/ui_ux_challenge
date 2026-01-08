import { Post } from "@/lib/types";
import { getTopicById } from "@/lib/data/topics";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  const topic = getTopicById(post.topicId);

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
