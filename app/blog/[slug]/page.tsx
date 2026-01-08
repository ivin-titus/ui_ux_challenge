import Link from "next/link";
import { notFound } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { PostContent } from "@/components/blog";
import { getPostBySlug } from "@/lib/actions/posts";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Axis Blog",
    };
  }

  return {
    title: `${post.title} | Axis Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8"
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

        {/* Post content */}
        <PostContent post={post} />
      </div>
    </MainLayout>
  );
}
