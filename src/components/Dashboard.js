import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const userId = token
    ? JSON.parse(atob(token.split(".")[1])).id
    : null;

  useEffect(() => {
    async function fetchProperties() {
      const res = await fetch("https://real-estate-website-be.onrender.com/api/properties");
      const data = await res.json();

      //  ONLY MY PROPERTIES
      const myProps = data.filter(
        (p) => p.agent?._id === userId
      );

      setProperties(myProps);
    }

    fetchProperties();
  }, [userId]);

  async function handleDelete(id) {
    await fetch(`https://real-estate-website-be.onrender.com/api/properties/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProperties((prev) => prev.filter((p) => p._id !== id));
  }

  function handleEdit(id) {
    navigate(`/update/${id}`);
  }

  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Manage Your Properties
        </h1>

        <button
          onClick={() => navigate("/add")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {properties.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No properties added yet
          </p>
        ) : (
          properties.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-xl shadow">

              <img
                src={item.image || "https://via.placeholder.com/300"}
                alt="property"
                className="w-full h-48 object-cover rounded-t-2xl"
              />

              <h3 className="font-semibold mt-2">{item.title}</h3>
              <p>{item.location}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="flex-1 bg-yellow-500 text-white py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded"
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