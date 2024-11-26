"use client";

import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import Button from "./components/button";
import Input from "./components/input";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <main>
      <form action={action}>
        <Input name="email" type="email" placeholder="Email" />
        <Input name="string" type="string" placeholder="Username" />
        <Input name="password" type="password" placeholder="Password" error={state?.error} />
        <Button>Log in</Button>
        <div>
          <span>Welcome back!</span>
        </div>
      </form>
    </main>
  );
}
