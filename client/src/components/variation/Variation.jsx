import React, { useRef } from "react";
import "./variation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Variation = () => {
  const varConRef = useRef();

  const closeVarWrapper = () => {
    varConRef.current.classList.remove("show");
    document.body.style.overflowY = "scroll";
  };

  return (
    <div className="variationContainer" ref={varConRef}>
      <div className="variationContentContainer">
        <div className="containerTop">
          <h3 className="variationTitle">Please select a variation</h3>
          <div className="addVariation">Add</div>
          <span className="closeIcon" onClick={() => closeVarWrapper()}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <div className="varBottom">
          <div className="varBottomLeft">
            <div className="varProductName">NIKE</div>
            <div className="varProductName">AIR FORCE 1</div>
          </div>
          <div className="varBottomRight">
            <div className="varAttributeTitle">Size:</div>
            <div
              className="varCartAttributesWrapper"
              key={
                new Date().valueOf().toString(36) +
                Math.random().toString(36).substr(2)
              }
            >
              <div className="varCartProductSize">XL</div>
              <div className="varCartProductSize">XL</div>
              <div className="varCartProductSize">XL</div>
              <div className="varCartProductSize">XL</div>
            </div>
            <div className="productColorWrapper">
              <div className="miniCartColorText">Color:</div>
              <div className="miniCartColorsContainer">
                <div className="miniCartSelectedColorContainer">
                  <div
                    className="miniCartProductDisplayColor"
                    style={{
                      backgroundColor: `orange`,
                    }}
                    data-color="color"
                  ></div>
                  <div
                    className="miniCartProductDisplayColor"
                    style={{
                      backgroundColor: `gray`,
                    }}
                    data-color="color"
                  ></div>
                  <div
                    className="miniCartProductDisplayColor"
                    style={{
                      backgroundColor: `green`,
                    }}
                    data-color="color"
                  ></div>
                </div>
              </div>
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
              <img
                src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
                alt=""
                className="miniCurrentImage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variation;
