import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import "./cart.css";

const Cart = () => {
  const cart = useSelector((state) => {
    console.log(state.cart.value);
    return state.cart.value;
  });

  return (
    <div>
      <Navbar />
      <div className="cartText">Cart</div>
      <div className="cartItemWrapper">
        {cart.map((cartItem) => {
          const {
            brand,
            name,
            prices,
            attributes,
            id,
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
                    ${prices[0].amount}
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
                    <button className="mainCartAdd">+</button>
                    <div className="mainCartQuantity">10</div>
                    <button className="mainCartRemove">-</button>
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
            <div className="taxVal">$42 </div>
            <div className="cartBtmQuantityVal">3 </div>
            <div className="cartBtmTotalVal">$200</div>
          </div>
        </div>
        <button className="cartBtmBtn">ORDER</button>
      </div>
    </div>
  );
};

export default Cart;
