import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center bg-neutral-300 justify-between p-5 *:bg-amber-200 *:size-16 *:flex *:items-center *:justify-center *:rounded-lg">
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/log-in">Sign in</Link>
      <Link href="/create-account">Sign up</Link>
    </div>
  );
}
