import { notFound } from "next/navigation";
import { getUser } from "./actions";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    return notFound();
  }
  return (
    <div>
      <h1>Welcome! {user?.username}!</h1>
    </div>
  );
}
