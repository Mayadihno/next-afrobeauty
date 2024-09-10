import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : typeof window !== "undefined" &&
          window.location.hostname === "localhost"
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL_MOBILE,
  }),
  reducerPath: "orderApi",
  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (arg: {
        userData: any;
        cartItems: any;
        shippingFee: any;
        totalPrice: any;
        paymentInfo: any;
      }) => ({
        url: "create-order",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: [
        { type: "Orders", id: "LIST" },
        { type: "Orders", id: "USERLIST" },
      ],
    }),
    getOrdersByShopId: builder.query({
      query: (arg: { shopId: string; query: string }) => ({
        url: `seller/get-ordersByShopId?id=${arg.shopId}&${arg.query}`,
        method: "GET",
      }),
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),
    getUserOrders: builder.query({
      query: (userId: string) => ({
        url: `user/user-order/?userId=${userId}`,
        method: "GET",
      }),
      providesTags: [{ type: "Orders", id: "USERLIST" }],
    }),
    getOrdersDetailsById: builder.query({
      query: (orderId: string) => ({
        url: `seller/get-orderDetailsByOrderId?id=${orderId}`,
        method: "GET",
      }),
      providesTags: [{ type: "Orders", id: "DETAILS" }],
    }),
    updateOrderStatus: builder.mutation({
      query: (arg: { orderId: string; orderStatus: string }) => ({
        url: `seller/update-orderStatus`,
        method: "PATCH",
        body: {
          orderId: arg.orderId,
          orderStatus: arg.orderStatus,
        },
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
  }),
});

export const {
  useGetOrdersByShopIdQuery,
  useGetOrdersDetailsByIdQuery,
  useUpdateOrderStatusMutation,
  useGetUserOrdersQuery,
  useCreateOrderMutation,
} = orderApi;

export default orderApi;
