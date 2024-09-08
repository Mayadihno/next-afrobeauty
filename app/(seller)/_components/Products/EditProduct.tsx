"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Product } from "@/types/types";
import {
  businessDaysOptions,
  categories,
  colourOptions,
} from "@/utils/config/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";
import {
  updateImagesInState,
  updateNewImagesInState,
} from "@/redux/slice/productSlice";
import { LoaderCircle, LoaderCircleIcon, RefreshCcw } from "lucide-react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDropzone, FileRejection } from "react-dropzone";
import {
  useDeleteProductImageByImageMutation,
  useGetProductByIdQuery,
  useUpdateProductImagesMutation,
  useUpdateProductMutation,
} from "@/redux/rtk/products";

const animatedComponents = makeAnimated();

const EditProduct = ({ productId }: { productId: string }) => {
  const { data, error, isLoading } = useGetProductByIdQuery(productId);
  const product = data?.product;
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [updateLoad, setUpdateLoad] = useState(false);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sizes = ["xs", "s", "m", "l", "xl", "xxl"];

  const handleSizeClick = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (
      (product?.image?.length ?? 0) + images.length + acceptedFiles.length >
      5
    ) {
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

  const handleDeleteImages = (index: number) => {
    const updatedImages = images.filter((_: any, i: number) => i !== index);
    setImages(updatedImages);
  };

  const [deleteproductImageByIndex] = useDeleteProductImageByImageMutation();
  const handleDeleteImage = async (index: number) => {
    const shopId = product?.shopId;
    if (product?.shopId) {
      setLoading(true);
      const res = await deleteproductImageByIndex({
        id: productId,
        index,
        shopId,
      }).unwrap();
      if (res.status === 210) {
        setLoading(false);
        const updatedImages = product.image.filter(
          (_: any, i: number) => i !== index
        );
        dispatch(updateImagesInState({ productId, updatedImages }));
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      console.error("product.shopId is undefined");
    }
  };

  const [updateProductImages] = useUpdateProductImagesMutation();
  const handleAddMoreImageToProduct = async (e: any) => {
    e.preventDefault();
    setUploadLoading(true);

    const shopId = product?.shopId;
    if (!shopId) {
      toast.error("product shopId is undefined");
      return;
    }

    const newForm = new FormData();
    newForm.append("productId", productId);
    newForm.append("shopId", shopId);
    images.forEach((image: { file: string | Blob | File }) => {
      newForm.append("images", image.file);
    });

    try {
      const response = await updateProductImages(newForm).unwrap();
      if (response.status === 201) {
        const updatedImages = response.image;
        toast.success(response.message);
        dispatch(updateNewImagesInState({ productId, updatedImages }));
        setImages([]);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error updating images:", error);
      toast.error("Something went wrong");
    } finally {
      setUploadLoading(false);
    }
  };

  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    setError,
    register,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      name: "",
      description: "",
      sizes: selectedSizes,
      price: 0,
      quantity: 0,
      discountPrice: 0,
    },
  });
  useEffect(() => {
    if (product) {
      setValue("name", product.name || "");
      setValue("description", product.description || "");
      setValue("price", product.price);
      setValue("quantity", product.quantity);
      setValue("discountPrice", product.discountPrice || 0);
      setValue("subcategory", product?.subcategory);
    }
  }, [product, setValue]);
  interface SelectedCategory {
    value: string;
    label: string;
  }

  const selectedCategories = useWatch({
    control,
    name: "category",
    defaultValue: product?.subcategory,
  });

  const categoryOptions = categories.map((category) => ({
    label: category.cat,
    value: category.cat,
  }));

  const subcategoryOptions = selectedCategories
    ? selectedCategories
        .map((selectedCategory: SelectedCategory) =>
          categories.find((cat) => cat.cat === selectedCategory.value)
        )
        .flatMap(
          (category) =>
            category?.subcategories.map((subcat) => ({
              label: subcat,
              value: subcat,
            })) || []
        )
    : [];

  useEffect(() => {
    if (!selectedCategories?.length) {
      setValue("subcategory", []);
    }
  }, [selectedCategories, setValue]);

  const [updateProduct] = useUpdateProductMutation();
  const onSubmit = async (data: Product) => {
    setUpdateLoad(true);
    data.sizes =
      selectedSizes.length > 0 ? selectedSizes : product?.sizes || [];
    const shopId = product?.shopId;
    if (!shopId) return;
    const res = await updateProduct({ data, shopId, productId }).unwrap();
    if (res.status === 201) {
      toast.success(res.message);
      router.replace("/seller-product");
      setUpdateLoad(false);
    } else {
      toast.error(res.message);
      setUpdateLoad(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" size={50} color="#e94560" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center my-[50px]">
        <p className="text-red-500">
          Failed to load product details. Please try again.
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center my-[50px]">
        <p className="text-red-500">Product not found.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-semibold">Edit Product</h3>
        <button
          onClick={() => router.back()}
          type="button"
          className="ml-4 bg-zinc-400 px-4 py-2 rounded-lg text-white font-semibold hover:bg-zinc-500"
        >
          Back
        </button>
      </div>
      <div className="grid grid-cols-4 gap-x-5 my-10">
        <div className="col-span-3 p-5">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name">Product Name</label>
            <input
              {...register("name", { required: true, minLength: 4 })}
              name="name"
              type="text"
              className="rounded-xl p-3 outline-[#eeeeee] bg-[#EEEEEE]"
            />
            {errors.name && (
              <p className="text-red-500">
                Product name must be at least 4 characters long
              </p>
            )}
          </div>
          <div className="flex flex-col my-4 space-y-2">
            <label htmlFor="description">Product Description</label>
            <textarea
              {...register("description", { required: true, minLength: 10 })}
              name="description"
              rows={5}
              cols={5}
              className="rounded-xl p-3 outline-[#eeeeee] bg-[#EEEEEE]"
            />
            {errors.description && (
              <p className="text-red-500">
                Product description must be at least 10 characters long
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg">Size</h3>
              <h5 className="text-sm pb-2">Pick available size</h5>
              <div className="flex space-x-2">
                <div className="flex space-x-2">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className={`border uppercase text-sm cursor-pointer rounded-[5px] px-3 py-1 font-medium 
                          ${
                            selectedSizes.includes(size)
                              ? "bg-green-500 text-white"
                              : "bg-[#eeeeee]"
                          }`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className=" w-[350px] mx-auto">
              <label htmlFor="colors" className="text-lg">
                Available Colors
              </label>
              <div className="pt-4">
                <Controller
                  name="colors"
                  control={control}
                  defaultValue={product?.colors || []}
                  rules={{ required: "Please select at least one color" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      closeMenuOnSelect={false}
                      options={colourOptions}
                      components={animatedComponents}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(value) => {
                        field.onChange(value);
                        clearErrors("colors");
                      }}
                    />
                  )}
                />
              </div>

              {errors.colors && (
                <p className="text-red-500">{errors.colors.message}</p>
              )}
            </div>

            <div className="">
              <h3 className="text-lg">Gender</h3>
              <h5 className="text-sm pb-2">Pick available gender</h5>
              <div className="flex space-x-2">
                {["men", "woman", "unisex"].map((gender) => (
                  <Controller
                    key={gender}
                    name="gender"
                    control={control}
                    defaultValue={product?.gender}
                    render={({ field }) => (
                      <div className="flex space-x-1">
                        <input
                          {...field}
                          type="radio"
                          id={gender}
                          value={gender}
                          checked={field.value === gender}
                          onChange={() => field.onChange(gender)}
                        />
                        <label htmlFor={gender}>
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </label>
                      </div>
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-14 grid gap-x-6 grid-cols-4">
            <div className="col-span-2">
              <h2 className="text-xl font-semibold pb-7">Price and Quantity</h2>
              <div className="flex space-x-5 items-center">
                <div className="flex-1">
                  <div className="">
                    <label
                      htmlFor="price"
                      className="block pb-1 text-sm font-medium text-gray-700"
                    >
                      Discount Price
                    </label>
                    <div className="relative rounded-xl w-full">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700">
                        ₦
                      </span>
                      <input
                        {...register("discountPrice", {
                          required: true,
                          setValueAs: (v: any) => parseFloat(v) || undefined,
                        })}
                        name="discountPrice"
                        type="number"
                        id="discountPrice"
                        className="pl-7 font-ebgaramond placeholder:text-sm placeholder:font-semibold rounded-xl w-full px-3 py-2 outline-[#eeeeee] bg-[#EEEEEE]"
                        placeholder="1234"
                      />
                    </div>
                  </div>

                  {errors.discountPrice && (
                    <p className="text-red-500">
                      Discount Price must be greater than 0
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <div className="">
                    <label
                      htmlFor="price"
                      className="block pb-1 text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <div className="relative rounded-xl w-full">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700">
                        ₦
                      </span>
                      <input
                        {...register("price", {
                          required: true,
                          setValueAs: (v: any) => parseFloat(v) || undefined,
                        })}
                        name="price"
                        type="number"
                        id="price"
                        className="pl-7 font-ebgaramond placeholder:text-sm placeholder:font-semibold rounded-xl w-full px-3 py-2 outline-[#eeeeee] bg-[#EEEEEE]"
                        placeholder="1234"
                      />
                    </div>
                  </div>

                  {errors.price && (
                    <p className="text-red-500">Price must be greater than 0</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-10 items-center mt-4">
                <div className="flex-1">
                  <div className="">
                    <label
                      htmlFor="quantity"
                      className="block text-sm pb-1 font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                      {...register("quantity", {
                        required: true,
                        setValueAs: (v: any) => parseFloat(v) || undefined,
                      })}
                      name="quantity"
                      type="number"
                      id="quantity"
                      className="rounded-xl placeholder:text-lg placeholder:font-semibold  w-full p-2 outline-[#eeeeee] bg-[#EEEEEE]"
                      placeholder="1234"
                    />
                  </div>

                  {errors.quantity && (
                    <p className="text-red-500">
                      Quantity must be greater than 0
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <div className="">
                    <label
                      htmlFor="processingTime"
                      className="block pb-1 text-sm font-medium text-gray-700"
                    >
                      Processing Time
                    </label>
                    <Controller
                      name="processingTime"
                      control={control}
                      defaultValue={product?.processingTime}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={businessDaysOptions}
                          components={animatedComponents}
                          placeholder="Select Processing Time"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(value) => {
                            field.onChange(value);
                            clearErrors("processingTime");
                          }}
                        />
                      )}
                    />
                  </div>

                  {errors.processingTime && (
                    <p className="text-red-500">Processing Time is required</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <h2 className="text-xl font-semibold">
                Product Category and SubCategory
              </h2>
              <div className="mt-4 space-y-2">
                <label htmlFor="category">Product Category</label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue={product?.category || []}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      closeMenuOnSelect={false}
                      options={categoryOptions}
                      components={animatedComponents}
                      placeholder="Select Product Category"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(value) => {
                        field.onChange(value);
                        clearErrors("category");
                      }}
                    />
                  )}
                />

                {errors.category && (
                  <p className="text-red-500">
                    Please select at least one category
                  </p>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <label htmlFor="subcategory">Product SubCategory</label>

                <Controller
                  name="subcategory"
                  control={control}
                  defaultValue={product?.subcategory || []}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      closeMenuOnSelect={false}
                      options={subcategoryOptions}
                      components={animatedComponents}
                      placeholder="Select Product SubCategory"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isDisabled={!selectedCategories?.length}
                      onChange={(value) => {
                        field.onChange(value);
                        clearErrors("subcategory");
                      }}
                    />
                  )}
                />

                {errors.subcategory && (
                  <p className="text-red-500">
                    Please select at least one subcategory
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 h-fit">
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Upload product image</p>
              <div className="">
                <div className="my-3">
                  <div className="border border-dashed w-fit rounded-[5px] p-2">
                    <input
                      type="file"
                      className="sr-only"
                      {...getInputProps()}
                    />
                    <label
                      onClick={open}
                      htmlFor="upload"
                      className="flex cursor-pointer space-x-2 items-center justify-center"
                    >
                      <AiOutlinePlusCircle size={30} color="#555" />
                      <h3 className="text-sm">Add Product image</h3>
                    </label>
                  </div>

                  <div className="grid gap-y-3 grid-cols-3 mt-3">
                    {images.map((image: any, index: number) => (
                      <div key={index} className="relative w-[80px] h-[80px] ">
                        <Image
                          src={image.preview}
                          alt={`Cover image ${index + 1}`}
                          className="w-full px-2 h-full rounded-[5px] object-contain"
                          width={80}
                          height={80}
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteImages(index)}
                          className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
                        >
                          <MdDelete size={"20px"} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p>
                    {errors?.image?.message &&
                      typeof errors?.image?.message === "string" && (
                        <small style={{ color: "red" }}>
                          {errors?.image?.message}
                        </small>
                      )}
                  </p>
                  {images.length > 0 && (
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={handleAddMoreImageToProduct}
                        type="button"
                        className="bg-green-400 p-2 rounded-[10px] text-white"
                      >
                        {uploadLoading ? (
                          <span className="flex items-center">
                            <LoaderCircleIcon className=" animate-spin" />
                            Uploading image...
                          </span>
                        ) : (
                          "Add Image"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {loading ? (
              <div className="flex flex-col justify-center items-center">
                <RefreshCcw className="w-16 h-16 text-gray-400 animate-spin mt-10" />
                <span className="text-sm my-2 font-semibold">
                  Please wait...
                </span>
              </div>
            ) : (
              <div className="">
                <h2 className="text-xl font-semibold pb-5">
                  {product?.image?.length ?? 0 > 1
                    ? "Product Image"
                    : "Product Images"}
                </h2>
                <div className="w-full gap-6 grid grid-cols-2 rounded-xl">
                  {product?.image.map((i: string, index: number) => (
                    <div className="relative" key={i}>
                      <Image
                        src={i}
                        alt="product image"
                        width={150}
                        height={150}
                        className="rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
                      >
                        <MdDelete size={"20px"} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-5">
        <button
          className="text-xl font-ebgaramond font-semibold bg-green-400 w-full text-white py-2 rounded-[8px]"
          type="submit"
        >
          {updateLoad ? (
            <span className="flex justify-center space-x-3 items-center">
              <LoaderCircle className=" w-6 h-6 animate-spin" />
              <h3>Updating product</h3>
            </span>
          ) : (
            "Update product"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
