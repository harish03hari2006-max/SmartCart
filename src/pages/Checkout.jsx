import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const cart =
    JSON.parse(localStorage.getItem("smartcart")) || [];

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!name || !address || !phone) {
      alert("Please fill all details.");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customerName: name,
        address: address,
        phone: phone,

        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: Number(item.price),
          image: item.image,
          quantity: Number(item.quantity || 1),
        })),

        totalAmount: total,
        status: "Placed",
      };

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      // Clear cart
      localStorage.removeItem("smartcart");

      // Update Navbar cart count
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      alert("🎉 Order placed successfully!");

      // Go to My Orders
      navigate("/orders");

    } catch (error) {
      console.log("Order Error:", error);

      alert(
        "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        <div className="checkout-form">

          <h2>Delivery Details</h2>

          <form onSubmit={placeOrder}>

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <label>
              Delivery Address
            </label>

            <textarea
              placeholder="Enter your delivery address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </form>

        </div>

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹
                {(
                  Number(item.price) *
                  Number(item.quantity || 1)
                ).toLocaleString()}
              </span>

            </div>
          ))}

          <hr />

          <div className="checkout-total">

            <strong>Total</strong>

            <strong>
              ₹{total.toLocaleString()}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;