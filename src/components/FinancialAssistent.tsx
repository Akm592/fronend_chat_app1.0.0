import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import TopNavigation from "./TopNavigation";
import ChatHistory from "./ChatHistory";
import ChatArea from "./ChatArea";
import FinancialInsights from "./FinancialInsights";
import { useChatLogic } from "../hooks/useChatLogic";

export function FinancialAssistant() {
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {
    message,
    setMessage,
    activeChat,
    setActiveChat,
    chatHistory,
    handleSendMessage,
    handleNewChat,
  } = useChatLogic();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              isMobile={isMobile}
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
          isMobile={isMobile}
        />
        <AnimatePresence>
          {showRightSidebar && (
            <FinancialInsights
              setShowRightSidebar={setShowRightSidebar}
              isMobile={isMobile}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
