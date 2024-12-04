import Link from "next/link";
import { notFound } from "next/navigation";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { formatToTimeAgo } from "@/app/lib/utils";

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

export default async function UsersPage({ params }: { params: { username: string } }) {
  const session = await getSession();
  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }
  const isOwner = session.id! === user.id;

  return (
    <div>
      <div>
        <div>
          <div>Profile</div>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
          <div className="self-end">Bio: {user.bio}</div>
        </div>
        {isOwner && <Link href={`${user.username}/edit`}>Edit</Link>}
      </div>
      <div>
        {user.Tweet.map((tweet, index) => (
          <Link href={`/tweets/${tweet.id}`} key={index}>
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
