"use client";

import { useFormStatus } from "react-dom";

export default function FormBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-[#EEEBE7] w-[23rem] p-3 rounded-full text-sm font-bold  hover:bg-[#CFCCC8] active:scale-95 transition-all duration-300 disabled:bg-[#D0CACE] disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Loading..." : "Log in"}
    </button>
  );
}
