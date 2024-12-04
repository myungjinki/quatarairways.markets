"use client";

import { useFormState } from "react-dom";
import addResponse from "../tweets/[id]/actions";
import Input from "@/app/components/input";

interface ResponseProps {
  tweetId: number;
}

export default function Response({ tweetId }: ResponseProps) {
  const [state, action] = useFormState(addResponse, tweetId);
  return (
    <form action={action}>
      <Input name="response" />
      <button>Reply</button>
    </form>
  );
}
