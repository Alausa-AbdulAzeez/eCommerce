import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    removeFromCart: (state, action) => {
      if (action.payload.attributes.length === 0) {
        state.value.pop();
      }
      if (action.payload.attributes.length > 0) {
        state.value.splice(
          state.value.findIndex(
            (item) => item.idInCart === action.payload.idInCart
          ),
          1
        );
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
