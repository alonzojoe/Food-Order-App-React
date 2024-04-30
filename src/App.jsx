import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import "./style.css";

function App() {
  return (
    <>
      <Header />
      <Meals />
    </>
  );
}

export default App;
