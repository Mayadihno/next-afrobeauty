"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks/hooks";
import {
  useDeleteEventByIdMutation,
  useGetEventByShopIdQuery,
} from "@/redux/rtk/event";
import { formatCurrency } from "@/utils/formatter";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";

const AllEvent = () => {
  const { seller } = useAppSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const shopId = seller.data?._id ?? "";
  const { data, isLoading } = useGetEventByShopIdQuery(shopId);

  const [deleteEvent] = useDeleteEventByIdMutation();
  const [open, setOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleProductDelete = async () => {
    setLoading(true);
    if (selectedEventId) {
      const { data } = await deleteEvent(selectedEventId);
      if (data.status === 201) {
        toast.success(data.message);
        setOpen(false);
        setLoading(false);
      }
      if (data.status === 400) {
        toast.error(data.messsage);
        setOpen(false);
        setLoading(false);
      }
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedEventId(id);
    setOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 80,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const statusClass =
          params.value === "Running" ? "text-yellow-500" : "text-red-500";
        return (
          <span
            className={`${statusClass} text-lg font-ebgaramond font-semibold`}
          >
            {params.value}
          </span>
        );
      },
    },

    {
      field: "sold_out",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/event/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      align: "center",
      headerAlign: "center",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const isCurrentEventLoading =
          loading && selectedEventId === params.id.toString();
        return (
          <Button
            onClick={() => handleDeleteClick(params.id.toString())}
            disabled={isCurrentEventLoading}
          >
            {isCurrentEventLoading ? (
              <LoaderCircle
                className="animate-spin"
                size={20}
                color="#e94560"
              />
            ) : (
              <AiOutlineDelete size={20} />
            )}
          </Button>
        );
      },
    },
  ];

  const row: {
    id: string;
    name: string;
    discountPrice: number;
    stock: number;
    price: string;
    sold_out: number;
    status: string;
  }[] = [];

  data &&
    data.event.forEach(
      (item: {
        _id: string;
        name: string;
        discountPrice: number;
        price: string;
        quantity: number;
        sold_out: number;
        status: string;
      }) => {
        row.push({
          id: item._id,
          name: item.name,
          price: formatCurrency(item.discountPrice),
          stock: item.quantity,
          sold_out: item?.sold_out,
          discountPrice: item.discountPrice,
          status: item?.status,
        });
      }
    );
  return (
    <div>
      <div className="">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <LoaderCircle className=" animate-spin" size={50} color="#e94560" />
          </div>
        ) : (
          <div className="md:w-[95%] w-full mx-auto">
            <h5 className=" text-center text-[30px] py-5">All Event</h5>
            <DataGrid
              rows={row}
              columns={columns}
              pageSizeOptions={[10, 15, 20]}
              checkboxSelection
              disableRowSelectionOnClick
              autoHeight
              pagination
            />
          </div>
        )}
      </div>
      {open && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-center items-center">
          <div className="w-[95%] md:w-[300px] h-[25vh] md:h-[200px] bg-white rounded-[10px] p-4 shadow-md">
            <h3 className="text-sm my-5 text-nowrap text-center">
              Are you sure you want to delete this Event?
            </h3>
            {loading ? (
              <h2 className="text-lg text-center pt-3 font-semibold font-ebgaramond">
                Deleting event. Please wait
                <span className="animate-pulse">....</span>
              </h2>
            ) : (
              <div className="flex justify-center mt-[40px] items-center space-x-7">
                <Button
                  onClick={handleProductDelete}
                  className=" bg-red-500 hover:animate-pulse hover:bg-red-500 text-white p-3 rounded-[5px]"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  className=" bg-blue-500 hover:bg-blue-500 hover:animate-pulse text-white p-3 rounded-[5px]"
                >
                  No
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEvent;
