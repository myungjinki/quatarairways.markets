"use server";

import { z } from "zod";
const passwordRegex = new RegExp(/\d/);
const emailRegex = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@zod.com$/);
const FormSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).regex(emailRegex, "Must be @zod"),
  username: z.string().min(5, "At least 5"),
  password: z.string().min(10).regex(passwordRegex, "Must contain at least 1 digit"),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = FormSchema.safeParse(data);
  console.log(prevState);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    };
  } else {
    return {
      success: true,
    };
  }
}
