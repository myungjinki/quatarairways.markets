"use client";

import { getMoreTweets } from "@/app/action";
import { InitialTweets } from "@/app/page";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [page, setPage] = useState(0);
  const [tweets, setTweets] = useState(initialTweets);
  useEffect(() => {
    const getTweets = async () => {
      const newTweets = await getMoreTweets(page);
      setTweets(newTweets);
    };
    getTweets();
  }, [page]);
  function onClickLeft() {
    if (page > 0) setPage((prev) => prev - 1);
  }
  function onClickRight() {
    if (tweets) setPage((prev) => prev + 1);
  }
  return (
    <div className="flex flex-col gap-5 items-center mt-10">
      <div>
        {tweets.map((tweet, index) => (
          <Link
            href={`/tweets/${tweet.id}`}
            className="flex border-black p-10 rounded-sm m-5 w-96 border-4 gap-5 justify-between"
            key={index}
          >
            <div>{tweet.id}</div>
            <div>{tweet.tweet}</div>
            <div>{formatToTimeAgo(tweet.created_at.toString())}</div>
          </Link>
        ))}
      </div>
      <div>
        <button onClick={onClickLeft}>&larr;</button>
        <button onClick={onClickRight}>&rarr;</button>
      </div>
    </div>
  );
}
