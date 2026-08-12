import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const loadCart = () => {
    const savedCart =
      JSON.parse(localStorage.getItem("smartcart")) || [];

    setCart(savedCart);
  };

  // Update cart
  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "smartcart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            quantity: Number(item.quantity || 1) + 1,
          }
        : item
    );

    updateCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: Number(item.quantity || 1) - 1,
            }
          : item
      )
      .filter((item) => Number(item.quantity) > 0);

    updateCart(updatedCart);
  };

  // Remove product
  const removeProduct = (id) => {
    const updatedCart = cart.filter(
      (item) => String(item.id) !== String(id)
    );

    updateCart(updatedCart);
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity || 1),
    0
  );

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="cart-page">

        <h1>Shopping Cart</h1>

        <div className="empty-cart">
          <div className="empty-icon">🛒</div>

          <h2>Your Cart is Empty</h2>

          <p>
            You haven't added any products to your cart yet.
          </p>

          <Link
            to="/products"
            className="shop-button"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1>Shopping Cart</h1>

      <div className="cart-container">

        {/* Products */}
        <div className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <div className="cart-product-image">
                {item.image}
              </div>

              <div className="cart-product-info">

                <h2>{item.name}</h2>

                <p>
                  {item.description}
                </p>

                <span className="cart-price">
                  ₹{Number(item.price).toLocaleString()}
                </span>

              </div>

              {/* Quantity */}
              <div className="quantity-section">

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  −
                </button>

                <span>
                  {item.quantity || 1}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>

              </div>

              {/* Item total */}
              <div className="item-total">

                ₹
                {(
                  Number(item.price) *
                  Number(item.quantity || 1)
                ).toLocaleString()}

              </div>

              {/* Remove */}
              <button
                className="remove-button"
                onClick={() =>
                  removeProduct(item.id)
                }
              >
                🗑️
              </button>

            </div>

          ))}

        </div>

        {/* Summary */}
        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Products</span>

            <span>
              {cart.reduce(
                (total, item) =>
                  total +
                  Number(item.quantity || 1),
                0
              )}
            </span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ₹{total.toLocaleString()}
            </span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <span>FREE</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <span>
              ₹{total.toLocaleString()}
            </span>
          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout →
          </Link>

          <Link
            to="/products"
            className="continue-button"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;