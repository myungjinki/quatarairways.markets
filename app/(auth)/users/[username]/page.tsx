import Link from "next/link";
import { notFound } from "next/navigation";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import TweetList from "@/app/(home)/components/tweet-list";
import UserProfile from "./edit/components/user-profile";

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
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-full gap-4">
        <div className="self-center text-2xl">Profile</div>
        <UserProfile user={user} isOwner={isOwner} />
        <div className="flex flex-col w-full max-w-xl gap-4 px-4 pt-16">
          <TweetList tweets={user.Tweet} />
        </div>
      </div>
    </div>
  );
}
