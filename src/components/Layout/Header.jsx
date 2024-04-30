import React from "react";
import MealImage from "../../assets/images/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React + Meals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={MealImage} alt="Meals-Menu" />
      </div>
    </>
  );
};

export default Header;
