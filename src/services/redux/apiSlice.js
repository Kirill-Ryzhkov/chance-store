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
      query: () => `/store/all`,
      providesTags: (result) => {
        if (result) {
          const storeTags = result.store?.map(({ _id }) => ({ 
            type: 'Store', 
            id: _id 
          })) || [];
          
          const cafeTags = result.storeCafeFields?.map(({ _id }) => ({ 
            type: 'StoreField', 
            id: `cafe_${_id}` 
          })) || [];
          
          const merchTags = result.storeMerchFields?.map(({ _id }) => ({ 
            type: 'StoreField', 
            id: `merch_${_id}` 
          })) || [];
          
          return [
            ...storeTags,
            ...cafeTags,
            ...merchTags,
            { type: 'Store', id: 'LIST' },
            { type: 'StoreCafeField', id: 'LIST' },
            { type: 'StoreMerchField', id: 'LIST' }
          ];
        }
        
        return [
          { type: 'Store', id: 'LIST' },
          { type: 'StoreCafeField', id: 'LIST' },
          { type: 'StoreMerchField', id: 'LIST' }
        ];
      }
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
      }),
      invalidatesTags: [{ type: 'Store', id: 'LIST' }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/store/update/${id}`,
        method: "POST",
        body: data,
        formData: true
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Store', id },
        { type: 'Store', id: 'LIST' }
      ],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/store/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Store', id }],
    }),
    createField: builder.mutation({
      query: (formData) => ({
        url: `/store/field/create`,
        method: "POST",
        body: formData,
        formData: true
      }),
      invalidatesTags: [{ type: 'StoreField', id: 'LIST' }],
    }),
    updateField: builder.mutation({
      query: ({ id, data }) => ({
        url: `/store/field/update/${id}`,
        method: "POST",
        body: data,
        formData: true
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'StoreField', id },
        { type: 'StoreField', id: 'LIST' }
      ],
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
  useCreateFieldMutation,
  useUpdateFieldMutation,
  useDeleteFieldMutation
} = apiSlice;
