import Link from "next/link";
import LoginForm from "./components/login-form";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-9/12 gap-4">
        <h2>Log in to your account</h2>
        <LoginForm />
        <div className="flex gap-1">
          <span>Not a member?</span>
          <Link href="/create-account">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
