import SubmitButton from "@/components/button/SubmitButton";
import TextInput from "@/components/input/Textinput";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Seller, setSeller } from "@/redux/slice/userSlice";
import { ICONS } from "@/utils/icons";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../actions/updateProfile";
import toast from "react-hot-toast";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<string>>;
};
const EditProfile = ({ setActive }: Props) => {
  const { seller } = useAppSelector((state) => state.users);
  const [avatar, setAvatar] = useState<string | File>("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setAvatar(file);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Seller>({
    defaultValues: {
      shopName: seller.data?.shopName,
      fullName: seller.data?.fullName,
      shopAddress: seller.data?.shopAddress,
      phone: seller.data?.phone,
      accountType: seller.data?.accountType,
      description: seller.data?.description,
    },
  });

  const handleUpdateProfile = async (data: Seller) => {
    setLoading(true);
    const formData = { ...data };
    const shopId = seller.data?._id;
    if (!shopId) return;
    const res = await updateProfile(formData, shopId, avatar);
    console.log(res);
    if (res.status === 201) {
      toast.success(res.message);
      setLoading(false);
      dispatch(setSeller({ data: res.shop }));
      setActive("profile");
    } else {
      toast.error(res.message);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)} className="">
      <Card className="w-full mt-[150px] p-3 shadow-lg border-none rounded-[10px] bg-[#27272a74]">
        <CardHeader className="mt-[-100px]">
          <div className="relative">
            <div className="w-[150px] h-[150px] mx-auto">
              {avatar ? (
                <Image
                  src={
                    typeof avatar === "string"
                      ? avatar
                      : URL.createObjectURL(avatar)
                  }
                  alt="profile"
                  width={150}
                  height={150}
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={seller.data?.image ?? ""}
                  alt="seller-profile image"
                  width={150}
                  height={150}
                  className="rounded-full w-full h-full object-cover"
                />
              )}
            </div>
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] left-[56%] bottom-[30px] flex justify-center items-center rounded-full cursor-pointer absolute">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <ICONS.camera
                  size={25}
                  color="#B10C62"
                  className="cursor-pointer"
                />
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent className=" font-urbanist">
          <div className="flex space-x-5 my-5">
            <div className="flex-1 !text-base">
              <TextInput
                register={register}
                errors={errors}
                label="Shop Name"
                name="shopName"
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Full Name"
                name="fullName"
                register={register}
                errors={errors}
              />
            </div>
            <div className=" flex-1 !text-base">
              <TextInput
                label="Email"
                register={register}
                errors={errors}
                name="email"
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
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Phone Number"
                name="phone"
                register={register}
                errors={errors}
              />
            </div>
            <div className=" flex-1 !text-base">
              <TextInput
                label="Account Type"
                name="accountType"
                register={register}
                errors={errors}
                type="select"
                suffixIcon={<ICONS.down />}
                options={[
                  { displayValue: "Individual", value: "Individual" },
                  { displayValue: "Business", value: "Business" },
                ]}
                className=" !cursor-pointer"
              />
            </div>
          </div>
          <div className="flex-1 !text-base">
            <TextInput
              label="Description"
              register={register}
              errors={errors}
              placeholder="Enter Shop Decsription"
              name="description"
              type="textarea"
              className="!h-[150px]"
            />
          </div>
          <div className=" mt-8">
            <SubmitButton
              isLoading={loading}
              loadingTitle="Updating profile. Please wait..."
              title="Update Profile"
              type="submit"
              className="!bg-black text-white !rounded-[3px] !py-2.5 !text-lg"
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default EditProfile;
