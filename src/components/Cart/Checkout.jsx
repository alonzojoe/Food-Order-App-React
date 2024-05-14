import React from "react";
import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValid, setFormValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameValid = !isEmpty(enteredName);
    const streetValid = !isEmpty(enteredStreet);
    const postalValid = !isEmpty(enteredPostal);
    const cityValid = !isFiveChars(enteredCity);

    setFormValid({
      name: nameValid,
      street: streetValid,
      postal: postalValid,
      city: cityValid,
    });

    const formIsValid = nameValid && streetValid && postalValid && cityValid;

    if (!formIsValid) {
      return;
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name:</label>
        <input type="text" ref={nameInputRef} id="name" />
        {!formValid.name && (
          <p className={classes.error}>Please enter a valid name</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street:</label>
        <input type="text" ref={streetInputRef} id="street" />
        {!formValid.street && (
          <p className={classes.error}>Please enter a valid street</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code:</label>
        <input type="text" ref={postalInputRef} id="postal" />
        {!formValid.postal && (
          <p className={classes.error}>Please enter a valid postal code</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City:</label>
        <input type="text" ref={cityInputRef} id="city" />
        {!formValid.city && (
          <p className={classes.error}>Please enter a valid city</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm Order</button>
      </div>
    </form>
  );
};

export default Checkout;
