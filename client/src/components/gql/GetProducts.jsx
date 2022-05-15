import React, { useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import Variation from "../variation/Variation";

const GetProducts = () => {
  const variationRef = useRef();

  const count = useSelector((state) => {
    return state.category.value;
  });
  const cart = useSelector((state) => {
    return console.log(state.cart.value);
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
        dispatch(addToCart(product));
      }
    } else {
      e.preventDefault();
    }
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
              <span
                className="itemIconContainer"
                onClick={(e) => addProductToCart(e, product)}
              >
                <img src={require("../../icons/Common.png")} alt="" />
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GetProducts;
