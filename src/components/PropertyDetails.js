import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
    const [relatedProperties, setRelatedProperties] = useState([]);
    const [activeTab, setActiveTab] = useState("overview");

    // Form States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [isError, setIsError] = useState(false);

    const API = process.env.REACT_APP_API_URL;

    
    useEffect(() => {
        async function fetchProperty() {
            try {
                const res = await fetch(`${API}/api/properties/${id}`);
                const data = await res.json();
                setProperty(data);

                // Fetch other properties by same agent
                if (data.agent?._id) {
                    const relatedRes = await fetch(`${API}/api/properties?agent=${data.agent._id}`);
                    const relatedData = await relatedRes.json();
                    setRelatedProperties(relatedData.filter(p => p._id !== id));
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchProperty();
    }, [id]);

    async function handleSendMessage(e) {
        console.log("SEND BUTTON CLICKED");
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const API = process.env.REACT_APP_API_URL; 

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
                console.log("API URL:", process.env.REACT_APP_API_URL);
                setSuccess("Message sent successfully!");
                setMessage("");
            } else {
                setSuccess(data.message || "Failed to send");
            }

        } catch (err) {
            console.log(err);
        }
    }

    const openInMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`;
        window.open(url, "_blank");
    };

    if (!property) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto px-6">

            {/* Title & Location  */}
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-[#3b2a1f] ">{property.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500">at</span>
                    <button
                        onClick={openInMaps}
                        className="text-blue-600 font-medium hover:underline flex items-center gap-1"
                    >
                        📍 {property.location}
                    </button>
                </div>
            </div>

            {/*Price & Key  */}
            <div className="flex flex-wrap items-center justify-between bg-white border rounded-xl p-6 mb-6 shadow-sm">
                <div className="border-r pr-8">
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Price</p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</p>
                </div>
                <div className="border-r px-8">
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Configuration</p>
                    <p className="text-lg font-semibold">{property.rooms} BHK</p>
                </div>
                <div className="border-r px-8">
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Property Type</p>
                    <p className="text-lg font-semibold capitalize">{property.type}</p>
                </div>
                <div className="px-8">
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Status</p>
                    <p className="text-lg font-semibold text-green-600">Ready to Move</p>
                </div>
            </div>

            {/*  Navigation  */}
            <div className="flex border-b mb-6 sticky top-0 bg-white z-10">
                {["overview", "more details"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-4 capitalize font-bold text-sm transition-all ${activeTab === tab
                            ? "border-b-4 border-[#3b2a1f] text-[#3b2a1f] "
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {activeTab === "overview" ? (
                        <div className="space-y-6">
                            <div className="relative group">
                                <img
                                    src={property.image}
                                    className="w-full rounded-2xl h-[450px] object-cover shadow-md"
                                    alt="Property"
                                />
                                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                    📷 Photos
                                </div>
                            </div>
                            <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Description</h3>
                                <p>{property.description}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-8 border rounded-2xl space-y-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Specifications</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm">Full Address</span>
                                    <span className="font-medium">{property.location}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm">Furnishing</span>
                                    <span className="font-medium">Unfurnished</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm">Ownership</span>
                                    <span className="font-medium">Freehold</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm">Transaction Type</span>
                                    <span className="font-medium">Resale</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Related Properties */}
                    <div className="mt-12 bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Similar Properties by {property.agent?.name}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {relatedProperties.length > 0 ? (
                                relatedProperties.slice(0, 3).map(p => (
                                    <Link to={`/property/${p._id}`} key={p._id} className="bg-white group rounded-xl overflow-hidden border hover:shadow-xl transition-all">
                                        <div className="overflow-hidden h-32">
                                            <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="p-3">
                                            <p className="font-bold text-gray-900">₹ {p.price}</p>
                                            <p className="text-xs text-gray-500 truncate">{p.title}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm italic">No other listings available.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/*  Contact Form */}
                <div className="relative">
                    <div className="bg-white shadow-2xl border-t-4 border-[#3b2a1f] rounded-2xl p-6 sticky top-6">
                        <h2 className="text-lg font-bold mb-1 text-gray-800">Contact Agent</h2>
                        <p className="text-xs text-gray-500 mb-4">Response time: within 24 hours</p>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4 border">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-[#3b2a1f] text-xl border border-red-200">
                                {property.agent?.name?.charAt(0) || "A"}
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{property.agent?.name}</p>
                                <p className="text-xs text-gray-500 font-medium">  Usually responds within 24 hours </p>
                            </div>
                        </div>

                        <form onSubmit={handleSendMessage} className="space-y-3">
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full border-gray-200 focus:ring-[#3b2a1f] focus:border-[#3b2a1f] p-3 rounded-xl border outline-none text-sm" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full border-gray-200 focus:ring-[#3b2a1f] focus:border-[#3b2a1f] p-3 rounded-xl border outline-none text-sm" />
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="I am interested in this property..." className="w-full border-gray-200 focus:ring-[#3b2a1f] focus:border-[#3b2a1f] p-3 rounded-xl border outline-none h-24 text-sm resize-none" />
                            <button
                                type="submit"
                                className="w-full bg-[#3b2a1f] text-white font-bold py-4 rounded-xl"
                            >
                                Send Message
                            </button>

                            {success && (
                                <p className="text-green-600 text-sm">{success}</p>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetails;