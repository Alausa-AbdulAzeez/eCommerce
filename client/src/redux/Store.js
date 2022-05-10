import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../redux/categorySlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});
