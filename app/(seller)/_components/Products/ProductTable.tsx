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
import { updateProductInState } from "@/redux/slice/productSlice";
import { LoaderCircle, LoaderCircleIcon } from "lucide-react";
import {
  useDeleteProductMutation,
  useGetProductByShopIdQuery,
  useUpdateProductStatusMutation,
} from "@/redux/rtk/products";
import { Product } from "@/types/types";

const ProductStatusCell = ({
  value,
  row,
  updateProductStatus,
  isLoading,
}: any) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleToggle = () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);
    updateProductStatus(row.id, newStatus);
  };

  return (
    <div className="flex items-center space-x-2 mt-5">
      {isLoading ? (
        <LoaderCircle size={15} color="#e94560" />
      ) : (
        <Switch checked={isChecked} onCheckedChange={handleToggle} />
      )}
      <span className="text-xs font-normal">
        {isChecked ? "Available" : "Unavailable"}
      </span>
    </div>
  );
};

const ProductTable = ({
  filters,
  setTotal,
  total,
}: {
  filters: any;
  setTotal: any;
  total: number;
}) => {
  const { seller } = useAppSelector((state) => state.users);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [row, setRow] = useState<any[]>([]);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: "" });
  const [loadingRows, setLoadingRows] = useState<{ [key: string]: boolean }>(
    {}
  );
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
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <div className="flex justify-center items-center">
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
      align: "center",
      headerAlign: "center",
      flex: 0.7,
      renderCell: (params: any) => (
        <ProductStatusCell
          value={params.value}
          row={params.row}
          updateProductStatus={updateProductStatus}
          isLoading={loadingRows[params.row.id] || false}
        />
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "singleSelect",
      minWidth: 130,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "soldOut",
      headerName: "Sold Out",
      type: "singleSelect",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "Actions",
      flex: 1,
      minWidth: 80,
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      renderCell: (params: any) => {
        const isRowLoading = loadingRows[params.id] || false;
        return (
          <div className="flex items-center justify-center space-x-2">
            <Link href={`/seller-product/${params.id}`}>
              {isRowLoading ? (
                <div className="px-3">
                  <LoaderCircleIcon className="mt-4 animate-spin" />
                </div>
              ) : (
                <Button variant="ghost">
                  <ICONS.eye title="View Product" size={20} />
                </Button>
              )}
            </Link>
            <Link href={`/edit-product/${params.id}`}>
              {isRowLoading ? (
                <div className="px-3">
                  <LoaderCircleIcon className="mt-4 animate-spin" />
                </div>
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
            {isRowLoading ? (
              <div className="px-3">
                <LoaderCircleIcon className="mt-4 animate-spin" />
              </div>
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

  const query = new URLSearchParams({
    ...filters,
    page: (page + 1).toString(),
    limit: pageSize.toString(),
  }).toString();

  const shopId = seller.data?._id ?? "";

  const { data, error, isLoading } = useGetProductByShopIdQuery({
    shopId,
    querys: query,
  });

  useEffect(() => {
    if (data && data.products) {
      const formattedRows = data.products.map((item: Product) => ({
        id: item._id,
        productName: item.name,
        image: item.image[0],
        salesPrice: formatCurrency(item.price),
        status: item.isAvailable,
        stock: item.quantity,
        soldOut: item.sold_out,
      }));
      setRow(formattedRows);
      setTotal(data.total);
    } else if (error) {
      toast.error("Failed to fetch products");
    }
  }, [data, setTotal]);

  const [updateProductstatus] = useUpdateProductStatusMutation();

  const updateProductStatus = async (productId: string, newStatus: boolean) => {
    setLoadingRows((prevState) => ({ ...prevState, [productId]: true }));
    const { data } = await updateProductstatus({ newStatus, productId });

    if (data.status === 201) {
      toast.success(data.message);
      dispatch(updateProductInState({ productId, newStatus }));
    } else {
      toast.error(data.message);
    }

    setLoadingRows((prevState) => ({ ...prevState, [productId]: false }));
  };
  const handleDeleteProduct = async () => {
    if (confirmDelete.id) {
      setDeleteLoading(true);
      try {
        const res = await deleteProducts(confirmDelete.id).unwrap();
        setDeleteLoading(false);
        if (res) {
          toast.success(res.message);
          setRow((prev) =>
            prev.filter((product) => product.id !== confirmDelete.id)
          );
          setTotal((prevTotal: number) => prevTotal - 1);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-[50px]">
        <LoaderCircle className=" animate-spin" size={50} color="#e94560" />
      </div>
    );
  }

  return (
    <div>
      <div className="w-[98%] mx-auto">
        {data && data.products?.length > 0 ? (
          <DataGrid
            rows={row}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
            pagination
            pageSizeOptions={[10, 15, 20]}
            paginationMode="server"
            rowCount={total || 0}
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
