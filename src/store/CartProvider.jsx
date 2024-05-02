import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingItem = state.items[existingItemIndex];

      let updatedItems;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE_ITEM":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      const existingMeal = state.items[existingCartItemIndex];

      const updatedAmount = state.totalAmount - existingMeal.price;
      console.log("updated total amount after removal of item", updatedAmount);
      let updatedMeals;
      if (existingMeal.amount === 1) {
        updatedMeals = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedMeal = {
          ...existingMeal,
          amount: existingMeal.amount - 1,
        };
        updatedMeals = [...state.items];
        updatedMeals[existingCartItemIndex] = updatedMeal;
      }

      return {
        items: updatedMeals,
        totalAmount: updatedAmount,
      };
    default:
      return initialState;
  }
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
