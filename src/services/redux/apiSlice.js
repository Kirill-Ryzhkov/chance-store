import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.REACT_APP_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getStoreFields: builder.query({
      query: (page) => `/store/field/list/${page}`,
    }),
    getStoreMultiple: builder.mutation({
      query: ({ type }) => ({
        url: `/store/multiple`,
        method: "POST",
        body: { type },
      }),
    }),
    getStoreSingle: builder.query({
      query: ({ page, slug }) => `/store/single/${page}/${slug}`,
    }),
    getStoreTransaction: builder.mutation({
      query: ({ cart }) => ({
        url: `/store/checkout`,
        method: "POST",
        body: { cart }
      })
    }),
    getStoreTransactionConfirm: builder.mutation({
      query: ({ paymentIntentId }) => ({
        url: `/store/confirm`,
        method: "POST",
        body: { paymentIntentId }
      })
    }),
    getAllStore: builder.query({
      query: () => `/store/all`
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `/user/signin`,
        method: "POST",
        body: { email, password }
      })
    }),
    verify: builder.mutation({
      query: ({ token }) => ({
        url: `/user/verify`,
        method: "POST",
        body: { token }
      })
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: `/store/create`,
        method: "POST",
        body: formData,
        formData: true
      })
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/store/update/${id}`,
        method: "POST",
        body: data,
        formData: true
      })
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/store/delete/${id}`,
        method: "DELETE"
      })
    }),
    deleteField: builder.mutation({
      query: ({ id }) => ({
        url: `/store/field/delete/${id}`,
        method: "DELETE"
      })
    }),
  }),
});

export const {
  useGetStoreFieldsQuery,
  useGetStoreMultipleMutation,
  useGetStoreSingleQuery,
  useGetStoreTransactionMutation,
  useGetStoreTransactionConfirmMutation,
  useGetAllStoreQuery,
  useLoginMutation,
  useVerifyMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteFieldMutation
} = apiSlice;
