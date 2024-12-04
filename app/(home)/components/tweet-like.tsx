"use client";

import { startTransition, useOptimistic } from "react";
import { dislikeTweet, likeTweet } from "../tweets/[id]/actions";
interface TweetLikeProps {
  likeCount: number;
  isLiked: boolean;
  tweetId: number;
}
export default function TweetLike({ likeCount, isLiked, tweetId }: TweetLikeProps) {
  const [state, reduceFn] = useOptimistic({ likeCount, isLiked }, (currentState, optimisticValue) => ({
    isLiked: !currentState.isLiked,
    likeCount: currentState.isLiked ? currentState.likeCount - 1 : currentState.likeCount + 1,
  }));
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
      className="h-8 px-2 py-1 text-white rounded-md bg-primary-500"
    >
      {state.isLiked ? "Dislike" : "Like"}
      {` ${state.likeCount}`}
    </button>
  );
}
