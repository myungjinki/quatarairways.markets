import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getUser(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      Tweet: {
        orderBy: {
          created_at: "desc",
        },
        include: {
          user: true,
        },
      },
    },
  });
  return user;
}

export default async function User({
  params,
}: {
  params: { username: string };
}) {
  const session = await getSession();
  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }
  const isOwner = session.id! === user.id;
  return (
    <div className="flex flex-col w-full gap-2 items-start">
      <div className="flex justify-between w-full">
        <div className="ml-5 mt-5">
          <div>Profile</div>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
          <div className="self-end">Bio: {user.bio}</div>
        </div>
        {isOwner && (
          <Link
            className="self-end mr-5 border border-black rounded-md p-2 hover:bg-gray-200"
            href={`${user.username}/edit`}
          >
            Edit
          </Link>
        )}
      </div>
      <div className="w-full h-1 bg-black"></div>
      <div className="flex flex-col gap-5 items-center mt-10 w-full">
        {user.Tweet.map((tweet, index) => (
          <Link
            href={`/tweets/${tweet.id}`}
            className="flex border-black p-10 rounded-sm m-5 w-96 border-4 gap-5 justify-between items-center break-all"
            key={index}
          >
            <div>{tweet.id}</div>
            <div>{tweet.tweet}</div>
            <div>
              <div>{tweet.user.username}</div>
              <div>{formatToTimeAgo(tweet.created_at.toString())}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
