import { redirect } from "next/navigation";
import Link from "next/link";
import { MainLayout } from "@/components/layout";
import { getSession } from "@/lib/data/session";
import { getConversations } from "@/lib/actions/messages";
import { Avatar } from "@/components/ui";

export const metadata = {
  title: "Messages | Axis",
  description: "Your conversations",
};

export default async function MessagesPage() {
  const session = await getSession();
  if (!session) {
    redirect("/auth");
  }

  const conversations = await getConversations();

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Messages
        </h1>

        {conversations.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {conversations.map((conv) => {
                const formattedTime = new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                }).format(new Date(conv.lastMessageAt));

                return (
                  <li key={conv.id}>
                    <Link
                      href={`/messages/${conv.id}`}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <Avatar
                        src={conv.otherParticipant.avatar}
                        name={conv.otherParticipant.name}
                        size="md"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-900 dark:text-white truncate">
                            {conv.otherParticipant.name}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                            {formattedTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                            {conv.lastMessage?.content ?? "No messages yet"}
                          </p>
                          {conv.unreadCount > 0 && (
                            <span className="shrink-0 w-5 h-5 flex items-center justify-center text-xs font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-8 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              No conversations yet
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Start a conversation by visiting someone's profile
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              Explore Posts
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
