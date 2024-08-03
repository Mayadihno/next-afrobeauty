/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { getProductByShopId } from "../../actions/getProductByShopId";
import { Product } from "@/types/types";
import { useAppSelector } from "@/redux/hooks/hooks";

export const useFetchProduct = (productId: string) => {
  const { seller } = useAppSelector((state) => state.users);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const fetchProduct = async () => {
    if (!seller?.data?._id) return;
    const products = await getProductByShopId(productId, seller.data._id);
    setProduct(products.product);
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, seller?.data?._id]);

  return { product };
};
