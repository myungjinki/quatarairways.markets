import TweetList from "./components/tweet-list";
import AddTweet from "./components/tweet-add";
import { getInitialTweets } from "./actions";

export default async function Home() {
  const initialTweets = await getInitialTweets(0);
  return (
    <div>
      <AddTweet />
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
