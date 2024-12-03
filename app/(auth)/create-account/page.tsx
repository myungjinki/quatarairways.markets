"use client";

import { useFormState } from "react-dom";
import handleCreateAccountForm from "./actions";
import Input from "@/app/components/input";
import Button from "@/app/components/button";

export default function CreateAccountPage() {
  const [state, dispatch] = useFormState(handleCreateAccountForm, null);
  return (
    <main>
      <h1>Create Account</h1>
      <form action={dispatch}>
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
    </main>
  );
}
