import React from "react";
import GetCat from "../gql/GetCat";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="navbarContainer">
        <div className="navLeft">
          <ul>
            <GetCat />
          </ul>
        </div>
        <div className="navCenter">
          <img src={require("../../icons/logoTransparent.png")} alt="" />
        </div>
        <div className="navRight">
          <div className="currency">
            <div className="symbol">$</div>
            <div className="angleIcon">
              <img src={require("../../icons/angle-down.png")} alt="" />
            </div>
          </div>
          <div className="navRightList">
            <li className="currencyList">
              <div className="">$ USD</div>
            </li>
            <li className="currencyList">
              <div className="">$ USD</div>
            </li>
            <li className="currencyList">
              <div className="">$ USD</div>
            </li>
            <li className="currencyList">
              <div className="">USD $</div>
            </li>
          </div>
          <div className="cartIconContainer">
            <img src={require("../../icons/Vector.png")} alt="" />
            <div className="cartIconBadge">3</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

