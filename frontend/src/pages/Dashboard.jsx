import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Error loading products from backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editingId) {
        // PUT request
        const res = await fetch(`http://localhost:5000/api/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, price: Number(price), category }),
        });
        if (!res.ok) throw new Error("Failed to update product");
        const result = await res.json();
        toast.success(result.message || "Product updated successfully!");
        setEditingId(null);
      } else {
        // POST request
        const res = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, price: Number(price), category }),
        });
        if (!res.ok) throw new Error("Failed to add product");
        const result = await res.json();
        toast.success(result.message || "Product added successfully!");
      }
      // Reset form
      setName("");
      setPrice("");
      setCategory("");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error saving product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    // Scroll to form smoothly
    const formElement = document.querySelector(".dashboard-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      const result = await res.json();
      toast.success(result.message || "Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting product");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setCategory("");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>🌿 PahadiKart Product Management</h1>
          <p>
            Create, view, update, and delete products dynamically. All updates sync directly with the backend.
          </p>
        </div>

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h2>{products.length}</h2>
            <p>Active Products</p>
          </div>

          <div className="stat-card">
            <h2>100%</h2>
            <p>Direct from Farmers</p>
          </div>

          <div className="stat-card">
            <h2>Live</h2>
            <p>Backend Sync Status</p>
          </div>
        </div>

        {/* CRUD Manager Grid */}
        <div className="dashboard-grid">
          {/* Form Side */}
          <div className="dashboard-form-section">
            <h2>{editingId ? "✏️ Edit Product" : "➕ Add New Product"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Millet Snacks"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (₹)</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 40"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Healthy Snacks">Healthy Snacks</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Traditional">Traditional</option>
                  <option value="High Protein">High Protein</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingId ? "Save Changes" : "Add Product"}
                </button>
                {editingId && (
                  <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Table Side */}
          <div className="dashboard-list-section">
            <h2>📦 Product Directory</h2>
            {loading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>Loading products from backend...</div>
            ) : products.length > 0 ? (
              <div className="products-table-wrapper">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>#{p.id}</td>
                        <td style={{ fontWeight: "600" }}>{p.name}</td>
                        <td>{p.category}</td>
                        <td style={{ fontWeight: "700", color: "#2e7d32" }}>₹{p.price}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              onClick={() => handleEdit(p)}
                              className="edit-action-btn"
                              title="Edit"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="delete-action-btn"
                              title="Delete"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                No products found. Add a product to get started!
              </div>
            )}
          </div>
        </div>

        {/* Support Banner */}
        <div className="dashboard-banner">
          <h2>Need Assistance?</h2>
          <p>
            Contact our team for bulk orders, product details, or any support related to PahadiKart.
          </p>
          <a
            href="https://wa.me/918218366275"
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-btn"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}