import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatPrice(price) {
  if (!price) return "";

  if (price >= 10000000) {
    return `₹ ${(price / 10000000)
      .toFixed(1)
      .replace(".0", "")} Cr`;
  }

  if (price >= 100000) {
    return `₹ ${(price / 100000)
      .toFixed(1)
      .replace(".0", "")} L`;
  }

  return `₹ ${price.toLocaleString("en-IN")}`;
}

function Properties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState("");

  const API = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const userId = token
    ? JSON.parse(atob(token.split(".")[1])).id
    : null;

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(`${API}/api/properties`);
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
      await fetch(`${API}/api/properties${id}`, {
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

  const filteredProperties = properties.filter((item) => {
    const matchesLocation = item.location
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchesPrice = true;

    if (priceRange === "low") {
      matchesPrice = item.price < 500000;
    } else if (priceRange === "mid") {
      matchesPrice = item.price >= 500000 && item.price <= 2000000;
    } else if (priceRange === "high") {
      matchesPrice = item.price > 2000000;
    }

    return matchesLocation && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* HEADER SECTION */}
      <h1 className="text-4xl text-[#3b2a1f] font-bold mt-10 mb-8 text-center md:text-left">
        All Properties
      </h1>

      {/* FILTER BAR - Using the Home.js Search box style */}
      <div className="bg-[#cbb8a9] p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 items-center mb-12">
        <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 flex-1 w-full">
          <i className="fa-solid fa-location-dot text-gray-500"></i>
          <input
            type="text"
            placeholder="Search by location..."
            className="outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 flex-1 w-full">
          <i className="fa-solid fa-indian-rupee-sign text-gray-500"></i>
          <select
            className="outline-none w-full bg-transparent"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="low">Below 5L</option>
            <option value="mid">5L - 20L</option>
            <option value="high">Above 20L</option>
          </select>
        </div>
      </div>

      {/* PROPERTIES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
        {filteredProperties.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-[#3b2a1f] text-xl font-medium">No properties found in this criteria.</p>
          </div>
        ) : (
          filteredProperties.map((item) => (
            <div
              key={item._id}
              className="bg-[#cbb8a9] p-4 rounded-xl border border-transparent shadow-sm hover:shadow-md transition-all group"
            >
              {/* Image Container */}
              <div
                className="overflow-hidden rounded-lg bg-white cursor-pointer"
                onClick={() => navigate(`/property/${item._id}`)}
              >
                <img
                  src={item.image || "https://via.placeholder.com/300"}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="property"
                />
              </div>

              {/* Content */}
              <div className="mt-3 space-y-1">
                <h3 className="font-bold text-black text-lg line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-700 text-sm flex items-center gap-1 font-medium">
                  <i className="fa-solid fa-location-dot text-[#806248]"></i> {item.location}
                </p>

                <p className="text-[#3b2a1f] font-black text-xl">
                  {formatPrice(item.price)}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3b2a1f]/70">
                    {item.rooms} Rooms • {item.type}
                  </span>
                  <span className="text-[10px] text-gray-600 italic">
                    By {item.agent?.name || "Admin"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/property/${item._id}`)}
                    className="flex-1 bg-[#3b2a1f] text-white py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all text-sm"
                  >
                    View
                  </button>

                  {item.agent?._id === userId && (
                    <>
                      <button
                        onClick={() => navigate(`/update/${item._id}`)}
                        className="px-3 bg-white text-[#3b2a1f] border border-[#3b2a1f] py-2 rounded-lg hover:bg-gray-100 transition-all"
                        title="Edit"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-3 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all"
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash"></i>
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