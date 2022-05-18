import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "../redux/categorySlice";
import cartReducer from "../redux/cartSlice";
import currencyReducer from "../redux/currencyConverterSlice";

export const rootReducers = combineReducers({
  category: categoryReducer,
  cart: cartReducer,
  currency: currencyReducer,
});
