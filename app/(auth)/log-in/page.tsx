import Link from "next/link";
import LoginForm from "../components/login-form";
import { ROUTE } from "@/app/lib/constants";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-[512px] gap-4 p-4 rounded-2xl md:bg-white">
        <h2>Log in to your account</h2>
        <LoginForm />
        <div className="flex gap-1">
          <span>Not a member?</span>
          <Link href={ROUTE.CREATE_ACCOUNT}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
