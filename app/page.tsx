import TweetList from "@/components/tweet-list";
import { Prisma, Tweet } from "@prisma/client";
import db from "@/lib/db";
import AddTweet from "@/components/add-tweet";

export async function getInitialTweets(page: number) {
  return await db.tweet.findMany({
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
}
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets: Tweet[] = await getInitialTweets(0);

  return (
    <div>
      <AddTweet />
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
