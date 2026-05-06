import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWishlist() {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${API}/api/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setWishlist(data);
      } catch {
        setWishlist([]);
      }
    }

    fetchWishlist();
  }, [API]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-[#2f2219]">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <i className="fa-regular fa-heart text-4xl text-gray-400 mb-4"></i>
          <p className="text-gray-500">
            No saved properties yet
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/property/${item.propertyId._id}`)
              }
              className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={item.propertyId?.image}
                alt=""
                className="h-40 w-full object-cover rounded-lg"
              />

              <h3 className="mt-3 font-semibold text-[#2f2219]">
                {item.propertyId?.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.propertyId?.location}
              </p>

              <p className="text-[#c27b57] font-bold mt-2">
                ₹ {item.propertyId?.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;