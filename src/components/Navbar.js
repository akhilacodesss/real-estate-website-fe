import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let user = null;

  try {
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      user = decoded;
    }
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    user = null;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ important
    navigate("/login");
  }

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Properties", path: "/properties" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f3ede8]">

      {/* NAVBAR */}
      <nav className="bg-[#f3ede8]/90 backdrop-blur-md border-b border-[#e5ddd5] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-4">

          {/* LOGO */}
          <Link to="/" className="flex items-center justify-center gap-1">
            <img src={logo} alt="Brickly" className="h-14 w-auto object-contain" />
            <span className="text-2xl font-bold text-[#2f2219] -ml-1">
              Brickly
            </span>
          </Link>

          {/* CENTER LINKS */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-5 text-sm md:text-[15px] font-medium">

            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === "/properties" &&
                  location.pathname.startsWith("/property"));

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative transition ${isActive
                    ? "text-[#2f2219] font-semibold"
                    : "text-[#5c4a3f] hover:text-[#c27b57]"
                    }`}
                >
                  {item.name}

                  {isActive && (
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#c27b57] rounded"></span>
                  )}
                </Link>
              );
            })}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-[#5c4a3f] hover:text-[#c27b57] transition"
              >
                Admin
              </Link>
            )}

            {user?.role === "agent" && (
              <Link
                to="/dashboard"
                className="text-[#5c4a3f] hover:text-[#c27b57] transition"
              >
                Dashboard
              </Link>
            )}

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-wrap justify-center items-center gap-4">

            {token && (
              <Link
                to="/wishlist"
                className="text-[#5c4a3f] hover:text-[#c27b57] transition"
              >
                <i className="fa-solid fa-heart"></i>
              </Link>
            )}

            {/* MESSAGES */}
            {token && (
              <Link
                to="/messages"
                className="text-[#5c4a3f] hover:text-[#c27b57] text-xl transition"
              >
                <i className="fa-regular fa-comment-dots"></i>
              </Link>
            )}

            {/* USER */}
            {token && (
              <span className="flex flex-wrap text-sm text-[#2f2219] font-medium">
                {user?.name}
              </span>
            )}

            {/* AUTH */}
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-[#b23b3b] text-white text-sm px-4 py-2 rounded-md hover:bg-[#992f2f] transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[#2f2219] border border-[#e5ddd5] rounded-md hover:bg-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-medium bg-[#2f2219] text-white rounded-md hover:opacity-90 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* BACK BUTTON */}
      {location.pathname !== "/" && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleBack}
            className="bg-white border border-[#e5ddd5] text-[#2f2219] px-4 py-2 rounded-full shadow-sm flex items-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition"
          >
            ← Back
          </button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

export default Navbar;