"use server";

import bcrypt from "bcrypt";
import db from "@/app/lib/db";
import { User } from "@prisma/client";
import { userUpdateFormSchema } from "./validation";

export async function UserUpdate(
  prevState: {
    success: Boolean;
    data: User;
  },
  formData: FormData
) {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    email: formData.get("email"),
    bio: formData.get("bio"),
  };
  const result = await userUpdateFormSchema.spa(data);
  if (!result.success) {
    return {
      success: false,
      data: prevState.data,
      errors: result.error.flatten(),
    };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.update({
      where: {
        username: result.data.username,
      },
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
        bio: result.data.bio,
      },
    });
    return {
      success: true,
      data: user,
    };
  }
}
