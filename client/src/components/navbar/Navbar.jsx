import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import GetCat from "../gql/GetCat";
import MiniCart from "../overlay/MiniCart";
import "./navbar.css";

const Navbar = () => {
  const count = useSelector((state) => {
    return state.category.value;
  });

  const cartIconRef = useRef();
  const navRef = useRef();
  const [navProperties, setNavProperties] = useState({
    overlayHeight: null,
    clicked: false,
  });

  useEffect(() => {
    setNavProperties({
      overlayHeight: window.document.body.offsetHeight,
      clicked: navProperties.clicked,
    });
  }, [count, navProperties.clicked, navProperties.overlayHeight]);

  const showMiniCart = (e) => {
    setNavProperties({
      overlayHeight:
        e.target.parentElement.parentElement.parentElement.nextElementSibling
          .clientHeight,
      clicked: !navProperties.clicked,
    });
  };

  return (
    <>
      <div className="navbarContainer" ref={navRef}>
        <div className="navLeft">
          <MiniCart
            navProperties={navProperties}
            setNavProperties={setNavProperties}
          />
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
          </div>
          <div className="cartIconContainer">
            <img
              src={require("../../icons/Vector.png")}
              alt=""
              onClick={(e) => showMiniCart(e)}
              ref={cartIconRef}
            />
            <div className="cartIconBadge">3</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

