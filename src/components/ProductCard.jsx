import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="product-image">
        {product.image}
      </div>

      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-bottom">

          <strong>
            ₹{product.price.toLocaleString()}
          </strong>

          <Link
            to={`/product/${product.id}`}
            className="view-product"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;