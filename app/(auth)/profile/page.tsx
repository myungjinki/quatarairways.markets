import { notFound, redirect } from "next/navigation";
import getSession from "@/app/lib/session";
import { getUser } from "./actions";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    return notFound();
  }
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
