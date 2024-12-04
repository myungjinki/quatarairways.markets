import { z } from "zod";
import { EMAIL_REGEX, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/app/lib/constants";
import db from "@/app/lib/db";

const checkPasswords = ({ password, confirm_password }: { password: string; confirm_password: string }) =>
  password === confirm_password;

export const userUpdateFormSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
      })
      .toLowerCase()
      .min(5)
      .trim(),
    email: z.string().email().toLowerCase().regex(EMAIL_REGEX, "Must be @zod.com"),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    bio: z.string().optional(),
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
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });
