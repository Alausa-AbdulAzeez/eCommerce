import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { currency: "$", baseConverter: Number("1") },
};

export const currencyConverterSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      if (action.payload === "$") {
        state.value = {
          currency: "$",
          baseConverter: Number("1"),
        };
      }
      if (action.payload === "£") {
        state.value = {
          currency: "£",
          baseConverter: Number("0.866671"),
        };
      }
      if (action.payload === "A$") {
        state.value = {
          currency: "A$",
          baseConverter: Number("1.555409"),
        };
      }
      if (action.payload === "¥") {
        state.value = {
          currency: "¥",
          baseConverter: Number("130.210363"),
        };
      }
      if (action.payload === "₽") {
        state.value = {
          currency: "₽",
          baseConverter: Number("91.181299"),
        };
      }
    },
  },
});

export const { setCurrency } = currencyConverterSlice.actions;

export default currencyConverterSlice.reducer;
