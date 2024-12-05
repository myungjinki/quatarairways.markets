"use server";

import Link from "next/link";
import { ROUTE } from "../lib/constants";
import getSession from "../lib/session";
import Logout from "./logout";

export default async function Header() {
  const session = await getSession();
  const user = session.id;
  return (
    <header className="flex justify-between p-8">
      <div>
        <Link href={ROUTE.HOME}>Logo</Link>
      </div>
      <div className="flex gap-4 md:hidden">
        <Link href={ROUTE.LOGIN}>User Icon</Link>
        <div>Menu Icon</div>
      </div>
      <div className="hidden gap-4 md:flex">
        <Link href={ROUTE.SEARCH}>Search Icon</Link>
        {!user ? (
          <>
            <Link href={ROUTE.LOGIN}>Log in</Link>
            <span>|</span>
            <Link href={ROUTE.CREATE_ACCOUNT}>Sign up</Link>
          </>
        ) : (
          <Logout />
        )}
      </div>
    </header>
  );
}
