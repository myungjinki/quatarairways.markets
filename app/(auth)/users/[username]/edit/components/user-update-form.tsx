"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { UserUpdate } from "../actions";
import Input from "@/app/components/input";
import { redirect } from "next/navigation";
import { ROUTE } from "@/app/lib/constants";
import Button from "@/app/components/button";
import { useState } from "react";

export default function UserUpdateForm({ user }: { user: User }) {
  const [state, dispatch] = useFormState(UserUpdate, { success: false, user });
  const [bio, setBio] = useState(user.bio);

  if (state.success) {
    alert("Successfully updated");
    redirect(`${ROUTE.USERS}/${user.username}`);
  }
  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <label>
        <span className="span__label">Username</span>
        <Input name="username" type="text" value={user.username} disabled errors={state.errors?.fieldErrors.username} />
      </label>
      <label>
        <span className="span__label">Email</span>
        <Input name="email" type="email" value={user.email} disabled errors={state.errors?.fieldErrors.email} />
      </label>
      <label>
        <span className="span__label">Password</span>
        <Input name="password" type="password" disabled errors={state.errors?.fieldErrors.password} />
      </label>
      <label>
        <span className="span__label">Confirm Password</span>
        <Input name="confirm_password" type="password" disabled errors={state.errors?.fieldErrors.confirm_password} />
      </label>
      <label>
        <span className="span__label">Bio</span>
        <Input name="bio" type="text" onChange={(event) => setBio(event.target.value)} />
      </label>
      <Button>Save</Button>
    </form>
  );
}
