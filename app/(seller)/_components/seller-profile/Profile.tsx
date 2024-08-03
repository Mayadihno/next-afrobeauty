import TextInput from "@/components/input/Textinput";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";
import React from "react";

const Profile = () => {
  const { seller } = useAppSelector((state) => state.users);

  console.log(seller.data);
  return (
    <div className="">
      <Card className="w-full mt-[150px] p-3 shadow-lg border-none rounded-[10px] bg-[#27272a74]">
        <CardHeader className="mt-[-100px]">
          <div className="w-[150px] h-[150px] mx-auto">
            <Image
              src={seller.data?.image ?? ""}
              alt="seller-profile image"
              width={150}
              height={150}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className=" font-urbanist">
          <div className="flex space-x-5 my-5">
            <div className="flex-1 !text-base">
              <TextInput
                label="Shop Name"
                name="shopName"
                type="text"
                isDisabled={true}
                value={seller.data?.shopName}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Full Name"
                name="fullName"
                type="text"
                isDisabled={true}
                value={seller.data?.fullName}
              />
            </div>
            <div className=" flex-1 !text-base">
              <TextInput
                label="Email"
                name="Email"
                type="email"
                isDisabled={true}
                value={seller.data?.email}
              />
            </div>
          </div>
          <div className="flex space-x-5 my-5">
            <div className="flex-1 !text-base">
              <TextInput
                label="Shop Address"
                name="shopAddress"
                isDisabled={true}
                value={seller.data?.shopAddress}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Phone Number"
                name="phoneNumber"
                isDisabled={true}
                value={"+" + seller.data?.phone}
              />
            </div>
            <div className=" flex-1 !text-base">
              <TextInput
                label="Account Type"
                name="accountType"
                isDisabled={true}
                value={seller.data?.accountType}
              />
            </div>
          </div>
          <div className="flex-1 !text-base">
            {seller.data?.description && (
              <TextInput
                label="Description"
                name="description"
                isDisabled={true}
                value={seller.data?.description}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
