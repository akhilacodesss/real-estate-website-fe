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

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://real-estate-website-be.onrender.com/api/properties", {
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
        setTimeout(() => {
          navigate("/properties");
        }, 1500);
      } else {
         console.log("ERROR:", data);
        setStatus( data.message || "Failed to add property");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          Add New Property
        </h2>

        {/* Title */}
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter property title"
            className="w-full border p-2 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm mb-1">Price</label>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full border p-2 rounded-lg"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm mb-1">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full border p-2 rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm mb-1">Property Type</label>
          <select
            className="w-full border p-2 rounded-lg"
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

        {/* Rooms */}
        <div>
          <label className="block text-sm mb-1">Rooms</label>
          <input
            type="number"
            min="1"
            placeholder="Number of rooms"
            className="w-full border p-2 rounded-lg"
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm mb-1">Image URL</label>
          <input
            type="url"
            placeholder="Enter image URL"
            className="w-full border p-2 rounded-lg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            placeholder="Enter description"
            className="w-full border p-2 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Property
        </button>

        {status && (
          <p className="text-green-600 text-sm mt-2">{status}</p>
        )}
      </form>
    </div>
  );
}

export default AddProperty;