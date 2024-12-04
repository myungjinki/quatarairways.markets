"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { formatToTimeAgo } from "@/app/lib/utils";
import { SearchAction } from "./actions";
import Input from "@/app/components/input";
import Button from "@/app/components/button";

export default function Search() {
  const [tweets, dispatch] = useFormState(SearchAction, []);

  return (
    <main>
      <form action={dispatch}>
        <Input name="keyword" type="text" />
        <Button>Search</Button>
      </form>
      <div>
        {tweets.map((tweet, index) => (
          <Link key={index} href={`/tweets/${tweet.id}`}>
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
