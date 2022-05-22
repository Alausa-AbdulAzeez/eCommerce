import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { useDispatch } from "react-redux";
import { setCurrency } from "../../redux/currencyConverterSlice";

export const GET_CAT = gql`
  query getCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

const GetCurrencies = () => {
  const dispatch = useDispatch();

  const selectCurrency = (e) => {
    dispatch(setCurrency(`${e.target.innerText.split(" ")[0]}`));
  };
  const { loading, error, data } = useQuery(GET_CAT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.currencies.map((currency) => {
        const { label, symbol } = currency;
        return (
          <li
            className="currencyList"
            key={symbol}
            onClick={(e) => selectCurrency(e)}
          >
            <div className="currencyContainer">
              {symbol} {label}
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default GetCurrencies;
