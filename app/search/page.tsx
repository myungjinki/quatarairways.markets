"use client";

import { useFormState } from "react-dom";
import { SearchAction } from "./action";
import Link from "next/link";
import { formatToTimeAgo } from "@/lib/utils";

export default function Search() {
  const [tweets, action] = useFormState(SearchAction, []);
  return (
    <main className="flex flex-col items-center mt-5">
      <form className="" action={action}>
        <input name="keyword" type="text" />
        <button>Search</button>
      </form>
      <div className="flex flex-col gap-5 items-center mt-10">
        {tweets.map((tweet, index) => (
          <Link
            href={`/tweets/${tweet.id}`}
            className="flex border-black p-10 rounded-sm m-5 w-96 border-4 gap-5 justify-between items-center break-all"
            key={index}
          >
            <div>{tweet.id}</div>
            <div>{tweet.tweet}</div>
            <div>
              <div>{tweet.user.username}</div>
              <div>{formatToTimeAgo(tweet.created_at.toString())}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
