import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const discountApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : process.env.NEXT_PUBLIC_API_URL,
  }),
  reducerPath: "discountApi",
  tagTypes: ["Discounts"],
  endpoints: (builder) => ({
    createDiscount: builder.mutation({
      query: (formData) => ({
        url: "seller/create-discount-code",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Discounts", id: "LIST" }],
    }),
    getDiscountByShopId: builder.query({
      query: (shopId: string) => ({
        url: `seller/get-discountCodeByShopId/?shopId=${shopId}`,
        method: "GET",
      }),
      providesTags: [{ type: "Discounts", id: "LIST" }],
    }),

    getDiscountCodeByName: builder.query({
      query: ({ couponName }: { couponName: string }) => ({
        url: `user/get-discountCodeByName/?couponName=${couponName}`,
        method: "GET",
      }),
      providesTags: [{ type: "Discounts", id: "LIST" }],
    }),

    deleteDiscountById: builder.mutation({
      query: ({
        discountId,
        shopId,
      }: {
        discountId: string;
        shopId: string;
      }) => ({
        url: `seller/delete-discountById/?discountId=${discountId}&shopId=${shopId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Discounts", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateDiscountMutation,
  useGetDiscountByShopIdQuery,
  useDeleteDiscountByIdMutation,
  useGetDiscountCodeByNameQuery,
} = discountApi;

export default discountApi;
