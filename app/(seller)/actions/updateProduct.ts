import { Product } from "@/types/types";
import toast from "react-hot-toast";

export const updateProduct = async (
  data: Product,
  shopId: string,
  productId: string
) => {
  try {
    const body = {
      data,
      shopId,
      productId,
    };
    const res = await fetch("/api/seller/update-product", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    toast.error("Something went wrong");
  }
};
