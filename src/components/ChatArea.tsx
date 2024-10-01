import { useState, useEffect, useRef } from "react";
import {
  Bell,
  List,
  Paperclip,
  Mic,
  Send,
  ChevronDown,
  History,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";

interface ChatAreaProps {
  activeChat: {
    id: number;
    name: string;
    messages: { id: number; text: string; sender: string }[];
  };
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  showLeftSidebar: boolean;
  setShowLeftSidebar: (show: boolean) => void;
  showRightSidebar: boolean;
  setShowRightSidebar: (show: boolean) => void;
  isMobile: boolean;
}

export default function ChatArea({
  activeChat,
  message,
  setMessage,
  handleSendMessage,
  showLeftSidebar,
  setShowLeftSidebar,
  showRightSidebar,
  setShowRightSidebar,
  isMobile,
}: ChatAreaProps) {
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessageWithLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      handleSendMessage();
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [activeChat.messages]);

  return (
    <main className="flex-1 flex flex-col bg-gray-50">
      <ChatHeader
        activeChat={activeChat}
        showLeftSidebar={showLeftSidebar}
        setShowLeftSidebar={setShowLeftSidebar}
        showRightSidebar={showRightSidebar}
        setShowRightSidebar={setShowRightSidebar}
        isMobile={isMobile}
      />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <ChatMessages
            messages={activeChat.messages}
            scrollAreaRef={scrollAreaRef}
          />
          <ChatInput
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessageWithLoading}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}
interface ChatHeaderProps {
  activeChat: {
    name: string;
  };
  showLeftSidebar: boolean;
  setShowLeftSidebar: (show: boolean) => void;
  showRightSidebar: boolean;
  setShowRightSidebar: (show: boolean) => void;
  isMobile: boolean;
}

const ChatHeader = ({
  activeChat,
  showLeftSidebar,
  setShowLeftSidebar,
  showRightSidebar,
  setShowRightSidebar,
  isMobile,
}: ChatHeaderProps) => (
  <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowLeftSidebar(!showLeftSidebar)}
        className="text-gray-600 hover:text-gray-900"
      >
        {isMobile ? <List size={20} /> : <History size={20} />}
      </Button>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {activeChat.name}
        </h2>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-gray-900"
        onClick={() => setShowRightSidebar(!showRightSidebar)}
      >
        <Bell size={20} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-gray-900"
      >
        <ChevronDown size={20} />
      </Button>
    </div>
  </header>
);
interface Message {
  id: number;
  text: string;
  sender: string;
}

const ChatMessages = ({
  messages,
  scrollAreaRef,
}: {
  messages: Message[];
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}) => (
  <ScrollArea
    className="flex-1 p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6"
    ref={scrollAreaRef}
  >
    <div className="space-y-4 sm:space-y-6">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  </ScrollArea>
);

const ChatMessage = ({ message }: { message: Message }) => (
  <div
    className={`flex ${
      message.sender === "user" ? "justify-end" : "justify-start"
    }`}
  >
    <div
      className={`rounded-2xl p-3 sm:p-4 mb-2 max-w-[80%] sm:max-w-md ${
        message.sender === "user"
          ? "bg-[#002F6C] text-white"
          : "bg-white shadow-md"
      }`}
    >
      <p className="text-sm sm:text-base">{message.text}</p>
    </div>
  </div>
);

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
}

const ChatInput = ({
  message,
  setMessage,
  handleSendMessage,
  isLoading,
}: ChatInputProps) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-2 sm:p-4">
      <div className="flex flex-col space-y-2">
        {file && (
          <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
            <span className="text-sm truncate">{file.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={16} />
            </Button>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-[#002F6C]"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={20} />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            title="Attach a file"
          />
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#002F6C]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && !isLoading && handleSendMessage()
            }
          />
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-[#002F6C] hidden sm:inline-flex"
          >
            <Mic size={20} />
          </Button>
          <Button
            onClick={handleSendMessage}
            className="bg-[#2C7A7B] text-white rounded-full p-2 sm:p-3 hover:bg-[#236c6d] transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
            ) : (
              <Send size={16} className="sm:w-5 sm:h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
