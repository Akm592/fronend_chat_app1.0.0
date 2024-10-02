import React, { useState, useEffect } from "react";
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
  chatHistory: Chat[];
  activeChat: Chat;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat>>;
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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsOpen(window.innerWidth > 768); // 768px is a common breakpoint for mobile devices
    };

    // Set initial state
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Toggles sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-full overflow-visible">
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
              {/* New ChatGPT section */}
              <div className="mb-4 px-4">
                <h2 className="text-lg font-semibold mb-2 text-white">
                  ChatGPT
                </h2>
                <div className="flex items-center bg-[#2A2A2A] rounded-full p-1 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <span className="text-white">Presentation and Slid...</span>
                </div>
                <div className="flex items-center bg-[#2A2A2A] rounded-full p-1 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                    <span className="text-xs font-bold">TS</span>
                  </div>
                  <span className="text-white">Typescript</span>
                </div>
                <div className="flex items-center bg-[#2A2A2A] rounded-full p-1">
                  <div className="w-6 h-6 rounded-full bg-[#3A3A3A] flex items-center justify-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <span className="text-white">Explore GPTs</span>
                </div>
              </div>
              {/* Scrollable area showing chat history */}
              <div className="text-white px-4 mb-2">Today</div>

              <ScrollArea className="flex-grow px-4 ">
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
