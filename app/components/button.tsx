"use client";

import { useFormStatus } from "react-dom";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({ className = "", ...props }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      disabled={pending || props.disabled}
      className={`flex justify-center w-full p-4 font-bold text-white rounded-full bg-primary-500 disabled:opacity-50 ${className}`}
    >
      {pending ? "Loading..." : props.children}
    </button>
  );
}
