"use client";

import { useState } from "react";
import Link from "next/link";
import { SessionUser, Post } from "@/lib/types";
import {
  Card,
  CardContent,
  Button,
  Avatar,
  AvatarViewer,
  ProfileEditor,
} from "@/components/ui";

interface ProfileCardProps {
  user: SessionUser;
  posts: Post[];
}

export function ProfileCard({ user, posts }: ProfileCardProps) {
  const [showAvatarViewer, setShowAvatarViewer] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const memberSince = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(user.createdAt));

  return (
    <div className="space-y-8">
      {/* User info */}
      <Card>
        <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <Avatar
            src={user.avatar}
            name={user.name}
            size="xl"
            onClick={user.avatar ? () => setShowAvatarViewer(true) : undefined}
          />

          {/* User details */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">{user.email}</p>

            {user.bio && (
              <p className="mt-3 text-slate-600 dark:text-slate-400 whitespace-pre-line">
                {user.bio}
              </p>
            )}

            <p className="mt-3 text-sm text-slate-400 dark:text-slate-500">
              Member since {memberSince}
            </p>

            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={() => setShowEditor(true)}
            >
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Avatar viewer modal */}
      {user.avatar && (
        <AvatarViewer
          src={user.avatar}
          name={user.name}
          isOpen={showAvatarViewer}
          onClose={() => setShowAvatarViewer(false)}
        />
      )}

      {/* Profile editor modal */}
      <ProfileEditor
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        currentName={user.name}
        currentBio={user.bio}
        currentAvatar={user.avatar}
      />

      {/* User's posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Your Posts
          </h3>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>

        {posts.length > 0 ? (
          <Card>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {posts.map((post) => {
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                }).format(new Date(post.createdAt));

                return (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <span className="font-medium text-slate-900 dark:text-white truncate block">
                          {post.title}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          {post.visibility === "authenticated" && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                              Members
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0">
                        {formattedDate}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                You haven't written any posts yet.
              </p>
              <Link
                href="/blog/create"
                className="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Write your first post →
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
