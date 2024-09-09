"use client";
import Image from "next/image";
import React, { useState } from "react";
import image from "../../../../public/assets/profile.png";
import { ICONS } from "@/utils/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import toast from "react-hot-toast";
import { setBuyer } from "@/redux/slice/userSlice";

const Profile = () => {
  const { buyer } = useAppSelector((state) => state.users);
  const [avatar, setAvatar] = useState<string | File>("");
  const [fullName, setFullName] = useState(buyer?.data?.name || "");
  const [email, setEmail] = useState(buyer?.data?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(buyer?.data?.phone || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const dispatch = useAppDispatch();

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", avatar as File);
    formData.append("upload_preset", "mayadihno");

    try {
      const uploadResponse = await fetch(
        process.env.CLOUDINARY_API_FRONTEND as string,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }

      const uploadData = await uploadResponse.json();
      const image_url = uploadData.secure_url;

      if (image_url) {
        const res = await fetch("/api/user/upload-profile-picture", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: buyer?.data?._id,
            profilePicture: image_url,
          }),
        });

        const data = await res.json();
        setLoading(false);
        if (res.ok) {
          dispatch(setBuyer({ data: data.user }));
          toast.success(data.message, {
            duration: 3000,
          });
        } else {
          toast.error(data.message, {
            duration: 3000,
          });
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while uploading the image.");
      console.error(error);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);

    try {
      const res = await fetch("/api/user/update-profile-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: buyer?.data?._id,
          fullName,
          email,
          phoneNumber,
          password,
        }),
      });

      const data = await res.json();
      setLoadingProfile(false);

      if (res.ok) {
        dispatch(setBuyer({ data: data.user }));
        toast.success(data.message, {
          duration: 3000,
        });
        setPassword("");
      } else {
        toast.error(data.message, {
          duration: 3000,
        });
      }
    } catch (error) {
      setLoadingProfile(false);
      toast.error("An error occurred while updating the profile.");
      console.error(error);
    }
  };

  return (
    <div className="w-[70%] mx-auto font-ebgaramonds">
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="flex justify-center w-full">
          <div className="relative">
            {avatar ? (
              <Image
                src={
                  typeof avatar === "string"
                    ? avatar
                    : URL.createObjectURL(avatar)
                }
                alt="profile"
                width={300}
                height={300}
                className="rounded"
              />
            ) : buyer?.data?.avatar ? (
              <Image
                src={buyer.data.avatar}
                alt="profile"
                width={300}
                height={300}
                className="rounded"
              />
            ) : (
              <Image
                src={image}
                alt="profile"
                width={200}
                height={200}
                className="rounded-full"
              />
            )}
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[25px] right-[15px]">
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
        </div>
        <div
          onClick={handleUpload}
          className="bg-[#B10C62] text-white rounded px-10 py-2 my-5 flex items-center justify-center cursor-pointer"
        >
          <button>{loading ? "Uploading..." : "Upload"}</button>
        </div>
        <div className="w-[60%]">
          <form onSubmit={updateProfile}>
            <div className="w-full">
              <label className="pb-2 block">Full name</label>
              <input
                type="text"
                className="border p-1 rounded-[5px] mb-4 md:mb-0 !w-[95%] capitalize"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="w-full my-3">
              <label className="pb-2 block">Email</label>
              <input
                type="email"
                className="border p-1 rounded-[5px] mb-4 md:mb-0 !w-[95%]"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-3 w-full">
              <div className="800px:w-[50%] w-full">
                <label className="pb-2 block">Phone Number</label>
                <input
                  type="tel"
                  className="border p-1 rounded-[5px] mb-4 md:mb-0 !w-[95%] capitalize"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="my-3 w-full">
              <label className="pb-2 block">Enter your password</label>
              <input
                type="password"
                className="border p-1 rounded-[5px] mb-4 md:mb-0 !w-[95%] capitalize"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="bg-[#B10C62] text-white rounded px-10 py-2 my-5 flex items-center justify-center cursor-pointer">
              <button type="submit" disabled={!password}>
                {loadingProfile ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
