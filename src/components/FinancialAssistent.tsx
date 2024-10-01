import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ChatHistory from "./ChatHistory";
import ChatArea from "./ChatArea";
import { useChatLogic } from "../hooks/useChatLogic";

export function FinancialAssistant() {
  // State to track if the screen is mobile-sized
  const [isMobile, setIsMobile] = useState(false);

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

  // Effect to handle screen resizing and update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Check if the screen width is less than 768px
    };
    handleResize();
    window.addEventListener("resize", handleResize); // Listen to window resize events
    return () => window.removeEventListener("resize", handleResize); // Clean up event listener
  }, []);

  return (
    <div className="flex h-screen bg-[#171717] text-white">
      <AnimatePresence>
        {/* Render chat history with current chat state */}
        {!isMobile && (
          <ChatHistory
            chatHistory={chatHistory}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            handleNewChat={handleNewChat}
          />
        )}
      </AnimatePresence>

      {/* Render chat area with message input and send functionality */}
      <ChatArea
        activeChat={activeChat}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />

      {isMobile && (
        <div className="mobile-warning">
          <p>Mobile view is active</p>
        </div>
      )}
    </div>
  );
}
