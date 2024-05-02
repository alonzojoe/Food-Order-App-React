import React, { useContext, useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const badgeCount = cartCtx.items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setCartUpdated(true);

    const timer = setTimeout(() => {
      setCartUpdated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button
      className={`${classes.button}  ${cartUpdated ? classes.bump : ""}`}
      onClick={props.onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>You Cart</span>
      <span className={classes.badge}>{badgeCount}</span>
    </button>
  );
};

export default HeaderCartButton;
