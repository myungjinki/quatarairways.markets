import Image from "next/image";
import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  svg?: string;
  errors?: string[];
}
export default function Input({ svg, errors, name, ...props }: InputProps) {
  return (
    <div className="w-full">
      <div className="flex p-4 rounded-xl ring-2 ring-neutral-300">
        {svg && <Image src={svg} alt={name} width="30" height="30" />}
        <input name={name} type={props.type} placeholder={props.placeholder} required={props.required} />
      </div>
      {errors?.map((error) => (
        <span key={error}>{error}</span>
      ))}
    </div>
  );
}
