import Link from "next/link";
import { MainLayout } from "@/components/layout";
import { PostList } from "@/components/blog";
import { Button } from "@/components/ui";
import { getPosts } from "@/lib/actions/posts";
import { getSession } from "@/lib/data/session";

export const metadata = {
  title: "Blog Feed | Axis Blog",
  description: "Explore the latest posts from our community of writers.",
};

export default async function BlogFeedPage() {
  const posts = await getPosts();
  const session = await getSession();
  const isAuthenticated = !!session;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Blog Feed
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Discover what our community is writing about
            </p>
          </div>

          {isAuthenticated && (
            <Link href="/blog/create">
              <Button>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Post
              </Button>
            </Link>
          )}
        </div>

        {/* Posts list with filters */}
        <PostList posts={posts} />
      </div>
    </MainLayout>
  );
}
