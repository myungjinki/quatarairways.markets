"use client";
import { useFormState } from "react-dom";

import Button from "@/app/components/button";
import { addForm } from "../actions";
import Input from "@/app/components/input";

export default function AddTweet() {
  const [state, action] = useFormState(addForm, null);
  return (
    <form action={action}>
      <Input name="tweet" />
      <Button>Post</Button>
      {state?.fieldErrors.tweet}
    </form>
  );
}
