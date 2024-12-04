import { notFound } from "next/navigation";
import getSession from "@/app/lib/session";
import db from "@/app/lib/db";
import UserUpdateForm from "./components/user-update-form";

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

export default async function UserEdit({ params }: { params: { username: string } }) {
  const session = await getSession();
  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }
  if (session.id !== user.id) {
    notFound();
  }
  return <UserUpdateForm user={user} />;
}
