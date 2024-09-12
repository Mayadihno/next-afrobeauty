"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useGetOrdersByShopIdQuery } from "@/redux/rtk/orders";
import { useGetProductByShopIdQuery } from "@/redux/rtk/products";
import { CartItem } from "@/types/types";
import { formatCurrency } from "@/utils/formatter";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const Dashboard = () => {
  const { seller } = useAppSelector((state) => state.users);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const shopId = seller.data?._id ?? "";
  const query = "";
  const {
    data: orders,
    error: ordersError,
    isLoading: orderLoading,
  } = useGetOrdersByShopIdQuery({
    shopId,
    query,
  });
  const {
    data: products,
    error: productsError,
    isLoading: productLoading,
  } = useGetProductByShopIdQuery({
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

  if (orderLoading || productLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className=" animate-spin" size={50} color="#e94560" />
      </div>
    );
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "text-green-500" : "text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "total",
      headerName: "Total Price",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "payment",
      headerName: "Payment Info",
      type: "string",
      minWidth: 120,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },

    {
      field: " ",
      flex: 0.6,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/seller-order/${params.id}`}>
              <Button className="bg-black hover:bg-[#000000c0] px-4 py-2 my-1 text-white rounded-[5px]">
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows =
    orders?.orders
      .map((item: any) => {
        const total = item.cartItems.reduce(
          (acc: number, cartItem: CartItem) =>
            acc + cartItem.price * cartItem.qty,
          0
        );
        return {
          id: item._id,
          itemsQty: item.cartItems.length,
          total: formatCurrency(total),
          status: item.status,
          payment: item.paymentInfo.type,
        };
      })
      .slice(0, 5) || [];

  return (
    <div className="md:w-full font-ebgaramond">
      <h3 className="font-ebgaramond font-bold text-2xl pb-2 md:pb-5">
        Overview
      </h3>
      <div className="md:flex-row flex-col w-full md:flex items-center justify-between">
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow-md md:shadow px-2 rounded py-5">
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
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow-md md:shadow px-2 rounded py-5">
          <div className="flex items-center pl-4">
            <h3 className={`text-2xl font-medium text-black`}>
              All Orders
              <span className="text-sm pl-1">
                (including pending & completed orders)
              </span>
            </h3>
          </div>
          <h5 className="py-3 pl-4 font-bold text-2xl">
            {orders?.totalOrders ?? 0}
          </h5>
          <Link href={"/seller-order"}>
            <h5 className="pl-4 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow-md md:shadow px-2 rounded py-5">
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
      <div className="mt-10 md:my-0 my-6">
        <h3 className="font-ebgaramond font-bold text-2xl pb-2">
          Latest Orders
        </h3>

        <div className="w-full pt-1 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
            pagination
            pageSizeOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
