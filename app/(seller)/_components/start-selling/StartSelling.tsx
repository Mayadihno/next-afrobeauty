/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import image from "../../../../public/assets/seller-dash.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const StartSelling = () => {
  const router = useRouter();
  return (
    <div className="w-[90%] mx-auto">
      <div className="bg-[#B10C62] w-full text-white rounded-[20px]">
        <div className="flex justify-between">
          <div className="w-2/3 p-8">
            <h3 className="text-3xl font-ebgaramond font-semibold">
              Start Your Beauty Empire
            </h3>
            <p className="text-base font-ebgaramond font-medium leading-9 pt-4 w-[75%]">
              Join mayaBeauty to Sell Your New Cosmetics and Watch Your Profits
              Skyrocket! Whether you're a budding entrepreneur or an established
              beauty expert, mayaBeauty provides the perfect platform to
              showcase and sell your products to a vast audience. Unlock your
              business's potential, connect with customers, and effortlessly
              boost your profits. Don't just sell cosmetics build a thriving
              beauty business and elevate your earnings to new heights.
            </p>
          </div>
          <div className="">
            <Image src={image} alt="image" width={500} height={500} />
          </div>
        </div>
      </div>

      <div className="my-10 text-center">
        <h3 className="text-3xl font-ebgaramond font-semibold">
          What You Can Do
        </h3>
        <p className="text-lg font-ebgaramond font-semibold leading-9 pt-2">
          You can start selling your products on mayaBeauty in just a few
          minutes. Simply upload your products, add pricing, and start selling.
        </p>
      </div>
      <div className="my-10">
        <div className="flex justify-between items-center">
          <div className="">
            <h3 className="text-3xl font-ebgaramond font-semibold">
              Capture photos
            </h3>
            <p className="text-xl font-urbanist w-2/3 font-medium leading-9 pt-2">
              Ensure good lighting, use a clean background, and take multiple
              shots of your item.
            </p>
          </div>
          <div className="">
            <Image
              src={
                "https://declutter-app.netlify.app/assets/image2-BK8C8as7.svg"
              }
              alt="image"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="flex justify-between items-center my-8">
          <div className="">
            <Image
              src={
                "https://declutter-app.netlify.app/assets/image3-5g3r8Mf6.svg"
              }
              alt="image"
              width={400}
              height={400}
            />
          </div>
          <div className=" text-right">
            <h3 className="text-3xl font-ebgaramond font-semibold">
              Upload Your Items
            </h3>
            <p className="text-xl font-urbanist font-medium leading-9 pt-2">
              Share essential details about your item: <br /> brand, size,
              color, and also your own Price.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="">
            <h3 className="text-3xl font-ebgaramond font-semibold">
              List & Sell
            </h3>
            <p className="text-xl font-urbanist w-2/3 font-medium leading-9 pt-2">
              Review your items, then click 'Sell.' Your item is now visible to
              potential buyers. Start earning
            </p>
          </div>
          <div className="">
            <Image
              src={
                "https://declutter-app.netlify.app/assets/image4-Cn6wN8hn.svg"
              }
              alt="image"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className="text-center my-16">
        <Button
          onClick={() => router.push("/seller-login")}
          variant={"secondary"}
          className="bg-black text-white text-xl hover:bg-[black] px-16 py-8 rounded-[10px]"
        >
          Start Selling
        </Button>
      </div>
    </div>
  );
};

export default StartSelling;
