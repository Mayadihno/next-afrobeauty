"use client";
import SubmitButton from "@/components/button/SubmitButton";
import { useAppSelector } from "@/redux/hooks/hooks";
import { IFormInput } from "@/types/types";
import React, { useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { useForm } from "react-hook-form";
import Category from "../Create-Product/Category";
import GeneralInformation from "../Create-Product/GeneralInfo";
import PriceAndQuantity from "../Create-Product/Price";
import UploadImageAndColor from "../Create-Product/UploadImage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCreateEventMutation } from "@/redux/rtk/event";

const CreateEvents = () => {
  const { seller } = useAppSelector((state) => state.users);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
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

  const handleStartDateChange = (e: any) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);

    const endDateInput = document.getElementById(
      "end-date"
    ) as HTMLInputElement;
    if (endDateInput) {
      endDateInput.min = minEndDate.toISOString().slice(0, 10);
    }
  };

  const handleEndDateChange = (e: any) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  const [createEvent] = useCreateEventMutation();

  const onSubmit = async (data: IFormInput) => {
    if (!startDate && !endDate) {
      return toast.error("Please select the event start-date and end-date");
    }
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
    formData.append("startDate", startDate?.toISOString() ?? "");
    formData.append("endDate", endDate?.toISOString() ?? "");

    images.forEach((image: { file: string | Blob | File }) => {
      formData.append("images", image.file);
    });
    setIsLoading(true);
    try {
      const res = await createEvent(formData).unwrap();
      if (res.status === 201) {
        toast.success(res.message);
        router.push("/all-events");
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Sorry, please try to create your event again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      <h5 className=" text-center text-[30px]">Create Event</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 md:grid md:grid-cols-6 md:gap-5 flex flex-col">
          <GeneralInformation
            control={control}
            errors={errors}
            selectedSizes={selectedSizes}
            handleSizeClick={handleSizeClick}
            register={register}
            title={"Event"}
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
            title={"Event"}
          />
        </div>
        <div className="mt-5 md:grid md:grid-cols-3 md:gap-5 flex flex-col">
          <PriceAndQuantity
            control={control}
            errors={errors}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
            title={"Event"}
          />
          <div className="col-span-1 h-fit bg-[#F9F9F9] rounded-[10px] shadow-lg p-5">
            <Category
              register={register}
              control={control}
              errors={errors}
              setValue={setValue}
              clearErrors={clearErrors}
              title={"Event"}
            />
          </div>
        </div>
        <div className="flex my-5 font-ebgaramond w-[80%] mx-auto justify-center space-x-4 items-center">
          <div className="w-1/2">
            <label htmlFor="startDate" className="pb-1">
              Event Start Date <span className=" text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              id="startDate"
              min={today}
              required
              onChange={handleStartDateChange}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 sm:text-sm"
              placeholder="Enter event product start date..."
            />
          </div>
          <div className=" w-1/2">
            <label htmlFor="startDate" className="pb-1">
              Event End Date <span className=" text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              id="end-date"
              min={minEndDate}
              required
              onChange={handleEndDateChange}
              className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 sm:text-sm"
              placeholder="Enter event product end date..."
            />
          </div>
        </div>
        <SubmitButton
          isLoading={isLoading}
          loadingTitle="Please wait"
          title="Create Event"
          type="submit"
          className="border text-center !bg-[#9FEEA7] cursor-pointer mt-3 mb-5 rounded-[5px] px-5 py-2"
        />
      </form>
    </div>
  );
};

export default CreateEvents;
