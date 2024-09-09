"use client";
import { loadStart, loadStop } from "@/redux/slice/loadingSlice";
import { AppDispatch } from "@/redux/store";
import { LoginProp } from "@/types/types";

export const loginUser = async (
  url: string,
  formData: LoginProp,
  dispatch: AppDispatch
) => {
  try {
    dispatch(loadStart());
    const response = await fetch(`/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    dispatch(loadStop());
  } catch (error) {}
};
