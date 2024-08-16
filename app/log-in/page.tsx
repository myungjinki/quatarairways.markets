"use client";

import FormBtn from "@/components/button";
import FormInput from "@/components/input";
import Image from "next/image";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import Link from "next/link";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <main className="flex flex-col justify-center items-center p-16 max-w-screen-lg">
      <Image className="" src="/fire.svg" alt="" width="50" height="50" />
      <form action={action} className="flex flex-col items-center pt-10 w-96">
        <FormInput
          src="/mail.svg"
          name="email"
          type="email"
          placeholder="Email"
          errors={state?.errors?.fieldErrors.email}
        />
        <FormInput
          src="/key.svg"
          name="password"
          type="password"
          placeholder="Password"
          errors={state?.errors?.fieldErrors.password}
        />
        <FormBtn text="Log in" />
        <Link
          className="bg-[#EEEBE7] w-[23rem] p-3 rounded-full text-sm font-bold  hover:bg-[#CFCCC8] active:scale-95 transition-all duration-300 mt-2 text-center"
          href="/create-account"
        >
          Create Account
        </Link>
        <div
          className={`flex border-2 rounded-2xl h-14 w-[23rem] m-2 p-1 items-center bg-[#32BC6E] ${
            state?.success ? "" : "hidden"
          }`}
        >
          <Image
            className="p-1"
            src="/check-badge.svg"
            alt=""
            width="30"
            height="30"
          />
          <span className="pl-3">Welcome back!</span>
        </div>
      </form>
    </main>
  );
}
