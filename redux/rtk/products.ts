import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
  }),
  tagTypes: ["Products"],
  reducerPath: "productApi",
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 10,
          name = "",
          category = "",
          gender = "",
          subcategory = "",
        } = params;
        const queryStr = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          ...(name && { name }),
          ...(category && { category }),
          ...(subcategory && { subcategory }),
          ...(gender && { gender }),
        }).toString();

        return {
          url: `user/get-allProduct?${queryStr}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "Products", id: "LIST" }],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `user/get-productById?id=${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Products", id: "DETAIL" }],
    }),
    getRelatedProduct: builder.query({
      query: (id) => ({
        url: `user/get-relatedProduct?id=${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Products", id: "RELATED" }],
    }),

    getShopProductByShopId: builder.query({
      query: (shopId) => ({
        url: `user/get-sellerProduct?id=${shopId}`,
        method: "GET",
      }),
      providesTags: [{ type: "Products", id: "SHOP" }],
    }),

    getLatestProduct: builder.query({
      query: () => ({
        url: `user/get-latestProduct`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    getProductByShopId: builder.query({
      query: (arg: { shopId: string; querys: string }) => ({
        url: `seller/get-product?shopId=${arg.shopId}&${arg.querys}`,
        method: "GET",
      }),
      providesTags: [{ type: "Products", id: "SHOP_PRODUCT" }],
    }),

    //create mutation
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "seller/create-product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    //update mutation
    updateProduct: builder.mutation({
      query: ({ data, shopId, productId }) => ({
        url: "seller/update-product",
        method: "PATCH",
        body: { data, shopId, productId },
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateProductImages: builder.mutation({
      query: (newForm) => ({
        url: `seller/update-product-image`,
        method: "PUT",
        body: newForm,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProductStatus: builder.mutation({
      query: ({ productId, newStatus }) => ({
        url: `seller/update-product-status`,
        method: "PATCH",
        body: { productId, newStatus },
      }),
      invalidatesTags: ["Products"],
    }),

    //delete mutation
    deleteProductImageByImage: builder.mutation({
      query: ({ id, index, shopId }) => ({
        url: `seller/delete-productImage`,
        method: "PUT",
        body: { id, index, shopId },
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `seller/delete-product?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useCreateProductMutation,
  useGetProductByShopIdQuery,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
  useUpdateProductMutation,
  useDeleteProductImageByImageMutation,
  useUpdateProductImagesMutation,
  useGetLatestProductQuery,
  useGetProductByIdQuery,
  useGetShopProductByShopIdQuery,
  useGetRelatedProductQuery,
} = productApi;
export default productApi;
