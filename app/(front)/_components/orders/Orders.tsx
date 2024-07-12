/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setOrders } from "@/redux/slice/orderSlice";
import { formatCurrency } from "@/utils/formatter";
import { ICONS } from "@/utils/icons";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useEffect, useState } from "react";
const Orders = () => {
  const { buyer } = useAppSelector((state) => state.users);
  const { orders } = useAppSelector((state) => state.order);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const getUserOrder = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/user/user-order/?userId=${buyer?.data?._id}`,
      {
        method: "GET",
      }
    );

    if (res.ok) {
      const data = await res.json();
      setLoading(false);
      dispatch(setOrders(data.orders));
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  if (loading) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  }

  const columns: GridColDef<(typeof row)[0]>[] = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      type: "singleSelect",
      cellClassName: (params: any) => {
        return params.value === "Delivered"
          ? `text-base text-green-500 font-semibold font-ebgaramond`
          : `text-base text-red-500 font-semibold font-ebgaramond`;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "singleSelect",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "singleSelect",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 80,
      headerName: "",
      type: "singleSelect",
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/orders/${params.id}`}>
              <Button variant="ghost">
                <ICONS.eye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row: { id: string; itemsQty: number; total: string; status: string }[] =
    [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cartItems.length,
        total: formatCurrency(item.totalPrice),
        status: item.status,
      });
    });

  return (
    <div className="w-[90%] mx-auto">
      <h3 className="text-3xl font-ebgaramond my-5 text-center font-bold">
        Orders
      </h3>
      <div className="pl-8 pt-1 w-[80%] mx-auto">
        <DataGrid<{
          id: string;
          itemsQty: number;
          total: string;
          status: string;
        }>
          rows={row}
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
