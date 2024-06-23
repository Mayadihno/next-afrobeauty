"use client";
import React from "react";
import image from "../../../../public/assets/loginImage.jpg";
import logo from "../../../../public/assets/myLogo.png";
import Image from "next/image";
import LoginForm from "@/components/Auth/LoginForm";
import Link from "next/link";

const Login = () => {
  return (
    <div className="md:w-[70%] w-full mx-auto">
      <div className="w-full md:shadow-lg py-5 md:px-8 px-2 md:mt-12 mt-3">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-9">
          <div className="bg-[#ECECEC] text-black w-full rounded-2xl md:shadow-2xl">
            <div className="flex flex-col font-ebgaramond md:text-2xl text-lg p-5 font-semibold">
              <h2 className="md:pb-2 text-nowrap">
                Manage your
                <span className="ml-3 md:font-abril font-prociono">
                  Mayabeauty store
                </span>
              </h2>
              <h2 className="pb-2">
                Effortlessly with our intuitive control panel.
              </h2>

              <p className="text-xs font-urbanist pb-4">
                If you have shopped with us before, please enter your details
                below. If you are a new customer, please proceed to the
                <Link className=" underline ml-1" href={"/register"}>
                  registration page
                </Link>
                .
              </p>
            </div>
            <div className="w-full h-fit md:block hidden">
              <Image
                src={image}
                alt="Login image"
                className="rounded-bl-2xl rounded-br-2xl"
              />
            </div>
          </div>
          <div className=" w-full ">
            <div className="flex flex-col items-center">
              <div className="md:block hidden">
                <div className="w-[80px] h-[80px] flex justify-center ">
                  <Image
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="py-4 mt-5 md:mt-0">
                <h2 className=" text-3xl font-prociono font-bold">
                  Welcome back
                </h2>
                <h5 className=" font-urbanist text-sm pl-3 text-gray-500 font-normal">
                  Please login to your account
                </h5>
              </div>
            </div>
            <div className=" px-6 py-4 font-ebgaramond">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
