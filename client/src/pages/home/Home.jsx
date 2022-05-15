import React from "react";
import Category from "../../components/category/Category";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  return (
    <div className="homePage">
      <Navbar />
      <Category />
    </div>
  );
};

export default Home;
