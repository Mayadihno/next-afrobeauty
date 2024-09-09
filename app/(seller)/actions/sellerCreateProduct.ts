"use client";
import toast from "react-hot-toast";

export const createProduct = async (formData: any) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("category", JSON.stringify(formData.category));
  data.append("subcategory", JSON.stringify(formData.subcategory));
  data.append("description", formData.description);
  data.append("price", formData.price);
  data.append("discountPrice", formData.discountPrice);
  data.append("quantity", formData.quantity);
  data.append("sizes", formData.size);
  data.append("colors", JSON.stringify(formData.colors));
  data.append("processingTime", JSON.stringify(formData.processingTime));
  data.append("gender", formData.gender);
  data.append("shopId", formData.shopId);

  //looping through the images before sending to the backend
  formData.images.forEach((image: { file: string | Blob | File }) => {
    data.append(`images`, image.file);
  });

  const response = await fetch("/api/seller/create-product", {
    method: "POST",
    body: data,
  });

  const res = await response.json();
  if (res.status === 201) return res;
  else {
    toast.error(res.message);
  }
};
