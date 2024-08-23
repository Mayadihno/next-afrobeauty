"use client";
import { ICONS } from "@/utils/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone, FileRejection } from "react-dropzone";
import GeneralInformation from "./GeneralInfo";
import UploadImageAndColor from "./UploadImage";
import PriceAndQuantity from "./Price";
import { IFormInput } from "@/types/types";
import Category from "./Category";
import { createProduct } from "../../actions/sellerCreateProduct";
import { useAppSelector } from "@/redux/hooks/hooks";
import SubmitButton from "@/components/button/SubmitButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateProductMutation } from "@/redux/rtk/products";

const CreateProduct = () => {
  const { seller } = useAppSelector((state) => state.users);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    clearErrors,
    setError,
    register,
    formState: { errors },
  } = useForm<IFormInput>({});

  const handleSizeClick = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 5) {
      setError("image", {
        type: "manual",
        message: "At most 5 images are allowed for each product",
      });
      return;
    }

    const processedImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...processedImages]);
    clearErrors("image");
  };

  const maxSizeInBytes = 5242880;
  const { getInputProps, open } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    maxFiles: 5,
    maxSize: maxSizeInBytes,
    onDrop: handleDrop,
    onDropRejected: (rejectedFiles: FileRejection[]) => {
      const rejectedFile = rejectedFiles[0];
      if (rejectedFile.file.size > maxSizeInBytes) {
        setError("image", {
          type: "manual",
          message: "File size exceeds the maximum allowed size of 5 MB",
        });
      } else {
        setError("image", {
          type: "manual",
          message: "At most 5 images are allowed for each product",
        });
      }
    },
  });

  const [createProducts] = useCreateProductMutation();
  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", JSON.stringify(data.category));
    formData.append("subcategory", JSON.stringify(data.subcategory));
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("discountPrice", data.discountPrice.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("sizes", data.size.join(","));
    formData.append("colors", JSON.stringify(data.colors));
    formData.append("processingTime", JSON.stringify(data.processingTime));
    formData.append("gender", data.gender);
    formData.append("shopId", seller.data?._id ?? "");

    images.forEach((image: { file: string | Blob | File }) => {
      formData.append("images", image.file);
    });
    setIsLoading(true);
    try {
      const res = await createProducts(formData).unwrap();
      if (res.status === 201) {
        toast.success(res.message);
        router.push("/seller-product");
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Sorry, please try to upload your product again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ICONS.product size={25} />
            <h3>Add New Product</h3>
          </div>
          <div className="flex items-center space-x-5">
            <div className="border flex items-center space-x-2 rounded-3xl px-5 py-2">
              <ICONS.draft />
              <button>Save to draft</button>
            </div>
            <div className="border bg-[#9FEEA7] flex items-center space-x-2 rounded-3xl px-5 py-2">
              <ICONS.mark />
              <button type="submit">Add Product</button>
            </div>
          </div>
        </div>

        <div className="mt-10 md:grid md:grid-cols-6 md:gap-5 flex flex-col">
          <GeneralInformation
            control={control}
            errors={errors}
            selectedSizes={selectedSizes}
            handleSizeClick={handleSizeClick}
            register={register}
          />
          <UploadImageAndColor
            control={control}
            errors={errors}
            images={images}
            getInputProps={getInputProps}
            open={open}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
            setImages={setImages}
          />
        </div>
        <div className="mt-5 md:grid md:grid-cols-3 md:gap-5 flex flex-col">
          <PriceAndQuantity
            control={control}
            errors={errors}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
          />
          <div className="col-span-1 h-fit bg-[#F9F9F9] rounded-[10px] shadow-lg p-5">
            <Category
              register={register}
              control={control}
              errors={errors}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
        </div>
        <SubmitButton
          isLoading={isLoading}
          loadingTitle="Please wait"
          title="Create Product"
          type="submit"
          className="border text-center !bg-[#9FEEA7] cursor-pointer mt-10 mb-5 rounded-[5px] px-5 py-2"
        />
      </form>
    </div>
  );
};

export default CreateProduct;
