"use client";

import { useFormState } from "react-dom";
import addResponse from "../tweets/[id]/actions";
import Input from "@/app/components/input";
import Button from "@/app/components/button";

interface ReplyFormProps {
  tweetId: number;
}

export default function ReplyForm({ tweetId }: ReplyFormProps) {
  const [_, dispatch] = useFormState(addResponse, tweetId);
  return (
    <form action={dispatch} className="grid grid-cols-2 gap-4">
      <Input name="response" />
      <Button>Reply</Button>
    </form>
  );
}
