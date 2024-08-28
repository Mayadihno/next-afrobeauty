"use client";
import { Controller } from "react-hook-form";

const GeneralInformation = ({
  control,
  errors,
  selectedSizes,
  handleSizeClick,
  register,
  title,
}: any) => {
  const sizes = ["xs", "s", "m", "l", "xl", "xxl"];

  return (
    <div className="col-span-4 bg-[#F9F9F9] h-fit rounded-[10px] shadow-lg p-5">
      <h3 className="text-xl pb-5 font-semibold">General Information</h3>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name">{title} Name</label>
        <input
          {...register("name", { required: true, minLength: 4 })}
          name="name"
          type="text"
          className="rounded-xl p-3 outline-[#eeeeee] bg-[#EEEEEE]"
        />

        {errors.name && (
          <p className="text-red-500">
            {title} name must be at least 4 characters long
          </p>
        )}
      </div>
      <div className="flex flex-col my-4 space-y-2">
        <label htmlFor="description">{title} Description</label>

        <textarea
          {...register("description", { required: true, minLength: 10 })}
          name="description"
          type="text"
          rows={5}
          cols={5}
          className="rounded-xl p-3 outline-[#eeeeee] bg-[#EEEEEE]"
        />

        {errors.description && (
          <p className="text-red-500">
            {title} description must be at least 10 characters long
          </p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg">Size</h3>
          <h5 className="text-sm pb-2">Pick available size</h5>
          <div className="flex space-x-2">
            <Controller
              name="size"
              control={control}
              rules={{
                required: "Please select a size",
                validate: (value) => {
                  if (value.length === 0) {
                    return "Please select a size";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <>
                  {sizes.map((item, index) => (
                    <div
                      key={index}
                      className={`border uppercase text-sm cursor-pointer rounded-[5px] px-3 py-1 font-medium ${
                        selectedSizes.includes(item)
                          ? "bg-green-500 text-white"
                          : "bg-[#eeeeee]"
                      }`}
                      onClick={() => {
                        handleSizeClick(item);
                        field.onChange(
                          selectedSizes.includes(item)
                            ? selectedSizes.filter((s: string) => s !== item)
                            : [...selectedSizes, item]
                        );
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </>
              )}
            />
          </div>
          <p className="text-red-500">{errors.size?.message}</p>
        </div>
        <div>
          <h3 className="text-lg">Gender</h3>
          <h5 className="text-sm pb-2">Pick available gender</h5>
          <div className="flex space-x-2">
            {["men", "woman", "unisex"].map((gender) => (
              <Controller
                key={gender}
                name="gender"
                control={control}
                defaultValue="unisex"
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
          <p className="text-red-500">{errors.gender?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
