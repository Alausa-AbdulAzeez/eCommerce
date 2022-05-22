import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import parse from "html-react-parser";
import Variation from "../variation/Variation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

const GetProduct = () => {
  const [clickedProduct, setClickedProduct] = useState(null);
  const [varBtnDisabled, setVarBtnDisabled] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [varAttributesArray, setVarAttributesArray] = useState();
  const [disabled, setDisabled] = useState(true);
  const [productAtt, setProductAtt] = useState();
  const productId = window.location.href.split("/")[3];

  const selectedColorRef = useRef();
  const variationRef = useRef();
  const cart = useSelector((state) => {
    return state.cart.value;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    function checkArr() {
      if (varAttributesArray && productAtt) {
        if (productAtt.length === Object.keys(varAttributesArray).length) {
          setDisabled(false);
        }
      }
    }
    checkArr();
  }, [varAttributesArray, productAtt]);

  const currencySymbol = useSelector((state) => {
    return state.currency.value.currency;
  });
  const baseConverter = useSelector((state) => {
    return state.currency.value.baseConverter;
  });

  const GET_PRODUCT = gql`
    query getId {
      product(id: "${productId}") {
        id
        name
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PRODUCT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { product } = data;
  const { attributes, brand, description, gallery, name, prices, id } = product;

  const getImage = (smallImage) => {
    setImageIndex(gallery.indexOf(smallImage));
  };

  // Remove attribute
  const removeAttribute = (attributeType) => {
    let className = `selected${attributeType}`;
    let modClassName = className.split(" ").join("");
    const sizeList = document.querySelectorAll(`.${modClassName}`);
    sizeList.forEach((item) => item.classList.remove(`${modClassName}`));
  };

  const addAttribute = (e, attribute) => {
    let className = `selected${attribute}`;
    let modClassName = className.split(" ").join("");
    e.target.classList.add(`${modClassName}`);
  };

  // Remove style from selected attribute
  const removeColor = () => {
    const colorList = document.querySelectorAll(".selectedColor");
    colorList.forEach((item) => item.classList.remove("selectedColor"));
  };

  // Add Remove style to selected attribute
  const addColor = (e) => {
    if (e.target.dataset.color === "color") {
      e.target.parentElement.classList.add("selectedColor");
    }
  };

  const selectAttribute = (e, attributeType, attribute, attributes) => {
    setVarAttributesArray({
      ...varAttributesArray,
      [attributeType]: attribute,
    });
    setProductAtt(attributes);

    if (attributeType === "Color") {
      removeColor();
      addColor(e);
    } else {
      removeAttribute(attributeType);
      addAttribute(e, attributeType);
    }
  };

  const addProductToCart = (e, product) => {
    if (product.attributes.length > 0) {
      if (e.target.dataset.type === "addToCart") {
        let idInCart =
          Object.values(varAttributesArray).toString().split(",").join("") +
          product.id;
        let productInCart = {
          ...product,
          varAttributesArray,
          idInCart: idInCart,
        };
        dispatch(addToCart(productInCart));
      }
      if (e.target.dataset.type === "setVar") {
        variationRef.current.firstChild.style.top = `${window.scrollY}px`;
        variationRef.current.firstChild.classList.add("show");
        document.body.style.overflowY = "hidden";
      }
    } else {
      if (e.target.dataset.type === "inc") {
        dispatch(addToCart(product));
      }
      if (e.target.dataset.type === "dec") {
        dispatch(removeFromCart(product));
      }
    }
  };

  const handleClickedProduct = (product) => {
    setClickedProduct(product);
    setTimeout(() => {
      setVarBtnDisabled(false);
    }, 1500);
    setVarBtnDisabled(true);
  };

  return (
    <div>
      <div className="varWrapper" ref={variationRef}>
        <Variation product={product} />
      </div>
      <div className="productPageWrapper">
        <div className="productContainer">
          <div className="productContainerLeft">
            {gallery.map((smImage) => (
              <div
                className="smallImage"
                key={smImage}
                onClick={() => getImage(smImage)}
              >
                <img src={smImage} alt="" />
              </div>
            ))}
          </div>
          <div className="productContainerCenter">
            <div className="mainProductImg">
              <img src={gallery[imageIndex]} alt="" />
            </div>
          </div>
          <div className="productContainerRight">
            <div className="productBrand">{brand}</div>
            <span className="productTitle">{name}</span>
            <div className="productSizes">
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
                                        attributes
                                      )
                                    }
                                    ref={selectedColorRef}
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
                                    className="selectedColorContainer"
                                    key={id}
                                    onClick={(e) =>
                                      selectAttribute(
                                        e,
                                        name,
                                        value,
                                        attributes
                                      )
                                    }
                                    ref={selectedColorRef}
                                  >
                                    <div
                                      className="productDisplayColor"
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
                      </div>
                    );
                  } else {
                    return (
                      <div className={`productSizeWrapper `} key={id}>
                        <div className="sizeText">{name}:</div>
                        <div className="sizesContainer">
                          {attribute.items.map((singleAttribute) => {
                            const { value, id } = singleAttribute;
                            return (
                              <div
                                className={`productSize`}
                                key={id}
                                data-id={name}
                                onClick={(e) =>
                                  selectAttribute(e, name, value, attributes)
                                }
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
            <div className="productPrice2">
              <div className="productPrice1">Price:</div>
            </div>
            <div className="priceValue">
              {currencySymbol}
              {(prices[0].amount * baseConverter).toFixed(2)}
            </div>
            {cart.some((cartItem) => cartItem.id === id) === true && (
              <span
                className="setProdQuantity"
                onClick={() => handleClickedProduct(product)}
              >
                <button
                  className="catAddBtn"
                  onClick={(e) => addProductToCart(e, product)}
                  data-type={product.attributes.length > 0 ? "setVar" : "inc"}
                  disabled={
                    product.attributes.length > 0 ? null : varBtnDisabled
                  }
                >
                  +
                </button>
                {varBtnDisabled &&
                clickedProduct === product &&
                product.attributes.length === 0 ? (
                  <div className="loader"></div>
                ) : (
                  <div className="catQuantity">
                    {cart.length > 0 &&
                      cart.filter((itemInCart) => itemInCart.id === product.id)
                        .length}
                  </div>
                )}

                <button
                  className="catReduceBtn"
                  onClick={(e) => addProductToCart(e, product)}
                  data-type={product.attributes.length > 0 ? "setVar" : "dec"}
                  disabled={
                    product.attributes.length > 0 ? null : varBtnDisabled
                  }
                >
                  -
                </button>
              </span>
            )}
            {cart.some((cartItem) => cartItem.id === id) === false && (
              <div className="productBtn">
                {product.attributes.length === 0 ? (
                  <button
                    className="defaultAddToCart"
                    disabled={false}
                    onClick={(e) => addProductToCart(e, product)}
                    data-type={"inc"}
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <button
                    className="defaultAddToCart"
                    disabled={disabled}
                    onClick={(e) => addProductToCart(e, product)}
                    data-type={"addToCart"}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            )}

            <div className="productDesc">{parse(description)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProduct;
