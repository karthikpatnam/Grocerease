import React, { useState, useEffect } from "react";
import "./AdminPage.css";

const API_BASE_URL = "https://grocify-2.onrender.com"; // JSON server / backend URL

function AdminPage() {
  const [products, setProducts] = useState([]); // products list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    category: "",
    Dprice: "",
    Oprice: "",
    description: "",
    discount: "",
    image: "",
  });

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/products`);

        if (!res.ok) {
          throw new Error(
            `Failed to fetch products: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle all input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convert numeric fields to numbers
    if (name === "Dprice" || name === "Oprice") {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateProduct = () => {
    if (!newProduct.id.trim()) return false;
    if (!newProduct.name.trim()) return false;
    if (!newProduct.category.trim()) return false;
    if (!newProduct.description.trim()) return false;
    if (!newProduct.discount.trim()) return false;
    if (!newProduct.image.trim()) return false;

    const dPrice = Number(newProduct.Dprice);
    const oPrice = Number(newProduct.Oprice);

    if (Number.isNaN(dPrice) || dPrice <= 0) return false;
    if (Number.isNaN(oPrice) || oPrice <= 0) return false;

    return true;
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!validateProduct()) {
      alert("Please fill in all fields correctly!");
      return;
    }

    const productToSend = {
      ...newProduct,
      Dprice: Number(newProduct.Dprice),
      Oprice: Number(newProduct.Oprice),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToSend),
      });

      if (!res.ok) {
        throw new Error(
          `Failed to add product: ${res.status} ${res.statusText}`
        );
      }

      const savedProduct = await res.json();
      setProducts((prev) => [...prev, savedProduct]);

      // Reset form
      setNewProduct({
        id: "",
        name: "",
        category: "",
        Dprice: "",
        Oprice: "",
        description: "",
        discount: "",
        image: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add the product. Please try again.");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete product ID: ${id}?`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
      });

      // Some backends return 204 No Content for DELETE (no JSON body)
      if (!res.ok && res.status !== 404) {
        throw new Error(
          `Failed to delete product: ${res.status} ${res.statusText}`
        );
      }

      setProducts((prev) => prev.filter((product) => product.id !== id));
      console.log(`Product with ID ${id} deleted successfully`);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete the product. Please check your server.");
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Admin Page</h1>

      {/* Add Product Section */}
      <section className="admin-page__section admin-page__section--form">
        <h2>Add New Product</h2>
        <form className="admin-form" onSubmit={handleAddProduct}>
          <input
            type="text"
            name="id"
            placeholder="Product ID"
            value={newProduct.id}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="Dprice"
            placeholder="Discounted Price"
            value={newProduct.Dprice}
            onChange={handleInputChange}
            min="1"
            required
          />
          <input
            type="number"
            name="Oprice"
            placeholder="Original Price"
            value={newProduct.Oprice}
            onChange={handleInputChange}
            min="1"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="discount"
            placeholder="Discount (e.g., 15% OFF)"
            value={newProduct.discount}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Product Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="admin-form__button">
            Add Product
          </button>
        </form>
      </section>

      {/* Existing Products Section */}
      <section className="admin-page__section admin-page__section--list">
        <h2>Existing Products</h2>

        {loading && <p>Loading products...</p>}
        {error && <p className="admin-page__error">Error: {error}</p>}

        {!loading && !error && products.length === 0 && (
          <p>No products found. Add some using the form above.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <ul className="admin-product-list">
            {products.map((product) => (
              <li key={product.id} className="admin-product-list__item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="admin-product-list__image"
                />
                <div className="admin-product-list__info">
                  <h3>{product.name}</h3>
                  <p className="admin-product-list__category">
                    Category: <strong>{product.category}</strong>
                  </p>
                  <p className="admin-product-list__prices">
                    <span className="admin-product-list__price--discounted">
                      ₹{product.Dprice}
                    </span>{" "}
                    <span className="admin-product-list__price--original">
                      ₹{product.Oprice}
                    </span>{" "}
                    <span className="admin-product-list__discount">
                      {product.discount}
                    </span>
                  </p>
                  <p className="admin-product-list__description">
                    {product.description}
                  </p>
                </div>
                <button
                  className="admin-product-list__delete-button"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default AdminPage;
