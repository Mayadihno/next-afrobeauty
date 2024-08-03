"use client";
import { ICONS } from "@/utils/icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type SetOpenProp = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ResetPassword = ({ setOpen }: SetOpenProp) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("resetPasswordEmail");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        toast.success(data.message);
        setOpen(false);
        router.push("/login");
        localStorage.removeItem("resetPasswordEmail");
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {}
  };
  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-center items-center">
      <div className=" relative w-[95%] md:w-[40%] h-[85vh] md:h-[55vh] bg-white rounded-md p-4 shadow-sm md:mt-0 mt-[-50px] ">
        <ICONS.close
          size={30}
          className="absolute right-3 top-3 z-50"
          onClick={() => setOpen(false)}
        />
        <div className="w-full px-6 mt-[50px]">
          <form action="" onSubmit={handleSubmit} className="flex flex-col">
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your new password"
                id="password"
                className="block w-full p-3 rounded-md my-3 border-gray-300 shadow-sm border sm:text-sm mx-auto"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter your confirm password"
                id="confirmPassword"
                className="block w-full p-3 rounded-md my-3 border-gray-300 shadow-sm border sm:text-sm mx-auto"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#B10C62] text-white p-2"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
