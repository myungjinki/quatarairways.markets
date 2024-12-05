"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import db from "@/app/lib/db";
import getSession from "../lib/session";
import { ROUTE, TWEETS_PAGE_SIZE } from "../lib/constants";

export async function getInitialTweets(page: number) {
  return await db.tweet.findMany({
    take: TWEETS_PAGE_SIZE,
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function getMoreTweets(page: number) {
  return await db.tweet.findMany({
    skip: page * TWEETS_PAGE_SIZE,
    take: TWEETS_PAGE_SIZE,
    orderBy: {
      created_at: "desc",
    },
  });
}

const tweetSchema = z.object({
  tweet: z
    .string({
      required_error: "Need",
    })
    .min(1, "Empty tweet")
    .max(200, "Limit 200 words"),
});
export async function addForm(state: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`${ROUTE.TWEETS}/${tweet.id}`);
    }
  }
}
