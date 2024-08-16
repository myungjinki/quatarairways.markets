"use client";

import { useFormState } from "react-dom";
import FormBtn from "./button";
import { addForm } from "@/app/action";

export default function AddTweet() {
  const [state, action] = useFormState(addForm, null);
  return (
    <form
      action={action}
      className="flex flex-col items-center justify-center gap-5 pt-5"
    >
      <textarea name="tweet" className="w-80" />
      <FormBtn text="Post" />
      {state?.fieldErrors.tweet}
    </form>
  );
}
