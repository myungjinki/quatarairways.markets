import Image from "next/image";
import { InputHTMLAttributes } from "react";

interface IFormInput {
  src: string;
  name: string;
  type: string;
  placeholder: string;
  errors?: string[];
}

export default function FormInput({
  src,
  name,
  errors = [],
  ...rest
}: IFormInput & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <div className="flex flex-col w-96">
        <div className="flex border-2 rounded-full m-2 p-1 items-center focus-within:ring-2 focus-within:ring-[#D8D7D5]">
          <Image className="p-2" src={src} alt="" width="30" height="30" />
          <input
            className="bg-[#F8F7F5] w-72 outline-none  placeholder:text-neutral-400"
            name={name}
            type={rest.type}
            placeholder={rest.placeholder}
            required
          />
        </div>
        {errors.map((error, index) => (
          <span key={index} className="text-red-500 m-2 pl-1 text-xs">
            {error}
          </span>
        ))}
      </div>
    </>
  );
}
