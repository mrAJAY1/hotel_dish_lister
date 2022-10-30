import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartCount: 0,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCount: (state, { payload }) => {
      const index = state.cartItems?.findIndex((item) => item.id === payload);
      if (index !== -1) {
        state.cartItems[index].count += 1;
        state.cartCount += 1;
      } else {
        state.cartItems.push({ id: payload, count: 1 });
        state.cartCount += 1;
      }
    },
    decrementCount: (state, { payload }) => {
      const index = state.cartItems?.findIndex((item) => item.id === payload);
      if (index !== -1) {
        if (state.cartItems[index]?.count > 1) {
          state.cartItems[index].count -= 1;

          state.cartCount -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== payload
          );
          state.cartCount -= 1;
        }
      }
    },
  },
});
export const { incrementCount, decrementCount } = cart.actions;
export default cart.reducer;
