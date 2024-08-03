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
}: any) => {
  return (
    <div className="col-span-2 bg-[#F9F9F9] rounded-[10px] shadow-lg p-5">
      <h2 className="text-xl font-semibold pb-3">Price and Quantity</h2>
      <div className="flex space-x-10 items-center">
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
                className="pl-7 placeholder:text-sm placeholder:font-semibold rounded-xl w-full px-3 py-2 outline-[#eeeeee] bg-[#EEEEEE]"
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
                className="pl-7 placeholder:text-sm placeholder:font-semibold rounded-xl w-full px-3 py-2 outline-[#eeeeee] bg-[#EEEEEE]"
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
            <p className="text-red-500">Quantity must be greater than 0</p>
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
            <p className="text-red-500">Processing Time is required</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceAndQuantity;
