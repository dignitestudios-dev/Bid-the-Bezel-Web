import React from "react";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function FloatingInput({
  label,
  id,
  type = "text",
  className,
  ...props
}: FloatingInputProps) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        placeholder=" "
        className={`peer w-full rounded-xl border-2 border-gray-200 bg-white px-4 pt-6 pb-2 text-[15px] text-black focus:border-gray-700 focus:outline-none transition-all ${className}`}
        {...props}
      />

      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-gray-500 text-[14px] transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-[14px]"
      >
        {label}
      </label>
    </div>
  );
}
