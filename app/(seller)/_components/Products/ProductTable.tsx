/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/utils/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatter";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";
import {
  deleteProductById,
  setProduct,
  updateProductInState,
} from "@/redux/slice/productSlice";
import { LoaderCircleIcon } from "lucide-react";
import {
  useDeleteProductMutation,
  useGetProductByShopIdQuery,
  useUpdateProductStatusMutation,
} from "@/redux/rtk/products";
import SellerProductLoader from "@/components/loader/SellerProductLoader";

const ProductStatusCell = ({ value, row, updateProductStatus }: any) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleToggle = () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);
    updateProductStatus(row.id, newStatus);
  };

  return (
    <div className="flex space-x-2 mt-5">
      <Switch checked={isChecked} onCheckedChange={handleToggle} />
      <span className="text-xs font-normal">
        {isChecked ? "Available" : "Unavailable"}
      </span>
    </div>
  );
};

const ProductTable = ({
  filters,
  setTotal,
}: {
  filters: any;
  setTotal: any;
}) => {
  const { seller } = useAppSelector((state) => state.users);
  const { products } = useAppSelector((state) => state.products);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: "" });
  const dispatch = useAppDispatch();

  const [deleteProducts] = useDeleteProductMutation();

  const columns: GridColDef[] = [
    {
      field: "productName",
      headerName: "Product Name",
      minWidth: 200,
      flex: 0.7,
    },
    {
      field: "image",
      headerName: "Image",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params: any) => (
        <div className="">
          <Image
            src={params.value}
            alt={params.row.productName}
            width={40}
            height={40}
            className=" rounded-[5px] my-2"
          />
        </div>
      ),
    },
    {
      field: "salesPrice",
      headerName: "Sales Price",
      type: "singleSelect",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      type: "singleSelect",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params: any) => (
        <ProductStatusCell
          value={params.value}
          row={params.row}
          updateProductStatus={updateProductStatus}
        />
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "singleSelect",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "soldOut",
      headerName: "Sold Out",
      type: "singleSelect",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "Actions",
      flex: 1,
      minWidth: 80,
      headerName: "Actions",
      type: "singleSelect",
      renderCell: (params: any) => {
        return (
          <div className="flex space-x-2">
            <Link href={`/seller-product/${params.id}`}>
              {loading ? (
                <LoaderCircleIcon className="mt-4 animate-spin" />
              ) : (
                <Button variant="ghost">
                  <ICONS.eye title="View Product" size={20} />
                </Button>
              )}
            </Link>
            <Link href={`/edit-product/${params.id}`}>
              {loading ? (
                <LoaderCircleIcon className="mt-4 animate-spin" />
              ) : (
                <Button variant="ghost">
                  <ICONS.edit
                    title="Edit Product"
                    size={20}
                    className="text-blue-500"
                  />
                </Button>
              )}
            </Link>
            {loading ? (
              <LoaderCircleIcon className="mt-4 animate-spin" />
            ) : (
              <Button
                onClick={() => setConfirmDelete({ open: true, id: params.id })}
                variant="destructive"
              >
                <ICONS.delete
                  title="Delete Product"
                  size={20}
                  className="text-red-500"
                />
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const row: {
    id: string;
    productName: string;
    image: string;
    salesPrice: string;
    status: boolean;
    stock: number;
    soldOut: number;
  }[] = [];

  const query = new URLSearchParams({
    ...filters,
    page: (page + 1).toString(),
    limit: pageSize.toString(),
  }).toString();

  const shopId = seller.data?._id ?? "";

  const { data, error, isLoading, isFetching } = useGetProductByShopIdQuery({
    shopId,
    querys: query,
  });

  useEffect(() => {
    if (data && data.products) {
      setTotal(data.total);
      dispatch(setProduct(data.products));
    } else if (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [data, setTotal, dispatch]);

  const [updateProductstatus] = useUpdateProductStatusMutation();

  const updateProductStatus = async (productId: string, newStatus: boolean) => {
    setLoading(true);
    const { data } = await updateProductstatus({ newStatus, productId });
    if (data.status === 201) {
      toast.success(data.message);
      dispatch(updateProductInState({ productId, newStatus }));
      setLoading(false);
    } else {
      toast.error(data.message);
      setLoading(false);
    }
  };
  const handleDeleteProduct = async () => {
    if (confirmDelete.id) {
      setDeleteLoading(true);
      try {
        const res = await deleteProducts(confirmDelete.id).unwrap();
        setDeleteLoading(false);
        if (res) {
          toast.success(res.message);
          dispatch(deleteProductById({ productId: confirmDelete.id }));
          setConfirmDelete({ open: false, id: "" });
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Failed to delete the product.");
        setDeleteLoading(false);
      }
    }
  };

  const handlePaginationChange = (paginationModel: GridPaginationModel) => {
    setPage(paginationModel.page);
    setPageSize(paginationModel.pageSize);
  };

  if (isLoading || isFetching) return <SellerProductLoader />;

  if (products) {
    products.forEach((item) => {
      row.push({
        id: item._id,
        productName: item.name,
        image: item.image[0],
        salesPrice: formatCurrency(item.price),
        status: item.isAvailable,
        stock: item.quantity,
        soldOut: item.sold_out,
      });
    });
  }

  return (
    <div>
      <div className="w-[98%] mx-auto">
        {products ? (
          products?.length > 0 ? (
            <DataGrid
              rows={row}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              autoHeight
              pagination
              pageSizeOptions={[10, 15, 20]}
              paginationMode="server"
              rowCount={data?.total || 0}
              paginationModel={{
                page: page,
                pageSize: pageSize,
              }}
              onPaginationModelChange={handlePaginationChange}
            />
          ) : (
            <div className="text-center my-10">
              <h3 className="text-3xl font-semibold py-4">
                No products available for this vendor.
              </h3>
              <Link
                href="/create-product"
                className="px-4 py-2 rounded-[5px] text-white font-semibold hover:bg-green-300 bg-green-500"
              >
                Create Product
              </Link>
            </div>
          )
        ) : (
          <div className="mt-[-200px]">
            <Loader />
          </div>
        )}
      </div>
      {confirmDelete.open && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-center items-center">
          <div className=" w-[35%] md:w-[300px] h-[85vh] md:h-[200px] bg-white rounded-[10px] p-4 shadow-md">
            <h3 className="text-sm my-5 text-nowrap">
              Are you sure you want to delete this Product?
            </h3>
            <div className="flex justify-center mt-[40px] items-center space-x-7">
              {deleteLoading ? (
                <h2 className="text-lg font-semibold font-ebgaramond">
                  Deleting Product. Please wait....
                </h2>
              ) : (
                <>
                  <Button
                    onClick={handleDeleteProduct}
                    className=" bg-red-500 hover:animate-pulse hover:bg-red-500 text-white p-3 rounded-[5px]"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => setConfirmDelete({ open: false, id: "" })}
                    className=" bg-blue-500 hover:bg-blue-500 hover:animate-pulse text-white p-3 rounded-[5px]"
                  >
                    No
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
