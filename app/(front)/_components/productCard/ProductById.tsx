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

const ProductById = ({ params }: { params: { id: number } }) => {
  const item = product.find((item) => item.id === Number(params.id));
  const [selectedCategory, setSelectedCategory] = useState("");
  const { cartItems } = useAppSelector((state) => state.cart);
  const { wishListItems } = useAppSelector((state) => state.wishList);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(1);
  const dispatch = useAppDispatch();

  const colors = ["Blue", "Red", "Green", "Orange", "Black", "Violettal"];

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (wishListItems && wishListItems.find((i) => i.id === params.id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [params.id, wishListItems]);

  if (!item) {
    return <div>Product not found</div>;
  }

  const decrementCount = () => {
    setCount((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleAddToCart = (item: any) => {
    const isItemExist = cartItems && cartItems.find((i) => i.id === item.id);
    if (isItemExist) {
      toast.error("Item already exist in cart");
      return;
    }
    const cartItem = { ...item, image: item.image.src, qty: count };
    dispatch(addProductToCart(cartItem));
    localStorage.setItem("cart", JSON.stringify([...cartItems, cartItem]));
    toast.success("Item added to cart successfully");
  };

  const handleRadioChange = (category: string) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };
  return (
    <div>
      <div className="w-full bg-[#B10C62] text-white font-prociono md:text-3xl text-lg font-semibold py-4 md:py-5 md:pl-10 pl-8">
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
                      <div className="pt-2 space-y-3 font-urbanist cursor-pointer mb-[200px]">
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
        <span className="md:block hidden">{item.title}</span>
      </div>

      <div className="md:w-11/12 w-[95%] mx-auto">
        <div className="flex md:flex-row flex-col mt-10">
          <div className="md:flex hidden flex-col md:w-[15%] w-full">
            <div className="flex space-x-3 items-center">
              <div className="bg-[#B10C62] h-[20px] w-[3px]" />
              <h5 className="text-base font-medium font-urbanist">
                Product Categories
              </h5>
            </div>
            <div className="mt-5 space-y-3 font-urbanist cursor-pointer">
              {productCatogories.map((category: string) => (
                <div className="flex items-center space-x-2" key={category}>
                  <input
                    type="radio"
                    name="productCategory"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => handleRadioChange(category)}
                  />
                  <h4 className=" font-normal text-base text-nowrap">
                    {category}
                  </h4>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-[85%] w-[95%]">
            <div className="flex flex-col md:flex-row">
              <div className="w-full h-[400px]">
                <img
                  src={item.image.src}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full font-ebgaramond">
                <h3 className="md:text-3xl text-base font-medium">
                  {item.title}
                </h3>
                <div className="flex justify-between py-3">
                  <h3 className="text-2xl font-semibold flex items-center text-[#B10C62]">
                    {formatCurrency(item.price)}
                  </h3>
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
                    Available Colors:{" "}
                    <span className="ml-2">{selectedColor}</span>
                  </h3>
                  <hr className="mb-3" />
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-x-5 gap-y-4 cursor-pointer">
                    {colors.map((color) => (
                      <div
                        key={color}
                        className={`border text-center p-2 rounded-sm border-[#777777] ${
                          selectedColor === color
                            ? "bg-[#B10C62] text-white border-[#B10C62]"
                            : ""
                        }`}
                        onClick={() => handleColorClick(color)}
                      >
                        <p className="text-base font-medium">{color}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    {selectedColor && (
                      <h3
                        className="text-lg font-prociono font-medium border w-[90px] h-[30px] px-2 py-3 rounded-sm flex items-center"
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
                      Category: <span className="ml-1">{item.category}</span>
                    </h3>
                    <h3 className="text-lg font-medium font-ebgaramond">
                      Brand: <span className="ml-1">Mille</span>
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
              </div>
              <div className="mt-4">
                {active === 1 && (
                  <div className="my-6">
                    <h2 className="text-lg font-ebgaramond font-semibold">
                      Product Description
                    </h2>
                    <p className=" font-urbanist text-base font-medium pt-3">
                      Details about the product...
                    </p>
                  </div>
                )}
                {active === 2 && (
                  <div>
                    <h2 className="md:text-lg text-base font-semibold font-ebgaramond">
                      Additional information
                    </h2>
                    <div className="md:p-4 p-1">
                      <table className="md:min-w-full !w-1/2 border">
                        <tbody>
                          <tr className="bg-white divide-x-2">
                            <td className="md:px-6 px-2 md:py-4 py-1 whitespace-nowrap text-sm font-normal md:font-medium text-gray-900">
                              WEIGHT
                            </td>
                            <td className="md:px-6 px-3 md:py-4 py-1 whitespace-nowrap font-ebgaramond font-semibold text-base text-gray-500">
                              {item.Weight}
                            </td>
                          </tr>
                          <tr className=" border-t divide-x-2">
                            <td className="md:py-4 py-1 md:px-6 px-2 whitespace-nowrap text-sm font-normal md:font-medium text-gray-900">
                              AVAILABLE COLOURS
                            </td>
                            <td className="md:py-4 py-1 md:px-6 px-3 whitespace-nowrap font-ebgaramond font-semibold text-base text-gray-500">
                              Blue, Orange, Green, Red
                            </td>
                          </tr>
                          <tr className=" border-t divide-x-2">
                            <td className="md:py-4 py-1 md:px-6 px-2 whitespace-nowrap text-sm font-normal uppercase md:font-medium text-gray-900">
                              Brand
                            </td>
                            <td className="md:py-4 py-1 md:px-6 px-3 whitespace-nowrap font-ebgaramond font-semibold text-base text-gray-500">
                              {item.brand}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductById;
