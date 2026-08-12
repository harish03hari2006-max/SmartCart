import { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Orders Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="orders-page">
        <h1>My Orders</h1>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Yet</h2>
          <p>Your orders will appear here after you place an order.</p>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <h2>Order #{order._id.slice(-6)}</h2>

                <span className="order-status">
                  {order.status}
                </span>
              </div>

              <p>
                <strong>Name:</strong> {order.customerName}
              </p>

              <p>
                <strong>Phone:</strong> {order.phone}
              </p>

              <p>
                <strong>Address:</strong> {order.address}
              </p>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div className="order-item" key={index}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ₹
                      {(
                        Number(item.price) *
                        Number(item.quantity)
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <strong>Total</strong>
                <strong>
                  ₹{Number(order.totalAmount).toLocaleString()}
                </strong>
              </div>

              <p className="order-date">
                Ordered on:{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;