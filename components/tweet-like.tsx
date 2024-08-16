"use client";

import { dislikeTweet, likeTweet } from "@/app/tweets/[id]/action";
import { startTransition, useOptimistic } from "react";

interface TweetLikeProps {
  likeCount: number;
  isLiked: boolean;
  tweetId: number;
}

export default function TweetLike({
  likeCount,
  isLiked,
  tweetId,
}: TweetLikeProps) {
  const [state, reduceFn] = useOptimistic(
    { likeCount, isLiked },
    (currentState, optimisticValue) => ({
      isLiked: !currentState.isLiked,
      likeCount: currentState.isLiked
        ? currentState.likeCount - 1
        : currentState.likeCount + 1,
    })
  );
  const onClick = async () => {
    reduceFn(null);
    if (state.isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };
  return (
    <button
      onClick={() => {
        startTransition(() => {
          onClick();
        });
      }}
      className="bg-blue-500 text-white"
    >
      {state.isLiked ? "Dislike" : "Like"}
      {` ${state.likeCount}`}
    </button>
  );
}
