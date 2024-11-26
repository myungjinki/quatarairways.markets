"use client";

import { useFormStatus } from "react-dom";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button {...props} disabled={pending}>
      {pending ? "Loading..." : props.children}
    </button>
  );
}
