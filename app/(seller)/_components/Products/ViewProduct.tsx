"use client";
import { Button } from "@/components/ui/button";
import { useGetProductByIdQuery } from "@/redux/rtk/products";
import { formatCurrency } from "@/utils/formatter";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { format } from "timeago.js";

const ViewProduct = ({ productId }: { productId: string }) => {
  const { data, error, isLoading } = useGetProductByIdQuery(productId);
  const product = data?.product;
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" size={50} color="#e94560" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center my-[50px]">
        <p className="text-red-500">
          Failed to load product details. Please try again.
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center my-[50px]">
        <p className="text-red-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="font-ebgaramond p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h3 className="text-3xl font-bold text-gray-800">Product Details</h3>
          <span className="text-sm text-gray-500">
            ProductId: #{product?._id.slice(0, 10)}
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
              Product Name:
              <span className="font-normal ml-2">{product?.name}</span>
            </h3>
            <p className="text-gray-600 text-lg font-medium">
              Product Description:
              <span className="font-normal ml-2">{product?.description}</span>
            </p>
            <h3 className="text-lg font-medium text-gray-700">
              Product Size:
              <span className="uppercase ml-2">
                {product?.sizes.join(", ")}
              </span>
            </h3>
            <p className="text-gray-600 text-lg font-medium">
              Gender:{" "}
              <span className=" capitalize ml-2">{product?.gender}</span>
            </p>
            <p className="text-gray-600 text-lg font-medium">
              Category:
              <span className="capitalize ml-2">
                {product?.category
                  .map((i: { label: string }) => i.label)
                  .join(", ")}
              </span>
            </p>
            <p className="text-gray-600 text-lg font-medium">
              Color:
              <span className="capitalize ml-2">
                {product?.colors
                  .map((i: { label: string }) => i.label)
                  .join(", ")}
              </span>
            </p>
            <p className="text-gray-600 text-lg font-medium">
              Subcategory:
              <span className="capitalize ml-2">
                {product?.subcategory
                  .map((i: { label: string }) => i.label)
                  .join(", ")}
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
                {product?.processingTime.label}
              </span>
            </p>
            <p className="text-gray-600 text-lg font-medium">
              Product Status:
              <span className="capitalize ml-2">
                {product?.isAvailable ? "Available" : "Unavailable"}
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
            {product?.image.map((image: string) => (
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
  );
};

export default ViewProduct;
