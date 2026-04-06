import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://real-estate-website-be.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      setMessage("Signup successful!");
      navigate("/");

      alert("Signup successful");
      navigate("/"); // go to login
    } catch (err) {
      console.log(err);
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
          onChange={(e) => setEamil(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border p-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Signup
        </button>

        {/* Login Link */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;