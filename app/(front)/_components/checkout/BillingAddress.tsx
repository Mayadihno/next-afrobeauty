"use client";
import TextInput from "@/components/input/Textinput";
import { useAppSelector } from "@/redux/hooks/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Country, State, IState } from "country-state-city";
import { formatCurrency } from "@/utils/formatter";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setItem } from "@/utils/config/storage";
import { useGetDiscountCodeByNameQuery } from "@/redux/rtk/discount";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/types";

interface BillingAddressProps {
  id: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  email: string;
  phone: string;
  companyName?: string;
  country: string;
  state?: string;
}

const BillingAddress = () => {
  const { buyer } = useAppSelector((state) => state.users);
  const { cartItems } = useAppSelector((state) => state.cart);
  const [states, setStates] = useState<IState[]>([]);
  const [selected, setSelected] = useState<{
    name: string;
    price: number;
  } | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [codeData, setCodeData] = useState("");
  const [discountPrice, setDiscountPrice] = useState<number>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const defaultValues: BillingAddressProps = {
    id: buyer?.data?._id || "",
    name: buyer?.data?.name || "John",
    email: buyer?.data?.email || "ZvqQ0@example.com",
    phone: buyer?.data?.phone || "1234567890",
    address: "123 Main St",
    city: "Anytown",
    zip: "12345",
    companyName: "Maya Beauty",
    country: "",
    state: "",
  };

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BillingAddressProps>({ defaultValues });

  const data = [
    { value: "", displayValue: "Choose your country" },
    ...Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      displayValue: `${country.name}`,
    })),
  ];

  const selectedCountry = watch("country");

  useEffect(() => {
    if (selectedCountry) {
      const countryStates = State.getStatesOfCountry(selectedCountry);
      setStates(countryStates);
      setValue("state", "");
    }
  }, [selectedCountry, setValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.id;
    const price = parseFloat(e.target.getAttribute("data-price") || "0");

    setSelected({ name, price });
  };
  const {
    data: code,
    error,
    isError,
  } = useGetDiscountCodeByNameQuery(
    { couponName: codeData },
    { skip: !codeData }
  );

  const handleCopounSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setCodeData(couponCode);
  };

  useEffect(() => {
    if (error && "data" in error && (error as FetchBaseQueryError).data) {
      const errorMessage = (error as FetchBaseQueryError).data as {
        message?: string;
      };
      toast.error(errorMessage.message || "An error occurred");
      setLoading(false);
    } else if (code && code !== couponCodeData) {
      setCouponCodeData(code); // Update only if the code changes
    }
  }, [code, couponCodeData, isError, error]);

  useEffect(() => {
    if (couponCodeData) {
      validateCoupon(couponCodeData, cartItems);
    }
  }, [couponCodeData, cartItems]);

  const validateCoupon = (coupon: any, cartItems: any[]) => {
    if (!coupon) {
      toast.error("Invalid coupon code");
      setCouponCode("");
      setLoading(false);
      return;
    }

    const eligibleItems = cartItems.filter(
      (item) => item.shopId === coupon.coupon.shopId
    );

    if (eligibleItems.length === 0) {
      toast.error("Coupon code does not apply to this products");
      setCouponCode("");
      setLoading(false);
      return;
    }

    // Check each item against minAmount and maxAmount
    for (let item of eligibleItems) {
      const itemPrice = item.qty * item.price;

      if (coupon.coupon.minAmount && itemPrice < coupon.coupon.minAmount) {
        toast.error(
          `Item price must be at least ${formatCurrency(
            coupon.coupon.minAmount
          )} to use this coupon`,
          {
            duration: 8000,
            className: "w-full",
          }
        );
        setCouponCode("");
        setLoading(false);
        return;
      }

      if (coupon.coupon.maxAmount && itemPrice > coupon.coupon.maxAmount) {
        toast.error(
          `Item price must not exceed ${formatCurrency(
            coupon.coupon.minAmount
          )} to use this coupon`
        );
        setCouponCode("");
        setLoading(false);
        return;
      }
    }

    const eligiblePrice = eligibleItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );

    const discountPrice =
      (eligiblePrice * coupon.coupon.discountPercentage) / 100;
    setDiscountPrice(discountPrice);
    setCouponCode("");
    setLoading(false);
    toast.success("Coupon code applied successfully");
  };

  const discountPercentage = couponCodeData ? discountPrice || 0 : 0;
  const subTotal = cartItems.reduce((a, b) => a + b.price * b.qty, 0);
  const shippingFee = selected?.price || 0;

  const totalPrice = couponCodeData
    ? (subTotal + shippingFee - discountPercentage).toFixed(2)
    : (subTotal + shippingFee).toFixed(2);

  const newTotalPrice = totalPrice;

  const handleFormSubmit = (data: BillingAddressProps) => {
    if (!selected) {
      toast.error("Please select a shipping method");
      return;
    }
    const totalPrice = newTotalPrice;
    const latestOrder = {
      shippingFee: {
        shippingCompany: selected.name,
        shippingPrice: selected.price,
      },
      totalPrice: totalPrice,
      userData: data,
    };
    localStorage.setItem("orderData", JSON.stringify(latestOrder));
    router.push("/payment");
    reset();
  };

  return (
    <div className="md:w-[80%] w-[98%] mx-auto mt-10">
      <div className="grid md:grid-cols-5 gap-5 grid-cols-1">
        <div className="overflow-x-auto px-4 py-3 md:col-span-3 col-span-1 bg-[#ffffff] shadow-md">
          <h3 className=" text-lg font-ebgaramond font-semibold">
            Billing address
          </h3>
          <div className="my-2">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="font-medium font-ebgaramond"
              id="billingForm"
            >
              <div className="flex md:space-x-8 space-x-2 my-5">
                <div className="w-full">
                  <TextInput
                    label="Full Name"
                    placeholder="Full Name"
                    name="name"
                    register={register}
                    errors={errors}
                    className="w-full !rounded-[5px]"
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    register={register}
                    errors={errors}
                    className="w-full !rounded-[5px]"
                  />
                </div>
              </div>
              <div className="flex md:space-x-8 space-x-2 my-5">
                <div className="w-full">
                  <TextInput
                    label="Phone Number"
                    placeholder="Phone Number"
                    name="phone"
                    register={register}
                    errors={errors}
                    className="w-full !rounded-[5px]"
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label="Company Name"
                    placeholder="Company Name"
                    name="companyName"
                    register={register}
                    errors={errors}
                    isRequired={false}
                    className="w-full !rounded-[5px]"
                  />
                </div>
              </div>
              <div className="flex md:space-x-8 space-x-2 my-5">
                <div className="w-full">
                  <TextInput
                    label="Choose your Country"
                    name="country"
                    type="select"
                    register={register}
                    errors={errors}
                    className="!rounded-[5px] w-full"
                    options={data}
                    onChange={(e: any) => setValue("country", e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label="Choose your State"
                    name="state"
                    type="select"
                    register={register}
                    errors={errors}
                    className="!rounded-[5px] w-full"
                    options={states.map((state) => ({
                      value: state.name,
                      displayValue: `${state.name}`,
                    }))}
                    onChange={(e: any) => setValue("state", e.target.value)}
                    isDisabled={!selectedCountry}
                  />
                </div>
              </div>
              <div className="flex md:space-x-8 space-x-2 my-5">
                <div className="w-full">
                  <TextInput
                    label="Street Adddress"
                    placeholder="Street Name and House Number"
                    name="address"
                    register={register}
                    errors={errors}
                    className="w-full !rounded-[5px]"
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label="Postcode / Zip Code"
                    placeholder="Postcode / Zip Code"
                    name="zip"
                    register={register}
                    errors={errors}
                    className="w-full !rounded-[5px]"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 h-fit bg-slate-100">
          <h3 className="text-lg font-ebgaramond font-semibold p-4">
            Order Summary
          </h3>
          <div className="flex justify-between items-center border-y-2 p-4">
            <h3 className="text-lg font-ebgaramond font-semibold">
              Item Quantity
            </h3>
            <h3 className="text-lg font-ebgaramond font-semibold">
              {cartItems.length}
            </h3>
          </div>
          <div className="flex justify-between items-center border-b-2 p-4">
            <h3 className="text-lg font-ebgaramond font-semibold">Subtotal</h3>
            <h3 className="text-lg font-ebgaramond font-semibold">
              {formatCurrency(subTotal)}
            </h3>
          </div>
          <div className="flex justify-between md:items-start items-center p-4">
            <h3 className="text-lg font-ebgaramond font-semibold">
              Shipping Fee
            </h3>
            <form className="font-urbanist md:text-base text-sm font-medium">
              {[
                {
                  id: "postnode",
                  label: "Postnode Pickup (Incl. VAT): ",
                  price: "12050",
                },
                {
                  id: "gls",
                  label: "GLS Pickup (Incl. VAT): ",
                  price: "12550",
                },
                {
                  id: "bring",
                  label: "Bring Pickup (Incl. VAT): ",
                  price: "9550",
                },
              ].map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 py-1"
                >
                  <input
                    type="radio"
                    name="shipping"
                    id={option.id}
                    data-price={parseFloat(option.price)}
                    onChange={handleChange}
                  />
                  <label htmlFor={option.id}>
                    {option.label} {formatCurrency(parseFloat(option.price))}
                  </label>
                </div>
              ))}
            </form>
          </div>
          <div className="border-t-2 p-4">
            <form onSubmit={handleCopounSubmit}>
              <div className="flex justify-center items-center">
                <Button
                  className={`w-1/2 mt-5 h-[40px] hover:bg-[#f63b60] hover:text-white border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] cursor-pointer`}
                  type="submit"
                >
                  {loading ? (
                    <div className="flex space-x-2 items-center">
                      <LoaderCircle size={22} className=" animate-spin " />
                      <span>Applying coupon code...</span>
                    </div>
                  ) : (
                    "Apply coupon code"
                  )}
                </Button>
              </div>
            </form>
          </div>
          <div className="flex justify-between items-center border-t-2 p-4">
            <h3 className="text-lg font-ebgaramond font-semibold">
              Total Price
            </h3>
            <h3 className="text-lg font-ebgaramond font-semibold">
              {formatCurrency(parseFloat(totalPrice))}
            </h3>
          </div>
          <div className="w-2/3 mx-auto p-4">
            <button
              type="button"
              className="bg-[#B10C62] w-full hover:bg-blue-[#b10c62] font-ebgaramond text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit(handleFormSubmit)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
