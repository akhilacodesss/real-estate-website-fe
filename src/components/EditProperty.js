import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProperty() {
  const API = process.env.REACT_APP_API_URL;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`${API}/api/properties/${id}`);
        const data = await res.json();

        setTitle(data.title);
        setPrice(data.price);
        setLocation(data.location);
        setType(data.type);
        setRooms(data.rooms);
        setImage(data.image);
        setDescription(data.description);
      } catch (err) {
        setStatus("Failed to load property");
      }
    }

    fetchProperty();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !price || !location) {
      setStatus("Please fill required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API}/api/properties${id}`,
        {
          method: "PUT",
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
        }
      );

      if (res.ok) {
        setStatus("Property updated successfully!");

        setTimeout(() => {
          navigate("/properties");
        }, 1500);
      } else {
        setStatus("Update failed");
      }
    } catch (err) {
      setStatus("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-[#f3ede8] flex justify-center items-center py-10 px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#3b2a1f]">
          Edit Property
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              type="text"
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Price</label>
            <input
              type="number"
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Location</label>
            <input
              type="text"
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Rooms</label>
            <input
              type="number"
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Property Type</label>
            <select
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select property type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="Flat">Flat</option>
              <option value="plot">Plot</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Image URL</label>
            <input
              type="url"
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#3b2a1f] outline-none"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            className="w-full border border-gray-200 p-3 rounded-xl h-28 focus:ring-2 focus:ring-[#3b2a1f] outline-none resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full  bg-[#3b2a1f] text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Update Property
        </button>

        {status && (
          <p className="mt-3 text-sm text-green-600">{status}</p>
        )}

      </form>
    </div>
  );
}

export default EditProperty;