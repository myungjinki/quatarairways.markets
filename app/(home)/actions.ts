"use server";

import db from "@/app/lib/db";

export async function getMoreTweets(page: number) {
  console.log(page);
  return await db.tweet.findMany({
    skip: page * 5,
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
}
