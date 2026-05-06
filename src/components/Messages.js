import { useEffect, useState } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const API = process.env.REACT_APP_API_URL;

  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = user?.id;

  useEffect(() => {
    if (!token) return;

    async function fetchMessages() {
      try {
        const res = await fetch(`${API}/api/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setMessages(data);

      } catch {
        setMessages([]);
        setError("Failed to load messages");
      }
    }

    fetchMessages();
  }, [token, API]);

  async function openChat(message) {
    setSelectedChat(message);

    const otherUserId =
      message.sender?._id === userId
        ? message.receiver?._id
        : message.sender?._id;

    const res = await fetch(
      `${API}/api/messages/conversation/${otherUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setChatMessages(data);
  }

  async function handleReply() {
    if (!reply.trim()) return;

    const receiverId =
      selectedChat.sender?._id === userId
        ? selectedChat.receiver?._id
        : selectedChat.sender?._id;

    try {
      const res = await fetch(`${API}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: reply,
          receiver: receiverId,
          propertyId: selectedChat.propertyId?._id || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setChatMessages((prev) => [...prev, data]);
        setReply("");
        setSuccess("Message sent");
        setError("");
      } else {
        setError(data.message || "Failed to send message");
        setSuccess("");
      }

    } catch {
      setError("Something went wrong");
      setSuccess("");
    }
  }

  useEffect(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [chatMessages]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3ede8]">
        <p className="text-[#3b2a1f] text-lg font-medium">
          Please login to view messages
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3ede8] px-6 py-10 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold text-[#3b2a1f] mb-6">
        Messages
      </h1>

      {/* MESSAGE LIST */}
      {messages.length === 0 ? (
        <div className="text-center py-16">
          <i className="fa-regular fa-message text-4xl text-gray-400 mb-4"></i>
          <p className="text-gray-500">
            No messages yet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => {

            const otherUser =
              m.sender?._id === userId ? m.receiver : m.sender;

            return (
              <div
                key={m._id}
                className="cursor-pointer bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition"
              >

                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-[#3b2a1f]">
                    {otherUser?.name || "User"}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <p className="text-sm text-gray-500 mb-2">
                  📍 {m.propertyId?.title || "General Inquiry"}
                </p>

                <p className="text-gray-800 text-sm">
                  {m.text}
                </p>

                <button
                  onClick={() => openChat(m)}
                  className="mt-3 text-sm text-[#3b2a1f] font-medium hover:underline"
                >
                  Open Chat →
                </button>

              </div>
            );
          })}
        </div>
      )}

      {/* CHAT POPUP */}
      {selectedChat && (
        <div className="fixed bottom-5 right-5 w-96 bg-white shadow-xl rounded-2xl p-4 border">

          {/* HEADER */}
          <div className="flex justify-between mb-3">
            <div>
              <p className="font-bold">
                {
                  selectedChat.sender?._id === userId
                    ? selectedChat.receiver?.name
                    : selectedChat.sender?.name
                }
              </p>
            </div>

            <button onClick={() => setSelectedChat(null)}>✖</button>
          </div>

          {/* CHAT */}
          <div
            id="chat-box"
            className="h-60 overflow-y-auto space-y-2 mb-3"
          >
            {chatMessages.map((msg) => {
              const senderId =
                typeof msg.sender === "object"
                  ? msg.sender._id
                  : msg.sender;

              const isMe = senderId === userId;

              return (
                <div
                  key={msg._id}
                  className={`p-2 rounded text-sm max-w-[75%] ${isMe
                    ? "bg-[#3b2a1f] text-white ml-auto text-right"
                    : "bg-gray-200 text-left"
                    }`}
                >
                  {msg.text}
                </div>
              );
            })}
          </div>

          {/* INPUT */}
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type reply..."
            className="w-full border p-2 rounded mb-2 text-sm"
          />

          {/* SEND */}
          <button
            onClick={handleReply}
            disabled={!reply.trim()}
            className={`w-full py-2 rounded ${reply.trim()
              ? "bg-[#3b2a1f] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Send
          </button>
          {success && (
            <p className="text-sm text-green-600 mt-2 text-center">
              {success}
            </p>
          )}

          {error && (
            <p className="text-sm text-red-500 mt-2 text-center">
              {error}
            </p>
          )}

        </div>
      )}
    </div>
  );
}

export default Messages;