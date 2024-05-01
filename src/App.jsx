import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import "./style.css";

function App() {
  const [showCart, setShowCart] = useState(false);

  const cartHandler = (visibility) => {
    setShowCart(visibility);
  };

  return (
    <CartProvider>
      {showCart && <Cart onCloseCart={cartHandler} />}
      <Header onShowCart={cartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
