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
  }),
});

export const {
  useGetStoreFieldsQuery,
  useGetStoreMultipleMutation,
  useGetStoreSingleQuery,
} = apiSlice;
