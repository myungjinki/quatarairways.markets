"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatToTimeAgo } from "@/app/lib/utils";
import { getInitialTweets, getMoreTweets } from "../actions";
import { Prisma } from "@prisma/client";
import { ROUTE } from "@/app/lib/constants";

type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

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
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-center w-full gap-4">
        <button onClick={onClickLeft}>&larr;</button>
        <button onClick={onClickRight}>&rarr;</button>
      </div>
      <div className="flex flex-col gap-4">
        {tweets.map((tweet, index) => (
          <Link
            href={`${ROUTE.TWEETS}/${tweet.id}`}
            key={index}
            className="flex w-full h-full gap-4 pb-4 border-b-2 border-neutral-300"
          >
            <div className="rounded-md size-24 bg-neutral-300"></div>
            <div>
              <div className="text-lg">{tweet.tweet}</div>
              <div className="text-sm">{formatToTimeAgo(tweet.created_at.toString())}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
