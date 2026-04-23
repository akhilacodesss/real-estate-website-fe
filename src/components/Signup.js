import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      setMessage("Signup successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

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
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        {message && (
          <p className={`text-center text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"
            }`}>
            {message}
          </p>
        )}

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border p-2 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative" >
          <input
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
        {/* role */}
        <div>
          <label className="block text-sm mb-1">Register as</label>
          <select
            className="w-full border p-2 rounded-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={!name || !email || !password}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          Signup
        </button>

        {/* Login Link */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;