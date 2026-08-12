import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart =
      JSON.parse(localStorage.getItem("smartcart")) || [];

    const count = cart.reduce(
      (total, item) => total + Number(item.quantity || 1),
      0
    );

    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        🛒 SmartCart
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        <Link to="/cart" className="cart-link">
          🛒 Cart

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}
        </Link>

        <Link to="/login" className="login-button">
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;