'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = process.env.NEXT_PUBLIC_Product_JSON_SERVER;

// Define a service using a base URL and expected endpoints
export const productSlice = createApi({
  reducerPath: "productsData",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (name) => name,
      providesTags: ["Products"],
    }),
    viewProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: {
            rate: product.rating.rate,
            count: product.rating.count,
          },
        }),
      }),
      invalidatesTags: ["Products"],
    }),
    editProduct: builder.mutation({
      query: ({ id, productData }) => ({
        url: `products/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: productData.editID,
          title: productData.title,
          price: productData.price,
          description: productData.description,
          category: productData.category,
          image: productData.image,
          rating: {
            rate: productData.rating.rate,
            count: productData.rating.count,
          },
        }),
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useViewProductQuery,
  useDeleteProductMutation
} = productSlice;
