import { motion } from "framer-motion";
import { X, PlusCircle, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface Chat {
  id: number;
  name: string;
  messages: { id: number; text: string; sender: string }[];
}

interface ChatHistoryProps {
  chatHistory: Chat[];
  activeChat: Chat;
  setActiveChat: (chat: Chat) => void;
  handleNewChat: () => void;
  setShowLeftSidebar: (show: boolean) => void;
  isMobile: boolean;
}

export default function ChatHistory({
  chatHistory,
  activeChat,
  setActiveChat,
  handleNewChat,
  setShowLeftSidebar,
  isMobile,
}: ChatHistoryProps) {
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.aside
      initial="closed"
      animate="open"
      exit="closed"
      variants={sidebarVariants}
      className={`${
        isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"
      } w-80 bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 flex flex-col h-full rounded-lg shadow-lg`}
    >
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg">
        <h2 className="text-2xl font-semibold">Conversations</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowLeftSidebar(false)}
          className="hover:bg-gray-100 rounded-full p-2 transition-colors"
        >
          <X size={20} />
        </Button>
      </div>
      <Button
        variant="default"
        className="mx-4 mt-6 mb-4 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        onClick={handleNewChat}
      >
        <PlusCircle size={20} className="mr-2" />
        New Conversation
      </Button>
      <ScrollArea className="flex-1 px-2">
        {chatHistory.map((chat) => (
          <ChatHistoryItem
            key={chat.id}
            chat={chat}
            isActive={activeChat.id === chat.id}
            onClick={() => {
              setActiveChat(chat);
              if (isMobile) setShowLeftSidebar(false);
            }}
          />
        ))}
      </ScrollArea>
    </motion.aside>
  );
}

interface ChatHistoryItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

const ChatHistoryItem = ({ chat, isActive, onClick }: ChatHistoryItemProps) => (
  <Button
    variant={isActive ? "secondary" : "ghost"}
    className={`w-full justify-start py-4 px-4 mb-2 rounded-xl transition-all duration-200 ${
      isActive ? "bg-blue-100 hover:bg-blue-200 shadow-md" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center w-full">
      <MessageCircle
        size={24}
        className={`mr-4 ${isActive ? "text-blue-600" : "text-gray-500"}`}
      />
      <div className="text-left flex-grow">
        <h3
          className={`font-semibold text-lg ${
            isActive ? "text-blue-700" : "text-gray-700"
          }`}
        >
          {chat.name}
        </h3>
        {/* <p className="text-sm text-gray-500 truncate mt-1">
          {chat.messages[chat.messages.length - 1]?.text ||
            "Start a new conversation"}
        </p> */}
      </div>
    </div>
  </Button>
);
