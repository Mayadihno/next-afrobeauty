"use client";
import { loadStart, loadStop } from "@/redux/slice/loadingSlice";
import { AppDispatch } from "@/redux/store";

export const loginUser = async (
  url: string,
  formData: LoginProp,
  dispatch: AppDispatch
) => {
  try {
    dispatch(loadStart());
    console.log(formData);
    const response = await fetch(`/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    console.log(response);
    dispatch(loadStop());
  } catch (error) {}
};
