"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { UserUpdate } from "./action";

export default function Form({ user }: { user: User }) {
  //@ts-ignore
  const [state, dispatch] = useFormState(UserUpdate, { data: user });
  if (state.success) {
    alert("Successfully updated");
  }
  return (
    <form className="flex justify-between w-full" action={dispatch}>
      <div className="ml-5 mt-5">
        <div>Profile</div>
        <div>
          <span>Username: {user.username}</span>
        </div>
        <div>
          <span>Password: </span>
          <input name="password" type="password" />
          {state.errors?.fieldErrors.password?.map((error, index) => (
            <div key={index} className="text-red-700">
              {error}
            </div>
          ))}
        </div>
        <div>
          <span>Confirm Password: </span>
          <input name="confirm_password" type="password" />
          {state.errors?.fieldErrors.confirm_password?.map((error, index) => (
            <div key={index} className="text-red-700">
              {error}
            </div>
          ))}
        </div>
        <div>
          <span>Email: </span>
          <input name="email" type="email" />
          {state.errors?.fieldErrors.email?.map((error, index) => (
            <div key={index} className="text-red-700">
              {error}
            </div>
          ))}
        </div>
        <div className="self-end">
          <span>Bio: </span>
          <input name="bio" type="text" />
        </div>
      </div>
      <button className="self-end mr-5 border border-black rounded-md p-2 hover:bg-gray-200">
        Save
      </button>
    </form>
  );
}
