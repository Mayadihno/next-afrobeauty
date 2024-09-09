/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import SubmitButton from "@/components/button/SubmitButton";
import TextInput from "@/components/input/Textinput";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import "react-phone-input-2/lib/bootstrap.css";
import { SellerProp } from "@/types/types";
import { ICONS } from "@/utils/icons";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { RxAvatar } from "react-icons/rx";
import toast from "react-hot-toast";
import SellerToken from "../seller-token/SellerToken";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<string>>;
};
const Register = ({ setActive }: Props) => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState<string | null | File>(null);
  const [checked, setChecked] = useState(false);
  const [isVerificationStep, setIsVerificationStep] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setAvatar(file);
  };

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerProp>();

  async function onSubmit(data: SellerProp) {
    if (!checked) {
      return toast.error("Please accept the terms and conditions");
    }
    if (!avatar) {
      return toast.error("Please upload your shop logo");
    }

    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setIsLoading(true);
    const formData = data;
    try {
      const res = await fetch("/api/seller/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setIsVerificationStep(true);
        localStorage.setItem("regsiterData", JSON.stringify(formData));
        reset();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred");
      setIsLoading(false);
    }
  }
  return (
    <div>
      <Card>
        {error && <div className="text-xl text-red-500">{error}</div>}
        <CardHeader>
          <CardTitle>Wecome back seller</CardTitle>
          <CardDescription>
            kindly Login to your account to start earning
          </CardDescription>
        </CardHeader>

        {!isVerificationStep ? (
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 grid-cols-1 space-y-4 md:space-y-0 md:space-x-5 ">
                <TextInput
                  label="Full Name"
                  register={register}
                  errors={errors}
                  placeholder="John Doe"
                  name="fullName"
                  type="text"
                />
                <TextInput
                  label="Shop Name"
                  register={register}
                  errors={errors}
                  placeholder="mayaBeauty Store"
                  name="shopName"
                  type="text"
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-5 my-5">
                <TextInput
                  label="Email"
                  register={register}
                  errors={errors}
                  placeholder="Email"
                  name="email"
                  type="email"
                />
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
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-5 my-5">
                <TextInput
                  label="Shop Address"
                  register={register}
                  errors={errors}
                  placeholder="Shop Address"
                  name="shopAddress"
                  type="text"
                />
                <TextInput
                  label="Account Type"
                  register={register}
                  errors={errors}
                  placeholder="Email"
                  name="accountType"
                  type="select"
                  suffixIcon={<ICONS.down />}
                  className=" cursor-pointer"
                  options={[
                    { displayValue: "Choose account type", value: "" },
                    { displayValue: "Individual", value: "Individual" },
                    { displayValue: "Business", value: "Business" },
                  ]}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <div className="flex mt-2 items-center">
                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                      {avatar ? (
                        <img
                          src={
                            typeof avatar === "string"
                              ? avatar
                              : URL.createObjectURL(avatar)
                          }
                          alt="avatar"
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <RxAvatar className="h-8 w-8" />
                      )}
                    </span>
                    <label
                      htmlFor="file-input"
                      className="ml-5 flex cursor-pointer items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <span>Upload shop logo</span>
                      <input
                        type="file"
                        name="file"
                        id="file-input"
                        accept=".jpeg,.png,.jpg"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-5 my-5">
                <TextInput
                  label="Password"
                  placeholder="***********"
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  suffixIcon={<ICONS.eye />}
                />
                <TextInput
                  label="Confirm Password"
                  placeholder="***********"
                  type="password"
                  name="confirmPassword"
                  register={register}
                  errors={errors}
                  suffixIcon={<ICONS.eye />}
                />
              </div>
              <div className="flex space-x-2 pb-3 text-gray-400 font-medium font-urbanist text-xs">
                <input
                  type="checkbox"
                  name="checkbox"
                  id=""
                  onChange={() => setChecked(!checked)}
                />
                <p>
                  By creating an account, you agree to our
                  <span className="text-[#B10C62] underline px-1">
                    User Agreement
                  </span>
                  and acknowledge reading our
                  <span className="text-[#B10C62] underline px-1">
                    User Privacy Notice
                  </span>
                  .
                </p>
              </div>
              <SubmitButton
                isLoading={loading}
                loadingTitle="Please wait"
                title="Create Account"
                type="submit"
                className={`${
                  !checked && "!bg-gray-400 !cursor-not-allowed"
                } !bg-black text-white !rounded-[3px] !py-2.5 !text-lg`}
              />
            </form>
            <div className=" pt-5 font-medium font-urbanist text-base">
              <h4>
                Already have an account?
                <span
                  onClick={() => setActive("login")}
                  className="text-[#B10C62] ml-1"
                >
                  Login
                </span>
              </h4>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <SellerToken avatar={avatar} setActive={setActive} />
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Register;
