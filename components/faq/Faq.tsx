"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { faqAccordion, faqCard } from "./data";
import { Card, CardContent } from "../ui/card";
import { ICONS } from "@/utils/icons";
import FaqData from "./FaqData";

const Faq = () => {
  const [active, setActive] = useState<number>(1);
  const router = useRouter();

  return (
    <div>
      <div className="bg-[#B10C62] h-[180px] w-full py-5 font-ebgaramond ">
        <div className="flex justify-between items-center">
          <div className="w-[75%] mx-auto text-white">
            <h3 className="text-xl py-1">Help Center</h3>
            <h5 className="text-3xl font-semibold">Hi, how can we help you?</h5>
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
      <div className="w-[85%] mx-auto">
        <div className="grid grid-cols-5 gap-x-4 mt-[-40px]">
          {faqCard.map((item) => {
            return (
              <div key={item.id}>
                <Card
                  onClick={() => setActive(item.id)}
                  className={`${
                    active === item.id
                      ? "border-t-[4px] border-t-[#541033f8] rounded-[5px]"
                      : "border-none"
                  }border-none cursor-pointer bg-gray-100 h-24 shadow-md rounded-[10px] font-ebgaramond`}
                >
                  <CardContent className="flex !px-3 justify-between items-center py-5">
                    <h3 className="text-lg font-semibold text-nowrap">
                      {item.text}
                    </h3>
                    <item.icons size={40} color="#B10C62" />
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        <div className="my-10">
          <div className="grid grid-cols-3 gap-x-8">
            <div className="col-span-1 h-fit">
              <Card className=" bg-gray-100 shadow-md rounded-[10px] font-ebgaramond">
                {faqAccordion.map((item) => {
                  return (
                    <div key={item.id}>
                      <CardContent
                        onClick={() => setActive(item.id)}
                        className={`${
                          active === item.id
                            ? "border-l-[4px] border-b-2 border-l-[#B10C62] rounded-[5px]"
                            : "border-b-2"
                        } flex !px-3 cursor-pointer justify-between items-center py-4`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icons size={30} color="#B10C62" />
                          <h4 className="text-lg font-semibold">
                            {item.title}
                          </h4>
                        </div>
                        {active === item.id ? (
                          <ICONS.down size={15} color="#B10C62" />
                        ) : (
                          <ICONS.forward size={15} color="#B10C62" />
                        )}
                      </CardContent>
                    </div>
                  );
                })}
              </Card>
            </div>
            <div className="col-span-2">
              <Card className="bg-gray-100 border-none shadow-md rounded-[10px] font-ebgaramond">
                <CardContent className="px-3 py-4">
                  <FaqData active={active} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
