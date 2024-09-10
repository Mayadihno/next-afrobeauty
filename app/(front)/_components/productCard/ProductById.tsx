/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { addProductToCart } from "@/redux/slice/cartSlice";
import { product, productCatogories } from "@/utils/config/products";
import { ICONS } from "@/utils/icons";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/utils/formatter";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetProductByIdQuery } from "@/redux/rtk/products";
import ProductSkeleton from "@/components/productskeleton/productSkeleton";
import { useSearchParams } from "next/navigation";
import { useGetEventByEventIdQuery } from "@/redux/rtk/event";

const ProductById = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const eventId = params.id;
  const {
    data: eventResponse,
    isFetching: isFetchingEvent,
    isLoading: isLoadingEvent,
  } = useGetEventByEventIdQuery(eventId, {
    skip: !eventData,
  });

  const {
    data: productResponse,
    isFetching: isFetchingProduct,
    isLoading: isLoadingProduct,
  } = useGetProductByIdQuery(eventId, {
    skip: !!eventData,
  });
  const item = eventData ? eventResponse?.event : productResponse?.product;
  const isFetching = eventData ? isFetchingEvent : isFetchingProduct;
  const isLoading = eventData ? isLoadingEvent : isLoadingProduct;
  const [selectedCategory, setSelectedCategory] = useState("");
  const { cartItems } = useAppSelector((state) => state.cart);
  const { wishListItems } = useAppSelector((state) => state.wishList);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(1);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (wishListItems && wishListItems.find((i) => i._id === params.id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [params.id, wishListItems]);

  if (isFetching || isLoading) {
    return (
      <div className=" container my-10">
        <ProductSkeleton count={4} />
      </div>
    );
  }

  const decrementCount = () => {
    setCount((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleAddToCart = (item: any) => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    const isItemExist = cartItems && cartItems.find((i) => i._id === item._id);
    if (isItemExist) {
      toast.error("Item already exist in cart");
      return;
    } else {
      if (item.quantity < count) {
        toast.error("Product Stock Limited");
      } else {
        const cartItem = {
          _id: item._id,
          name: item.name,
          category: item.category,
          price: item.price,
          shopId: item.shopId,
          shop: item.shop,
          image: item.image[0],
          qty: count,
          colors:
            selectedColor === null
              ? undefined
              : [{ label: selectedColor, value: selectedColor }],
          discountPrice: item.discountPrice,
          gender: item.gender,
          processingTime: item.processingTime,
          size: item.sizes?.[0],
        };
        dispatch(addProductToCart(cartItem));
        localStorage.setItem("cart", JSON.stringify([...cartItems, cartItem]));
        toast.success("Item added to cart successfully");
      }
    }
  };

  const handleSubCategoryRadioChange = (category: string) => {
    setSelectedCategory(category);
    router.push(`/subcategory/${category}`);
  };

  const handleRadioChange = (category: string) => {
    setSelectedCategory(category);
    router.push(`/category/${category}`);
  };
  const productList = productResponse && productResponse.totalProductsByVendor;
  return (
    <div>
      <div
        className="w-full bg-[#B10C62] flex justify-between items-center
       text-white font-prociono md:text-3xl text-lg font-semibold py-4 md:py-5 md:pl-10 pl-8"
      >
        <div className="md:hidden block">
          <div className="flex space-x-3 items-center">
            {mounted && (
              <Sheet>
                <SheetTrigger>
                  <ICONS.menu size={20} />
                </SheetTrigger>
                <SheetContent side={"left"} className="bg-white w-[70%]">
                  <SheetHeader>
                    <SheetTitle className="flex space-x-3 items-center py-4">
                      <div className="bg-[#B10C62] h-[20px] w-[3px]" />
                      <span className="text-base font-medium font-urbanist">
                        Product Categories
                      </span>
                    </SheetTitle>
                    <SheetDescription
                      className="h-[800px] overflow-y-scroll"
                      asChild
                    >
                      <div className="pt-2 space-y-3 font-urbanist cursor-pointer pb-[180px]">
                        {productCatogories.map((category) => (
                          <div
                            className="flex items-center space-x-2"
                            key={category}
                          >
                            <input
                              type="radio"
                              name="productCategory"
                              value={category}
                              checked={selectedCategory === category}
                              onChange={() => handleRadioChange(category)}
                            />
                            <span className="font-normal text-base text-nowrap">
                              {category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            )}
            <h5 className="text-base font-medium font-urbanist">
              Product Categories
            </h5>
          </div>
        </div>
        <span className="md:block hidden">{item.name}</span>
        <div className="mr-5">
          <Button
            onClick={() => router.back()}
            className="text-lg bg-black p-3 rounded-[10px] hover:bg-black"
          >
            Back
          </Button>
        </div>
      </div>

      <div className="md:w-11/12 w-[95%] mx-auto">
        <div className="flex md:flex-row flex-col md:mt-10">
          <div className="md:flex hidden flex-col md:w-[15%] w-full">
            <div className="flex space-x-3 items-center">
              <div className="bg-[#B10C62] h-[20px] w-[3px]" />
              <h5 className="text-base font-medium font-urbanist">
                Product Categories
              </h5>
            </div>
            <div className="mt-5 space-y-3 font-urbanist cursor-pointer">
              {item.category.map(
                (category: { label: string }, index: number) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <input
                      type="radio"
                      name="productCategory"
                      value={category.label}
                      checked={selectedCategory === category.label}
                      onChange={() => handleRadioChange(category.label)}
                    />
                    <h4 className=" font-normal text-base text-nowrap">
                      {category.label}
                    </h4>
                  </div>
                )
              )}
            </div>
            <div className="flex space-x-3 items-center pt-5">
              <div className="bg-[#B10C62] h-[20px] w-[3px]" />
              <h5 className="text-base font-medium font-urbanist">
                Product Subcategories
              </h5>
            </div>
            <div className="mt-5 space-y-3 font-urbanist cursor-pointer">
              {item.subcategory.map(
                (category: { label: string }, index: number) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <input
                      type="radio"
                      name="productCategory"
                      value={category.label}
                      checked={selectedCategory === category.label}
                      onChange={() =>
                        handleSubCategoryRadioChange(category.label)
                      }
                    />
                    <h4 className=" font-normal text-base text-nowrap">
                      {category.label}
                    </h4>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="md:w-[85%] w-[95%]">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-[60%] w-full md:h-[300px] flex md:flex-row flex-col items-center md:space-x-6">
                <div className="md:w-[500px] w-full md:h-[500px] my-5 md:mt-10">
                  <Image
                    src={item.image[select]}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="w-full grid grid-cols-3 mb-8">
                  {item &&
                    item.image.map((i: string, index: number) => (
                      <div
                        key={index}
                        className={`${
                          select === index
                            ? "border flex justify-center items-center mx-2"
                            : "null"
                        } cursor-pointer`}
                      >
                        <div className="w-[100px] h-[100px]">
                          <Image
                            src={i}
                            alt=""
                            className="overflow-hidden mt-2"
                            onClick={() => setSelect(index)}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="md:w-[40%] w-full md:pt-0 pt-8 font-ebgaramond">
                <h3 className="md:text-3xl text-xl font-semibold">
                  {item.name}
                </h3>
                <div className="flex justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-2xl font-semibold flex items-center text-[#B10C62]">
                      {formatCurrency(item.price)}
                    </h3>
                    <h3 className="text-xl font-medium flex items-center line-through text-[#B10C62]">
                      {formatCurrency(item.discountPrice)}
                    </h3>
                  </div>
                  <div className="">
                    {click ? (
                      <ICONS.heartFilled
                        size={25}
                        color="red"
                        className="cursor-pointer"
                        onClick={() => {
                          setClick(false);
                        }}
                      />
                    ) : (
                      <ICONS.heart
                        size={25}
                        className="cursor-pointer"
                        onClick={() => {
                          setClick(true);
                        }}
                      />
                    )}
                  </div>
                </div>
                <hr className="mt-3" />
                <div className="">
                  <h3 className="text-lg font-medium uppercase py-2">
                    Pick a Color: <span className="ml-2">{selectedColor}</span>
                  </h3>
                  <hr className="mb-3" />
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-y-4 cursor-pointer">
                    {item.colors.map((colorObject: any, index: number) => (
                      <div
                        key={index}
                        className={`border text-center p-2 rounded-sm border-[#777777] ${
                          selectedColor === colorObject.label
                            ? "bg-[#B10C62] text-white border-[#B10C62]"
                            : ""
                        }`}
                        onClick={() => handleColorClick(colorObject.label)}
                      >
                        <p className="text-base font-medium">
                          {colorObject.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    {selectedColor && (
                      <h3
                        className="text-lg font-prociono cursor-pointer font-medium border w-[90px] h-[30px] px-2 py-3 rounded-sm flex items-center"
                        onClick={() => setSelectedColor(null)}
                      >
                        <ICONS.clear size={20} className="mr-2 text-red-600" />
                        <span>Clear</span>
                      </h3>
                    )}
                  </div>
                  <hr className="mt-5" />
                  <div className="mt-10 mb-6">
                    <div className="flex items-center justify-between pr-3">
                      <div className=" font-unkempt">
                        <button
                          className="bg-gradient-to-r from-teal-400 to-teal-500 text-white 
                            font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                          onClick={decrementCount}
                        >
                          -
                        </button>
                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                          {count}
                        </span>
                        <button
                          className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold
                             rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                          onClick={incrementCount}
                        >
                          +
                        </button>
                      </div>
                      <div
                        className="button font-prociono"
                        onClick={() => handleAddToCart(item)}
                      >
                        <button className="bg-[#B10C62] text-white py-2 px-4 rounded flex items-center">
                          <ICONS.addToCart size={20} className="mr-2" />
                          <span>Add to cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-5 space-y-2">
                    <h3 className="text-lg font-medium font-ebgaramond">
                      Category:
                      <span className="ml-1">
                        {item.category
                          .map((category: any) => category.label)
                          .join(", ")}
                      </span>
                    </h3>
                    <h3 className="text-lg font-medium font-ebgaramond">
                      Gender:
                      <span className="ml-1 capitalize">{item.gender}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-10">
              <div
                className="flex items-center text-[#9999] font-ebgaramond md:text-base text-sm
               font-medium cursor-pointer md:space-x-8 space-x-7 justify-center border-y-[1px] border-x-0"
              >
                <h3
                  className={`${
                    active === 1 &&
                    "text-[#B10C62] border-y-2 py-3 border-x-0 border-[#B10C62]"
                  }`}
                  onClick={() => setActive(1)}
                >
                  Product Description
                </h3>
                <h3
                  className={`${
                    active === 2 &&
                    "text-[#B10C62] border-y-2 py-3 border-x-0 border-[#B10C62]"
                  }`}
                  onClick={() => setActive(2)}
                >
                  Additional Information
                </h3>
                <h3
                  className={`${
                    active === 3 &&
                    "text-[#B10C62] border-y-2 py-3 border-x-0 border-[#B10C62]"
                  }`}
                  onClick={() => setActive(3)}
                >
                  Reviews
                </h3>
                <h3
                  className={`${
                    active === 4 &&
                    "text-[#B10C62] border-y-2 py-3 border-x-0 border-[#B10C62]"
                  }`}
                  onClick={() => setActive(4)}
                >
                  Seller Information
                </h3>
              </div>
              <div className="mt-4">
                {active === 1 && (
                  <div className="my-6">
                    <h2 className="text-lg font-ebgaramond font-semibold">
                      Product Description
                    </h2>
                    <p className=" font-ebgaramond leading-10 text-lg font-normal pt-3">
                      {item.description}
                    </p>
                  </div>
                )}
                {active === 2 && (
                  <div>
                    <h2 className="md:text-lg text-base font-semibold font-ebgaramond">
                      Additional information
                    </h2>
                    <div className="md:p-4 p-1">
                      <table className="md:min-w-full !w-full border">
                        <tbody>
                          <tr className="bg-white divide-x-2">
                            <td className="md:px-6 px-2 md:py-4 py-1 whitespace-nowrap text-sm font-normal md:font-medium text-gray-900">
                              WEIGHT
                            </td>
                            <td className="md:px-6 px-3 md:py-4 py-1 whitespace-nowrap font-ebgaramond font-semibold text-base text-gray-500">
                              20kg
                            </td>
                          </tr>
                          <tr className=" border-t divide-x-2">
                            <td className="md:py-4 py-1 md:px-6 px-2 whitespace-nowrap text-sm font-normal md:font-medium text-gray-900">
                              AVAILABLE COLOURS
                            </td>
                            <td className="md:py-4 py-1 md:px-6 px-3 flex space-x-5 font-ebgaramond font-semibold text-base text-gray-500">
                              {item.colors
                                .map((color: any) => color.label)
                                .join(", ")}
                            </td>
                          </tr>
                          <tr className=" border-t divide-x-2">
                            <td className="md:py-4 py-1 md:px-6 px-2 whitespace-nowrap text-sm font-normal uppercase md:font-medium text-gray-900">
                              Brand
                            </td>
                            <td className="md:py-4 py-1 md:px-6 px-3 whitespace-nowrap font-ebgaramond font-semibold text-base text-gray-500">
                              Expressions
                            </td>
                          </tr>
                          <tr className=" border-t divide-x-2">
                            <td className="md:py-4 py-1 md:px-6 px-2 whitespace-nowrap text-sm font-normal uppercase md:font-medium text-gray-900">
                              Processing Time
                            </td>
                            <td className="md:py-4 py-1 md:px-6 px-3 whitespace-nowrap font-ebgaramond font-semibold text-base text-gray-500">
                              {item.processingTime.label}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {active === 3 && (
                  <div className="flex space-x-5 items-center">
                    <h4 className="text-lg font-ebgaramond pt-6">
                      No Review for this product
                    </h4>
                  </div>
                )}

                {active === 4 && (
                  <div className="block w-full md:flex p-5 font-ebgaramond">
                    <div className="w-full md:w-[50%]">
                      <div className="flex items-center">
                        <Image
                          src={item.shop.image ?? ""}
                          className="w-[50px] h-[50px] rounded-full"
                          alt=""
                          width={50}
                          height={50}
                        />
                        <div className=" pl-3">
                          <h3 className={` pb-1 pt-1`}>
                            {item?.shop?.shopName}
                          </h3>
                          <h5 className="pb-3 text-[15px]">
                            {/* ({avgRating.toFixed(1)} 4/ 5) Ratings */}
                            4/5 Ratings
                          </h5>
                        </div>
                      </div>
                      <p className="py-2">{item.shop.description}</p>
                    </div>
                    <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex items-end flex-col">
                      <div className="text-left">
                        <h5 className="font-semibold">
                          Joined on:
                          <span className="font-[500] ml-1">
                            {item.shop?.createdAt?.slice(0, 10)}
                          </span>
                        </h5>
                        <h5 className="font-[600] pt-3">
                          Total Product:
                          <span className="font-[500] ml-1">{productList}</span>
                        </h5>
                        <h5 className="font-[600] pt-3">
                          Total Reviews:
                          <span className="font-[500]">
                            {/* {totalProductReview} */} 0
                          </span>
                        </h5>
                        <Link href={`/shop/${item.shop._id}`}>
                          <div
                            className={`bg-black px-6 py-2 rounded-[5px] w-fit mt-3`}
                          >
                            <h4 className="text-white">Visit shop</h4>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductById;
