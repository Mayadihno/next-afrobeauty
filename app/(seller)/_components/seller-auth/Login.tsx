/* eslint-disable react/no-unescaped-entities */
"use client";
import SubmitButton from "@/components/button/SubmitButton";
import TextInput from "@/components/input/Textinput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setSeller } from "@/redux/slice/userSlice";
import { LoginProp } from "@/types/types";
import { setItem } from "@/utils/config/storage";
import { ICONS } from "@/utils/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

const Login = ({ setActive }: Props) => {
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
    setIsLoading(true);
    try {
      const res = await fetch("/api/seller/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.message);
        toast.error(result.message);
        setIsLoading(false);
      } else {
        dispatch(setSeller({ data: result.user }));
        setItem("sellerSessionToken", result.token);
        toast.success(result.message);
        router.push("/seller-dashboard");
        setIsLoading(false);
        reset();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <div>
      <Card>
        {error && (
          <div className="text-xl mt-5 pl-5 font-ebgaramond font-semibold text-red-500">
            {error}
          </div>
        )}
        <CardHeader>
          <CardTitle>Wecome back seller</CardTitle>
          <CardDescription>
            kindly Login to your account to start earning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="py-3">
              <TextInput
                label="Password"
                placeholder="***********"
                type="password"
                name="password"
                register={register}
                errors={errors}
                suffixIcon={<ICONS.eye />}
              />
            </div>
            <div className="flex justify-end py-3 text-gray-400 font-medium font-urbanist text-base">
              <Link href={"/forget-password"}>Forget password?</Link>
            </div>
            <SubmitButton
              isLoading={loading}
              loadingTitle="Please wait"
              title="Login"
              type="submit"
              className="!bg-black text-white !rounded-[3px] !py-2.5 !text-lg"
            />
          </form>
          <div className=" pt-5 font-medium font-urbanist text-base">
            <h4>
              Don't have an account?
              <span
                onClick={() => setActive("register")}
                className="text-[#B10C62] ml-1"
              >
                Create Account
              </span>
            </h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
