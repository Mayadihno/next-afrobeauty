import { businessDaysOptions } from "@/utils/config/data";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();
const PriceAndQuantity = ({
  control,
  errors,
  setValue,
  register,
  clearErrors,
  title,
}: any) => {
  return (
    <div className="col-span-2 bg-[#F9F9F9] rounded-[10px] shadow-lg p-5 font-ebgaramond">
      <h2 className="text-xl font-semibold pb-3">{title} Price and Quantity</h2>
      <div className="flex md:space-x-10 space-y-4 md:space-y-0 md:items-center flex-col md:flex-row">
        <div className="flex-1">
          <div className="">
            <label
              htmlFor="price"
              className="block pb-1 text-base font-medium text-gray-700"
            >
              {title} Discount Price
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
                className="pl-7 placeholder:text-sm placeholder:font-semibold rounded-xl w-full px-3 py-2 outline-[#eeeeee] bg-[#EEEEEE]"
                placeholder="1234"
              />
            </div>
          </div>

          {errors.discountPrice && (
            <p className="text-red-500">
              {title} Discount Price must be greater than 0
            </p>
          )}
        </div>

        <div className="flex-1">
          <div className="">
            <label
              htmlFor="price"
              className="block pb-1 text-base font-medium text-gray-700"
            >
              {title} Price
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
                className="pl-7 placeholder:text-sm placeholder:font-semibold rounded-xl w-full px-3 py-2 outline-[#eeeeee] bg-[#EEEEEE]"
                placeholder="1234"
              />
            </div>
          </div>

          {errors.price && (
            <p className="text-red-500">{title} Price must be greater than 0</p>
          )}
        </div>
      </div>
      <div className="flex md:space-x-10 space-y-4 md:space-y-0 md:items-center flex-col md:flex-row mt-4">
        <div className="flex-1">
          <div className="">
            <label
              htmlFor="quantity"
              className="block text-base pb-1 font-medium text-gray-700"
            >
              {title} Quantity
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
              {title} Quantity must be greater than 0
            </p>
          )}
        </div>
        <div className="flex-1">
          <div className="">
            <label
              htmlFor="processingTime"
              className="block pb-1 text-base font-medium text-gray-700"
            >
              {title} Processing Time
            </label>
            <Select
              {...control}
              defaultValue={[]}
              {...register("processingTime", {
                required: true,
              })}
              onChange={(value) => {
                setValue("processingTime", value);
                clearErrors("processingTime");
              }}
              name="processingTime"
              closeMenuOnSelect={true}
              options={businessDaysOptions}
              components={animatedComponents}
              placeholder="Select Processing Time"
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          {errors.processingTime && (
            <p className="text-red-500">{title} Processing Time is required</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceAndQuantity;
