import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const CartContent = ({ cartItem }) => {
  const { brand, name, prices, attributes, gallery, varAttributesArray } =
    cartItem;
  const [imgIndex, setImgIndex] = useState(0);
  const [clickedProduct, setClickedProduct] = useState(null);

  const incRef = useRef();
  const decRef = useRef();
  const dispatch = useDispatch();

  const cart = useSelector((state) => {
    return state.cart.value;
  });

  const currencySymbol = useSelector((state) => {
    return state.currency.value.currency;
  });
  const baseConverter = useSelector((state) => {
    return state.currency.value.baseConverter;
  });

  const addProductToCart = (e, product) => {
    if (e.target.dataset.type === "inc") {
      dispatch(addToCart(product));
    }
  };
  const abc = (action, cartItem, e) => {
    if (imgIndex === 1) {
      decRef.current.style.backgroundColor = "white";
    }
    if (imgIndex === cartItem.gallery.length - 2) {
      incRef.current.style.backgroundColor = "white";
    }
    if (action === "inc") {
      if (imgIndex < cartItem.gallery.length - 1) {
        setImgIndex(imgIndex + 1);
        decRef.current.style.backgroundColor = "black";
      }
    }
    if (action === "dec") {
      incRef.current.style.backgroundColor = "black";
      if (imgIndex >= 1) {
        setImgIndex(imgIndex - 1);
        return;
      }
    }
  };

  const setIndex = (action, cartItem, e) => {
    console.log(cartItem);
    setClickedProduct(cartItem);
    abc(action, cartItem, e);
  };

  return (
    <div>
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
                  (itemInCart) => itemInCart.idInCart === cartItem.idInCart
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
              style={
                gallery.length > 1
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
              //   onClick={
              //     clickedProduct === cartItem
              //       ? (e) => setIndex("dec", cartItem, e)
              //       : null
              //   }
              onClick={(e) => setIndex("dec", cartItem, e)}
              ref={decRef}
            />
            <div className="cartImgContainer">
              <img src={gallery[imgIndex]} alt="" className="currentImg" />
            </div>
            <img
              src={require("../../icons/chevRight.png")}
              alt=""
              className="chevRight"
              style={
                gallery.length > 1
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
              onClick={(e) => setIndex("inc", cartItem, e)}
              ref={incRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
