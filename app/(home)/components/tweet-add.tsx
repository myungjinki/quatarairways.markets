"use client";

import { useFormState } from "react-dom";

import Button from "@/app/components/button";
import { addForm } from "../actions";
import Input from "@/app/components/input";
import { useState } from "react";

export default function AddTweet() {
  const [state, action] = useFormState(addForm, null);
  const [message, setMessage] = useState("");

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setMessage(event.currentTarget.value);
    console.log(message);
  }

  return (
    <form action={action} className="flex flex-col w-full gap-2">
      <Input name="tweet" value={message} onChange={handleChange} />
      <Button disabled={message === "" ? true : false}>Post</Button>
      {state?.fieldErrors.tweet}
    </form>
  );
}
