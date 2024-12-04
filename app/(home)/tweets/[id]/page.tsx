import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { formatToTimeAgo } from "@/app/lib/utils";
import TweetLike from "../../components/tweet-like";
import Response from "../../components/response";

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
    <div>
      <div>{tweet.tweet}</div>
      <div>
        <div>{tweet.user.username}</div>
        <div>{formatToTimeAgo(tweet.created_at.toString())}</div>
        <TweetLike likeCount={likeCount} isLiked={isLiked} tweetId={id} />
      </div>
      <Response tweetId={id} />
      {responses.map((response, index) => (
        <div key={index}>
          <div>{response.payload}</div>
          <div>{response.user.username}</div>
        </div>
      ))}
    </div>
  );
}
