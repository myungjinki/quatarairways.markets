"use client";

import { useFormStatus } from "react-dom";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      disabled={pending || props.disabled}
      className="flex justify-center w-full p-4 font-bold text-white rounded-full bg-primary-500 disabled:opacity-50"
    >
      {pending ? "Loading..." : props.children}
    </button>
  );
}
