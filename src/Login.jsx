// Login.jsx
import React, { useState } from "react";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = () => {
    if (formData.password !== "12345") {
      setError("Incorrect password. Please use: 12345");
      return;
    }

    if (!formData.name || !formData.email) {
      setError("Please fill in all fields");
      return;
    }

    // Store user data in state (you can also use sessionStorage here if needed)
    const userData = {
      name: formData.name,
      email: formData.email,
    };

    // Call the success callback to navigate to App
    onLoginSuccess(userData);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="form-input"
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="form-input"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="form-input"
            placeholder="Enter password"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button onClick={handleSubmit} className="login-button">
          Login
        </button>

        {/* <p className="password-hint">Password hint: 12345</p> */}
      </div>
    </div>
  );
}

export default Login;
