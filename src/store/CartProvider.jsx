import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedItems = state.items.concat(action.item);
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE_ITEM":
      const itemTobeRemoved = state.items.find((item) => item.id === action.id);

      if (!itemTobeRemoved) {
        return state;
      }
      const filteredItems = state.items.filter((item) => item.id !== action.id);
      const reducedAmount =
        state.totalAmount - itemTobeRemoved.price * itemTobeRemoved.amount;
      return {
        items: filteredItems,
        totalAmount: reducedAmount,
      };
    default:
      console.log("Action Not Found");
      break;
  }
  return initialState;
};

const CartProvider = (props) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, initialState);

  const addToCartHandler = (item) => {
    dispatchAction({ type: "ADD_ITEM", item: item });
  };

  const removeToCartHandler = (id) => {
    dispatchAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
