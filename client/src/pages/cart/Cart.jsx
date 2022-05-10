import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./cart.css";

const Cart = () => {
  return (
    <div>
      <Navbar />
      <div className="cartText">Cart</div>
      <div className="cartItemWrapper">
        <div className="cartItem">
          <div className="mainCartContent">
            <div className="cartContentLeft">
              <div className="cartPproductBrand">NIKE</div>
              <div className="cartPproductTitle">AIR FORCE 1</div>
              <div className="mainCartProductPrice">$100</div>
              <div className="cartAttributeTitle">SIZE:</div>
              <div
                className="cartAttributesWrapper"
                key={
                  new Date().valueOf().toString(36) +
                  Math.random().toString(36).substr(2)
                }
              >
                <div className="cartProductSize">XL</div>
                <div className="cartProductSize">XL</div>
                <div className="cartProductSize">XL</div>
                <div className="cartProductSize">XL</div>
              </div>
              <div className="productColorWrapper">
                <div className="CartColorText">Color:</div>
                <div className="cartColorsContainer">
                  <div className="cartSelectedColorContainer">
                    <div
                      className="cartProductDisplayColor"
                      style={{
                        backgroundColor: `red`,
                      }}
                      data-color="color"
                    ></div>
                  </div>
                </div>
              </div>
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
                  <img
                    src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
                    alt=""
                    className="currentImg"
                  />
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
