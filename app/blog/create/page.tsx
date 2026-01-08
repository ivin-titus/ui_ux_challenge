import Link from "next/link";
import { redirect } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { PostEditor } from "@/components/blog";
import { getSession } from "@/lib/data/session";

export const metadata = {
  title: "Create Post | Axis Blog",
  description: "Write and publish a new blog post.",
};

export default async function CreatePostPage() {
  // Protected route - redirect to auth if not logged in
  const session = await getSession();
  if (!session) {
    redirect("/auth");
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Feed
            </Link>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Create a new post
        </h1>

        {/* Editor */}
        <PostEditor />
      </div>
    </MainLayout>
  );
}
