import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlices";

export const store = configureStore({
  reducer: {
    categoryReducer,
    cartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
