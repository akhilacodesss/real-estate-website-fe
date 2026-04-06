import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        async function fetchProperty() {
            try {
                const res = await fetch(`https://real-estate-website-be.onrender.com/api/properties/${id}`);
                const data = await res.json();
                setProperty(data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchProperty();
    }, [id]);

    if (!property) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto">

            {/* Image */}
            <div className="bg-gray-100 rounded-2xl p-4 flex justify-center">
                <img
                    src={property.image}
                    alt={property.title}
                    className="max-h-[400px] object-contain"
                />
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">

                {/* Left: Details */}
                <div className="md:col-span-2 space-y-3">
                    <h1 className="text-3xl font-bold">{property.title}</h1>

                    <p className="text-gray-500">{property.location}</p>

                    <p className="text-blue-600 text-2xl font-bold">
                        ₹ {property.price}
                    </p>

                    <div className="flex gap-4 text-sm text-gray-700 mt-2">
                        <p>🏠 {property.type}</p>
                        <p>🛏 {property.rooms} rooms</p>
                    </div>

                    <p className="text-gray-700 mt-4">
                        {property.description}
                    </p>

                    {/* Map */}
                    <iframe
                        title="map"
                        src={`https://www.google.com/maps?q=${property.location}&output=embed`}
                        className="w-full h-64 mt-4 rounded-xl border"
                    ></iframe>
                </div>

                {/* Right: Contact Form */}
                <div className="bg-white shadow-md rounded-2xl p-4 h-fit">
                    <h2 className="text-xl font-semibold mb-3">Contact Agent</h2>

                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full border p-2 mb-2 rounded-lg"
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full border p-2 mb-2 rounded-lg"
                    />

                    <textarea
                        placeholder="Message"
                        className="w-full border p-2 mb-3 rounded-lg"
                    ></textarea>

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Send Message
                    </button>
                </div>

            </div>
        </div>
    );
}

export default PropertyDetails;