import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeItemhandler = (id) => {};

  const addItemHandler = (item) => {};

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={removeItemhandler.bind(null, item.id)}
            onAdd={addItemHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={() => props.onCloseCart(false)}
        >
          Close
        </button>
        {hasItems && <button className={classes.button}>Order </button>}
      </div>
    </Modal>
  );
};

export default Cart;
