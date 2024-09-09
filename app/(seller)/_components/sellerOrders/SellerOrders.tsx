"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useGetOrdersByShopIdQuery } from "@/redux/rtk/orders";
import React, { useMemo, useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { formatCurrency } from "@/utils/formatter";
import SellerProductLoader from "@/components/loader/SellerProductLoader";
import { CartItem } from "@/types/types";
import { LoaderCircle } from "lucide-react";

const SellerOrders = () => {
  const seller = useAppSelector((state) => state.users.seller);
  const shopId = seller?.data?._id ?? "";
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const createQueryParams = (page: number, pageSize: number) => {
    return new URLSearchParams({
      page: (page + 1).toString(),
      limit: pageSize.toString(),
    }).toString();
  };

  const query = createQueryParams(page, pageSize);
  const { data, isLoading, error } = useGetOrdersByShopIdQuery({
    shopId,
    query,
  });

  const handlePaginationChange = (paginationModel: GridPaginationModel) => {
    setPage(paginationModel.page);
    setPageSize(paginationModel.pageSize);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
      {
        field: "status",
        headerName: "Status",
        minWidth: 180,
        flex: 0.4,
        cellClassName: (params) =>
          params.value === "Delivered" ? "text-green-500" : "text-red-500",
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
        field: "action",
        flex: 0.6,
        minWidth: 100,
        headerName: "Action",
        sortable: false,
        renderCell: (params) => (
          <Link href={`/seller-order/${params.id}`}>
            <Button className="bg-black hover:bg-[#000000c0] px-4 py-2 my-1 text-white rounded-[5px]">
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        ),
      },
    ],
    []
  );

  const rows =
    data?.orders?.map((item: any) => {
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
    }) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className=" animate-spin" size={50} color="#e94560" />
      </div>
    );
  }
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading orders
      </div>
    );

  return (
    <div className=" font-ebgaramond">
      <h3 className="text-3xl font-semibold text-center pt-6">Seller Orders</h3>
      <div className=" my-6">
        {data && (
          <h3 className="text-3xl font-bold py-2">
            Total Order {data?.totalOrders}
          </h3>
        )}
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          pagination
          pageSizeOptions={[10, 15, 20]}
          paginationMode="server"
          rowCount={data?.totalOrders || 0}
          paginationModel={{
            page: page,
            pageSize: pageSize,
          }}
          onPaginationModelChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default SellerOrders;
