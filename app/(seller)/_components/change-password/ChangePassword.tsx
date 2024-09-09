"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const { seller } = useAppSelector((state) => state.users);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill in all fields");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const res = await fetch("/api/seller/seller-password-change", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          sellerId: seller?.data?._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success(data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error changing password:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-[75%] mx-auto">
        <h1 className="font-semibold text-3xl my-5 text-center">
          Change Password
        </h1>
        <form onSubmit={handlePasswordChange} className="">
          <div className="my-3">
            <label
              htmlFor="oldPassword"
              className="block w-1/2 mx-auto text-sm pb-2 font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type="password"
              required
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              name="oldPassword"
              className="block w-1/2 p-3 rounded-md border-gray-300 shadow-sm border sm:text-sm mx-auto"
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="newPassword"
              className="block w-1/2 mx-auto text-sm pb-2 font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              name="newPassword"
              className="block w-1/2 p-3 rounded-md border-gray-300 shadow-sm border sm:text-sm mx-auto"
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="confirmPassword"
              className="block w-1/2 mx-auto text-sm pb-2 font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              required
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              className="block w-1/2 p-3 rounded-md border-gray-300 shadow-sm border sm:text-sm mx-auto"
            />
          </div>
          <div className="text-center">
            <button className="!bg-black px-6 py-3 !rounded-[4px] font-[600] text-white text-[18px]">
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
