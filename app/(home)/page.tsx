import { getInitialTweets } from "./actions";
import AddTweet from "./components/tweet-add";
import TweetListWrapper from "./components/tweet-list-wrapper";

export default async function Home() {
  const initialTweets = await getInitialTweets(0);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-full max-w-xl gap-4 px-4">
        <AddTweet />
        <TweetListWrapper initialTweets={initialTweets} />
      </div>
    </div>
  );
}
