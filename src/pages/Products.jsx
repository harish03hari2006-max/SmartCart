import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Get products from MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Product Error:", error);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
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
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "smartcart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${product.name} added to cart!`);
  };

  // Categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Search + category filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="products-page">
        <h1>Products</h1>
        <h2 style={{ textAlign: "center" }}>
          Loading products...
        </h2>
      </div>
    );
  }

  return (
    <div className="products-page">

      <h1>Products</h1>

      {/* Search and Filter */}
      <div className="product-controls">

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Products */}
      <div className="products-grid">

        {filteredProducts.length === 0 ? (

          <div className="no-products">
            <h2>No Products Found</h2>
            <p>
              Try another search or category.
            </p>
          </div>

        ) : (

          filteredProducts.map((product) => (

            <div
              className="product-card"
              key={product._id || product.id}
            >

              <div className="product-image">
                {product.image}
              </div>

              <div className="product-category">
                {product.category}
              </div>

              <h2>
                {product.name}
              </h2>

              <p>
                {product.description}
              </p>

              <div className="product-bottom">

                <span className="product-price">
                  ₹{Number(product.price).toLocaleString()}
                </span>

                <div className="product-buttons">

                  <Link
                    to={`/product/${product.id}`}
                    className="view-button"
                  >
                    View
                  </Link>

                  <button
                    className="add-button"
                    onClick={() => addToCart(product)}
                  >
                    🛒 Add
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Products;