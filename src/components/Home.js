import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import heroImg from "../assets/hero.png";
import AboutSection from "./AboutSection";
import Contact from "./Contact";
import Footer from "./Footer";

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

    const [wishlist, setWishlist] = useState([]);
    const [wishlistMessage, setWishlistMessage] = useState("");

    const API = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const displayProperties = properties.length >= 6 ? properties.slice(0, 6) : properties;

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${API}/api/properties`);
            const data = await res.json();
            setProperties(data);
        }

        fetchData();
    }, [API]);

    async function handleWishlist(propertyId) {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const res = await fetch(`${API}/api/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ propertyId }),
            });

            const data = await res.json();

            if (data.message.includes("Added")) {
                setWishlist((prev) => [...prev, propertyId]);
                setWishlistMessage("Added to wishlist ❤️");
            } else {
                setWishlist((prev) =>
                    prev.filter((id) => id !== propertyId)
                );
                setWishlistMessage("Removed from wishlist");
            }

            setTimeout(() => {
                setWishlistMessage("");
            }, 2000);

        } catch {
            setWishlistMessage("Something went wrong");
        }
    }
    return (
        <>
            <div className="w-full bg-[#f3ede8]">
                <section className="px-6 md:px-12 py-10 md:py-14 grid md:grid-cols-2 items-center gap-10">

                    {/* LEFT */}
                    <div>

                        <h1 className="text-5xl font-bold text-[#3b2a1f] leading-tight">
                            Find Your Dream <br /> Home
                        </h1>

                        <p className="text-gray-600 mt-4 max-w-md">
                            Your dream space is just a search away.
                        </p>

                        {/* SEARCH BAR */}
                        <div className="mt-6 bg-[#806248] p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-3">

                            {/* Location */}
                            <input
                                type="text"
                                placeholder="Location"
                                className="px-4 py-2 rounded-md outline-none w-full md:w-[220px]"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />

                            {/* Type */}
                            <select
                                cclassName="px-3 py-2 rounded-md outline-none w-full md:w-[140px]"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value=""> property type</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="flat">Flat</option>
                            </select>

                            {/* Price */}
                            <select
                                className="px-3 py-2 rounded-md outline-none w-full md:w-[140px]"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                            >
                                <option value="">All Prices</option>
                                <option value="0-50">0 - 50L</option>
                                <option value="50-100">50L - 1Cr</option>
                                <option value="100-200">1Cr - 2Cr</option>
                                <option value="300+">Above 3Cr</option>
                            </select>

                            {/* Button */}
                            <button
                                onClick={() =>
                                    navigate(
                                        `/properties?location=${location}&type=${type}&price=${priceRange}`
                                    )
                                }
                                className="bg-[#3b2a1f] text-white px-5 py-2 rounded-md hover:opacity-90"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex items-end justify-center md:justify-end">
                        <img
                            src={heroImg}
                            alt="hero"
                            className="w-[115%] md:w-[130%] max-h-[520px] object-cover drop-shadow-2xl"
                        />
                    </div>
                </section>
            </div>
            <AboutSection />

            <section id="properties" className="bg-[#f3ede8] py-16">

                {/* HEADER */}
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mb-10">

                    {/* LEFT */}
                    <div>
                        <span className="bg-[#e7ddd4] text-[#3b2a1f] text-xs px-3 py-1 rounded-full font-medium">
                            Properties
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-[#2f2219] mt-2">
                            Featured Listings
                        </h2>
                    </div>

                    {/* RIGHT BUTTON */}
                    <button
                        onClick={() => navigate("/property")}
                        className="text-[#2f2219] font-medium flex items-center gap-2 hover:gap-3 transition whitespace-nowrap"
                    >
                        View All
                        <i className="fa-solid fa-arrow-right text-sm"></i>
                    </button>

                </div>
                {/* GRID */}
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

                    {displayProperties.map((item) => (

                        <div
                            key={item._id}
                            onClick={() => navigate(`/property/${item._id}`)}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer group"
                        >

                            {/* IMAGE */}
                            <div className="relative h-56 overflow-hidden">

                                <img
                                    src={item.image}
                                    alt="property"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleWishlist(item._id);
                                    }}
                                    className="absolute top-3 right-3 text-lg bg-black/40 text-white p-2 rounded-full hover:scale-110 transition"
                                >
                                    <i
                                        className={
                                            wishlist.includes(item._id)
                                                ? "fa-solid fa-heart text-red-500"
                                                : "fa-regular fa-heart"
                                        }
                                    ></i>
                                </button>

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

                                <p className="text-[#c27b57] font-bold mt-2">
                                    {formatPrice(item.price)}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>
                {wishlistMessage && (
                    <p
                        className={`text-center text-sm mt-6 ${wishlistMessage.includes("Removed")
                            ? "text-red-500"
                            : "text-green-600"
                            }`}
                    >
                        {wishlistMessage}
                    </p>
                )}

            </section>

            <Contact />

            <Footer />
        </>
    );
}

export default Home;