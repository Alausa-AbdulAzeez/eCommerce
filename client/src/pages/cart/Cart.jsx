import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import { addToCart } from "../../redux/cartSlice";
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

  const dispatch = useDispatch();

  const addProductToCart = (e, product) => {
    if (e.target.dataset.type === "inc") {
      dispatch(addToCart(product));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="cartText">Cart</div>
      <div className="cartItemWrapper">
        {mainArray &&
          mainArray.map((cartItem) => {
            const {
              brand,
              name,
              prices,
              attributes,

              gallery,
              varAttributesArray,
            } = cartItem;
            return (
              <div
                className="cartItem"
                key={
                  new Date().valueOf().toString(36) +
                  Math.random().toString(36).substr(2)
                }
              >
                <div className="mainCartContent">
                  <div className="cartContentLeft">
                    <div className="cartPproductBrand">{brand}</div>
                    <div className="cartPproductTitle">{name}</div>
                    <div className="mainCartProductPrice">
                      {currencySymbol}
                      {(prices[0].amount * baseConverter).toFixed(2)}
                    </div>
                    {attributes.length > 0 &&
                      attributes.map((attribute) => {
                        const { id, name } = attribute;
                        if (id === "Color") {
                          return (
                            <div className="productColorWrapper" key={id}>
                              <div className="sizeText">Color:</div>
                              <div className="colorsContainer">
                                <div className="selectedColorWrapper">
                                  {attribute.items.map((item) => {
                                    const { id, value } = item;
                                    if (varAttributesArray.Color === value) {
                                      if (value === "#FFFFFF") {
                                        return (
                                          <div
                                            className="selectedColorContainer"
                                            key={id}
                                          >
                                            <div
                                              className="whiteDisplayColor"
                                              style={{
                                                backgroundColor: `${value}`,
                                              }}
                                              data-color="color"
                                            ></div>
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div
                                            className="selectedColorContainer selectedColor"
                                            key={id}
                                          >
                                            <div
                                              className="productDisplayColor "
                                              style={{
                                                backgroundColor: `${value}`,
                                              }}
                                              data-color="color"
                                            ></div>
                                          </div>
                                        );
                                      }
                                    } else {
                                      if (value === "#FFFFFF") {
                                        return (
                                          <div
                                            className="selectedColorContainer"
                                            key={id}
                                          >
                                            <div
                                              className="whiteDisplayColor"
                                              style={{
                                                backgroundColor: `${value}`,
                                              }}
                                              data-color="color"
                                            ></div>
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div
                                            className="selectedColorContainer "
                                            key={id}
                                          >
                                            <div
                                              className="productDisplayColor "
                                              style={{
                                                backgroundColor: `${value}`,
                                              }}
                                              data-color="color"
                                            ></div>
                                          </div>
                                        );
                                      }
                                    }
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div className={`productSizeWrapper `} key={id}>
                              <div className="sizeText">{name}:</div>
                              <div className="sizesContainer">
                                {attribute.items.map((singleAttribute) => {
                                  const { value, id } = singleAttribute;
                                  if (value === varAttributesArray[name]) {
                                    return (
                                      <div
                                        className={`productSize selectedAttribute`}
                                        key={id}
                                      >
                                        {value}
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div className={`productSize`} key={id}>
                                        {value}
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          );
                        }
                      })}
                  </div>
                  <div className="contentRight">
                    <div className="quantitySet">
                      <button
                        className="mainCartAdd"
                        onClick={(e) => addProductToCart(e, cartItem)}
                        data-type={"inc"}
                      >
                        +
                      </button>
                      <div className="mainCartQuantity">
                        {cart.length > 0 &&
                          cart.filter(
                            (itemInCart) =>
                              itemInCart.idInCart === cartItem.idInCart
                          ).length}
                      </div>
                      <button
                        className="mainCartRemove"
                        onClick={(e) => addProductToCart(e, cartItem)}
                        data-type={"inc"}
                      >
                        -
                      </button>
                    </div>
                    <div className="mainCartImg">
                      <img
                        src={require("../../icons/chevLeft.png")}
                        alt=""
                        className="chevLeft"
                      />
                      <div className="cartImgContainer">
                        <img src={gallery[0]} alt="" className="currentImg" />
                      </div>
                      <img
                        src={require("../../icons/chevRight.png")}
                        alt=""
                        className="chevRight"
                      />
                    </div>
                  </div>
                </div>
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
