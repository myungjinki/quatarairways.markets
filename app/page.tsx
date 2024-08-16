import TweetList from "@/components/tweet-list";
import { Tweet } from "@prisma/client";
import AddTweet from "@/components/tweet-create";
import { getInitialTweets } from "./action";

export default async function Home() {
  const initialTweets: Tweet[] = await getInitialTweets(0);

  return (
    <div>
      <AddTweet />
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
