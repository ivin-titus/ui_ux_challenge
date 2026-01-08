import Link from "next/link";
import { MainLayout } from "@/components/layout";
import { Button, Card, CardContent } from "@/components/ui";
import { getPosts } from "@/lib/actions/posts";
import { getTopicById } from "@/lib/data/topics";

export default async function LandingPage() {
  // Get featured posts (latest 3)
  const posts = await getPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Share your thoughts with the world
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              A calm space for writers to share ideas, stories, and insights. No
              distractions, just clarity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/auth">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/blog">
                <Button variant="secondary" size="lg">
                  Explore Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Latest Posts
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Discover what our community is writing about
            </p>
          </div>

          {featuredPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => {
                const topic = getTopicById(post.topicId);
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                }).format(new Date(post.createdAt));

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <Card as="article" interactive className="h-full">
                      <CardContent className="space-y-3">
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
                        <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {post.authorName} · {formattedDate}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-slate-500 dark:text-slate-400">
                  No posts yet. Be the first to share your thoughts!
                </p>
              </CardContent>
            </Card>
          )}

          <div className="text-center mt-10">
            <Link href="/blog">
              <Button variant="ghost">View all posts →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
              Ready to start writing?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Join our community of writers and share your unique perspective.
            </p>
            <Link href="/auth">
              <Button size="lg">Create your account</Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
