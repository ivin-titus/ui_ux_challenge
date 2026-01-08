"use client";

import { useState, useTransition } from "react";
import { followUser, unfollowUser } from "@/lib/actions/social";
import { Button } from "@/components/ui";

interface FollowButtonProps {
  userId: string;
  initialIsFollowing: boolean;
}

export function FollowButton({
  userId,
  initialIsFollowing,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const action = isFollowing ? unfollowUser : followUser;

    // Optimistic update
    setIsFollowing(!isFollowing);

    startTransition(async () => {
      const result = await action(userId);
      if (!result.success) {
        // Revert on failure
        setIsFollowing(isFollowing);
      }
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant={isFollowing ? "secondary" : "primary"}
      disabled={isPending}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
