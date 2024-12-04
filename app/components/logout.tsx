import { redirect } from "next/navigation";
import getSession from "../lib/session";
import { ROUTE } from "../lib/constants";

export default function Logout() {
  const handleLogout = async () => {
    "use server";

    const session = await getSession();
    session.destroy();
    redirect(ROUTE.LOGIN);
  };

  return (
    <form action={handleLogout}>
      <button>Sign out</button>
    </form>
  );
}
