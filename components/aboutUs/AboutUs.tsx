/* eslint-disable react/no-unescaped-entities */
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import image from "../../public/assets/about-us.jpg";
import { ICONS } from "@/utils/icons";
import { data } from "./data";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";

const AboutUs = () => {
  const router = useRouter();
  return (
    <div>
      <div className="bg-[#B10C62] w-full py-5 text-center font-abril font-bold text-4xl md:text-5xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center flex-grow">
            <h3>
              <span className="text-white hover:text-black pl-4">About Us</span>
            </h3>
            <div className="flex justify-center items-center space-x-2 pt-5">
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[180px] h-[10px] rounded-full bg-white"></div>
            </div>
          </div>
          <div className="flex justify-end mr-3">
            <Button
              className="bg-black px-6 py-2 rounded-[10px] hover:bg-black text-white"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="md:container md:mx-auto">
        <div className="flex items-center md:space-x-5 md:my-10 my-5">
          <div className=" h-[300px] w-[350px] rounded-[10px] md:block hidden">
            <Image
              src={image.src}
              alt="about-us"
              className="w-full h-full object-cover rounded-[10px]"
              width={350}
              height={300}
            />
          </div>
          <div className="h-[300px] w-full relative">
            <Image
              src={image.src}
              alt="about-us"
              className="w-full h-full object-cover rounded-[10px] absolute"
              height={300}
              width={800}
            />
            <div className="bg-[#a04f7991] w-full h-full absolute z-10 rounded-[10px]"></div>
            <div className="absolute top-10 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 p-4 rounded-[10px] z-20">
              <div className="border border-dashed shadow-xl p-3 rounded-[5px] text-center font-urbanist text-white">
                <div className="flex justify-center pt-2">
                  <ICONS.glass size={60} color="#B10C62" />
                </div>
                <h3 className="text-2xl py-2 font-semibold">Our Vision</h3>
                <p className="text-sm">
                  We are building the most beloved and trusted shopping
                  destination for Africans.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-4 md:gap-y-0 gap-y-8 grid-cols-2 my-10">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className=" font-ebgaramond flex flex-col items-center justify-center"
              >
                <div className=" border-2 shadow-2xl shadow-gray-100 border-[#a04f7991] flex justify-center items-center w-fit border-gray-300 p-4 rounded-full">
                  <item.icon size={50} color="#B10C62" />
                </div>
                <h5 className="text-sm font-semibold w-[150px] text-center pt-3">
                  {item.text}
                </h5>
              </div>
            );
          })}
        </div>
        <div className="mb-10 mt-20">
          <Card className=" md:w-[85%] w-[95%] mx-auto bg-gray-50 border-none shadow-xl">
            <CardHeader className="flex justify-center items-center">
              <div className="flex border mt-[-60px] w-fit p-3 rounded-full justify-center items-center">
                <ICONS.hourglass
                  size={50}
                  className="animate-spin"
                  color="#B10C62"
                />
              </div>
              <div className=" font-ebgaramond text-center my-2">
                <h5 className="text-base text-[#B10C62] font-semibold">
                  MayaBeauty Today
                </h5>
                <span className="text-sm">In a Nutshell</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-10 font-ebgaramond">
                Mayabeauty Store is a leading retailer of top-tier beauty
                products, renowned for offering an extensive range of well-known
                brands. Since our establishment in 2022, we have proudly served
                our customers across Nigeria, Ghana, South Africa, and Europe,
                providing them with daily beauty essentials tailored to the
                unique needs of people of color. At Mayabeauty Store, we
                understand the importance of quality and accessibility. Over the
                years, we have made it our mission to offer a diverse selection
                of beauty products that cater to our customer's diverse needs.
                With a strong focus on technology, customer satisfaction, and
                environmental sustainability, we ensure that our products are
                easily accessible across all European countries through our
                offices in Liverpool UK and Berlin Germany. Our extensive
                product lineup includes popular brands such as the Moroccan Oil
                Collection, Cantu, Jessicurl, Aunt Jackie’s, and many more. With
                over ten million beauty products sold, we have become a trusted
                source for high-quality beauty solutions in the region. We are
                committed to delivering an exceptional shopping experience. Our
                delivery partners work diligently to bring your orders directly
                to your doorstep, ensuring convenience and reliability every
                step of the way. Mayabeauty Store is dedicated to enhancing the
                beauty and confidence of our customers by offering products that
                meet their unique needs and preferences.
              </p>
            </CardContent>
          </Card>
          <div className="flex items-center justify-around font-ebgaramond my-14">
            <Button
              className="bg-[#B10C62] px-10 text-base font-semibold py-2 rounded-[10px] hover:bg-[#B10C62] text-white"
              onClick={() => router.push("/")}
            >
              Shop Now
            </Button>
            <Button
              className="bg-[#B10C62] px-10 text-base font-semibold py-2 rounded-[10px] hover:bg-[#B10C62] text-white"
              onClick={() => router.push("/seller-login")}
            >
              Sell on MayaBeauty
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
