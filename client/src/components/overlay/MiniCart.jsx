import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VarItem from "../variation/VarItem";
import "./miniCart.css";

const MiniCart = ({ navProperties, setNavProperties }) => {
  const { overlayHeight, clicked } = navProperties;
  const [show, setShow] = useState(clicked);
  const overLayRef = useRef();
  const miniCartRef = useRef();

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

  useEffect(() => {
    setShow(clicked);
    if (overLayRef) {
      overLayRef.current.style.height = "100%";
    }
    if (show) {
      overLayRef.current.style.visibility = `visible`;
      miniCartRef.current.style.visibility = `visible`;
      document.body.style.overflowY = "hidden";
    } else {
      overLayRef.current.style.visibility = `hidden`;
      miniCartRef.current.style.visibility = `hidden`;
      document.body.style.overflowY = "scroll";
    }
  }, [overlayHeight, show, clicked]);

  const handleCloseOverlay = () => {
    setNavProperties({
      clicked: false,
    });
  };
  return (
    <div className="miniCartWrapper">
      <div
        className="cartOverlay"
        onClick={handleCloseOverlay}
        ref={overLayRef}
      ></div>
      <div className="miniCart" ref={miniCartRef}>
        <div className="miniCartTitle">
          My Bag, <span>{cart.length} item(s)</span>
        </div>
        <div className="mainCartContents">
          {mainArray.map((cartItem) => {
            return (
              <VarItem
                cartItem={cartItem}
                varAttributesArray={
                  cartItem.attributesArray || cartItem.varAttributesArray
                }
                key={
                  new Date().valueOf().toString(36) +
                  Math.random().toString(36).substr(2)
                }
              />
            );
          })}
          <div className="miniCartFooter">
            <div className="miniCartTotal">
              <div className="totalText">Total</div>
              <div className="totalDigit">
                {currencySymbol}
                {(sumWithInitial * baseConverter).toFixed(2)}
              </div>
            </div>
            <div className="miniCartButtons">
              <Link to={"/cart"} className="viewBag">
                <div>VIEW BAG</div>
              </Link>
              <div className="checkOut">CHECKOUT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
