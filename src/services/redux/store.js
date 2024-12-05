import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeReducer";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});