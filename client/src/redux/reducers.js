import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "../redux/categorySlice";
import cartReducer from "../redux/cartSlice";

export const rootReducers = combineReducers({
  category: categoryReducer,
  cart: cartReducer,
});
