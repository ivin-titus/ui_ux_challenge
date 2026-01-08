import { redirect, notFound } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { MessageThread } from "@/components/messages";
import { getSession } from "@/lib/data/session";
import { getConversation } from "@/lib/actions/messages";

interface ConversationPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ConversationPageProps) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    return { title: "Sign In | Axis" };
  }

  const data = await getConversation(id);

  return {
    title: data
      ? `${data.otherParticipant.name} | Messages`
      : "Conversation | Axis",
  };
}

export default async function ConversationPage({
  params,
}: ConversationPageProps) {
  const session = await getSession();
  if (!session) {
    redirect("/auth");
  }

  const { id } = await params;
  const data = await getConversation(id);

  if (!data) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <MessageThread
          conversationId={data.conversation.id}
          initialMessages={data.messages}
          currentUserId={session.id}
          otherParticipant={data.otherParticipant}
        />
      </div>
    </MainLayout>
  );
}
