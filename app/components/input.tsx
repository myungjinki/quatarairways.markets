import Image from "next/image";
import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  svg?: string;
  error?: string;
}
export default function Input({ svg, error, name, ...props }: InputProps) {
  return (
    <div>
      <div>
        {svg && <Image src={svg} alt={name} width="30" height="30" />}
        <input name={name} type={props.type} placeholder={props.placeholder} required={props.required} />
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}
