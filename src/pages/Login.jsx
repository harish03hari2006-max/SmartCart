import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          🛒 SmartCart
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your SmartCart account
        </p>

        <form>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit" className="auth-button">
            Login
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;