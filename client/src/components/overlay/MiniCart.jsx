import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./miniCart.css";

const MiniCart = ({ navProperties, setNavProperties }) => {
  const { overlayHeight, clicked } = navProperties;
  const [show, setShow] = useState(clicked);
  const overLayRef = useRef();
  const miniCartRef = useRef();

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
          My Bag, <span>3 item(s)</span>
        </div>
        <div className="mainCartContents">
          <div className="miniCartContent">
            <div className="miniContentLeft">
              <div className="miniProductName">NIKE</div>
              <div className="miniProductName">AIR FORCE 1</div>
              <div className="miniCartProductPrice">$100</div>
              <div className="miniAttributeTitle">Size:</div>
              <div
                className="miniCartAttributesWrapper"
                key={
                  new Date().valueOf().toString(36) +
                  Math.random().toString(36).substr(2)
                }
              >
                <div className="miniCartProductSize">XL</div>
                <div className="miniCartProductSize">XL</div>
                <div className="miniCartProductSize">XL</div>
                <div className="miniCartProductSize">XL</div>
              </div>
              <div className="productColorWrapper">
                <div className="miniCartColorText">Color:</div>
                <div className="miniCartColorsContainer">
                  <div className="miniCartSelectedColorContainer">
                    <div
                      className="miniCartProductDisplayColor"
                      style={{
                        backgroundColor: `red`,
                      }}
                      data-color="color"
                    ></div>
                    <div
                      className="miniCartProductDisplayColor"
                      style={{
                        backgroundColor: `red`,
                      }}
                      data-color="color"
                    ></div>
                    <div
                      className="miniCartProductDisplayColor"
                      style={{
                        backgroundColor: `red`,
                      }}
                      data-color="color"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="miniContentRight">
              <div className="miniVariationSet">
                <button className="miniVariationAdd">+</button>
                <div className="miniVariationQuantity">10</div>
                <button className="miniVariationRemove">-</button>
              </div>
              <div className="miniCartImage">
                <img
                  src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
                  alt=""
                  className="miniCurrentImage"
                />
              </div>
            </div>
          </div>
          <div className="miniCartContent">
            <div className="miniContentLeft">
              <div className="miniProductName">NIKE</div>
              <div className="miniProductName">AIR FORCE 1</div>
              <div className="miniCartProductPrice">$100</div>
              <div className="miniAttributeTitle">Size:</div>
              <div
                className="miniCartAttributesWrapper"
                key={
                  new Date().valueOf().toString(36) +
                  Math.random().toString(36).substr(2)
                }
              >
                <div className="miniCartProductSize">XL</div>
                <div className="miniCartProductSize">XL</div>
                <div className="miniCartProductSize">XL</div>
                <div className="miniCartProductSize">XL</div>
              </div>
              <div className="productColorWrapper">
                <div className="miniCartColorText">Color:</div>
                <div className="miniCartColorsContainer">
                  <div className="miniCartSelectedColorContainer">
                    <div
                      className="miniCartProductDisplayColor"
                      style={{
                        backgroundColor: `red`,
                      }}
                      data-color="color"
                    ></div>
                    <div
                      className="miniCartProductDisplayColor"
                      style={{
                        backgroundColor: `red`,
                      }}
                      data-color="color"
                    ></div>
                    <div
                      className="miniCartProductDisplayColor"
                      style={{
                        backgroundColor: `red`,
                      }}
                      data-color="color"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="miniContentRight">
              <div className="miniVariationSet">
                <button className="miniVariationAdd">+</button>
                <div className="miniVariationQuantity">10</div>
                <button className="miniVariationRemove">-</button>
              </div>
              <div className="miniCartImage">
                <div className="miniCurrentImage"></div>
                <img
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000"
                  alt=""
                  className="miniCurrentImg"
                />
              </div>
            </div>
          </div>
          <div className="miniCartFooter">
            <div className="miniCartTotal">
              <div className="totalText">Total</div>
              <div className="totalDigit">$100</div>
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
