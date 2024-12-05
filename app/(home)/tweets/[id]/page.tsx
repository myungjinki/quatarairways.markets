import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { formatToTimeAgo } from "@/app/lib/utils";
import { ROUTE } from "@/app/lib/constants";
import TweetLike from "../../components/tweet-like";
import ReplyForm from "../../components/reply";

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

const getCachedTweet = nextCache(getTweet, ["cached-tweet"], {
  revalidate: 60,
});

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id!;
  const cachedOperation = nextCache(getLikeStatus, ["cached-like-status"], {
    tags: [`like-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
}

async function getResponses(tweetId: number) {
  return db.response.findMany({
    where: {
      tweetId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}

const getCachedResponses = nextCache(getResponses, ["cached-responses"], {
  revalidate: 60,
  tags: ["response"],
});

export default async function tweetDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getCachedTweet(id);
  if (!tweet) {
    return notFound();
  }
  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  const responses = await getCachedResponses(id);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-lg gap-4">
        <div className="self-center rounded-lg w-96 h-96 bg-primary-500"></div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="rounded-full size-16 bg-primary-500"></div>
            <div className="flex flex-col justify-center">
              <Link href={`${ROUTE.USERS}/${tweet.user.username}`}>{tweet.user.username}</Link>
              <div>{formatToTimeAgo(tweet.created_at.toString())}</div>
            </div>
          </div>
          <TweetLike likeCount={likeCount} isLiked={isLiked} tweetId={id} />
        </div>
        <div>
          <div className="text-xl">{tweet.tweet}</div>
        </div>
        <ReplyForm tweetId={id} />
        {responses.map((response, index) => (
          <div key={index} className="pb-2 border-b-2 border-neutral-300">
            <div>{response.payload}</div>
            <Link href={`${ROUTE.USERS}/${response.user.username}`}>{response.user.username}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
