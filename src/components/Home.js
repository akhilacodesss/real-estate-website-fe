import { useState, useEffect } from "react";
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

function Home() {
    const [properties, setProperties] = useState([]);
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const API = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${API}/api/properties`);
            const data = await res.json();
            setProperties(data.slice(0, 5));
        }

        fetchData();
    }, [API]);

    return (
        <>
            <div className="max-w-7xl mx-auto">

                {/* HERO SECTION */}
                <div className="bg-[#cbb8a9] flex flex-col items-center justify-center py-20 rounded-xl mt-10 ">

                    {/* The Title */}
                    <h1 className="text-4xl text-[#3b2a1f] font-bold mb-10">
                        Find Your Dream Home
                    </h1>

                    {/* SEARCH BOX  */}
                    <div className="bg-[#806248] p-6 rounded-2xl shadow-lg flex gap-4 items-center w-[90%] md:w-[80%]">

                        {/* Location */}
                        <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 flex-1">
                            <i className="fa-solid fa-location-dot text-gray-500"></i>
                            <input
                                type="text"
                                placeholder="Location"
                                className="outline-none w-full"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        {/* Type */}
                        <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 flex-1">
                            <i className="fa-solid fa-house text-gray-500"></i>
                            <select
                                className="outline-none w-full"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">Type</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 flex-1">
                            <i className="fa-solid fa-indian-rupee-sign text-gray-500"></i>
                            <select
                                className="outline-none w-full"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                            >
                                <option value="">Price Range</option>
                                <option value="low">Below 5L</option>
                                <option value="mid">5L - 20L</option>
                                <option value="high">Above 20L</option>
                            </select>
                        </div>

                        {/* Button */}
                        <button
                            onClick={() => navigate(`/properties?location=${location}`)}
                            className="bg-[#3b2a1f] text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
                        >
                            Search
                        </button>

                    </div>
                </div>

                {/* BROWSE PROPERTIES */}
                <h2 className="text-2xl text-[#3b2a1f] font-bold mt-16 mb-4">
                    Browse Properties
                </h2>

                {/* PROPERTIES GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {properties.map((item) => (
                        <div
                            key={item._id}
                            onClick={() => navigate(`/property/${item._id}`)}
                            className="bg-[#cbb8a9] p-4 rounded-xl border border-gray shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="overflow-hidden rounded-lg bg-white">
                                <img
                                    src={item.image}
                                    className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    alt="property"
                                />
                            </div>

                            <h3 className="mt-3 font-bold text-black line-clamp-1">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 text-sm flex items-center gap-1 font-medium">
                                <i className="fa-solid fa-location-dot text-[#806248]"></i> {item.location}
                            </p>

                            <p className="text-[#3b2a1f] font-black mt-2 text-lg">
                                {formatPrice(item.price)}
                            </p>
                        </div>
                    ))}

                    {/* VIEW ALL CARD */}
                    <div
                        onClick={() => navigate("/properties")}
                        className="bg-[#cbb8a9] p-4 rounded-xl shadow-md hover:shadow-xl cursor-pointer flex flex-col items-center justify-center transition-all group"
                    >
                        <div className="bg-white/20 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-arrow-right text-2xl text-[#3b2a1f]"></i>
                        </div>
                        <span className="font-bold text-[#3b2a1f] text-lg">
                            View All Properties
                        </span>
                    </div>
                </div>
            </div>

            <footer className="bg-[#cbb8a9] py-16 px-6 mt-20 w-full">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">

                    {/* Verified Listings */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white/40 p-4 rounded-full mb-4 shadow-sm">
                            <i className="fa-solid fa-circle-check text-[#3b2a1f] text-2xl"></i>
                        </div>
                        <h3 className="font-bold text-[#3b2a1f] text-xl">Verified Listings</h3>
                        <p className="text-[#3b2a1f]/70 text-sm mt-2">Trusted properties for your home</p>
                    </div>


                    {/* Easy Contact */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white/40 p-4 rounded-full mb-4 shadow-sm">
                            <i className="fa-solid fa-envelope text-[#3b2a1f] text-2xl"></i>
                        </div>
                        <h3 className="font-bold text-[#3b2a1f] text-xl">Easy Contact</h3>
                        <p className="text-[#3b2a1f]/70 text-sm mt-2">Direct agent messaging anytime</p>
                    </div>

                    {/* Best Prices */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white/40 p-4 rounded-full mb-4 shadow-sm">
                            <i className="fa-solid fa-indian-rupee-sign text-[#3b2a1f] text-2xl"></i>
                        </div>
                        <h3 className="font-bold text-[#3b2a1f] text-lg">Best Prices</h3>
                        <p className="text-[#3b2a1f]/70 text-sm mt-2">Affordable and luxury options</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Home;