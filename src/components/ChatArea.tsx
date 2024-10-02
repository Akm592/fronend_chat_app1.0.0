import React, { useState, useRef } from "react";
import {
  Send,
  Settings,
  LogOut,
  ChevronDown,
  Paperclip,
  Share,
  Bot,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import SuggestionButtons from "./SuggestionButtons";

// Props for ChatArea component
interface ChatAreaProps {
  activeChat: {
    id: number;
    name: string;
    messages: { id: number; text: string; sender: string }[];
  };
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}

// Message interface
interface Message {
  id: number;
  text: string;
  sender: string;
}

// Component to render individual chat messages
const ChatMessage = ({ message }: { message: Message }) => (
  <div
    className={`flex ${
      message.sender === "user" ? "justify-end p-10" : "justify-start p-10"
    } mb-4`}
  >
    <div
      className={`rounded-xl p-3 max-w-[80%] ${
        message.sender === "user" ? "bg-[#2A2A2A] ml-2 " : "bg-[#3A3A3A] mr-2"
      }`}
    >
      <p className="text-white">{message.text}</p>
    </div>
  </div>
);

// Main ChatArea component
export default function ChatArea({
  activeChat,
  message,
  setMessage,
  handleSendMessage,
}: ChatAreaProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState("ChatGPT");
  const [tempChatEnabled, setTempChatEnabled] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isNewChat = activeChat.messages.length === 0;

  const handleSendMessageWithLoading = () => {
    if (message.trim() !== "" || selectedFile) {
      setIsLoading(true);
      setTimeout(() => {
        handleSendMessage();
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    handleSendMessageWithLoading();
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#212121]">
      {/* Header with dropdown menus */}
      <header className="bg-[#212121] p-4 flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xl font-semibold text-gray-400 flex ml-10">
              {selectedModel}
              <ChevronDown className="w-6 h-6 ml-1" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-[#2A2A2A] text-white border-[#3A3A3A] rounded-xl">
            <DropdownMenuItem onClick={() => setSelectedModel("ChatGPT Plus")}>
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="font-semibold">ChatGPT Plus</div>
                  <div className="text-sm text-gray-400">
                    Our smartest model & more
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Upgrade
                </Button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedModel("ChatGPT")}>
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="font-semibold">ChatGPT</div>
                  <div className="text-sm text-gray-400">
                    Great for everyday tasks
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center justify-between w-full">
                <div className="font-semibold">Temporary chat</div>
                <Switch
                  checked={tempChatEnabled}
                  onCheckedChange={setTempChatEnabled}
                />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="mr-2 rounded-full border-2 border-gray-700 px-4 py-2 transition duration-300 hover:bg-[#3A3A3A]"
                >
                  <Share className="w-5 h-5 text-gray-400 mr-2" /> Share
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-8 h-8 rounded-full bg-[#3A3A3A] flex items-center justify-center text-white cursor-pointer">
                A
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#2A2A2A] text-white border-[#3A3A3A] rounded-xl">
              <DropdownMenuLabel>My GPTs</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Customize ChatGPT</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Upgrade Plan</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Chat scroll area */}
      {/* Chat scroll area */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        {isNewChat ? (
          <main className="flex-1 p-6 flex flex-col items-center justify-center mt-32">
            <Bot className="w-16 h-16 text-gray-400 mb-10" />
            <SuggestionButtons handleSuggestionClick={handleSuggestionClick} />
          </main>
        ) : (
          activeChat.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}
      </ScrollArea>

      {/* Footer with input and send button */}
      <footer className="bg-[#212121] p-4">
        <div className="max-w-3xl mx-auto relative">
          <input
            type="text"
            placeholder="Message ChatGPT"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && handleSendMessageWithLoading()
            }
            className="w-full bg-[#2A2A2A] text-white rounded-full py-3 px-4 pr-20 pl-10 focus:outline-none"
          />
          <label htmlFor="file-upload" className="sr-only">
            Upload File
          </label>
          <input
            type="file"
            id="file-upload"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute p-1 left-3 top-1/2 transform -translate-y-1/2"
                  onClick={handleFileUploadClick}
                >
                  <Paperclip className="w-5 h-5 text-gray-400 mr-2" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attach file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <button
            onClick={handleSendMessageWithLoading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
        <p className="text-center text-sm mt-2 text-gray-400">
          Assistant can make mistakes. Check important info.
        </p>
      </footer>
    </div>
  );
}
