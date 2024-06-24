/* eslint-disable react/no-unescaped-entities */
"use client";
import { ICONS } from "@/utils/icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput from "../input/Textinput";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const RegisterForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterProp>();

  function onSubmit(data: LoginProp) {
    console.log(data);
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" my-3">
        <TextInput
          label="Full Name"
          register={register}
          errors={errors}
          placeholder="Full Name"
          name="name"
          type="text"
        />
      </div>
      <div className=" my-3">
        <TextInput
          label="Email"
          register={register}
          errors={errors}
          placeholder="Email"
          name="email"
          type="email"
        />
      </div>
      <div className="">
        <label
          htmlFor=""
          className="block text-xl pb-4 font-semibold font-Urbanist leading-6 text-black"
        >
          Phone number
        </label>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PhoneInput
              country={"ng"}
              onChange={(phone) => {
                field.onChange(`+${phone}`);
              }}
              containerClass=" font-Urbanist input-phone-number"
              inputClass="!w-full !h-[45px] !px-14 !py-2
               placeholder:!text-xs md:placeholder:!text-base 
                placeholder:!text-gray-400 !border-[#f5f7f9]
            !rounded-[1px] !bg-[#f5f7f9] !font-medium !shadow-sm md:!text-base !text-sm !font-Urbanist !text-black"
            />
          )}
        />
      </div>
      <div className="py-3">
        <TextInput
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          suffixIcon={<ICONS.eye />}
        />
      </div>
      <div className="py-3">
        <TextInput
          label="Confirm Password"
          placeholder="Confirm Passwordd"
          type="password"
          name="confirmPassword"
          register={register}
          errors={errors}
          suffixIcon={<ICONS.eye />}
        />
      </div>
      <div className=" w-full my-3 py-2 font-ebgaramond text-2xl font-semibold text-center bg-[#B10C62] !rounded-2xl text-white">
        <button type="submit">Create Account</button>
      </div>
      <div className="pb-2 flex items-center justify-center w-2/3 mx-auto">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="border w-fit mx-auto rounded-[20px] py-3 px-5 cursor-pointer mt-3">
        <div className="flex items-center">
          <ICONS.gogogle />
          <span className=" font-prociono font-semibold text-sm ml-2">
            Google
          </span>
        </div>
      </div>
      <div className="text-center pt-2 font-medium font-urbanist text-sm">
        <h4>
          Already have an account?
          <Link href={"/login"} className="text-[#B10C62] ml-1">
            Login
          </Link>
        </h4>
      </div>
    </form>
  );
};

export default RegisterForm;
