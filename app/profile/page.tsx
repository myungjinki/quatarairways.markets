import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { getUser } from "./action";

export default async function Profile() {
  const user = await getUser();
  if (!user) {
    notFound();
  }
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/log-in");
  };
  return (
    <div className="w-screen h-svh flex flex-col items-center justify-center gap-10">
      <h1>Welcome! {user?.username}!</h1>
      <form action={logOut}>
        <button className="bg-[#EEEBE7] w-[23rem] p-3 rounded-full text-sm font-bold  hover:bg-[#CFCCC8] active:scale-95 transition-all duration-300">
          Log out
        </button>
      </form>
    </div>
  );
}
