import { notFound, redirect } from "next/navigation";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function ProfilePage() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/log-in");
  };
  return (
    <div>
      <h1>Welcome! {user?.username}!</h1>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
