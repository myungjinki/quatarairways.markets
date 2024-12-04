import Link from "next/link";
import { ROUTE } from "../lib/constants";

export default function Header() {
  return (
    <header className="flex justify-between p-8">
      <div>
        <Link href={ROUTE.HOME}>LOGO</Link>
      </div>
      <div className="flex gap-4">
        <Link href={ROUTE.LOGIN}>USER</Link>
        <div>MENU</div>
      </div>
    </header>
  );
}
