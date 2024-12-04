"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { UserUpdate } from "../actions";
import Input from "@/app/components/input";
import { redirect } from "next/navigation";

export default function UserUpdateForm({ user }: { user: User }) {
  const [state, dispatch] = useFormState(UserUpdate, { success: false, data: user });
  if (state.success) {
    alert("Successfully updated");
    redirect(`/users/${user.username}`);
  }
  return (
    <form action={dispatch}>
      <div>
        <div>Profile</div>
        <div>
          <span>Username: {user.username}</span>
        </div>
        <div>
          <span>Password: </span>
          <Input name="password" type="password" errors={state.errors?.fieldErrors.password} />
        </div>
        <div>
          <span>Confirm Password: </span>
          <Input name="confirm_password" type="password" errors={state.errors?.fieldErrors.confirm_password} />
        </div>
        <div>
          <span>Email: </span>
          <Input name="email" type="email" errors={state.errors?.fieldErrors.email} />
        </div>
        <div>
          <span>Bio: </span>
          <Input name="bio" type="text" />
        </div>
      </div>
      <button>Save</button>
    </form>
  );
}
