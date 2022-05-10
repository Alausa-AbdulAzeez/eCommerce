import React from "react";
import "./product.css";
import Navbar from "../../components/navbar/Navbar";
import GetProduct from "../../components/gql/GetProduct";

const Product = () => {
  return (
    <div>
      <Navbar />
      <GetProduct />
    </div>
  );
};

export default Product;
