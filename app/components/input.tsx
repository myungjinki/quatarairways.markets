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
      <div>
        {svg && <Image src={svg} alt={name} width="30" height="30" />}
        <input
          className="flex w-full h-full p-4 rounded-xl ring-2 ring-neutral-300 bg-background md:bg-white invalid:ring-primary-500"
          min={props.min}
          name={name}
          type={props.type}
          placeholder={props.placeholder}
          required={props.required}
        />
      </div>
      {errors?.map((error) => (
        <div key={error} className="text-primary-500">
          {error}
        </div>
      ))}
    </div>
  );
}
