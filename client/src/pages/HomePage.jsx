import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import Fridge from "../components/Fridge.jsx";

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <button onClick={logout} className="mt-4 bg-red-500 text-white p-2 rounded">
        Logout
      </button>
      <main className="flex justify-center items-center h-screen bg-gray-100">
        <Fridge />
      </main>
    </div>
  );
};

export default HomePage;
