import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      
       setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1200);
      
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {message && (
          <p className={`text-center text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"
            }`}>
            {message}
          </p>
        )}

        {/* Email */}
        <input
          required
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative" >
          <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full border p-2 rounded-lg pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <i
            onClick={() => setShowPassword(!showPassword)}
            className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"
              } absolute right-3 top-3 cursor-pointer text-gray-600`}
          ></i>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={!email || !password}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-medium">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;