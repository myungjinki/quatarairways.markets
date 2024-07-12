import db from "@/lib/db";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
  return db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      tweet: true,
      user: true,
      created_at: true,
    },
  });
}

export default async function tweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }
  return (
    <div className="flex flex-col items-center justify-center h-svh">
      <div>{tweet.user.username}</div>
      <div>{tweet.tweet}</div>
      <div>{tweet.created_at.toString()}</div>
    </div>
  );
}
