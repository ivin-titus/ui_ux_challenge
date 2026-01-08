"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import { Message } from "@/lib/types";
import { Avatar, Button } from "@/components/ui";
import { sendMessage } from "@/lib/actions/messages";

interface MessageThreadProps {
  conversationId: string;
  initialMessages: Message[];
  currentUserId: string;
  otherParticipant: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
  };
}

export function MessageThread({
  conversationId,
  initialMessages,
  currentUserId,
  otherParticipant,
}: MessageThreadProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isPending) return;

    const content = newMessage.trim();
    setNewMessage("");

    // Optimistic update
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      conversationId,
      senderId: currentUserId,
      content,
      createdAt: new Date(),
      read: false,
    };
    setMessages((prev) => [...prev, optimisticMessage]);

    startTransition(async () => {
      const result = await sendMessage(conversationId, content);
      if (result.success && result.message) {
        // Replace optimistic message with real one
        setMessages((prev) =>
          prev.map((m) => (m.id === optimisticMessage.id ? result.message! : m))
        );
      }
    });

    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-800">
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

        <Link
          href={`/u/${otherParticipant.username}`}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Avatar
            src={otherParticipant.avatar}
            name={otherParticipant.name}
            size="md"
          />
          <div>
            <span className="font-medium text-slate-900 dark:text-white block">
              {otherParticipant.name}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              @{otherParticipant.username}
            </span>
          </div>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">
            <p>Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === currentUserId;
            const formattedTime = new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }).format(new Date(message.createdAt));

            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    isOwn
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-br-md"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwn
                        ? "text-slate-300 dark:text-slate-500"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {formattedTime}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-slate-200 dark:border-slate-800"
      >
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending || !newMessage.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
