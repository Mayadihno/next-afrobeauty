"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import TextInput from "../input/Textinput";
import { ICONS } from "@/utils/icons";
import { useForm } from "react-hook-form";
import Link from "next/link";

const LoginForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProp>();

  function onSubmit(data: LoginProp) {
    console.log(data);
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" my-3">
        <TextInput
          label="Email"
          register={register}
          errors={errors}
          placeholder="email"
          name="email"
          type="email"
        />
      </div>
      <div className="py-3">
        <TextInput
          label="Password"
          placeholder="password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          suffixIcon={<ICONS.eye />}
        />
        <div className="flex justify-end py-3 text-gray-400 font-medium font-urbanist text-base">
          <Link href={"/"}>Forget password?</Link>
        </div>
        <div className=" w-full my-3 py-2 font-ebgaramond text-2xl font-semibold text-center bg-[#B10C62] !rounded-2xl text-white">
          <button type="submit">Login</button>
        </div>
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
          Don't have an account?
          <Link href={"/register"} className="text-[#B10C62] ml-1">
            Signup
          </Link>
        </h4>
      </div>
    </form>
  );
};

export default LoginForm;
