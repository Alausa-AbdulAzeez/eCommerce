import React from "react";
import { useSelector } from "react-redux";
import CartContent from "../../components/cart/CartContent";
import Navbar from "../../components/navbar/Navbar";
import "./cart.css";

const Cart = () => {
  const cart = useSelector((state) => {
    return state.cart.value;
  });

  const currencySymbol = useSelector((state) => {
    return state.currency.value.currency;
  });
  const baseConverter = useSelector((state) => {
    return state.currency.value.baseConverter;
  });

  let pricesArr = [];

  cart.map((cartItem) => {
    return pricesArr.push(cartItem.prices[0].amount);
  });

  const initialValue = 0;
  const sumWithInitial = pricesArr.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  const tax = (21 / 100) * sumWithInitial;
  const total = tax + sumWithInitial;

  const uniqueValues = new Set(cart.map((v) => v.idInCart));
  const uniqueValuesId = new Set(uniqueValues);
  const uniqueValuesArray = [...uniqueValuesId];
  const mainArray = [];

  for (let index = 0; index < uniqueValuesArray.length; index++) {
    const found = cart.find(
      (item) => uniqueValuesArray[index] === item.idInCart
    );
    mainArray.push(found);
  }

  return (
    <div>
      <Navbar />
      <div className="cartText">Cart</div>
      <div className="cartItemWrapper">
        {mainArray &&
          mainArray.map((cartItem) => {
            return (
              <div
                className="cartItem"
                key={
                  new Date().valueOf().toString(36) +
                  Math.random().toString(36).substr(2)
                }
              >
                <CartContent cartItem={cartItem} />
              </div>
            );
          })}
      </div>

      <div className="cartBtmWrapper">
        <div className="cartBottom">
          <div className="cartBottomLeft">
            <div className="tax">Tax 21%: </div>
            <div className="cartBtmQuantity">Quantity: </div>
            <div className="cartBtmTotal">Total:</div>
          </div>
          <div className="cartBottomRight">
            <div className="taxVal">
              {currencySymbol}
              {(tax * baseConverter).toFixed(2)}
            </div>
            <div className="cartBtmQuantityVal">{cart.length} </div>
            <div className="cartBtmTotalVal">
              {currencySymbol}
              {(total * baseConverter).toFixed(2)}
            </div>
          </div>
        </div>
        <button className="cartBtmBtn">ORDER</button>
      </div>
    </div>
  );
};

export default Cart;
