"use client";
import { ICONS } from "@/utils/icons";
import React, { useState } from "react";

type TextInputProps = {
  label?: string;
  register?: any;
  name?: string;
  type?: string;
  errors?: any;
  placeholder?: string;
  className?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  options?: { value: string; label: string }[];
  value?: string | number | Date;
};

const TextInput = ({
  label,
  register,
  name,
  type = "text",
  errors,
  placeholder = "",
  className,
  prefixIcon,
  suffixIcon,
  options,
  value,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const isPasswordField = type?.toLowerCase().includes("password");
  const inputType = isPasswordField && showPassword ? "text" : type;

  const baseClass = `appearance-none block w-full pr-10 p-3 shadow-sm md:text-xl text-sm font-semibold text-black rounded-md bg-[#f5f7f9]
   placeholder:font-Urbanist placeholder:font-semibold placeholder:text-xs md:placeholder:text-base 
   placeholder:text-gray-400 focus:outline-none sm:text-sm ${className}`;

  const inputValue =
    value instanceof Date ? value.toISOString().split("T")[0] : value;

  return (
    <div className="font-Urbanist relative">
      <label
        htmlFor={`${name}`}
        className="block md:text-xl text-sm pb-2 font-semibold font-Urbanist leading-6 text-black"
      >
        {label}
      </label>
      <div className="relative">
        {prefixIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {prefixIcon}
          </span>
        )}
        {register ? (
          <>
            {type === "select" ? (
              <select
                {...register(`${name}`, { required: true })}
                id={`${name}`}
                name={`${name}`}
                className={baseClass}
                value={inputValue as string | number | readonly string[]}
              >
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : type === "textarea" ? (
              <textarea
                {...register(`${name}`, { required: true })}
                id={`${name}`}
                name={`${name}`}
                placeholder={`${placeholder}`}
                className={baseClass}
                value={inputValue as string}
              />
            ) : (
              <input
                {...register(`${name}`, { required: true })}
                id={`${name}`}
                name={`${name}`}
                type={inputType}
                placeholder={`${placeholder}`}
                autoComplete={`${name}`}
                className={baseClass}
                value={inputValue as string | number | Date}
              />
            )}
            {isPasswordField && (
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <ICONS.eyelock /> : suffixIcon}
              </span>
            )}
          </>
        ) : (
          <>
            {type === "select" ? (
              <select
                id={`${name}`}
                name={`${name}`}
                value={inputValue as string | number | readonly string[]}
                className={baseClass}
              >
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : type === "textarea" ? (
              <textarea
                id={`${name}`}
                name={`${name}`}
                placeholder={`${placeholder}`}
                className={baseClass}
                value={inputValue as string}
              />
            ) : (
              <input
                id={`${name}`}
                name={`${name}`}
                type={type}
                placeholder={`${placeholder}`}
                autoComplete={`${name}`}
                className={baseClass}
                value={inputValue as string | number}
              />
            )}
          </>
        )}
        {suffixIcon && !isPasswordField && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {suffixIcon}
          </span>
        )}
      </div>
      {errors[`${name}`] && (
        <span className="text-red-500 text-sm">{label} field is required</span>
      )}
    </div>
  );
};

export default TextInput;
