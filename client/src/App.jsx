import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

