import { notFound } from "next/navigation";
import Link from "next/link";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, Avatar, Button } from "@/components/ui";
import {
  getUserByUsername,
  getFollowStats,
  checkIsFollowing,
} from "@/lib/actions/social";
import { getUserPosts } from "@/lib/actions/posts";
import { startConversation } from "@/lib/actions/messages";
import { getSession } from "@/lib/data/session";
import { FollowButton } from "@/components/ui/FollowButton";
import { Post } from "@/lib/types";

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PublicProfilePageProps) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  return {
    title: user
      ? `${user.name} (@${user.username}) | Axis`
      : "User Not Found | Axis",
  };
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const session = await getSession();
  const isOwn = session?.id === user.id;
  const stats = await getFollowStats(user.id);
  const isFollowing = session ? await checkIsFollowing(user.id) : false;
  const posts = await getUserPosts(user.id);

  const memberSince = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(user.createdAt));

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Profile Header */}
        <Card>
          <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar src={user.avatar} name={user.name} size="xl" />

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                @{user.username}
              </p>

              {user.bio && (
                <p className="mt-3 text-slate-600 dark:text-slate-400 whitespace-pre-line">
                  {user.bio}
                </p>
              )}

              <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 text-sm">
                <span>
                  <strong className="text-slate-900 dark:text-white">
                    {stats.followers}
                  </strong>{" "}
                  <span className="text-slate-500">followers</span>
                </span>
                <span>
                  <strong className="text-slate-900 dark:text-white">
                    {stats.following}
                  </strong>{" "}
                  <span className="text-slate-500">following</span>
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
                Member since {memberSince}
              </p>

              {session && !isOwn && (
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
                  <FollowButton
                    userId={user.id}
                    initialIsFollowing={isFollowing}
                  />
                  <form
                    action={async () => {
                      "use server";
                      const result = await startConversation(user.id);
                      if (result.success && result.conversationId) {
                        const { redirect } = await import("next/navigation");
                        redirect(`/messages/${result.conversationId}`);
                      }
                    }}
                  >
                    <Button type="submit" variant="secondary">
                      Message
                    </Button>
                  </form>
                </div>
              )}

              {isOwn && (
                <div className="mt-4">
                  <Link href="/profile">
                    <Button variant="secondary">Edit Profile</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Posts ({posts.length})
          </h2>

          {posts.length > 0 ? (
            <Card>
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {posts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="font-medium text-slate-900 dark:text-white truncate pr-4">
                        {post.title}
                      </span>
                      <span className="text-sm text-slate-500 shrink-0">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                        }).format(new Date(post.createdAt))}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-slate-500 dark:text-slate-400">
                  No posts yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
