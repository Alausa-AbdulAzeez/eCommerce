import React, { useRef, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import Variation from "../variation/Variation";

const GetProducts = () => {
  const [clickedProduct, setClickedProduct] = useState(null);
  const [varBtnDisabled, setVarBtnDisabled] = useState(false);
  const variationRef = useRef();

  const count = useSelector((state) => {
    return state.category.value;
  });
  const cart = useSelector((state) => {
    return state.cart.value;
  });

  const handleOutOfStock = (product, e) => {
    if (product.inStock.toString() === "false") {
      e.preventDefault();
    }
  };

  const dispatch = useDispatch();

  const addProductToCart = (e, product) => {
    if (product.inStock === true) {
      if (product.attributes.length > 0) {
        variationRef.current.firstChild.style.top = `${window.scrollY}px`;
        variationRef.current.firstChild.classList.add("show");
        document.body.style.overflowY = "hidden";
      } else {
        console.log(e);
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
    setClickedProduct(product);
    setTimeout(() => {
      setVarBtnDisabled(false);
    }, 1500);
    setVarBtnDisabled(true);
  };

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div className="varWrapper" ref={variationRef}>
        <Variation />
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
                <div className="categoryPrice">${prices[0].amount}</div>
              </div>
              {cart.some((cartItem) => cartItem.id === product.id) === true ? (
                <span
                  className="setQuantity"
                  onClick={() => handleClickedProduct(product)}
                >
                  <button
                    className="catAddBtn"
                    disabled={varBtnDisabled}
                    onClick={(e) => addProductToCart(e, product)}
                    data-type={"inc"}
                  >
                    +
                  </button>
                  <div className="catQuantity">
                    {varBtnDisabled && clickedProduct === product ? (
                      <div className="loader"></div>
                    ) : (
                      cart.length > 0 &&
                      cart.filter((itemInCart) => itemInCart.id === product.id)
                        .length
                    )}
                  </div>
                  <button
                    className="catReduceBtn"
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
