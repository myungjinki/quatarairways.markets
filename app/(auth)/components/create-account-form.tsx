"use client";

import { useFormState } from "react-dom";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import handleCreateAccountForm from "../create-account/actions";

export default function CreateAccountForm() {
  const [state, dispatch] = useFormState(handleCreateAccountForm, null);
  return (
    <form action={dispatch} className="flex flex-col items-start w-full gap-4 pb-8 border-b-2 border-neutral-300">
      <Input name="username" type="text" placeholder="Username" errors={state?.errors.fieldErrors.username} />
      <Input name="email" type="email" placeholder="Email" errors={state?.errors.fieldErrors.email} />
      <Input name="password" type="password" placeholder="Password" errors={state?.errors.fieldErrors.password} />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        errors={state?.errors.fieldErrors.confirmPassword}
      />
      <Button>Create Account</Button>
    </form>
  );
}
