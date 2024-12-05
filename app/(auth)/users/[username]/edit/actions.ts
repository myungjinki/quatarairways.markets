"use server";

import bcrypt from "bcrypt";
import db from "@/app/lib/db";
import { User } from "@prisma/client";
import { userUpdateFormSchema } from "./validation";

export async function UserUpdate(
  prevState: {
    success: Boolean;
    user: User;
  },
  formData: FormData
) {
  const { success, data, error } = await userUpdateFormSchema.spa({
    username: formData.get("username") || prevState.user.username,
    email: formData.get("email") || prevState.user.email,
    password: formData.get("password") || "",
    confirm_password: formData.get("confirm_password") || "",
    bio: formData.get("bio") || prevState.user.bio,
  });
  if (!success) {
    return {
      success: false,
      user: prevState.user,
      errors: error.flatten(),
    };
  } else {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await db.user.update({
      where: {
        username: data.username,
      },
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        bio: data.bio,
      },
    });
    return {
      success: true,
      user: user,
    };
  }
}
