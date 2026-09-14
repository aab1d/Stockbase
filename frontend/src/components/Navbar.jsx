import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <Link to={"/products"} className="text-sm font-semibold text-gray-900">
          Stockbase
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to={"/products"}
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Products
          </Link>
          <Link
            to={"/profile"}
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Profile
          </Link>
          <button
            className="text-sm text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
