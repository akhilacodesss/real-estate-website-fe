import { Link, useLocation, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let user = null;

  try {
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      user = decoded;
    }
  } catch (err) {
    console.log("Invalid token");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-[#cbb8a9] shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-xl font-bold text-[#3b2a1f]">
          Real Estate
        </Link>

        <div className="flex items-center gap-4">

          {token && user?.role === "agent" && (
            <Link
              to="/manage-properties"
              className={
                location.pathname === "/manage-properties"
                  ? "text-[#3b2a1f] font-semibold border-b-2 border-[#3b2a1f]"
                  : "text-gray-700"
              }
            >
              Manage properties
            </Link>
          )}

          {token && (
            <span className="flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm">
              <i className="fa-regular fa-circle-user"></i>
              {user?.name}
            </span>
          )}
          {token && (
            <Link
              to="/messages"
              className={
                location.pathname === "/messages"
                  ? "text-[#3b2a1f] font-semibold border-b-2 border-[#3b2a1f]"
                  : "text-gray-700"
              }
            >
              Messages
            </Link>
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
              to="/login"
              className="bg-[#3b2a1f] text-white px-3 py-1 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      {location.pathname !== "/" && (
        <div className="fixed bottom-6 right-6 z-50">

          <button
            onClick={handleBack}
            className="bg-[#3b2a1f] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 hover:opacity-90 transition"
          >
            ← Back
          </button>

        </div>
      )}

      <div>{children}</div>
    </div>
  );
}

export default Layout;