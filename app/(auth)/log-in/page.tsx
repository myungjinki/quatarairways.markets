"use client";

import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import Button from "../../components/button";
import Input from "../../components/input";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <main>
      <form action={action}>
        <Input name="email" type="email" placeholder="Email" errors={state?.errors?.fieldErrors.email} />
        <Input name="password" type="password" placeholder="Password" errors={state?.errors?.fieldErrors.password} />
        <Button>Log in</Button>
      </form>
    </main>
  );
}
