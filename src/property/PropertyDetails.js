import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [saved, setSaved] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  const [message, setMessage] = useState("");
  const [wishlistSuccess, setWishlistSuccess] = useState("");

  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`${API}/api/properties/${id}`);
        const data = await res.json();
        setProperty(data);

      } catch {
        setProperty(null);
      }
    }
    fetchProperty();
  }, [id, API]);

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`;
    window.open(url, "_blank");
  };

  if (!property) return <p className="text-center mt-10">Loading...</p>;

  async function handleWishlist() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoadingFav(true);

      const res = await fetch(`${API}/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ propertyId: property._id }),
      });

      const data = await res.json();

      if (data.message.includes("Added")) {
        setSaved(true);
        setWishlistSuccess("Added to wishlist ❤️");
      } else {
        setSaved(false);
        setWishlistSuccess("Removed from wishlist");
      }

      setTimeout(() => setWishlistSuccess(""), 2000);


    } catch {
      setWishlistSuccess("Something went wrong");
    } finally {
      setLoadingFav(false);
    }
  }

  async function handleSendMessage(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login to send a message");
      setSuccess("");
      return;
    }

    if (!message.trim()) {
      setError("Message cannot be empty");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch(`${API}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: message,
          propertyId: property._id,
          receiver: property.agent,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Message sent successfully!");
        setError("");
        setMessage("");
      } else {
        setError(data.message || "Failed to send");
        setSuccess("");
      }

    } catch {
      setError("Something went wrong");
      setSuccess("");
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 bg-[#f3ede8]">

      {/* HERO IMAGE */}
      <img
        src={property.image}
        alt="property"
        className="w-full h-[400px] object-cover rounded-2xl shadow-md mb-8"
      />

      {/* CONTENT GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* TITLE + PRICE */}
          <div className="flex justify-between items-start">

            <div>
              <h1 className="text-3xl font-bold text-[#3b2a1f]">
                {property.title}
              </h1>

              <button
                onClick={openInMaps}
                className="text-sm text-[#806248] mt-1 hover:underline"
              >
                📍 {property.location}
              </button>
            </div>

            <div className="flex items-center gap-4">

              <p className="text-2xl font-bold text-[#c27b57]">
                {formatPrice(property.price)}
              </p>

              <button
                onClick={handleWishlist}
                disabled={loadingFav}
                className="text-2xl transition transform hover:scale-110"
              >
                {loadingFav ? (
                  "..."
                ) : (
                  <i
                    className={
                      saved
                        ? "fa-solid fa-heart text-red-500"
                        : "fa-regular fa-heart text-[#c27b57]"
                    }
                  ></i>
                )}
              </button>
              {wishlistSuccess && (
                <p
                  className={`text-sm mt-2 ${wishlistSuccess.includes("Removed")
                    ? "text-red-500"
                    : "text-green-600"
                    }`}
                >
                  {wishlistSuccess}
                </p>
              )}

            </div>

          </div>

          {/* STATS */}
          <div className="flex gap-8 text-center">
            <div>
              <p className="text-lg font-bold text-[#3b2a1f]">
                {property.rooms}
              </p>
              <p className="text-xs text-[#806248]">Bedrooms</p>
            </div>

            <div>
              <p className="text-lg font-bold text-[#3b2a1f]">2</p>
              <p className="text-xs text-[#806248]">Bathrooms</p>
            </div>

            <div>
              <p className="text-lg font-bold text-[#3b2a1f]">2400</p>
              <p className="text-xs text-[#806248]">Sq Ft</p>
            </div>
          </div>

          {/* ABOUT */}
          <div className="bg-[#f3ede8] border border-[#e5ddd5] p-5 rounded-2xl">
            <h3 className="font-bold text-[#3b2a1f] mb-2">
              About The Property
            </h3>
            <p className="text-[#806248] text-sm leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* AMENITIES */}
          <div className="bg-[#f3ede8] border border-[#e5ddd5] p-5 rounded-2xl">
            <h3 className="font-bold text-[#3b2a1f] mb-4">
              Key Amenities
            </h3>

            <div className="grid grid-cols-2 gap-3 text-sm text-[#3b2a1f]">
              <span>🏋️ Gym</span>
              <span>🏊 Swimming Pool</span>
              <span>🔒 Gated Community</span>
              <span>📷 CCTV</span>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="bg-[#f3ede8] border border-[#e5ddd5] p-6 rounded-2xl shadow-md sticky top-24">

            <h3 className="text-lg font-bold text-[#3b2a1f] mb-4">
              Contact Agent
            </h3>

            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-[#3b2a1f] hover:bg-[#2a1e16] text-white py-3 rounded-xl font-bold transition"
              >
                Login to Contact
              </button>

            ) : user.id === property.agent?._id ? (

              <p className="text-[#806248]">This is your property</p>

            ) : (

              <form onSubmit={handleSendMessage} className="space-y-3">


                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="I am interested in this property..."
                  className="w-full bg-[#f3ede8] border border-[#cbb8a9] p-3 rounded-xl h-24 text-sm outline-none focus:ring-2 focus:ring-[#c27b57]"
                />

                <button
                  type="submit"
                  className="w-full bg-[#c27b57] hover:bg-[#a96a4c] text-white py-3 rounded-xl font-bold transition"
                >
                  Send Message
                </button>

                {success && (
                  <p className="text-green-600 text-sm">
                    {success}
                  </p>
                )}

                {error && (
                  <p className="text-red-500 text-sm">
                    {error}
                  </p>
                )}

              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default PropertyDetails;