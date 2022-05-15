import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCategory } from "../../redux/categorySlice";

export const GET_CAT = gql`
  query getCategory {
    categories {
      name
    }
  }
`;

const GetCat = () => {
  const count = useSelector((state) => {
    return state.category.value;
  });
  const dispatch = useDispatch();

  const setCategor = (e) => {
    dispatch(setCategory(`${e.target.innerHTML.toLowerCase()}`));
  };
  const { loading, error, data } = useQuery(GET_CAT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.categories.map((category) => (
    <Link to="/" key={category.name}>
      <li
        className={`navLeftList ${count === category.name && "active"}`}
        onClick={(e) => setCategor(e)}
      >
        {category.name.toUpperCase()}
      </li>
    </Link>
  ));
};

export default GetCat;
