import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import "./style.css";

function App() {
  return (
    <>
      <Header />
      <Meals />
      <Cart />
    </>
  );
}

export default App;
