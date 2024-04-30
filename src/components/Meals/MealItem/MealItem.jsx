import React from "react";
import classes from "./MealItem.module.css";

const MealItem = ({ meal }) => {
  const { name, description, price } = meal;

  const formattedPrice = `$ ${price}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{formattedPrice}</div>
      </div>
      <div></div>
    </li>
  );
};

export default MealItem;
