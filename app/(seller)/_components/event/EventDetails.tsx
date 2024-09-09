"use client";
import { Button } from "@/components/ui/button";
import { useGetEventByEventIdQuery } from "@/redux/rtk/event";
import { formatDate } from "@/utils/dateFormatter";
import { formatCurrency } from "@/utils/formatter";
import { ICONS } from "@/utils/icons";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { format } from "timeago.js";
const EventDetails = ({ eventId }: { eventId: string }) => {
  const { data, isLoading } = useGetEventByEventIdQuery(eventId);
  const router = useRouter();
  const product = data?.event;

  if (isLoading) {
    return (
      <div className=" min-h-screen flex justify-center items-center">
        <LoaderCircle className=" animate-spin" size={50} color="#e94560" />
      </div>
    );
  }

  return (
    <div className=" font-ebgaramond">
      <div className="font-ebgaramond p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h3 className="text-3xl font-bold text-gray-800">Event Details</h3>
            <span className="text-sm text-gray-500">
              EventId: #{product?._id?.slice(0, 10)}
            </span>
          </div>
          <Button
            className="bg-zinc-400 px-4 py-2 rounded-lg text-white font-semibold hover:bg-zinc-500"
            variant={"secondary"}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
        <div className="my-10">
          <div className="">
            <div className="space-y-4">
              <h3 className="- text-gray-700 text-lg font-medium">
                Event Name:
                <span className="font-normal ml-2">{product?.name}</span>
              </h3>
              <p className="text-gray-600 text-lg font-medium">
                Event Description:
                <span className="font-normal ml-2">{product?.description}</span>
              </p>
              <h3 className="text-lg font-medium text-gray-700">
                Event Size:
                <span className="uppercase ml-2">
                  {product?.sizes?.join(", ")}
                </span>
              </h3>
              <p className="text-gray-600 text-lg font-medium">
                Gender:
                <span className=" capitalize ml-2">{product?.gender}</span>
              </p>
              <p className="text-gray-600 text-lg font-medium">
                Category:
                <span className="capitalize ml-2">
                  {product?.category?.map((i: any) => i.label).join(", ")}
                </span>
              </p>
              <p className="text-gray-600 text-lg font-medium">
                Color:
                <span className="capitalize ml-2">
                  {product?.colors?.map((i: any) => i.label).join(", ")}
                </span>
              </p>
              <p className="text-gray-600 text-lg font-medium">
                Subcategory:
                <span className="capitalize ml-2">
                  {product?.subcategory?.map((i: any) => i.label).join(", ")}
                </span>
              </p>
              <p className="text-gray-600 text-lg font-medium">
                Price:
                <span className="capitalize ml-2">
                  {formatCurrency(product?.price ?? 0)}
                </span>
              </p>
              <p className="text-gray-600 text-lg font-medium">
                Discount Price:
                <span className="capitalize ml-2">
                  {formatCurrency(product?.discountPrice ?? 0)}
                </span>
              </p>
              <p className="text-gray-600 text-lg font-medium">
                Quantity:{" "}
                <span className="capitalize ml-2">{product?.quantity}</span>
              </p>
              <p className="text-gray-600 text-lg font-medium">
                Processing Time:
                <span className=" capitalize ml-2">
                  {product?.processingTime?.label}
                </span>
              </p>
              <p className="text-gray-600 text-lg font-medium">
                Event Status:
                <span className="capitalize ml-2">{product?.status}</span>
              </p>
              <p className="text-gray-600 text-lg font-medium">
                Event Date:
                <span className="capitalize ml-2">
                  <span className="pr-2">
                    <strong>From</strong>: {formatDate(product?.startDate)}
                  </span>
                  -
                  <span className="pl-2">
                    <strong>To</strong>: {formatDate(product?.endDate)}
                  </span>
                </span>
              </p>
              <p className="text-gray-600 text-lg font-medium">
                Created:
                <span className="capitalize ml-2">
                  {format(product?.createdAt ?? new Date())}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-4 gap-5 my-6">
              {product?.image?.map((image: string) => (
                <div className="w-[250px] h-[250px]" key={image}>
                  <Image
                    src={image}
                    alt={product?.name}
                    width={250}
                    height={250}
                    className="rounded-lg shadow-sm w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
