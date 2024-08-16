import getSession from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

async function signOut() {
  "use server";
  const session = await getSession();
  if (session.id) {
    session.destroy();
  }
  redirect("/log-in");
}

export default async function Header() {
  const session = await getSession();
  return (
    <div className="flex items-center bg-neutral-300 justify-between p-5 *:bg-amber-200 *:size-16 *:flex *:items-center *:justify-center *:rounded-lg">
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
      {session.id ? (
        <form action={signOut}>
          <button>Sign out</button>
        </form>
      ) : (
        <>
          {" "}
          <Link href="/log-in">Sign in</Link>
          <Link href="/create-account">Sign up</Link>
        </>
      )}
    </div>
  );
}
