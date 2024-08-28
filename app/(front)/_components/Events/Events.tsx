"use client";
import { useGetAllEventQuery } from "@/redux/rtk/event";
import { formatCurrency } from "@/utils/formatter";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import CountDown from "../Events/CountDown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addProductToCart } from "@/redux/slice/cartSlice";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

const Events = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { data } = useGetAllEventQuery({});
  const dispatch = useAppDispatch();
  if (!data || data.events.length === 0) {
    return null;
  }

  const handleAddToCart = (item: any) => {
    const isItemExist = cartItems && cartItems.find((i) => i._id === item._id);
    if (isItemExist) {
      toast.error("Item already exist in cart");
      return;
    } else {
      const cartItem = {
        _id: item._id,
        name: item.name,
        category: item.category,
        price: item.price,
        shopId: item.shopId,
        shop: item.shop,
        image: item.image[0],
        qty: 1,
        discountPrice: item.discountPrice,
        gender: item.gender,
        processingTime: item.processingTime,
        size: item.sizes?.[0],
      };
      dispatch(addProductToCart(cartItem));
      localStorage.setItem("cart", JSON.stringify([...cartItems, cartItem]));
      toast.success("Item added to cart successfully");
    }
  };

  return (
    <div>
      <div className="bg-[#B10C62] w-full py-5 text-center font-abril font-bold text-4xl md:text-5xl">
        <h3>
          Shop By
          <span className="text-white hover:text-black"> Popular Events</span>
        </h3>
        <div className="flex justify-center items-center space-x-2 pt-5">
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[180px] h-[10px] rounded-full bg-white"></div>
        </div>
      </div>

      <div className="w-[80%] mx-auto block py-3">
        {data.events.length === 1 ? (
          <div className="w-full flex space-x-3">
            <div className="w-full">
              <Image
                src={data.events[0]?.image[0]}
                alt={data.events[0]?.name}
                width={500}
                height={500}
              />
            </div>
            <div className="w-full flex flex-col font-ebgaramond">
              <h2 className="text-2xl font-semibold">{data.events[0]?.name}</h2>
              <p className="text-base py-3">{data.events[0]?.description}</p>
              <div className="flex py-2 flex-col">
                <div className="flex items-center">
                  <h5 className=" font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                    {formatCurrency(data.events[0]?.price)}
                  </h5>
                  <h5 className="font-bold text-[20px] font-Roboto text-[#333]">
                    {formatCurrency(data.events[0]?.discountPrice)}
                  </h5>
                </div>
                <span className=" pr-3 font-[400] text-base py-2 text-[#44a55e]">
                  120 sold
                </span>
              </div>
              <div className="flex justify-between space-x-5">
                <CountDown item={data.events[0]?.endDate} />
                <div className="">
                  <Link href={`/product/${data.events[0]?._id}`}>
                    <div className={` text-white`}>See Details</div>
                  </Link>
                </div>
              </div>
              <Button
                className={` text-white bg-black px-4 my-3 py-2 hover:bg-black`}
                onClick={() => handleAddToCart(data.event[0])}
              >
                Add to cart
              </Button>
            </div>
          </div>
        ) : (
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            modules={[Autoplay]}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={1000}
            breakpoints={{
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 1,
              },
            }}
          >
            {data.events.map((item: any) => (
              <SwiperSlide key={item._id}>
                <div className="w-full flex space-x-3">
                  <div className="w-full">
                    <Image
                      src={item?.image[0]}
                      alt={item?.name}
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="w-full flex flex-col font-ebgaramond">
                    <h2 className="text-2xl font-semibold">{item?.name}</h2>
                    <p className="text-base py-3">{item?.description}</p>
                    <div className="flex py-2 flex-col">
                      <div className="flex items-center">
                        <h5 className=" font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                          {formatCurrency(item?.price)}
                        </h5>
                        <h5 className="font-bold text-[20px] font-Roboto text-[#333]">
                          {formatCurrency(item?.discountPrice)}
                        </h5>
                      </div>
                      <span className=" pr-3 font-[400] text-base py-2 text-[#44a55e]">
                        120 sold
                      </span>
                    </div>
                    <div className="flex justify-between space-x-5">
                      <CountDown item={item?.endDate} />
                      <div className="">
                        <Link href={`/product/${item?._id}`}>
                          <div className={` text-white bg-black px-4 py-2`}>
                            See Details
                          </div>
                        </Link>
                      </div>
                    </div>
                    <Button
                      className={` text-white bg-black px-4 my-3 py-2 hover:bg-black`}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Events;
