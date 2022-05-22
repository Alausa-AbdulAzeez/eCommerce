import React, { useEffect, useRef, useState } from "react";
import "./variation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import VarItem from "./VarItem";

const Variation = ({ product }) => {
  const [varAttributesArray, setVarAttributesArray] = useState();
  const [varProductAtt, setVarProductAtt] = useState();
  const [disabled, setDisabled] = useState(true);
  const [varAdded, setVarAdded] = useState([]);

  const varConRef = useRef();
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart.value;
  });

  useEffect(() => {
    function checkArr() {
      if (varAttributesArray && varProductAtt) {
        if (
          product &&
          product.attributes.length === Object.keys(varAttributesArray).length
        ) {
          setDisabled(false);
        }
      }
    }
    checkArr();
  }, [varAttributesArray, varProductAtt, product]);

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

  // Remove attribute
  const removeAttribute = (attributeType) => {
    let className = `varSelected${attributeType}`;
    let modClassName = className.split(" ").join("");
    const sizeList = document.querySelectorAll(`.${modClassName}`);
    sizeList.forEach((item) => {
      item.classList.remove(`${modClassName}`);
    });
  };

  const addAttribute = (e, attribute) => {
    let className = `varSelected${attribute}`;
    let modClassName = className.split(" ").join("");
    e.target.classList.add(`${modClassName}`);
  };

  // Remove style from selected attribute
  const removeColor = () => {
    const colorList = document.querySelectorAll(".varSelectedColor");
    colorList.forEach((item) => item.classList.remove("varSelectedColor"));
  };

  // Add Remove style to selected attribute
  const addColor = (e) => {
    if (e.target.dataset.color === "color") {
      e.target.parentElement.classList.add("varSelectedColor");
    }
  };

  const selectAttribute = (e, attributeType, attribute, attributes) => {
    setVarAttributesArray({
      ...varAttributesArray,
      [attributeType]: attribute,
    });
    setVarProductAtt(attributes);
    if (attributeType === "Color") {
      removeColor();
      addColor(e);
    } else {
      removeAttribute(attributeType);
      addAttribute(e, attributeType);
    }
  };

  const closeVarWrapper = () => {
    varConRef.current.classList.remove("show");
    document.body.style.overflowY = "scroll";
  };

  const addProductToCart = (e, product) => {
    let idInCart =
      Object.values(varAttributesArray).toString().split(",").join("") +
      product.id;
    let productInCart = {
      ...product,
      varAttributesArray,
      idInCart: idInCart,
    };
    dispatch(addToCart(productInCart));
    setVarAdded([...varAdded, productInCart]);
  };

  return (
    product && (
      <div className="variationContainer" ref={varConRef}>
        <div className="variationContentContainer">
          <div className="containerTop">
            <h3 className="variationTitle">Please select a variation</h3>
            <button
              className="addVariation"
              disabled={disabled}
              onClick={(e) => addProductToCart(e, product)}
            >
              Add
            </button>
            <span className="closeIcon" onClick={() => closeVarWrapper()}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <div className="varBottom">
            <div className="varBottomLeft">
              <div className="varProductName">{product.brand}</div>
              <div className="varProductName">{product.name}</div>
            </div>
            <div className="varBottomRight">
              {product.attributes.map((attributeSet) => {
                const { id, name } = attributeSet;

                if (id === "Color") {
                  return (
                    <div className="productColorWrapper" key={id}>
                      <div className="miniCartColorText">Color:</div>
                      <div className="miniCartColorsContainer">
                        {attributeSet.items.map((item) => {
                          const { id, value } = item;
                          if (value === "#FFFFFF") {
                            return (
                              <div
                                className="selectedColorContainer"
                                key={id}
                                onClick={(e) =>
                                  selectAttribute(
                                    e,
                                    name,
                                    value,
                                    product.attributes
                                  )
                                }
                              >
                                <div
                                  className="miniCartWhiteDisplayColor"
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
                                className="miniCartSelectedColorContainer"
                                key={id}
                                onClick={(e) =>
                                  selectAttribute(
                                    e,
                                    name,
                                    value,
                                    product.attributes
                                  )
                                }
                              >
                                <div
                                  className="miniCartProductDisplayColor"
                                  style={{
                                    backgroundColor: `${value}`,
                                  }}
                                  data-color="color"
                                ></div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={id}>
                      <div
                        className="varAttributeTitle"
                        key={
                          new Date().valueOf().toString(36) +
                          Math.random().toString(36).substr(2)
                        }
                      >
                        {name}:
                      </div>
                      <div className="varCartAttributesWrapper">
                        {attributeSet.items.map((currentAttribute) => {
                          const { value, id } = currentAttribute;
                          return (
                            <div
                              key={id}
                              className={`varCartProductSize`}
                              onClick={(e) =>
                                selectAttribute(
                                  e,
                                  name,
                                  value,
                                  product.attributes
                                )
                              }
                              data-set={"true"}
                            >
                              {value}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="varContent">
            {mainArray.map((cartItem) => {
              return cartItem.id === product.id ? (
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
              ) : null;
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Variation;
