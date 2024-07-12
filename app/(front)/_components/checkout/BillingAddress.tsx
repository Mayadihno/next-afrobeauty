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

  const handleFormSubmit = (data: BillingAddressProps) => {
    if (!selected) {
      toast.error("Please select a shipping method");
      return;
    }
    const shippingFee = selected?.price || 0;
    const totalPrice = subTotal + shippingFee;
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

  const data = [
    { value: "", displayValue: "Choose your country" },
    ...Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      displayValue: `${country.name}`,
    })),
  ];

  const subTotal = cartItems.reduce((a, b) => a + b.price * b.qty, 0);

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

  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="grid md:grid-cols-5 gap-5 grid-cols-1">
        <div className="overflow-x-auto px-4 py-3 col-span-3 bg-[#ffffff] shadow-md">
          <h3 className=" text-lg font-ebgaramond font-semibold">
            Billing address
          </h3>
          <div className="my-2">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="font-medium font-ebgaramond"
              id="billingForm"
            >
              <div className="flex space-x-8 my-5">
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
              <div className="flex space-x-8 my-5">
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
                    label="Company Name (optional)"
                    placeholder="Company Name"
                    name="companyName"
                    register={register}
                    errors={errors}
                    className="w-full !rounded-[5px]"
                  />
                </div>
              </div>
              <div className="flex space-x-8 my-5 ">
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
              <div className="flex space-x-8 my-5">
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
        <div className="col-span-2 h-fit bg-slate-100">
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
          <div className="flex justify-between p-4">
            <h3 className="text-lg font-ebgaramond font-semibold">
              Shipping Fee
            </h3>
            <form className="font-urbanist text-base font-medium">
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
          <div className="flex justify-between items-center border-t-2 p-4">
            <h3 className="text-lg font-ebgaramond font-semibold">
              Total Price
            </h3>
            <h3 className="text-lg font-ebgaramond font-semibold">
              {formatCurrency(subTotal + (selected?.price || 0))}
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
