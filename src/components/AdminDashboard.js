import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [leads, setLeads] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const API = process.env.REACT_APP_API_URL;

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        }
    }, [navigate, user]);

    useEffect(() => {
        async function fetchData() {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const [uRes, pRes, lRes] = await Promise.all([
                    fetch(`${API}/api/admin/users`, { headers }),
                    fetch(`${API}/api/admin/properties`, { headers }),
                    fetch(`${API}/api/admin/leads`, { headers }),
                ]);

                const usersData = await uRes.json();
                const propertiesData = await pRes.json();
                const leadsData = await lRes.json();

                setUsers(usersData);
                setProperties(propertiesData);
                setLeads(leadsData);
            } catch {
                setUsers([]);
                setProperties([]);
                setLeads([]);
                setError("Failed to load dashboard data");
            }
        }

        fetchData();
    }, [API, token]);

    return (
        <div className="min-h-screen bg-[#f3ede8] flex">

            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-[#e5ddd5] p-6 hidden md:flex flex-col justify-between sticky top-0 h-screen">

                <div>
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-[#3b2a1f]">
                            Brickly
                        </h1>

                        <p className="text-sm text-[#806248] mt-1">
                            Admin Dashboard
                        </p>
                    </div>

                    <nav className="space-y-3">

                        <button
                            onClick={() =>
                                document.getElementById("overview-section")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="w-full flex items-center gap-3 bg-[#f3ede8] text-[#3b2a1f] px-4 py-3 rounded-xl font-medium"
                        >
                            <i className="fa-solid fa-chart-line"></i>
                            Dashboard
                        </button>

                        <button
                            onClick={() =>
                                document.getElementById("users-section")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="w-full flex items-center gap-3 text-[#6b5c4f] px-4 py-3 rounded-xl hover:bg-[#f7f2ed] transition"
                        >
                            <i className="fa-solid fa-users"></i>
                            Users
                        </button>

                        <button
                            onClick={() =>
                                document.getElementById("properties-section")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="w-full flex items-center gap-3 text-[#6b5c4f] px-4 py-3 rounded-xl hover:bg-[#f7f2ed] transition"
                        >
                            <i className="fa-solid fa-building"></i>
                            Properties
                        </button>

                        <button
                            onClick={() =>
                                document.getElementById("leads-section")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="w-full flex items-center gap-3 text-[#6b5c4f] px-4 py-3 rounded-xl hover:bg-[#f7f2ed] transition">
                            <i className="fa-solid fa-message"></i>
                            Leads
                        </button>

                    </nav>
                </div>

                <div className="text-sm text-[#806248] border-t border-[#e5ddd5] pt-4">
                    Logged in as Admin
                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 md:p-8 overflow-auto">

                {/* TOP BAR */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>
                        <h2 className="text-3xl font-bold text-[#3b2a1f]">
                            Overview
                        </h2>

                        <p className="text-[#806248] mt-1 text-sm">
                            Monitor users, properties, and customer leads.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-[#3b2a1f] text-white px-5 py-3 rounded-xl hover:opacity-90 transition w-fit"
                    >
                        Back to Website
                    </button>
                </div>

                {error && (
                    <p className="text-sm text-red-500 mb-6">
                        {error}
                    </p>
                )}

                {/* STATS */}
                <div id="overview-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white rounded-3xl shadow-sm border border-[#e5ddd5] p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-[#f3ede8] p-3 rounded-2xl text-[#3b2a1f]">
                                <i className="fa-solid fa-users text-lg"></i>
                            </div>

                            <span className="text-xs text-[#806248] font-medium">
                                Total Users
                            </span>
                        </div>

                        <h3 className="text-4xl font-bold text-[#3b2a1f]">
                            {users.length}
                        </h3>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-[#e5ddd5] p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-[#f3ede8] p-3 rounded-2xl text-[#3b2a1f]">
                                <i className="fa-solid fa-building text-lg"></i>
                            </div>

                            <span className="text-xs text-[#806248] font-medium">
                                Total Properties
                            </span>
                        </div>

                        <h3 className="text-4xl font-bold text-[#3b2a1f]">
                            {properties.length}
                        </h3>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-[#e5ddd5] p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-[#f3ede8] p-3 rounded-2xl text-[#3b2a1f]">
                                <i className="fa-solid fa-envelope text-lg"></i>
                            </div>

                            <span className="text-xs text-[#806248] font-medium">
                                Total Leads
                            </span>
                        </div>

                        <h3 className="text-4xl font-bold text-[#3b2a1f]">
                            {leads.length}
                        </h3>
                    </div>

                </div>

                {/* USERS */}
                <section id="users-section" className="bg-white rounded-3xl shadow-sm border border-[#e5ddd5] p-6 mb-8 overflow-auto">

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-[#3b2a1f]">
                                Users
                            </h3>

                            <p className="text-sm text-[#806248] mt-1">
                                Registered users on the platform
                            </p>
                        </div>
                    </div>

                    {users.length === 0 ? (
                        <div className="text-center py-16">
                            <i className="fa-regular fa-user text-4xl text-gray-400 mb-4"></i>
                            <p className="text-gray-500">
                                No users found
                            </p>
                        </div>
                    ) : (
                        <table className="w-full min-w-[600px] text-left">
                            <thead>
                                <tr className="border-b border-[#e5ddd5] text-[#806248] text-sm">
                                    <th className="pb-4 font-medium">Name</th>
                                    <th className="pb-4 font-medium">Email</th>
                                    <th className="pb-4 font-medium">Role</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((u) => (
                                    <tr
                                        key={u._id}
                                        className="border-b border-[#f2ece6] hover:bg-[#faf7f4] transition"
                                    >
                                        <td className="py-4 font-medium text-[#3b2a1f]">
                                            {u.name}
                                        </td>

                                        <td className="py-4 text-[#6b5c4f]">
                                            {u.email}
                                        </td>

                                        <td className="py-4">
                                            <span className="bg-[#f3ede8] text-[#3b2a1f] text-xs px-3 py-1 rounded-full font-medium capitalize">
                                                {u.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </section>

                {/* PROPERTIES */}
                <section id="properties-section" className="bg-white rounded-3xl shadow-sm border border-[#e5ddd5] p-6 mb-8 overflow-auto">

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-[#3b2a1f]">
                            Properties
                        </h3>

                        <p className="text-sm text-[#806248] mt-1">
                            All listed properties on the platform
                        </p>
                    </div>

                    {properties.length === 0 ? (
                        <div className="text-center py-16">
                            <i className="fa-regular fa-building text-4xl text-gray-400 mb-4"></i>
                            <p className="text-gray-500">
                                No properties found
                            </p>
                        </div>
                    ) : (
                        <table className="w-full min-w-[700px] text-left">
                            <thead>
                                <tr className="border-b border-[#e5ddd5] text-[#806248] text-sm">
                                    <th className="pb-4 font-medium">Title</th>
                                    <th className="pb-4 font-medium">Location</th>
                                    <th className="pb-4 font-medium">Agent</th>
                                </tr>
                            </thead>

                            <tbody>
                                {properties.map((p) => (
                                    <tr
                                        key={p._id}
                                        className="border-b border-[#f2ece6] hover:bg-[#faf7f4] transition"
                                    >
                                        <td className="py-4 font-medium text-[#3b2a1f]">
                                            {p.title}
                                        </td>

                                        <td className="py-4 text-[#6b5c4f]">
                                            {p.location}
                                        </td>

                                        <td className="py-4 text-[#6b5c4f]">
                                            {p.agent?.name || "Agent"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </section>

                {/* LEADS */}
               <section id="leads-section" className="bg-white rounded-3xl shadow-sm border border-[#e5ddd5] p-6 overflow-auto">

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-[#3b2a1f]">
                            Leads
                        </h3>

                        <p className="text-sm text-[#806248] mt-1">
                            Messages and customer inquiries
                        </p>
                    </div>

                    {leads.length === 0 ? (
                        <div className="text-center py-16">
                            <i className="fa-regular fa-envelope text-4xl text-gray-400 mb-4"></i>
                            <p className="text-gray-500">
                                No leads available
                            </p>
                        </div>
                    ) : (
                        <table className="w-full min-w-[900px] text-left">
                            <thead>
                                <tr className="border-b border-[#e5ddd5] text-[#806248] text-sm">
                                    <th className="pb-4 font-medium">User</th>
                                    <th className="pb-4 font-medium">Property</th>
                                    <th className="pb-4 font-medium">Message</th>
                                    <th className="pb-4 font-medium">Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {leads.map((l) => (
                                    <tr
                                        key={l._id}
                                        className="border-b border-[#f2ece6] hover:bg-[#faf7f4] transition"
                                    >
                                        <td className="py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-[#3b2a1f]">
                                                    {l.sender?.name || "Guest"}
                                                </span>

                                                <span className="text-xs text-[#806248] mt-1">
                                                    {l.sender?.email || ""}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 text-[#6b5c4f]">
                                            {l.propertyId?.title || "General Inquiry"}
                                        </td>

                                        <td className="py-4 text-[#6b5c4f] max-w-sm truncate">
                                            {l.text}
                                        </td>

                                        <td className="py-4 text-xs text-gray-500 whitespace-nowrap">
                                            {new Date(l.createdAt).toLocaleString("en-IN")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </section>

            </main>
        </div>
    );
}

export default AdminDashboard;
