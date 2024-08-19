"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { userUpdateFormSchema } from "./validation";
import { User } from "@prisma/client";

export async function UserUpdate(
  prevState: {
    success: Boolean;
    data: User;
    errors: { [key: string]: string[] };
  },
  formData: FormData
) {
  const data = {
    username: prevState.data.username,
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
