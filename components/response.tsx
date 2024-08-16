"use client";

import addResponse from "@/app/tweets/[id]/action";
import { useFormState } from "react-dom";

interface ResponseProps {
  tweetId: number;
}

export default function Response({ tweetId }: ResponseProps) {
  const [state, action] = useFormState(addResponse, tweetId);
  return (
    <form className="flex" action={action}>
      <textarea className="w-full" name="response"></textarea>
      <button className="bg-blue-500 text-white">Reply</button>
    </form>
  );
}
