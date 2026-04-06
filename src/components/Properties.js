import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const userId = token
    ? JSON.parse(atob(token.split(".")[1])).id
    : null;

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("https://real-estate-website-be.onrender.com/api/properties");
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProperties();
  }, []);

  async function handleDelete(id) {
    const token = localStorage.getItem("token");

    try {
      await fetch(`https://real-estate-website-be.onrender.com/api/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  function handleEdit(id) {
    navigate(`/update/${id}`);
  }

  function handleView(id) {
    navigate(`/property/${id}`);
  }

  const filteredProperties = properties.filter((item) =>
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">

      {/* Top */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <input
          type="text"
          placeholder="Search by location..."
          className="border p-2 rounded-lg w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {filteredProperties.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No properties found
          </p>
        ) : (
          filteredProperties.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <img
                src={item.image || "https://via.placeholder.com/300"}
                alt="property"
                className="w-full h-48 object-cover rounded-t-2xl"
              />

              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>

                <p className="text-gray-500 text-sm">
                  {item.location}
                </p>

                <p className="text-blue-600 font-bold">
                  ₹ {item.price}
                </p>

                {/* USER */}
                <p className="text-xs text-gray-400">
                  Posted by: {item.agent?.name || "Unknown"}
                </p>

                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => handleView(item._id)}
                    className="flex-1 bg-blue-500 text-white py-1 rounded-lg"
                  >
                    View
                  </button>

                  {item.agent?._id === userId && (
                    <>
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="flex-1 bg-yellow-500 text-white py-1 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex-1 bg-red-500 text-white py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </>
                  )}

                </div>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Properties;