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
    <div>
      <div>
        {tweets.map((tweet, index) => (
          <Link href={`${ROUTE.TWEETS}/${tweet.id}`} key={index}>
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
