"use client";

import Link from "next/link";
import CreateAccountForm from "../components/create-account-form";
import { ROUTE } from "@/app/lib/constants";

export default function CreateAccountPage() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-[512px] gap-4 p-4 rounded-2xl md:bg-white">
        <h2>Create Account</h2>
        <CreateAccountForm />
        <div className="flex gap-1">
          <span>Already a member?</span>
          <Link href={ROUTE.LOGIN}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
