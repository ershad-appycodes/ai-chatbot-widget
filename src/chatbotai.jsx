import React, { useState, useEffect, useRef } from "react";
import "./chatbot.css";

const Chatbot = ({ config }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(config.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No response" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error contacting server" },
      ]);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <>
      <div className="chatbot-launcher" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            {config.title || "Chatbot"}
            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="chatbot-body" ref={chatRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-msg ${m.role === "user" ? "user" : "bot"}`}
              >
                {m.content}
              </div>
            ))}
          </div>

          <div className="chatbot-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={config.placeholder || "Type a message..."}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
