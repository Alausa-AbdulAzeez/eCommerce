import React from "react";

const VarItem = ({ cartItem, varAttributesArray }) => {
  const { brand, name, prices, attributes, id } = cartItem;
  //   console.log(cartItem);
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
        <div className="miniCartProductPrice">${prices[0].amount}</div>
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
                              className="miniCartWhiteDisplayColor"
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
                          className={`miniCartProductSize selectedAttribute`}
                          key={id}
                        >
                          {value}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className={`miniCartProductSize`}
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
          <button className="miniVariationAdd">+</button>
          <div className="miniVariationQuantity">10</div>
          <button className="miniVariationRemove">-</button>
        </div>
        <div className="miniCartImage">
          <img
            src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
            alt=""
            className="miniCurrentImage"
          />
        </div>
      </div>
    </div>
  );
};

export default VarItem;
