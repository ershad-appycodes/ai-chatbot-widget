import React from "react";
import { createRoot } from "react-dom/client";
import Chatbot from "./chatbotai";


(function initChatbot() {
  const el = document.createElement("div");
  document.body.appendChild(el);

  const currentScript = document.currentScript;
  const config = {
    apiEndpoint: currentScript?.dataset.api || "https://example.com/api/chat",
    title: currentScript?.dataset.title || "AI Chatbot",
    placeholder: currentScript?.dataset.placeholder || "Type your message...",
  };

  createRoot(el).render(<Chatbot config={config} />);
})();
