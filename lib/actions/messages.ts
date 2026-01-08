"use server";

import { store } from "../data/store";
import { getSession } from "../data/session";
import { Message, Conversation, User } from "../types";

export interface ConversationWithParticipant extends Conversation {
  otherParticipant: Pick<User, "id" | "name" | "username" | "avatar">;
  lastMessage?: Message;
  unreadCount: number;
}

export interface ConversationDetail {
  conversation: Conversation;
  messages: Message[];
  otherParticipant: Pick<User, "id" | "name" | "username" | "avatar">;
}

/**
 * Get all conversations for the current user
 */
export async function getConversations(): Promise<
  ConversationWithParticipant[]
> {
  const session = await getSession();
  if (!session) return [];

  const conversations = store.getConversationsForUser(session.id);

  return conversations.map((conv) => {
    const otherUserId = conv.participants.find((id) => id !== session.id)!;
    const otherUser = store.findUserById(otherUserId);
    const messages = store.getMessages(conv.id);
    const lastMessage = messages[messages.length - 1];
    const unreadCount = messages.filter(
      (m) => m.senderId !== session.id && !m.read
    ).length;

    return {
      ...conv,
      otherParticipant: {
        id: otherUser?.id ?? "",
        name: otherUser?.name ?? "Unknown",
        username: otherUser?.username ?? "unknown",
        avatar: otherUser?.avatar ?? null,
      },
      lastMessage,
      unreadCount,
    };
  });
}

/**
 * Get a single conversation with messages
 */
export async function getConversation(
  conversationId: string
): Promise<ConversationDetail | null> {
  const session = await getSession();
  if (!session) return null;

  const conversation = store.getConversation(conversationId);
  if (!conversation) return null;

  // Check if user is part of this conversation
  if (!conversation.participants.includes(session.id)) return null;

  // Mark messages as read
  store.markMessagesAsRead(conversationId, session.id);

  const messages = store.getMessages(conversationId);
  const otherUserId = conversation.participants.find(
    (id) => id !== session.id
  )!;
  const otherUser = store.findUserById(otherUserId);

  return {
    conversation,
    messages,
    otherParticipant: {
      id: otherUser?.id ?? "",
      name: otherUser?.name ?? "Unknown",
      username: otherUser?.username ?? "unknown",
      avatar: otherUser?.avatar ?? null,
    },
  };
}

/**
 * Start or get existing conversation with a user
 */
export async function startConversation(
  userId: string
): Promise<{ success: boolean; conversationId?: string; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "You must be logged in." };
  }

  if (session.id === userId) {
    return { success: false, error: "You cannot message yourself." };
  }

  const conversation = store.createConversation(session.id, userId);

  return { success: true, conversationId: conversation.id };
}

/**
 * Send a message in a conversation
 */
export async function sendMessage(
  conversationId: string,
  content: string
): Promise<{ success: boolean; message?: Message; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "You must be logged in." };
  }

  if (!content.trim()) {
    return { success: false, error: "Message cannot be empty." };
  }

  const message = store.sendMessage(conversationId, session.id, content.trim());

  if (!message) {
    return { success: false, error: "Failed to send message." };
  }

  return { success: true, message };
}

/**
 * Get unread message count for current user
 */
export async function getUnreadCount(): Promise<number> {
  const session = await getSession();
  if (!session) return 0;

  return store.getUnreadCount(session.id);
}
