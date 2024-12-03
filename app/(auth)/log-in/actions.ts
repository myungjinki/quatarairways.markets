"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { z } from "zod";
import {
  EMAIL_MIN_ERROR,
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/app/lib/constants";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";

const formSchema = z.object({
  email: z.string().min(1, { message: EMAIL_MIN_ERROR }).regex(EMAIL_REGEX, EMAIL_REGEX_ERROR),
  password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
        },
      };
    }
  }
}
