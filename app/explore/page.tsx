import Link from "next/link";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, Avatar, Button } from "@/components/ui";
import { getSession } from "@/lib/data/session";
import { store } from "@/lib/data/store";
import { checkIsFollowing, getFollowStats } from "@/lib/actions/social";
import { FollowButton } from "@/components/ui/FollowButton";

export const metadata = {
  title: "Discover Writers | Axis",
  description: "Find and follow writers on Axis",
};

export default async function ExplorePage() {
  const session = await getSession();

  // Get all users
  const allUsers = store.getAllUsers().map((u) => ({
    id: u.id,
    name: u.name,
    username: u.username,
    bio: u.bio,
    avatar: u.avatar,
  }));

  // Get follow status and stats for each user
  const usersWithStats = await Promise.all(
    allUsers.map(async (user) => {
      const stats = await getFollowStats(user.id);
      const isFollowing = session ? await checkIsFollowing(user.id) : false;
      const isOwn = session?.id === user.id;
      return { ...user, ...stats, isFollowing, isOwn };
    })
  );

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Discover Writers
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Find and follow writers whose content you love
          </p>
        </div>

        <div className="space-y-4">
          {usersWithStats.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex items-center gap-4">
                <Link href={`/u/${user.username}`}>
                  <Avatar src={user.avatar} name={user.name} size="lg" />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/u/${user.username}`}
                    className="hover:underline"
                  >
                    <h2 className="font-semibold text-slate-900 dark:text-white truncate">
                      {user.name}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      @{user.username}
                    </p>
                  </Link>
                  {user.bio && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">
                      {user.bio}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {user.followers} followers · {user.following} following
                  </p>
                </div>

                {session && !user.isOwn && (
                  <FollowButton
                    userId={user.id}
                    initialIsFollowing={user.isFollowing}
                  />
                )}

                {user.isOwn && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                    You
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {!session && (
          <div className="mt-8 text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Sign in to follow writers
            </p>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
