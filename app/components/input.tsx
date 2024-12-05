import Image from "next/image";
import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  svg?: string;
  errors?: string[];
  className?: string;
}
export default function Input({ name, svg, errors, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      <div>
        {svg && <Image src={svg} alt={name} width="30" height="30" />}
        <input
          className={`${className} flex w-full h-full p-4 rounded-xl ring-2 ring-neutral-300 bg-background md:bg-white invalid:ring-primary-500`}
          min={props.min}
          name={name}
          type={props.type}
          placeholder={props.placeholder}
          required={props.required}
          onChange={props.onChange}
        />
      </div>
      {errors?.map((error) => (
        <div key={error} className="pt-2 pl-1 text-primary-500">
          {error}
        </div>
      ))}
    </div>
  );
}
