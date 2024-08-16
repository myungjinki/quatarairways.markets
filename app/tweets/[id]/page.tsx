import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";
import getSession from "@/lib/session";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import TweetLike from "@/components/tweet-like";
import Response from "@/components/response";

export async function getTweet(id: number) {
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

export default async function tweetDetail({
  params,
}: {
  params: { id: string };
}) {
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
    <div className="flex flex-col items-center mt-5 h-svh gap-2 mx-auto *:w-3/4">
      <div className="border p-5 rounded-md border-black">{tweet.tweet}</div>
      <div className="flex justify-between p-2 border-2 border-black">
        <div>{tweet.user.username}</div>
        <div>{formatToTimeAgo(tweet.created_at.toString())}</div>
        <TweetLike likeCount={likeCount} isLiked={isLiked} tweetId={id} />
      </div>
      <hr />
      <Response tweetId={id} />
      {responses.map((response, index) => (
        <div key={index} className="border p-2">
          <div>{response.payload}</div>
          <div>{response.user.username}</div>
        </div>
      ))}
    </div>
  );
}
