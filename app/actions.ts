"use server";

export async function handleForm(prevState: any, formData: FormData) {
  const password = formData.get("password");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (password !== "12345") {
    return {
      success: false,
      error: "wrong password",
    };
  }
  return {
    success: true,
  };
}
