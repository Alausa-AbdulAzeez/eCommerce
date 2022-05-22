import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

const VarItem = ({ cartItem, varAttributesArray }) => {
  const { brand, name, prices, attributes, gallery } = cartItem;

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

  const addProductToCart = (e, product) => {
    if (e.target.dataset.type === "inc") {
      dispatch(addToCart(product));
    }
    if (e.target.dataset.type === "dec") {
      dispatch(removeFromCart(product));
    }
  };

  return (
    <div
      className="varItem"
      key={
        new Date().valueOf().toString(36) + Math.random().toString(36).substr(2)
      }
    >
      <div className="miniContentLeft">
        <div className="miniProductName">{brand}</div>
        <div className="miniProductName">{name}</div>
        <div className="miniCartProductPrice">
          {currencySymbol}
          {(prices[0].amount * baseConverter).toFixed(2)}
        </div>
        {attributes.map((attribute) => {
          const { id, name } = attribute;
          if (id === "Color") {
            return (
              <div className="productColorWrapper" key={id}>
                <div className="miniCartColorText">Color</div>
                <div className="miniCartColorsContainer">
                  {attribute.items.map((item) => {
                    const { id, value } = item;
                    if (
                      varAttributesArray &&
                      varAttributesArray.Color === value
                    ) {
                      if (value === "#FFFFFF") {
                        return (
                          <div
                            className="miniCartSelectedColorContainer"
                            key={
                              new Date().valueOf().toString(36) +
                              Math.random().toString(36).substr(2)
                            }
                          >
                            <div
                              className="miniCartWhiteDisplayColor selectedColor"
                              style={{
                                backgroundColor: `${value}`,
                              }}
                              key={id}
                            ></div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className="miniCartSelectedColorContainer selectedColor"
                            key={
                              new Date().valueOf().toString(36) +
                              Math.random().toString(36).substr(2)
                            }
                          >
                            <div
                              className="miniCartProductDisplayColor"
                              style={{
                                backgroundColor: `${value}`,
                              }}
                            ></div>
                          </div>
                        );
                      }
                    } else {
                      if (value === "#FFFFFF") {
                        return (
                          <div
                            className="miniCartselectedColorContainer"
                            key={id}
                          >
                            <div
                              className="miniCartWhiteDisplayColor"
                              style={{
                                backgroundColor: `${value}`,
                              }}
                            ></div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className="miniCartSelectedColorContainer "
                            key={id}
                          >
                            <div
                              className="miniCartProductDisplayColor "
                              style={{
                                backgroundColor: `${value}`,
                              }}
                            ></div>
                          </div>
                        );
                      }
                    }
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <div className="" key={id}>
                <div className="miniAttributeTitle">{name}:</div>
                <div
                  className="miniCartAttributesWrapper"
                  key={
                    new Date().valueOf().toString(36) +
                    Math.random().toString(36).substr(2)
                  }
                >
                  {attribute.items.map((singleAttribute) => {
                    const { value, id } = singleAttribute;
                    if (
                      varAttributesArray &&
                      value === varAttributesArray[name]
                    ) {
                      return (
                        <div
                          className={`varCartProductSize selectedAttribute`}
                          key={id}
                        >
                          {value}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className={`varCartProductSize`}
                          key={id}
                          data-set={"false"}
                        >
                          {value}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="miniContentRight">
        <div className="miniVariationSet">
          <button
            className="miniVariationAdd"
            onClick={(e) => addProductToCart(e, cartItem)}
            data-type={"inc"}
          >
            +
          </button>
          <div className="miniVariationQuantity">
            {cart.length > 0 &&
              cart.filter(
                (itemInCart) => itemInCart.idInCart === cartItem.idInCart
              ).length}
          </div>
          <button
            className="miniVariationRemove"
            onClick={(e) => addProductToCart(e, cartItem)}
            data-type={"dec"}
          >
            -
          </button>
        </div>
        <div className="miniCartImage">
          <img src={gallery[0]} alt="" className="miniCurrentImage" />
        </div>
      </div>
    </div>
  );
};

export default VarItem;
