import React from "react";

const ChatSection = () => {
  const chats = [
    "🔥 Rohit what a six!",
    "Virat king 👑",
    "Amazing bowling!",
    "India will win today 💙"
  ];

  return (
    <div className="bg-[#1e293b] p-5 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        💬 Live Comments
      </h2>

      <div className="space-y-3">
        {chats.map((msg, i) => (
          <p key={i} className="bg-[#334155] p-2 rounded-lg">
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatSection;