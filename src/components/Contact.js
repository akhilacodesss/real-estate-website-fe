import { useState, } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const API = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch(`${API}/api/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    text: message,
                }),
            });

            if (!res.ok) throw new Error();

            setSuccess("Message sent successfully!");
            setMessage("");
            setError("");
        } catch {
            setError("Failed to send message");
            setSuccess("");
        }
    }

    return (
        <div className="bg-[#f3ede8]  py-16">

            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl font-bold text-[#3b2a1f]">
                        Contact Us
                    </h1>

                    <p className="text-[#806248] mt-3 max-w-xl mx-auto text-sm">
                        Have a question about a property or need assistance? We’re here to help you find the right home.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* LEFT - INFO */}
                    <div className="bg-white border border-[#e5ddd5] rounded-2xl p-8 shadow-sm">

                        <h2 className="text-xl font-bold text-[#3b2a1f] mb-4">
                            Get in Touch
                        </h2>

                        <p className="text-[#806248] text-sm mb-6">
                            Whether you're looking to buy, rent, or list a property, our team is ready to assist you.
                        </p>

                        <div className="space-y-4 text-sm text-[#3b2a1f]">

                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-location-dot text-[#c27b57]"></i>
                                <span>Hyderabad, India</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-phone text-[#c27b57]"></i>
                                <span>+91 98765 43210</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-envelope text-[#c27b57]"></i>
                                <span>support@brickly.com</span>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT - FORM */}
                    <div className="bg-white border border-[#e5ddd5] rounded-2xl p-8 shadow-sm">

                        <h2 className="text-xl font-bold text-[#3b2a1f] mb-6">
                            Send a Message
                        </h2>

                        {user?.role === "admin" ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">

                                <div className="bg-[#f3ede8] p-4 rounded-2xl text-[#3b2a1f] mb-5">
                                    <i className="fa-solid fa-message text-3xl"></i>
                                </div>

                                <h3 className="text-xl font-bold text-[#3b2a1f] mb-2">
                                    Manage Customer Inquiries
                                </h3>

                                <p className="text-sm text-[#806248] mb-6 max-w-sm">
                                    View and manage conversations between users and agents from the messages section.
                                </p>

                                <button
                                    onClick={() => navigate("/messages")}
                                    className="bg-[#3b2a1f] hover:bg-[#2a1e16] text-white px-6 py-3 rounded-xl font-semibold transition"
                                >
                                    Go to Messages
                                </button>

                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">

                                <div className="grid md:grid-cols-2 gap-4">

                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full border border-[#e5ddd5] p-3 rounded-xl text-sm outline-none focus:border-[#c27b57]"
                                    />

                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-[#e5ddd5] p-3 rounded-xl text-sm outline-none focus:border-[#c27b57]"
                                    />

                                </div>

                                <textarea
                                    placeholder="Write your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full border border-[#e5ddd5] p-3 rounded-xl h-28 text-sm outline-none focus:border-[#c27b57]"
                                />

                                <button
                                    type="submit"
                                    className="w-full bg-[#3b2a1f] hover:bg-[#2a1e16] text-white py-3 rounded-xl font-semibold transition"
                                >
                                    Send Message
                                </button>

                                {success && (
                                    <p className="text-sm text-green-600 text-center">
                                        {success}
                                    </p>
                                )}

                                {error && (
                                    <p className="text-sm text-red-500 text-center">
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

export default Contact;