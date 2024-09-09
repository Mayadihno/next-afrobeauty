"use client";
import Image from "next/image";
import React, { useState } from "react";
import image from "../../public/assets/Forgot password-amico.png";
import toast from "react-hot-toast";
import Token from "./Token";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (email === "") {
      return toast.error("Please enter your email");
    }
    try {
      const res = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        toast.success(data.message);
        setToken(data.token);
        console.log(data);
        localStorage.setItem("resetPasswordEmail", email);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {}
  };
  return (
    <div className="w-[60%] mx-auto">
      <h3 className=" text-center text-3xl font-ebgaramond font-semibold my-6">
        Forget Password
      </h3>
      <div className="flex items-center space-x-3">
        <div className="w-1/2">
          <Image src={image} alt="" width={300} height={300} />
        </div>
        <div className="w-1/2">
          {token ? (
            <Token token={token} />
          ) : (
            <form action="" onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                className="block w-full p-3 rounded-md my-3 border-gray-300 shadow-sm border sm:text-sm mx-auto"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-[#B10C62] text-white p-1"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
