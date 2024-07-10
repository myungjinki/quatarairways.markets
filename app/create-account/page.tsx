"use client";

import FormBtn from "@/components/button";
import FormInput from "@/components/input";
import Image from "next/image";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function Home() {
  const [state, action] = useFormState(createAccount, null);

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
          src="/user.svg"
          name="username"
          type="text"
          placeholder="Username"
          errors={state?.errors?.fieldErrors.username}
        />
        <FormInput
          src="/key.svg"
          name="password"
          type="password"
          placeholder="Password"
          errors={state?.errors?.fieldErrors.password}
        />
        <FormInput
          src="/key.svg"
          name="confirm_password"
          type="password"
          placeholder="Password confirm"
          errors={state?.errors?.fieldErrors.confirm_password}
        />
        <FormBtn text="Sign up" />
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
          <span className="pl-3">Welcome!</span>
        </div>
      </form>
    </main>
  );
}
