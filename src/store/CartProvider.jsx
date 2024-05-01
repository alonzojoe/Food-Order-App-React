import React from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const addToCartHandler = (item) => {};

  const removeToCartHandler = (id) => {};

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addToCartHandler,
    removeItem: removeToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
