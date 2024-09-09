"use client";

import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useGetUserOrdersQuery } from "@/redux/rtk/orders";
import { setOrders } from "@/redux/slice/orderSlice";
import { formatCurrency } from "@/utils/formatter";
import { ICONS } from "@/utils/icons";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useEffect, useMemo } from "react";

const Orders = () => {
  const { buyer } = useAppSelector((state) => state.users);
  const { orders } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const userId = buyer?.data?._id;

  const { data, isLoading } = useGetUserOrdersQuery(userId ?? "", {
    skip: !userId,
  });

  useEffect(() => {
    if (data && data.orders) {
      dispatch(setOrders(data.orders));
    }
  }, [data, dispatch]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "Order ID", minWidth: 200, flex: 1.5 },
      {
        field: "status",
        headerName: "Status",
        minWidth: 180,
        flex: 1,
        type: "singleSelect",
        cellClassName: (params) => {
          return params.value === "Delivered"
            ? "text-base text-green-500 font-semibold font-ebgaramond"
            : "text-base text-red-500 font-semibold font-ebgaramond";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 180,
        align: "center",
        headerAlign: "center",
        flex: 1,
      },
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 100,
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: " ",
        flex: 1,
        minWidth: 170,
        headerName: "",
        renderCell: (params) => (
          <Link href={`/orders/${params.id}`} className="pl-24">
            <Button variant="ghost">
              <ICONS.eye size={20} />
            </Button>
          </Link>
        ),
      },
    ],
    []
  );

  const rows = useMemo(
    () =>
      orders?.map((item) => ({
        id: item._id,
        itemsQty: item.cartItems.length,
        total: formatCurrency(
          item.cartItems.reduce(
            (acc, cartItem) => acc + cartItem.price * cartItem.qty,
            0
          )
        ),
        status: item.status,
      })) || [],
    [orders]
  );

  if (isLoading) {
    return (
      <div className="mt-[-100px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto">
      <h3 className="text-3xl font-ebgaramond my-5 text-center font-bold">
        Orders
      </h3>
      <div className="pt-1 w-[90%] mx-auto">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default Orders;
