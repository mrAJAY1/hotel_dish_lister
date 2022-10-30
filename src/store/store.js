import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../features/globalSlice";
import Cart from "../features/Cart";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    cart: Cart,
  },
});
