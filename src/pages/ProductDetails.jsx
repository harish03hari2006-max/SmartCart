import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://smartcart-du6h.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find(
          (item) => String(item.id) === String(id)
        );

        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("smartcart")) || [];

    const existingProduct = cart.find(
      (item) => String(item.id) === String(product.id)
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        String(item.id) === String(product.id)
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ];
    }

    localStorage.setItem(
      "smartcart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (!product) {
    return (
      <div>
        <h2>Product Not Found</h2>

        <Link to="/products">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details">

      <Link to="/products">
        ← Back to Products
      </Link>

      <div className="details-card">

        <div className="details-image">
          {product.image}
        </div>

        <div className="details-content">

          <div className="product-category">
            {product.category}
          </div>

          <h1>{product.name}</h1>

          <p className="details-description">
            {product.description}
          </p>

          <h2 className="details-price">
            ₹{Number(product.price).toLocaleString()}
          </h2>

          <button
            className="add-button"
            onClick={addToCart}
          >
            🛒 Add to Cart
          </button>

          <Link
            to="/cart"
            className="cart-button"
          >
            Go to Cart →
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;