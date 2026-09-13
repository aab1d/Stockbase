import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, searchProducts } from "../api/product.js";
import { useAuth } from "../context/useAuth.js";
import RoleGuard from "../components/RoleGuard.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(token);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [navigate, token]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = query.trim()
        ? await searchProducts(query, token)
        : await getAllProducts(token);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Products</h2>
            <p className="text-sm text-gray-500 mt-1">
              Browse and manage inventory
            </p>
          </div>
          <RoleGuard allowedRoles={["admin"]}>
            <button
              className="rounded-md bg-indigo-600 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-700 transition-colors cursor-pointer"
              onClick={() => navigate("/products/new")}
            >
              Add Product
            </button>
          </RoleGuard>
        </div>
        <form className="flex gap-2" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-md bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>
        <div className="flex flex-col gap-3">
          {products.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">
              No products found.
            </p>
          )}
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:border-indigo-300 transition-colors cursor-pointer"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {product.category} · Stock: {product.amount}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  ₹ {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
