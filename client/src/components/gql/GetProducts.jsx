import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import Variation from "../variation/Variation";

const GetProducts = () => {
  const [clickedProduct, setClickedProduct] = useState(null);
  const [varBtnDisabled, setVarBtnDisabled] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const variationRef = useRef();

  const count = useSelector((state) => {
    return state.category.value;
  });
  const cart = useSelector((state) => {
    return state.cart.value;
  });

  const currencySymbol = useSelector((state) => {
    return state.currency.value.currency;
  });
  const baseConverter = useSelector((state) => {
    return state.currency.value.baseConverter;
  });

  const dispatch = useDispatch();

  const GET_PRODUCTS = gql`
  query getCategory {
    category(input: { title: "${count}" }) {
      name
      products{
      id
      name
      inStock
      gallery
      description
      category
      attributes{id name type items{value id}}
      prices{currency{label symbol} amount}
      brand      
    }
    }
  }
`;

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    // window.location.reload();
  }, [currentProduct]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleOutOfStock = (product, e) => {
    if (product.inStock.toString() === "false") {
      e.preventDefault();
    }
  };

  const addProductToCart = (e, product) => {
    setCurrentProduct(product);
    if (product.inStock === true) {
      if (product.attributes.length > 0) {
        if (currentProduct) {
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
    } else {
      e.preventDefault();
    }
  };

  const handleClickedProduct = (product) => {
    if (product.attributes.length === 0) {
      setClickedProduct(product);
      setTimeout(() => {
        setVarBtnDisabled(false);
      }, 1500);
      setVarBtnDisabled(true);
    }
  };

  return (
    <>
      <div className="varWrapper" ref={variationRef}>
        {currentProduct && <Variation product={currentProduct} />}
      </div>

      {data.category.products.map((product) => {
        const { inStock, id, gallery, prices, name } = product;
        return (
          <div className="categoryItem" key={id} instock={inStock.toString()}>
            <Link to={`/${id}`} onClick={(e) => handleOutOfStock(product, e)}>
              <div className="categoryItemTop" instock={inStock.toString()}>
                <div className="outOfStock">
                  <h3 className="outOfStockText">OUT OF STOCK</h3>
                </div>
                <div className="imgContainer">
                  <img src={gallery[0]} alt="" className="categoryImg" />
                </div>
              </div>
            </Link>
            <div className="categoryItemBottom">
              <div className="catDescContainer">
                <div className="categoryName">{name}</div>
                <div className="categoryPrice">
                  {currencySymbol}
                  {(prices[0].amount * baseConverter).toFixed(2)}
                </div>
              </div>
              {cart.some((cartItem) => cartItem.id === product.id) === true ? (
                <span
                  className="mainSetQuantity"
                  onClick={() => handleClickedProduct(product)}
                >
                  <button
                    className="mainCatAddBtn"
                    disabled={varBtnDisabled}
                    onClick={(e) => addProductToCart(e, product)}
                    data-type={"inc"}
                  >
                    +
                  </button>
                  <div className="mainCatQuantity">
                    {varBtnDisabled && clickedProduct === product ? (
                      <div className="loader"></div>
                    ) : (
                      cart.length > 0 &&
                      cart.filter((itemInCart) => itemInCart.id === product.id)
                        .length
                    )}
                  </div>
                  <button
                    className="mainCatReduceBtn"
                    disabled={varBtnDisabled}
                    onClick={(e) => addProductToCart(e, product)}
                    data-type={"dec"}
                  >
                    -
                  </button>
                </span>
              ) : (
                <span
                  className="itemIconContainer"
                  onClick={(e) => addProductToCart(e, product)}
                >
                  <img
                    src={require("../../icons/Common.png")}
                    alt=""
                    data-type={"inc"}
                  />
                </span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GetProducts;
