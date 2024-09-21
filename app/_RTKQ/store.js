import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./productSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Add the generated reducer as a specific top-level slice
    [productSlice.reducerPath]: productSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(productSlice.middleware),
  devTools: process.env.NEXT_PUBLIC_NODE_ENV,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
