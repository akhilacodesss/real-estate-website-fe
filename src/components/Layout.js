import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  let user = null;

  if (token) {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    user = decoded;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-100">
      
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Real Estate</h1>

        <div className="flex items-center gap-4">
          
          <Link
            to="/properties"
            className={
              location.pathname === "/properties"
                ? "text-blue-600 font-bold"
                : "text-gray-700"
            }
          >
            Properties
          </Link>

          {token && (
            <Link
              to="/dashboard"
              className={
                location.pathname === "/dashboard"
                  ? "text-blue-600 font-bold"
                  : "text-gray-700"
              }
            >
              Dashboard
            </Link>
          )}

          {token && (
            <span className="text-sm text-gray-600">
              👤 {user?.name || "User"}
            </span>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/"
              className="bg-blue-500 text-white px-3 py-1 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <div className="p-6">{children}</div>
    </div>
  );
}

export default Layout;