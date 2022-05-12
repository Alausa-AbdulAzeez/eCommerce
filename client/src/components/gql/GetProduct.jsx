import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const GetProduct = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [attributesArray, setAttributesArray] = useState();
  const [disabled, setDisabled] = useState(true);
  const [productAtt, setProductAtt] = useState();
  const productId = window.location.href.split("/")[3];

  const selectedColorRef = useRef();

  useEffect(() => {
    function checkArr() {
      if (attributesArray && productAtt) {
        if (attributes.length === Object.keys(attributesArray).length) {
          setDisabled(false);
        }
      }
    }
    checkArr();
  }, [attributesArray, productAtt]);

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
  const { attributes, brand, description, gallery, name, prices } =
    data.product;
  //   setProduct(data.product);
  //   console.log(product);

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
    setAttributesArray({
      ...attributesArray,
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

  return (
    <div>
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
              <div className="productPrice1">PRICE:</div>
            </div>
            <div className="priceValue">${prices[0].amount}</div>
            <div className="productBtn">
              <Link to="/cart">
                <button className="defaultAddToCart" disabled={disabled}>
                  ADD TO CART
                </button>
              </Link>
            </div>
            <div className="productDesc">{parse(description)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProduct;
