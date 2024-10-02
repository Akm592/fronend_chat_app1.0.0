import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ChatHistory from "./ChatHistory";
import ChatArea from "./ChatArea";
import { useChatLogic } from "../hooks/useChatLogic";

export function FinancialAssistant() {
  // Destructure chat-related state and functions from custom hook
  const {
    message,
    setMessage,
    activeChat,
    setActiveChat,
    chatHistory,
    handleSendMessage,
    handleNewChat,
  } = useChatLogic();

  // Effect to create a new chat when the component mounts
  useEffect(() => {
    handleNewChat();
  }, []);

  return (
    <div className="flex h-screen bg-[#171717] text-white overflow-hidden">
      <AnimatePresence>
        {/* Render chat history with current chat state */}
        <ChatHistory
          chatHistory={chatHistory}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          handleNewChat={handleNewChat}
        />
      </AnimatePresence>

      {/* Render chat area with message input and send functionality */}
      <div className="flex-1 h-screen overflow-hidden">
        <ChatArea
          activeChat={activeChat}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
