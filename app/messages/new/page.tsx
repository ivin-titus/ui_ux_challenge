import { redirect } from "next/navigation";
import Link from "next/link";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, Avatar, Button, Input } from "@/components/ui";
import { getSession } from "@/lib/data/session";
import { store } from "@/lib/data/store";
import { startConversation } from "@/lib/actions/messages";

export const metadata = {
  title: "New Message | Axis",
  description: "Start a new conversation",
};

export default async function NewMessagePage() {
  const session = await getSession();
  if (!session) {
    redirect("/auth");
  }

  // Get all users except current user
  const allUsers = store
    .getAllUsers()
    .filter((u) => u.id !== session.id)
    .map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      avatar: u.avatar,
    }));

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/messages"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            New Message
          </h1>
        </div>

        <Card>
          <CardContent>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Select a user to start a conversation
            </p>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800 -mx-6">
              {allUsers.map((user) => (
                <li key={user.id}>
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
                    <button
                      type="submit"
                      className="flex items-center gap-4 w-full px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                    >
                      <Avatar src={user.avatar} name={user.name} size="md" />
                      <div>
                        <span className="font-medium text-slate-900 dark:text-white block">
                          {user.name}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          @{user.username}
                        </span>
                      </div>
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
