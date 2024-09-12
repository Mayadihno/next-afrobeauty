"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import TextInput from "@/components/input/Textinput";
import {
  useCreateDiscountMutation,
  useDeleteDiscountByIdMutation,
  useGetDiscountByShopIdQuery,
} from "@/redux/rtk/discount";
import { useAppSelector } from "@/redux/hooks/hooks";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { LoaderCircle } from "lucide-react";

interface DiscountCodeProp {
  couponName: string;
  discountPercentage: number;
  maxAmount: number;
  minAmount: number;
}
const DiscountCode = () => {
  const { seller } = useAppSelector((state) => state.users);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [row, setRow] = useState<Array<any>>([]);

  const shopId = seller.data?._id ?? "";

  const columns: GridColDef[] = [
    { field: "id", headerName: "Discount Code Id", minWidth: 150, flex: 1 },
    {
      field: "couponName",
      headerName: "Coupon Name",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "discountPercentage",
      headerName: "Discount percent",
      minWidth: 100,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "minAmount",
      headerName: "Minimum Amount",
      minWidth: 100,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "maxAmount",
      headerName: "Maximum Amount",
      minWidth: 100,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id.toString())}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<DiscountCodeProp>({});

  const [createDiscountCode] = useCreateDiscountMutation();
  const createDiscounts = async (data: DiscountCodeProp) => {
    setLoading(true);
    const formData = { ...data, shopId };
    try {
      const { data: res, error } = await createDiscountCode(formData);
      if (res) {
        toast.success(res.message);
        setOpen(false);
        reset();
      } else {
        if (error && "data" in error && (error as FetchBaseQueryError).data) {
          const errorMessage = (error as FetchBaseQueryError).data as {
            message?: string;
          };
          toast.error(errorMessage.message || "An error occurred");
        } else {
          toast.error("An error occurred");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const { data, isLoading, isError, error } =
    useGetDiscountByShopIdQuery(shopId);

  const [deleteDiscountCode, { isError: deleteError }] =
    useDeleteDiscountByIdMutation();

  useEffect(() => {
    if (data && data.discountCode) {
      const discountRows = data.discountCode.map((item: any) => ({
        id: item._id,
        couponName: item.couponName,
        discountPercentage: item.discountPercentage,
        maxAmount: item.maxAmount ?? "-",
        minAmount: item.minAmount ?? "-",
      }));
      setRow(discountRows);
    }
  }, [data]);

  const handleDelete = (id: string) => {
    setSelectedEventId(id);
    setOpenDelete(true);
  };

  const handleDiscountDelete = async () => {
    if (selectedEventId) {
      try {
        setDeleteLoading(true);
        await deleteDiscountCode({
          discountId: selectedEventId,
          shopId,
        }).unwrap();
        toast.success("Discount deleted successfully!");
        setOpenDelete(false);
        setSelectedEventId(null);
      } catch (error) {
        toast.error("Failed to delete the discount code.");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isError && error) {
      toast.error("Failed to fetch discount codes.");
      console.error("Error fetching discounts:", error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (deleteError) {
      toast.error("Failed to delete the discount.");
    }
  }, [deleteError]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className=" animate-spin" size={50} color="#e94560" />
      </div>
    );
  }
  return (
    <div className=" font-ebgaramond my-5">
      {data && (
        <div className="w-full flex justify-end">
          <Button
            className=" bg-green-500 px-3 hover:bg-green-500/50 transition shadow-md duration-100 rounded-[5px] py-2"
            onClick={() => setOpen(true)}
          >
            <span className="text-white hover:text-black text-lg font-semibold">
              Create coupon code
            </span>
          </Button>
        </div>
      )}
      <div className=" py-10">
        {data ? (
          <DataGrid
            rows={row}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
            pagination
            pageSizeOptions={[10, 15, 20]}
          />
        ) : (
          <div className=" flex justify-center flex-col items-center mt-10">
            <h3 className="text-3xl font-ebgaramond font-semibold mb-10">
              No Discount Code for this Vendor. Kindly create a new one
            </h3>
            <Button
              className=" bg-green-500 px-3 hover:bg-green-500/50 transition shadow-md duration-100 rounded-[5px] py-2"
              onClick={() => setOpen(true)}
            >
              <span className="text-white hover:text-black text-lg font-semibold">
                Create coupon code
              </span>
            </Button>
          </div>
        )}
      </div>
      {open && (
        <div className="flex font-ebgaramond justify-center items-center w-full top-0 left-0 h-screen bg-[#00000063] fixed z-[2000]">
          <div className="shadow-lg w-[90%] md:w-[40%] h-[60vh] bg-white rounded-[10px] p-6">
            <div className="flex w-full justify-end">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h5 className="text-center text-[30px]">Create Coupon code</h5>
            <form onSubmit={handleSubmit(createDiscounts)}>
              <div className="flex md:space-x-5 space-x-2 my-8">
                <div className=" w-full">
                  <TextInput
                    register={register}
                    name="couponName"
                    label="Coupon Code Name"
                    errors={errors}
                    placeholder="Enter coupon code name..."
                  />
                </div>
                <div className=" w-full">
                  <TextInput
                    register={register}
                    name="discountPercentage"
                    label="Discount Percentage"
                    errors={errors}
                    placeholder="Enter coupon discount percentage value..."
                  />
                </div>
              </div>
              <div className="flex md:space-x-5 space-x-2 md:mt-8 mt-4">
                <div className="w-full">
                  <TextInput
                    name="minAmount"
                    register={register}
                    isRequired={false}
                    label="Minimun Amount"
                    type="number"
                    placeholder="Enter coupon code minimum amount..."
                  />
                </div>
                <div className=" w-full">
                  <TextInput
                    name="maxAmount"
                    isRequired={false}
                    register={register}
                    label="Maximum Amount"
                    type="number"
                    placeholder="Enter coupon code maximum amount..."
                  />
                </div>
              </div>

              <div className="my-8">
                <input
                  type="submit"
                  value={loading ? "Creating..." : "Create"}
                  className="appearance-none block w-full px-3 h-[35px] border cursor-pointer border-gray-300 rounded-[3px] placeholder-gray-400  sm:text-sm"
                />
              </div>
            </form>
          </div>
        </div>
      )}
      {openDelete && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-center items-center">
          <div className=" w-[95%] md:w-[400px] h-[25vh] md:h-[200px] bg-white rounded-[10px] p-4 shadow-md">
            <h3 className="text-sm font-bold my-5 text-center text-nowrap">
              Are you sure you want to delete this Discount Code?
            </h3>
            {deleteLoading ? (
              <h2 className="text-lg text-center pt-3 font-semibold font-ebgaramond">
                Deleting Discount Code. Please wait
                <span className="animate-pulse">....</span>
              </h2>
            ) : (
              <div className="flex justify-center mt-[40px] items-center space-x-7">
                <Button
                  onClick={handleDiscountDelete}
                  className=" bg-red-500 hover:animate-pulse hover:bg-red-500 text-white p-3 rounded-[5px]"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setOpenDelete(false)}
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

export default DiscountCode;
