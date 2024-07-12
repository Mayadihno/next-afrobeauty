"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import TextInput from "../input/Textinput";
import { ICONS } from "@/utils/icons";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SubmitButton from "../button/SubmitButton";
import SociaLogin from "./SociaLogin";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { loginUser } from "@/lib/actions/loginUser";
import { setBuyer, setSessionToken } from "@/redux/slice/userSlice";
import { loadStart, loadStop } from "@/redux/slice/loadingSlice";
import { setItem } from "@/utils/config/storage";
import { LoginProp } from "@/types/types";

const LoginForm = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProp>();

  async function onSubmit(data: LoginProp) {
    try {
      dispatch(loadStart());
      setIsLoading(true);
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      const result = await res.json();
      if (result.user) {
        setItem("sessionToken", result.sessionToken);
        dispatch(setBuyer({ data: result.user }));
        toast.success(result.message);
        router.push("/checkout");
        setIsLoading(false);
        reset();
      } else {
        setError(result.message);
        toast.error(result.message);
        setIsLoading(false);
        dispatch(loadStop());
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      dispatch(loadStop());
    }
  }

  return (
    <>
      {error && <div className="text-xl text-red-500">{error}</div>}
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
          <SubmitButton
            isLoading={loading}
            loadingTitle="Please wait"
            title="Login"
            type="submit"
          />
        </div>
        <div className="pb-2 flex items-center justify-center w-2/3 mx-auto">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </form>
      <SociaLogin />
      <div className="text-center pt-2 font-medium font-urbanist text-sm">
        <h4>
          Don't have an account?
          <Link href={"/register"} className="text-[#B10C62] ml-1">
            Signup
          </Link>
        </h4>
      </div>
    </>
  );
};

export default LoginForm;
