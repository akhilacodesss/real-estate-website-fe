import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const API = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const user = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

  const userId = user?.id;
  const role = user?.role;

  useEffect(() => {
    async function fetchProperties() {
      const res = await fetch(`${API}/api/properties`);
      const data = await res.json();

      //  ONLY MY PROPERTIES
      const myProps = data.filter(
        (p) => p.agent?._id === userId
      );

      setProperties(myProps);
    }

    fetchProperties();
  }, [userId, API]);

  async function handleDelete(id) {
    try {
      await fetch(`${API}/api/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties((prev) =>
        prev.filter((p) => p._id !== id)
      );

      setSuccess("Property deleted successfully");
      setError("");

    } catch {
      setError("Failed to delete property");
      setSuccess("");
    }
  }

  function handleEdit(id) {
    navigate(`/update/${id}`);
  }

  return (

    <div className="min-h-screen bg-[#f3ede8] px-6 py-10 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-[#3b2a1f]">
          Manage Your Properties
        </h1>

        <div className="flex gap-3">

          {role === "agent" && (
            <button
              onClick={() => navigate("/add")}
              className="bg-[#3b2a1f] text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition"
            >
              + Add Property
            </button>
          )}

        </div>
      </div>
      {success && (
        <p className="mb-4 text-sm text-green-600">
          {success}
        </p>
      )}

      {error && (
        <p className="mb-4 text-sm text-red-500">
          {error}
        </p>
      )}


      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {properties.length === 0 ? (
          <div className="text-center col-span-full py-16">
            <i className="fa-regular fa-building text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-500">
              No properties added yet
            </p>
          </div>
        ) : (
          properties.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden group"
            >

              {/* Image */}
              <div className="h-44 overflow-hidden">
                <img
                  src={item.image || "https://via.placeholder.com/300"}
                  alt="property"
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-[#3b2a1f] line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-1">
                  📍 {item.location}
                </p>
                <p className="text-[#c27b57] font-bold mt-2">
                  ₹ {item.price}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 px-4 pb-4">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="flex-1 border border-[#3b2a1f] text-[#3b2a1f] py-2 rounded-xl text-sm font-medium hover:bg-[#3b2a1f] hover:text-white transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 border border-red-500 text-red-500 py-2 rounded-xl text-sm font-medium hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;