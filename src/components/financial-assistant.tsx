import  { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TopNavigation from "./TopNavigation";
import ChatHistory from "./ChatHistory";
import ChatArea from "./ChatArea";
import FinancialInsights from "./FinancialInsights";
import { useChatLogic } from "../hooks/useChatLogic";

export function FinancialAssistant() {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const {
    message,
    setMessage,
    activeChat,
    setActiveChat,
    chatHistory,
    // setChatHistory,
    handleSendMessage,
    handleNewChat,
  } = useChatLogic();

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5] text-[#4A4A4A] w-screen">
      <TopNavigation />
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence>
          {showLeftSidebar && (
            <ChatHistory
              chatHistory={chatHistory}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              handleNewChat={handleNewChat}
              setShowLeftSidebar={setShowLeftSidebar}
            />
          )}
        </AnimatePresence>
        <ChatArea
          activeChat={activeChat}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          showLeftSidebar={showLeftSidebar}
          setShowLeftSidebar={setShowLeftSidebar}
          showRightSidebar={showRightSidebar}
          setShowRightSidebar={setShowRightSidebar}
        />
        <AnimatePresence>
          {showRightSidebar && (
            <FinancialInsights setShowRightSidebar={setShowRightSidebar} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
