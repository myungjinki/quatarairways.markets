"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  EMAIL_EXISTS_ERROR,
  EMAIL_MIN_ERROR,
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  PASSWORD_CONFIRM_ERROR,
  PASSWORD_HASH_ROUNDS,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  ROUTE,
  USERNAME_EXISTS_ERROR,
} from "@/app/lib/constants";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";

const checkPasswords = ({ password, confirmPassword }: { password: string; confirmPassword: string }) =>
  password === confirmPassword;

const formSchema = z
  .object({
    email: z.string().min(1, { message: EMAIL_MIN_ERROR }).regex(EMAIL_REGEX, EMAIL_REGEX_ERROR),
    username: z.string().min(5, "At least 5"),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: USERNAME_EXISTS_ERROR,
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: EMAIL_EXISTS_ERROR,
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: PASSWORD_CONFIRM_ERROR,
    path: ["confirmPassword"],
  });

export default async function handleCreateAccountForm(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return { errors: result.error.flatten() };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, PASSWORD_HASH_ROUNDS);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect(ROUTE.HOME);
  }
}
