import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProperty() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(
          `https://real-estate-website-be.onrender.com/api/properties/${id}`
        );
        const data = await res.json();

        setTitle(data.title);
        setPrice(data.price);
        setLocation(data.location);
        setType(data.type);
        setRooms(data.rooms);
        setImage(data.image);
        setDescription(data.description);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProperty();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://real-estate-website-be.onrender.com/api/properties/${id}`,
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
        alert("Property updated");
        navigate("/properties");
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
        <h2 className="text-2xl font-bold text-center">
          Edit Property
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded-lg"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full border p-2 rounded-lg"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded-lg"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select property type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="flat">Flat</option>
          <option value="plot">Plot</option>
        </select>

        <input
          type="number"
          placeholder="Rooms"
          className="w-full border p-2 rounded-lg"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
        />

        <input
          type="url"
          placeholder="Image URL"
          className="w-full border p-2 rounded-lg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Update Property
        </button>
      </form>
    </div>
  );
}

export default EditProperty;