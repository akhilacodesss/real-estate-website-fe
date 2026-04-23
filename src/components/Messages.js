import { useEffect, useState } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [reply, setReply] = useState("");

  const token = localStorage.getItem("token");
  const API = process.env.REACT_APP_API_URL;

  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = user?.id;

  // Fetch all messages
  useEffect(() => {
    async function fetchMessages() {
      try{
      const res = await fetch(`${API}/api/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setMessages(data);
      } catch {
        console.log("Failed to load messages");
      }
    }

    if (token) fetchMessages();
  }, [token]);

  // Open chat
  async function openChat(message) {
    setSelectedChat(message);

    const res = await fetch(
      `${API}/api/messages/conversation/${message.sender._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setChatMessages(data);
  }

  // Send reply
  async function handleReply() {
    if (!reply.trim()) return;

    const res = await fetch(`${API}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: reply,
        receiver: selectedChat.sender._id,
        propertyId: selectedChat.propertyId._id,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setChatMessages((prev) => [...prev, data]);
      setReply("");
    }
  }

  // Auto scroll
  useEffect(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="min-h-screen bg-[#f3ede8] px-6 py-10 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold text-[#3b2a1f] mb-6">
        Messages
      </h1>

      {/* Message List */}
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m._id}
              className="cursor-pointer bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-[#3b2a1f]">
                  {m.sender?.name || "User"}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(m.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                📍 {m.propertyId?.title}
              </p>

              <p className="text-gray-800 text-sm">
                {m.text}
              </p>

              <button
                onClick={() => openChat(m)}
                className="mt-3 text-sm text-[#3b2a1f] font-medium hover:underline ium hover:underline hover:opacity-80"
              >
                Open Chat →
              </button>

            </div>
          ))}
        </div>
      )}

      {/* Chat Popup */}
      {selectedChat && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-5 right-5 w-96 bg-white shadow-xl rounded-2xl p-4 border"
        >

          {/* Header */}
          <div className="flex justify-between mb-3">
            <p className="font-bold">
              {selectedChat.sender?.name}
            </p>
            <button onClick={() => setSelectedChat(null)}>✖</button>
          </div>

          {/* Chat Messages */}
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

          {/* Input */}
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type reply..."
            className="w-full border p-2 rounded mb-2 text-sm"
          />

          <button
            onClick={handleReply}
            className="w-full bg-[#3b2a1f] text-white py-2 rounded"
          >
            Send
          </button>

        </div>
      )}
    </div>
  );
}

export default Messages;