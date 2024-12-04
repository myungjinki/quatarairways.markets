"use client";

import { useFormState } from "react-dom";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { handleForm } from "../log-in/actions";

export default function LoginForm() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <form action={action} className="flex flex-col items-start w-full gap-4 pb-8 border-b-2 border-neutral-300 ">
      <Input name="email" type="email" placeholder="Email" errors={state?.errors?.fieldErrors.email} />
      <Input name="password" type="password" placeholder="Password" errors={state?.errors?.fieldErrors.password} />
      <Button>Log in</Button>
    </form>
  );
}
