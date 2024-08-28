/* eslint-disable @next/next/no-img-element */
import { Controller } from "react-hook-form";
import { TbCameraPlus } from "react-icons/tb";
import { MdOutlineErrorOutline, MdDelete } from "react-icons/md"; // Import delete icon
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "@/utils/config/data";

const animatedComponents = makeAnimated();

const UploadImageAndColor = ({
  control,
  errors,
  images,
  getInputProps,
  open,
  register,
  setValue,
  clearErrors,
  setImages,
  title,
}: any) => {
  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_: any, i: number) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="col-span-2 h-fit bg-[#F9F9F9] rounded-[10px] shadow-lg p-5">
      <h3 className="text-xl pb-5 font-semibold">Upload {title} Image</h3>
      <div className="flex justify-center items-center mb-1">
        <div className="border-2 border-dashed md:w-[95%] w-[300px] h-52 relative mt-2">
          <Controller
            name="images"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <div className="absolute top-[35%] left-[50%] -translate-x-[45%]">
                <label
                  htmlFor="file-input"
                  className="flex cursor-pointer items-center justify-center md:px-1 text-black py-2 border rounded-md shadow-sm text-sm font-medium border-green-600 mb-2"
                >
                  <input className="hidden" {...getInputProps()} />
                  <button
                    className="flex items-center text-[10px]"
                    type="button"
                    onClick={open}
                  >
                    Upload
                    <TbCameraPlus size={"20px"} className="ml-1" />
                    <span className="text-red-500">*</span>
                  </button>
                </label>
                <p className="block text-[10px]">
                  Drop your file here or click to upload
                </p>
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex justify-end mr-2">
        <div className="">
          <span className="flex items-center text-[11px]">
            <MdOutlineErrorOutline size={"15px"} className="mr-1" />
            Maximum file size: 5MB & Maximum of 5 IMAGES
          </span>
        </div>
      </div>
      <div className="">
        <p>
          {errors?.image?.message &&
            typeof errors?.image?.message === "string" && (
              <small style={{ color: "red" }}>{errors?.image?.message}</small>
            )}
        </p>
        {images.length > 0 && (
          <h3 className="text-sm font-medium my-3">{title} Display Images</h3>
        )}
        <div className="grid gap-y-3 gap-x-6 grid-cols-4 mb-2">
          {images.map((image: any, index: number) => (
            <div key={index} className="relative w-[80px] h-[80px] ">
              <img
                src={image.preview}
                alt={`Cover image ${index + 1}`}
                className="w-full h-full rounded-[5px] object-contain"
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
      <div className="mt-10 space-y-2">
        <label htmlFor="colors">Available Colors</label>

        <Select
          {...control}
          {...register("colors", {
            required: true,
            message: "Please select atleast one color",
          })}
          onChange={(value) => {
            setValue("colors", value);
            clearErrors("colors");
          }}
          isMulti
          closeMenuOnSelect={false}
          options={colourOptions}
          components={animatedComponents}
          defaultValue={[]}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Colors"
        />
        {errors.colors && (
          <p className="text-red-500">Please select atleast one color</p>
        )}
      </div>
    </div>
  );
};

export default UploadImageAndColor;
