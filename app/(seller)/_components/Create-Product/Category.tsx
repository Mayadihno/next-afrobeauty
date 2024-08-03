"use client";
import React, { useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useWatch } from "react-hook-form";
import { categories } from "@/utils/config/data";

const animatedComponents = makeAnimated();
interface SelectedCategory {
  value: string;
}

const Category = ({
  control,
  errors,
  setValue,
  register,
  clearErrors,
}: any) => {
  const selectedCategories = useWatch({
    control,
    name: "category",
    defaultValue: [],
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
          (category: { subcategories: string[] }) =>
            category?.subcategories.map((subcat) => ({
              label: subcat,
              value: subcat,
            })) || []
        )
    : [];

  useEffect(() => {
    if (!selectedCategories.length) {
      setValue("subcategory", []);
    }
  }, [selectedCategories, setValue]);

  return (
    <div>
      <h2 className="text-xl font-semibold pb-3">
        Product Category and SubCategory
      </h2>
      <div className="mt-4 space-y-2">
        <label htmlFor="category">Product Category</label>

        <Select
          {...control}
          defaultValue={[]}
          {...register("category", {
            required: true,
          })}
          onChange={(value) => {
            setValue("category", value);
            clearErrors("category");
          }}
          name="category"
          isMulti
          closeMenuOnSelect={false}
          options={categoryOptions}
          components={animatedComponents}
          placeholder="Select Product Category"
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {errors.category && (
          <p className="text-red-500">Please select atleast one category</p>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <label htmlFor="subcategory">Product SubCategory</label>

        <Select
          defaultValue={[]}
          {...register("subcategory", {
            required: true,
          })}
          onChange={(value) => {
            setValue("subcategory", value);
            clearErrors("subcategory");
          }}
          name="subcategory"
          isMulti
          closeMenuOnSelect={false}
          options={subcategoryOptions}
          components={animatedComponents}
          placeholder="Select Product SubCategory"
          className="basic-multi-select"
          classNamePrefix="select"
          isDisabled={!selectedCategories.length}
        />
        {errors.subcategory && (
          <p className="text-red-500">Please select atleast one subcategory</p>
        )}
      </div>
    </div>
  );
};

export default Category;
