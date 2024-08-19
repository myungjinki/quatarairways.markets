import getSession from "@/lib/session";
import { getUser } from "../page";
import { notFound } from "next/navigation";
import Form from "./components";

export default async function UserEdit({
  params,
}: {
  params: { username: string };
}) {
  const session = await getSession();
  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }
  if (session.id !== user.id) {
    notFound();
  }
  return <Form user={user} />;
}
