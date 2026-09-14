import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../api/product.js";
import { useAuth } from "../context/useAuth.js";
import Spinner from "../components/Spinner.jsx";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    amount: 1,
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(id, token);
        setProduct((prev) => ({
          ...prev,
          ...data,
          price: data.price ?? "",
          amount: data.amount ?? 1,
          name: data.name ?? "",
          category: data.category ?? "",
          description: data.description ?? "",
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate, token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      price: parseFloat(product.price),
      amount: Number(product.amount),
    };
    setLoading(true);
    try {
      await updateProduct(id, newProduct, token);
      navigate("/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {loading && <Spinner corner size="sm" />}
      <form
        className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg p-8 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
          <p className="text-sm text-gray-500 mt-1">
            Update inventory item details
          </p>
        </div>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            value={product.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-sm text-gray-700">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            required
            value={product.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="price" className="text-sm text-gray-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              required
              value={product.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="amount" className="text-sm text-gray-700">
              Stock
            </label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={product.amount}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={product.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md bg-indigo-600 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
