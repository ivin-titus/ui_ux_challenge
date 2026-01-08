import { SessionUser, Post } from "@/lib/types";
import { Card, CardContent } from "@/components/ui";
import Link from "next/link";

interface ProfileCardProps {
  user: SessionUser;
  posts: Post[];
}

export function ProfileCard({ user, posts }: ProfileCardProps) {
  return (
    <div className="space-y-8">
      {/* User info */}
      <Card>
        <CardContent className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl font-semibold text-slate-600 dark:text-slate-300"
            aria-hidden="true"
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* User details */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* User's posts */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Your Posts
        </h3>

        {posts.length > 0 ? (
          <Card>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {posts.map((post) => {
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                }).format(new Date(post.createdAt));

                return (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="font-medium text-slate-900 dark:text-white truncate pr-4">
                        {post.title}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0">
                        {formattedDate}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                You haven't written any posts yet.
              </p>
              <Link
                href="/blog/create"
                className="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Write your first post →
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
