import { Seller } from "@/redux/slice/userSlice";

export const updateProfile = async (
  formData: Seller,
  shopId: string,
  avatar: File | string
) => {
  const formdata = new FormData();
  formdata.append("shopId", shopId);
  formdata.append("shopName", formData.shopName);
  formdata.append("fullName", formData.fullName);
  formdata.append("shopAddress", formData.shopAddress);
  formdata.append("phone", formData.phone);
  formdata.append("accountType", formData.accountType);
  formdata.append("email", formData.email);
  if (formData.description) {
    formdata.append("description", formData.description);
  }
  if (avatar) {
    formdata.append("avatar", avatar);
  }

  try {
    const res = await fetch("/api/seller/update-seller-profile", {
      method: "PATCH",
      body: formdata,
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
