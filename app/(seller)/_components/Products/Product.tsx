"use client";
import { Card } from "@/components/ui/card";
import { businessDaysOptions, categories } from "@/utils/config/data";
import { ICONS } from "@/utils/icons";
import Link from "next/link";
import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ProductTable from "./ProductTable";

const animatedComponents = makeAnimated();

const tab = ["All Product", "Active", "Inactive", "Out of Stock"];
const gender = [
  {
    label: "Men",
    value: "men",
  },
  {
    label: "Woman",
    value: "woman",
  },
  {
    label: "Unisex",
    value: "unisex",
  },
];

const Product = () => {
  const [active, setActive] = useState<string>("All Product");
  const [search, setSearch] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [processTime, setProcessTime] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [category, setCategory] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const categoryOptions = categories.map((category) => ({
    label: category.cat,
    value: category.cat,
  }));

  const handleFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCategory("");
    setPrice(0);
    setSex("");
    setProcessTime("");
    setShow(false);
  };

  const filters = {
    search,
    category,
    sex,
    price: price?.toString(),
    processTime,
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Products</h3>
        <Link
          href={"/create-product"}
          className="border bg-[#9FEEA7] flex items-center space-x-1 rounded-3xl px-5 py-2"
        >
          <ICONS.product size={20} />
          <span>Add Product</span>
        </Link>
      </div>
      <div className="my-5">
        <Card className=" rounded-[7px] border-0 shadow-lg bg-[#F6F6F6] w-full md:p-3">
          <div className="flex p-2">
            {tab.map((item) => (
              <div
                key={item}
                onClick={() => setActive(item)}
                className={`${
                  active === item ? "bg-[#9FEEA7] text-white" : "border"
                } px-3 py-2 cursor-pointer`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="flex justify-between md:flex-row flex-col-reverse md:items-center md:my-3">
            <h3 className="text-xl mt-3 font-medium font-ebgaramond md:pl-5">
              {total
                ? total > 1
                  ? `${total} Products`
                  : `${total} Product`
                : ""}
            </h3>
            <div className="flex md:space-x-6 space-x-3 mt-5 md:mt-0 items-center">
              <div className="relative">
                <input
                  type="search"
                  className="border w-72 border-[#9FEEA7] py-1 px-3 outline-none"
                  placeholder="Search Product..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className=" absolute right-2 top-2">
                  <ICONS.search size={20} />
                </div>
              </div>
              <div
                onClick={() => setShow(!show)}
                className="border border-[#9FEEA7] cursor-pointer flex py-1 px-3 items-center space-x-1"
              >
                <ICONS.filter size={20} />
                <span>Filters</span>
              </div>
            </div>
          </div>
          <div className="md:my-5 my-2">
            {show && (
              <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:items-center md:space-x-10">
                <div className="">
                  <label htmlFor="category">Category</label>
                  <Select
                    onChange={(value: any) => {
                      setCategory(value.value);
                    }}
                    name="category"
                    closeMenuOnSelect={true}
                    options={categoryOptions}
                    components={animatedComponents}
                    placeholder="Select Category"
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
                <div className="">
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
                        onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                        name="price"
                        type="number"
                        id="price"
                        className="pl-7 placeholder:text-sm placeholder:font-semibold rounded-sm w-full px-3 py-2 outline-[#eeeeee] bg-[#EEEEEE]"
                        placeholder="1234"
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="gender"
                    className="block pb-1 text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <Select
                    onChange={(option: any) => setSex(option.value)}
                    name="sex"
                    closeMenuOnSelect={true}
                    options={gender}
                    components={animatedComponents}
                    placeholder="Select Gender"
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="processingTime"
                    className="block pb-1 text-sm font-medium text-gray-700"
                  >
                    Processing Time
                  </label>
                  <Select
                    onChange={(option: any) => setProcessTime(option.value)}
                    name="processingTime"
                    closeMenuOnSelect={true}
                    options={businessDaysOptions}
                    components={animatedComponents}
                    placeholder="Select Processing Time"
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
                <div className="md:pl-28">
                  <div
                    onClick={handleFilter}
                    className=" bg-[#9FEEA7] cursor-pointer text-center text-white rounded-[5px] mt-6 px-8 py-2"
                  >
                    <h2>Clear</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
          <ProductTable filters={filters} setTotal={setTotal} total={total} />
        </Card>
      </div>
    </div>
  );
};

export default Product;
