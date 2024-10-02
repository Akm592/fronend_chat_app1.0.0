
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

  return (
    <div className="flex h-screen bg-[#171717] text-white">
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
      <ChatArea
        activeChat={activeChat}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />

     
    </div>
  );
}
