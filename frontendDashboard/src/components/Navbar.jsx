// src/components/Navbar.tsx
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>

          <div className="flex items-center gap-4 pr-12 md:pr-5">
            {location.pathname !== "/" &&  location.pathname !== "/login" ? (
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
            ) : (
                <>
                  <button
                      onClick={() => navigate("/")}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Login
                  </button>
                  <button
                      onClick={() => navigate("/register")}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Register
                  </button>
                </>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
