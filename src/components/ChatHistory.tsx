import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ArrowBigUpDash,
  MoreHorizontal,
  Share2,
  Pencil,
  SquarePen,
  Archive,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Chat interface defining the structure of chat data
interface Chat {
  id: number;
  name: string;
  messages: { id: number; text: string; sender: string }[];
}

interface ChatHistoryProps {
  chatHistory: {
    id: number;
    name: string;
    messages: { id: number; text: string; sender: string }[];
  }[];
  activeChat: {
    id: number;
    name: string;
    messages: { id: number; text: string; sender: string }[];
  };
  setActiveChat: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
      messages: { id: number; text: string; sender: string }[];
    }>
  >;
  handleNewChat: () => void;
}

// Main ChatHistory component
export default function ChatHistory({
  chatHistory,
  activeChat,
  setActiveChat,
  handleNewChat,
}: ChatHistoryProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Toggles sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-full">
      <div className="relative">
        {/* Button to toggle the chat sidebar */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-20 text-white hover:bg-[#2A2A2A]"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
        </Button>
        <AnimatePresence>
          {isOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "256px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#171717] flex flex-col h-full overflow-hidden"
            >
              {/* Button to create a new chat */}
              <div className="p-4 flex items-center justify-between">
                <Button
                  variant="default"
                  onClick={handleNewChat}
                  className="ml-44 text-white hover:bg-[#2A2A2A]"
                >
                  <SquarePen size={20} />
                </Button>
              </div>
              {/* Scrollable area showing chat history */}
              <ScrollArea className="flex-grow px-4">
                <div className="space-y-2">
                  {chatHistory.map((chat) => (
                    <ChatHistoryItem
                      key={chat.id}
                      chat={chat}
                      isActive={activeChat.id === chat.id}
                      onClick={() => setActiveChat(chat)}
                    />
                  ))}
                </div>
              </ScrollArea>
              {/* Upgrade plan section at the bottom */}
              <div className="mt-auto p-4">
                <a
                  href="#"
                  className="flex items-center p-2 rounded text-white hover:bg-[#2A2A2A]"
                >
                  <ArrowBigUpDash size={20} className="mr-2" />
                  Upgrade plan
                </a>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Component to render each chat item in the chat history
interface ChatHistoryItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

// Chat item component with options to share, rename, archive, or delete
const ChatHistoryItem = ({ chat, isActive, onClick }: ChatHistoryItemProps) => (
  <div className="flex items-center justify-between rounded-xl">
    {/* Button to select a chat from history */}
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={`flex-grow justify-start py-2 px-2 round text-white ${
        isActive ? "bg-[#3A3A3A]" : "hover:bg-[#2A2A2A]"
      }`}
      onClick={onClick}
    >
      <MessageCircle size={20} className="mr-2" />
      <span className="truncate">{chat.name}</span>
    </Button>
    {/* Dropdown menu for each chat item with additional actions */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-0 text-white hover:bg-[#2A2A2A]">
          <MoreHorizontal size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-[#2A2A2A] text-white border-[#3A3A3A] rounded-xl"
      >
        {/* Options like Share, Rename, Archive, and Delete */}
        <DropdownMenuItem className="hover:bg-[#3A3A3A]">
          <Share2 className="mr-2 h-4 w-4" />
          <span>Share</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-[#3A3A3A]">
          <Pencil className="mr-2 h-4 w-4" />
          <span>Rename</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-[#3A3A3A]">
          <Archive className="mr-2 h-4 w-4" />
          <span>Archive</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:bg-[#3A3A3A] hover:text-red-500">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
