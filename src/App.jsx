import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProductSection from "./ProductSection";
import Fruits from "./Fruits";
import Vegetables from "./Vegetables";
import Cart from "./Cart";
import Banner from "./Banner";
import Dairy from "./Dairy";
import Billing from "./Billing";
import Terms from "./Terms"; // Import the Terms component
import Footer from "./Footer"; // Import Footer
import AdminPage from "./AdminPage"; // Import the AdminPage component
import Login from "./login"; // Import the Login component
import "./App.css";

function App() {
  const [cart, setCart] = useState({}); // State to track cart items with quantities
  const [products, setProducts] = useState([]); // State to track products list
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track login status
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state to prevent premature redirects

  // On mount, restore auth state from localStorage to keep sessions after refresh
  useEffect(() => {
    const savedAuth = localStorage.getItem("authUser");
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setUserData(parsed);
      } catch (err) {
        localStorage.removeItem("authUser");
      }
    }
    setLoading(false); // Mark loading as complete
  }, []);

  // Function to add or update items in the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[product.id]) {
        // If product already exists, update the quantity
        newCart[product.id].quantity += 1;
      } else {
        // If product doesn't exist in the cart, add it with quantity 1
        newCart[product.id] = {
          ...product,
          quantity: 1, // Initialize quantity as 1 when first added
        };
      }
      return newCart;
    });
  };

  // Function to update the cart's item quantity or remove it
  const updateCart = (productId, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (quantity > 0) {
        newCart[productId].quantity = quantity; // Update quantity
      } else {
        delete newCart[productId]; // Remove item if quantity is 0
      }
      return newCart;
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart({});
  };

  // Function to update the product list
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  // Function to handle successful login
  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setUserData(user);
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("authUser");
    clearCart();
    window.location.replace("/login");
  };

  return (
    <BrowserRouter>
      <div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            {isAuthenticated && <Navbar cart={cart} onLogout={handleLogout} />}

            <Routes>
              {/* Login Route */}
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Login onLoginSuccess={handleLoginSuccess} />
                  )
                }
              />

              {/* Protected Routes - Redirect to login if not authenticated */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <>
                      <Banner />
                      <ProductSection
                        addToCart={addToCart}
                        cart={cart}
                        updateCart={updateCart}
                      />
                    </>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              {/* Fruits route */}
              <Route
                path="/fruits"
                element={
                  isAuthenticated ? (
                    <Fruits
                      cart={cart}
                      addToCart={addToCart}
                      updateCart={updateCart}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/vegetables"
                element={
                  isAuthenticated ? (
                    <Vegetables
                      cart={cart}
                      addToCart={addToCart}
                      updateCart={updateCart}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/dairy"
                element={
                  isAuthenticated ? (
                    <Dairy
                      cart={cart}
                      addToCart={addToCart}
                      updateCart={updateCart}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/cart"
                element={
                  isAuthenticated ? (
                    <Cart cart={cart} updateCart={updateCart} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/billing"
                element={
                  isAuthenticated ? (
                    <Billing cart={cart} clearCart={clearCart} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/terms" element={<Terms />} />
              <Route
                path="/admin"
                element={
                  isAuthenticated ? (
                    <AdminPage
                      products={products}
                      updateProducts={updateProducts}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/Admin"
                element={
                  isAuthenticated ? (
                    <AdminPage
                      products={products}
                      updateProducts={updateProducts}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>

            {isAuthenticated && <Footer />}
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
