"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useGetOrdersByShopIdQuery } from "@/redux/rtk/orders";
import { useGetProductByShopIdQuery } from "@/redux/rtk/products";
import { CartItem } from "@/types/types";
import { formatCurrency } from "@/utils/formatter";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const Dashboard = () => {
  const { seller } = useAppSelector((state) => state.users);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const shopId = seller.data?._id ?? "";
  const query = "";
  const { data: orders, error: ordersError } = useGetOrdersByShopIdQuery({
    shopId,
    query,
  });
  const { data: products, error: productsError } = useGetProductByShopIdQuery({
    shopId,
    querys: query,
  });

  const totalProduct = products?.total ?? 0;

  const totalOrderDelivered = useMemo(() => {
    return orders?.orders.filter(
      (item: { status: string }) => item.status === "Delivered"
    );
  }, [orders]);

  const totalEarningWithoutTax = useMemo(() => {
    return (
      totalOrderDelivered
        ?.map((order: { cartItems: CartItem[] }) =>
          order.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
        .reduce((acc: number, value: number) => acc + value, 0) ?? 0
    );
  }, [totalOrderDelivered]);

  useEffect(() => {
    const serviceCharge = totalEarningWithoutTax * 0.1;
    setAvailableBalance(totalEarningWithoutTax - serviceCharge);
  }, [totalEarningWithoutTax]);

  if (ordersError || productsError) {
    return (
      <div className="text-2xl font-semibold font-ebgaramond py-10 text-center">
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full font-ebgaramond">
      <h3 className="font-ebgaramond font-bold text-2xl pb-5">Overview</h3>
      <div className="block w-full md:flex items-center justify-between">
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow px-2 rounded py-5">
          <div className="flex items-center pl-4">
            <h3 className={`text-2xl font-medium text-black`}>
              Account Balance
              <span className="text-sm pl-2">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="py-3 pl-4 font-bold text-2xl">
            {formatCurrency(availableBalance)}
          </h5>
          <Link href={"/seller-withdraw"}>
            <h5 className="pl-4 text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow px-2 rounded py-5">
          <div className="flex items-center pl-4">
            <h3 className={`text-2xl font-medium text-black`}>
              All Orders
              <span className="text-sm pl-2">
                (including pending and completed orders)
              </span>
            </h3>
          </div>
          <h5 className="py-3 pl-4 font-bold text-2xl">
            {orders?.totalOrders}
          </h5>
          <Link href={"/seller-order"}>
            <h5 className="pl-4 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow px-2 rounded py-5">
          <div className="flex items-center pl-4">
            <h3 className={`text-2xl font-medium text-black`}>
              All Products
              <span className="text-sm pl-2">
                (including out-of-stock items)
              </span>
            </h3>
          </div>
          <h5 className="py-3 pl-4 font-bold text-2xl">{totalProduct}</h5>
          <Link href={"/seller-product"}>
            <h5 className="pl-4 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
