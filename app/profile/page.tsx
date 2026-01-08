import { redirect } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { ProfileCard } from "@/components/profile";
import { Button } from "@/components/ui";
import { getSession } from "@/lib/data/session";
import { getMyPosts } from "@/lib/actions/posts";
import { logout } from "@/lib/actions/auth";

export const metadata = {
  title: "Profile | Axis Blog",
  description: "View and manage your profile and posts.",
};

export default async function ProfilePage() {
  // Protected route - redirect to auth if not logged in
  const session = await getSession();
  if (!session) {
    redirect("/auth");
  }

  const posts = await getMyPosts();

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Profile
        </h1>

        {/* Profile content */}
        <ProfileCard user={session} posts={posts} />

        {/* Logout section */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <form action={logout}>
            <Button type="submit" variant="danger" fullWidth>
              Log Out
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
