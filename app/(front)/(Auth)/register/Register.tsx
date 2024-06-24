/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../../../../public/assets/myLogo.png";
import createImage from "../../../../public/assets/create.png";
import RegisterForm from "@/components/Auth/RegisterForm";

const Register = () => {
  return (
    <div className="md:w-[70%] w-full mx-auto">
      <div className="w-full md:shadow-lg py-5 md:px-8 px-2 md:mt-12 mt-3">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-9">
          <div className=" text-black w-full md:pt-10">
            <div className="flex flex-col font-ebgaramond md:text-2xl text-lg px-5 md:p-5 font-semibold">
              <h2 className="md:pb-2 text-nowrap">
                Discover a new way to shop with
                <span className="ml-3 md:font-abril font-prociono">
                  Mayabeauty
                </span>
              </h2>
              <h2 className="pb-2">
                Join us today and enjoy exclusive benefits.
              </h2>
            </div>
            <div className="w-full mt-10 h-fit md:block hidden">
              <Image
                src={createImage}
                alt="Create account image"
                className="rounded-bl-2xl rounded-br-2xl"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col items-center md:mt-5">
              <div className="md:block hidden">
                <div className="w-[80px] h-[80px] flex justify-center">
                  <Image
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="py-2 mt-2 md:mt-0">
                <h2 className="text-3xl font-prociono font-bold">
                  Welcome to Mayabeauty
                </h2>
                <h5 className="font-urbanist text-sm pl-5  text-gray-500 font-normal">
                  Create your account to start shopping
                </h5>
              </div>
            </div>
            <div className="px-6 py-4 font-ebgaramond">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
