import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeItemhandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setSubmitting(true);
    await fetch(
      `https://react-food-order-71313-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json`,
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
          total: cartCtx.totalAmount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setSubmitting(false);
    setSubmitted(true);
    cartCtx.clearCart();
  };

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

  const cartContent = (
    <>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout ? (
        <Checkout
          onCheckout={submitOrderHandler}
          onCancel={() => props.onCloseCart(false)}
        />
      ) : (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={() => props.onCloseCart(false)}
          >
            Close
          </button>
          {hasItems && (
            <button
              className={classes.button}
              onClick={() => setShowCheckout(true)}
            >
              Order{" "}
            </button>
          )}
        </div>
      )}
    </>
  );

  const cartSubmitting = <p>Ordering Meals, Please wait...</p>;

  const cartOrderSuccess = (
    <>
      <p>Successfully Ordered!</p>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={() => props.onCloseCart(false)}
        >
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {!submitting && !submitted && cartContent}
      {submitting && cartSubmitting}
      {!submitting && submitted && cartOrderSuccess}
    </Modal>
  );
};

export default Cart;
