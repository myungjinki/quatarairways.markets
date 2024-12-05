import Link from "next/link";
import { formatToTimeAgo } from "@/app/lib/utils";
import { Tweet } from "@prisma/client";
import { ROUTE } from "@/app/lib/constants";

export default function TweetList({ tweets }: { tweets: Tweet[] }) {
  return (
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
  );
}
