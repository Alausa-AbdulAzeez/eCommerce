import React from "react";
import { useSelector } from "react-redux";
import GetProducts from "../gql/GetProducts";
import "./category.css";

const Category = () => {
  const count = useSelector((state) => {
    return state.category.value;
  });

  return (
    <div className="category">
      <div className="categoryTitle">{count.toUpperCase()}</div>

      <div className="categoryItems">
        <GetProducts />
      </div>
    </div>
  );
};

export default Category;
