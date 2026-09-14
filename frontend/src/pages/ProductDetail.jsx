import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProduct, updateStock } from "../api/product";
import { useAuth } from "../context/useAuth.js";
import RoleGuard from "../components/RoleGuard";
import Spinner from "../components/Spinner";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id, token);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate, token]);

  const handleStockChange = async (delta) => {
    try {
      const result = await updateStock(id, delta, token);
      setProduct((prev) => ({ ...prev, amount: result.data.amount }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setLoading(true);
    try {
      await deleteProduct(id, token);
      console.log("Product Deleted");
      navigate("/products");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete product",
      );
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {loading && <Spinner corner size="sm" />}
      {!product._id ? (
        <Spinner />
      ) : (
        <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg p-8 flex flex-col gap-6">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </p>
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Unit Price:</span>
              <span className="text-gray-900">₹ {product.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Description:</span>
              <span className="text-gray-900 text-right max-w-[60%]">
                {product.description}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3">
            <span className="text-sm text-gray-500">Stock</span>
            <div className="flex items-center gap-3">
              <RoleGuard allowedRoles={["admin", "manager"]}>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleStockChange(-1)}
                >
                  -
                </button>
              </RoleGuard>
              <span className="text-sm font-medium text-gray-900 w-6 text-center">
                {product.amount}
              </span>
              <RoleGuard allowedRoles={["admin", "manager"]}>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleStockChange(1)}
                >
                  +
                </button>
              </RoleGuard>
            </div>
          </div>
          <RoleGuard allowedRoles={["admin"]}>
            <div className="flex gap-3">
              <button
                className="flex-1 rounded-md bg-indigo-600 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-700 transition-colors cursor-pointer"
                onClick={() => navigate(`/products/${id}/edit`)}
              >
                Edit
              </button>
              <button
                className="flex-1 rounded-md bg-white border border-red-200 text-red-600 text-sm font-medium px-4 py-2 hover:bg-red-50 transition-colors cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </RoleGuard>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
