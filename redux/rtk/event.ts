import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const eventApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : typeof window !== "undefined" &&
          window.location.hostname === "localhost"
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL_MOBILE,
  }),
  reducerPath: "eventApi",
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (formData) => ({
        url: "seller/create-event",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Events", id: "LIST" }],
    }),
    getEventByShopId: builder.query({
      query: (shopId: string) => ({
        url: `seller/get-eventByShopId/?shopId=${shopId}`,
        method: "GET",
      }),
      providesTags: [{ type: "Events", id: "LIST" }],
    }),
    getEventByEventId: builder.query({
      query: (eventId: string) => ({
        url: `seller/get-eventByEventId/?eventId=${eventId}`,
        method: "GET",
      }),
      providesTags: [{ type: "Events", id: "DETAILS" }],
    }),
    getAllEvent: builder.query({
      query: () => ({
        url: "user/get-allEvent",
        method: "GET",
      }),
      providesTags: [{ type: "Events", id: "LIST" }],
    }),
    deleteEventById: builder.mutation({
      query: (eventId: string) => ({
        url: `seller/delete-eventById/?eventId=${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Events", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventByShopIdQuery,
  useGetEventByEventIdQuery,
  useDeleteEventByIdMutation,
  useGetAllEventQuery,
} = eventApi;

export default eventApi;
