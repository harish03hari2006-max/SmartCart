import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO SMARTCART</p>

          <h1>
            Shop Smart.
            <br />
            Live Better.
          </h1>

          <p>
            Discover quality products at great prices.
            Everything you need, all in one place.
          </p>

          <Link to="/products" className="shop-btn">
            Shop Now →
          </Link>
        </div>

        <div className="hero-icon">
          🛒
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <p className="section-text">
          Find what you need from our popular categories
        </p>

        <div className="category-grid">

          <div className="category-card">
            <div className="category-icon">📱</div>
            <h3>Electronics</h3>
            <p>Phones, laptops & gadgets</p>
          </div>

          <div className="category-card">
            <div className="category-icon">👕</div>
            <h3>Fashion</h3>
            <p>Trendy clothes & accessories</p>
          </div>

          <div className="category-card">
            <div className="category-icon">👟</div>
            <h3>Footwear</h3>
            <p>Shoes for every occasion</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🏠</div>
            <h3>Home</h3>
            <p>Make your home better</p>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>
        <p className="section-text">
          Check out some of our popular products
        </p>

        <div className="product-grid">

          <div className="product-card">
            <div className="product-image">📱</div>
            <h3>Smartphone</h3>
            <p>Latest smartphone with powerful features</p>
            <strong>₹24,999</strong>
            <button>Add to Cart</button>
          </div>

          <div className="product-card">
            <div className="product-image">💻</div>
            <h3>Laptop</h3>
            <p>Powerful laptop for work and entertainment</p>
            <strong>₹54,999</strong>
            <button>Add to Cart</button>
          </div>

          <div className="product-card">
            <div className="product-image">🎧</div>
            <h3>Wireless Headphones</h3>
            <p>Enjoy music with high quality sound</p>
            <strong>₹2,499</strong>
            <button>Add to Cart</button>
          </div>

        </div>

        <Link to="/products" className="view-btn">
          View All Products
        </Link>
      </section>

    </div>
  );
}

export default Home;