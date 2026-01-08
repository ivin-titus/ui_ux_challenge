import { redirect, notFound } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { PostEditForm } from "@/components/blog/PostEditForm";
import { getSession } from "@/lib/data/session";
import { getPostBySlug } from "@/lib/actions/posts";

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Axis Blog" };
  }

  return {
    title: `Edit: ${post.title} | Axis Blog`,
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const session = await getSession();
  if (!session) {
    redirect("/auth");
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Only author can edit
  if (post.authorId !== session.id) {
    redirect(`/blog/${slug}`);
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Edit Post
        </h1>

        {/* Edit form */}
        <PostEditForm post={post} />
      </div>
    </MainLayout>
  );
}
