"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useGetAllProductQuery } from "@/redux/rtk/products";
import { setProducts } from "@/redux/slice/allProductSlice";
import { useEffect, useState } from "react";

export const useFetchProducts = (searchParams = {}) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } = useGetAllProductQuery(searchParams);

  useEffect(() => {
    if (data && data.products) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  const products = useAppSelector((state) => state.allProduct.allProduct);

  return { products, isLoading, isFetching };
};
