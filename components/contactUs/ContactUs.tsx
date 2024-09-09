"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "../ui/card";
import TextInput from "../input/Textinput";
import { Controller, useForm } from "react-hook-form";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import SubmitButton from "../button/SubmitButton";

const ContactUs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  interface FormProp {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  }

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormProp>();

  const handleFormSubmit = (data: FormProp) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <div className="bg-[#B10C62] w-full py-5 text-center font-abril font-bold text-4xl md:text-5xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center flex-grow">
            <h3>
              <span className="text-white hover:text-black pl-4">
                Contact Us
              </span>
            </h3>
            <div className="flex justify-center items-center space-x-2 pt-5">
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[180px] h-[10px] rounded-full bg-white"></div>
            </div>
          </div>
          <div className="flex justify-end mr-3">
            <Button
              className="bg-black px-6 py-2 rounded-[10px] hover:bg-black text-white"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="md:container md:mx-auto">
        <div className="w-[100%]">
          <iframe
            style={{ marginTop: "25px" }}
            className=" w-full"
            width="600"
            height="500"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=Placa%20Pompeu%20Fabra%204,%2008760%20Martorell,%20Barcelona.%C2%A0%C2%A0SPAIN&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
          ></iframe>
        </div>
        <div className="my-10">
          <Card className="w-[75%] mx-auto border-none shadow-2xl rounded-md">
            <CardHeader className="text-center text-2xl font-semibold my-4">
              <h3>Message Us</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex justify-between space-x-8 items-center">
                  <div className=" w-full">
                    <TextInput
                      label="First Name"
                      name="firstName"
                      placeholder="John"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className=" w-full">
                    <TextInput
                      label="Last Name"
                      name="lastName"
                      placeholder="Doe"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="flex justify-between space-x-8 my-8 items-center">
                  <div className=" w-full">
                    <TextInput
                      label="Email Address"
                      name="email"
                      placeholder="johnDoe@gmail.com"
                      register={register}
                      errors={errors}
                      type="email"
                    />
                  </div>
                  <div className=" w-full">
                    <div className="">
                      <label
                        htmlFor=""
                        className="block text-xl pb-4 font-semibold font-Urbanist leading-6 text-black"
                      >
                        Phone number
                      </label>
                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: "Phone number is required" }}
                        defaultValue=""
                        render={({ field }) => (
                          <PhoneInput
                            value={field.value}
                            country={"ng"}
                            onChange={(phone) => {
                              field.onChange(`+${phone}`);
                            }}
                            containerClass=" font-Urbanist input-phone-number"
                            inputClass="!w-full !h-[45px] !px-14 !py-2
                            placeholder:!text-xs md:placeholder:!text-base 
                            placeholder:!text-gray-400 !border-[#f5f7f9]
                            !rounded-[1px] !bg-[#f5f7f9] !font-medium !shadow-sm md:!text-base !text-sm !font-Urbanist !text-black"
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <TextInput
                    label="Message Description"
                    name="message"
                    placeholder="Message"
                    register={register}
                    errors={errors}
                    type="textarea"
                    className="h-[150px]"
                  />
                </div>
                <div className="">
                  <SubmitButton
                    isLoading={loading}
                    loadingTitle="Please wait"
                    title="Send Message"
                    type="submit"
                    className={` !bg-[#B10C62] text-white !rounded-[3px] !py-2.5 !text-lg`}
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
