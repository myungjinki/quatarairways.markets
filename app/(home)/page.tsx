import TweetList from "./components/tweet-list";
import AddTweet from "./components/tweet-add";
import { getInitialTweets } from "./actions";

export default async function Home() {
  const initialTweets = await getInitialTweets(0);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-full max-w-xl gap-4 px-4">
        <AddTweet />
        <TweetList initialTweets={initialTweets} />
      </div>
    </div>
  );
}
