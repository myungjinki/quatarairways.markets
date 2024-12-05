"use client";

import { useFormState } from "react-dom";
import { SearchAction } from "./actions";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import TweetList from "../components/tweet-list";

export default function Search() {
  const [tweets, dispatch] = useFormState(SearchAction, []);

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto">
      <form action={dispatch} className="flex gap-4">
        <Input name="keyword" type="text" />
        <Button className="w-32">Search</Button>
      </form>
      <TweetList tweets={tweets} />
    </div>
  );
}
