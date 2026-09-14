import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import Spinner from "../components/Spinner.jsx";
import ScrambleText from "../components/ScrambleText";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return <Spinner />;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
      <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-8 w-full max-w-sm">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Your profile</h2>
          <p className="text-sm text-gray-500 mt-1">Account details</p>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">User ID</span>
            <ScrambleText
              key={user._id}
              text={user._id}
              className="text-gray-900"
            />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Username</span>
            <span className="text-gray-900">{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="text-gray-900 capitalize">{user.role}</span>
          </div>
        </div>
        <button
          className="mt-2 rounded-md bg-indigo-600 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-700 transition-colors cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
