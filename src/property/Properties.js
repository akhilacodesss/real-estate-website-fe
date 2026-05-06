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

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(`${API}/api/properties`);
        const data = await res.json();
        setProperties(data);
      } catch {
        setProperties([]);
      }
    }
    fetchProperties();
  }, [API]);



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
    <div className="max-w-7xl mx-auto px-6">

      {/* HEADER */}
      <h1 className="text-4xl text-[#3b2a1f] font-bold mt-10 mb-8 text-center md:text-left">
        All Properties
      </h1>

      {/* FILTER BAR */}
      <div className="bg-[#cbb8a9] p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center mb-12">

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

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">

        {filteredProperties.length === 0 ? (
          <div className="text-center">
            <i className="fa-regular fa-building text-4xl text-gray-400 mb-4"></i>

            <p className="text-[#3b2a1f] text-xl font-medium">
              No properties found
            </p>
          </div>
        ) : (
          filteredProperties.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/property/${item._id}`)}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer group"
            >

              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">

                <img
                  src={item.image || "https://via.placeholder.com/300"}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  alt="property"
                />

                {/* OVERLAY */}
                <div className="absolute bottom-0 w-full bg-black/60 text-white text-sm flex justify-between px-3 py-2">
                  <span>
                    <i className="fa-solid fa-location-dot mr-1"></i>
                    {item.location}
                  </span>

                  <span className="flex gap-2 text-xs">
                    <span>
                      <i className="fa-solid fa-bed"></i> {item.rooms}
                    </span>
                    <span>
                      <i className="fa-solid fa-bath"></i> 2
                    </span>
                  </span>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="font-semibold text-[#2f2219] line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-[rgb(194,123,87)] font-bold mt-2">
                  {formatPrice(item.price)}
                </p>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );

}

export default Properties;