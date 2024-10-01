// hooks/useChatLogic.js
import { useState, useEffect } from "react";

const dummyChats = [
  {
    id: 1,
    name: "Financial Advisor",
    messages: [
      {
        id: 1,
        text: "Hello! How can I assist you with your finances today?",
        sender: "bot",
      },
      { id: 2, text: "I'd like to know my current balance.", sender: "user" },
      {
        id: 3,
        text: "Your current balance is $5,432.10. Would you like to see a breakdown of your accounts?",
        sender: "bot",
      },
    ],
  },
  {
    id: 2,
    name: "Investment Bot",
    messages: [
      {
        id: 1,
        text: "Your portfolio has grown by 3.2% this month. Great job!",
        sender: "bot",
      },
      {
        id: 2,
        text: "That's great news! Any recommendations for further growth?",
        sender: "user",
      },
    ],
  },
  {
    id: 3,
    name: "Budget Planner",
    messages: [
      {
        id: 1,
        text: "Congratulations! You've reached your savings goal for this month.",
        sender: "bot",
      },
      {
        id: 2,
        text: "Thank you! What should be my next financial goal?",
        sender: "user",
      },
    ],
  },
];


export function useChatLogic() {
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(dummyChats[0]);
  const [chatHistory, setChatHistory] = useState(dummyChats);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { id: Date.now(), text: message, sender: "user" };
      const updatedChat = {
        ...activeChat,
        messages: [...activeChat.messages, newMessage],
      };
      setActiveChat(updatedChat);
      setChatHistory((prevHistory) =>
        prevHistory.map((chat) =>
          chat.id === activeChat.id ? updatedChat : chat
        )
      );
      setMessage("");
    }
  };

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: `New Chat ${chatHistory.length + 1}`,
      messages: [],
    };
    setChatHistory((prevHistory) => [newChat, ...prevHistory]);
    setActiveChat(newChat);
  };

  useEffect(() => {
    // Simulate bot response
    if (
      activeChat.messages.length > 0 &&
      activeChat.messages[activeChat.messages.length - 1].sender === "user"
    ) {
      setTimeout(() => {
        const botResponse = {
          id: Date.now(),
          text: "I'm processing your request. How else can I assist you?",
          sender: "bot",
        };
        const updatedChat = {
          ...activeChat,
          messages: [...activeChat.messages, botResponse],
        };
        setActiveChat(updatedChat);
        setChatHistory((prevHistory) =>
          prevHistory.map((chat) =>
            chat.id === activeChat.id ? updatedChat : chat
          )
        );
      }, 1000);
    }
  }, [activeChat]);

  return {
    message,
    setMessage,
    activeChat,
    setActiveChat,
    chatHistory,
    setChatHistory,
    handleSendMessage,
    handleNewChat,
  };
}
