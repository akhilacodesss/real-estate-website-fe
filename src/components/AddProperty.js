import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !location || !type || !rooms || !image || !description) {
      setStatus("Please fill all required fields");
      return;
    }

    if (price <= 0) {
      setStatus("Enter a valid price");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          price,
          location,
          type,
          rooms,
          image,
          description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Property added successfully!");

        setTitle("");
        setPrice("");
        setLocation("");
        setType("");
        setRooms("");
        setImage("");
        setDescription("");

        setTimeout(() => {
          navigate("/properties");
        }, 1500);

      } else {
        console.log("ERROR:", data);
        setStatus(data.message || "Failed to add property");
      }
    } catch (err) {
      setStatus("Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#f3ede8] flex justify-center items-start py-10 px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#3b2a1f]">
          Add New Property
        </h2>

        {/* Grid Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Title */}
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              type="text"
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-600">Price</label>
            <input
              type="number"
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <input
              type="text"
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Rooms */}
          <div>
            <label className="text-sm text-gray-600">Rooms</label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              required
            />
          </div>

          {/* Type */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Property Type</label>
            <select
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select property type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="Flat">Flat</option>
              <option value="plot">Plot</option>
            </select>
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Image URL</label>
            <input
              type="url"
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>

        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            required
            className="w-full border border-gray-200 p-3 rounded-xl h-28 resize-none focus:ring-2 focus:ring-[#3b2a1f] outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#3b2a1f] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Add Property
        </button>

        {/* Status */}
        <p className={`text-sm ${status.includes("success") ? "text-green-600" : "text-red-500"}`}>
          {status}
        </p>
      </form>
    </div>
  );
}

export default AddProperty;