"use client";

import { useEffect, useState } from "react";
import { getInitialTweets, getMoreTweets } from "../actions";
import { Prisma } from "@prisma/client";
import TweetList from "./tweet-list";

type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetListWrapper({ initialTweets }: TweetListProps) {
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
      <TweetList tweets={tweets} />
    </div>
  );
}
