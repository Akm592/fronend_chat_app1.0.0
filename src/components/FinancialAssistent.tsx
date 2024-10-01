import React, { useState } from "react";
import {
  Bell,
  Paperclip,
  Send,
  User,
  BarChart2,
  List,
  Settings,
  Mic,
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function FinanceAIDashboard() {
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState("Financial Advisor");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "user", text: "What's my current balance?" },
    {
      id: 2,
      sender: "ai",
      text: "Your current balance is $5,432.10. Would you like to see a breakdown of your accounts?",
    },
    { id: 3, sender: "user", text: "Yes, please show me the breakdown." },
    {
      id: 4,
      sender: "ai",
      text: "Here's a breakdown of your accounts:\n• Checking: $2,145.67\n• Savings: $3,286.43\n• Investment: $15,789.23\n\nView detailed report",
    },
  ]);

  const chatHistory = [
    {
      id: 1,
      name: "Financial Advisor",
      lastMessage: "How can I help you today?",
      time: "2:30 PM",
    },
    {
      id: 2,
      name: "Investment Bot",
      lastMessage: "Your portfolio has grown by 3.2%",
      time: "Yesterday",
    },
    {
      id: 3,
      name: "Budget Planner",
      lastMessage: "You've reached your savings goal!",
      time: "Monday",
    },
  ];

  const transactions = [
    { id: 1, description: "Grocery Store", amount: -85.43 },
    { id: 2, description: "Salary Deposit", amount: 3500.0 },
    { id: 3, description: "Electric Bill", amount: -124.76 },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([
        ...chatMessages,
        { id: chatMessages.length + 1, sender: "user", text: message },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
      {/* Top Navigation */}
      <nav className="bg-[#002F6C] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">FinanceAI</h1>
        <div className="flex space-x-6">
          <Button
            variant="ghost"
            className="hover:bg-[#003d8f] flex items-center space-x-2"
          >
            <User size={20} />
            <span>Profile</span>
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-[#003d8f] flex items-center space-x-2"
          >
            <BarChart2 size={20} />
            <span>Insights</span>
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-[#003d8f] flex items-center space-x-2"
          >
            <List size={20} />
            <span>Transactions</span>
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-[#003d8f] flex items-center space-x-2"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat History */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">
              Chat History
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chatHistory.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className={`w-full justify-start text-left p-4 hover:bg-gray-100 ${
                  activeChat === chat.name ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveChat(chat.name)}
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{chat.time}</p>
                </div>
              </Button>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeChat}
            </h2>
            <Button
              variant="ghost"
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-full"
            >
              <Bell size={20} />
            </Button>
          </header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-3 max-w-xs ${
                    msg.sender === "user"
                      ? "bg-[#002F6C] text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index !== msg.text.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                  {msg.sender === "ai" &&
                    msg.text.includes("View detailed report") && (
                      <Button
                        variant="link"
                        className="text-[#2C7A7B] p-0 mt-2"
                      >
                        View detailed report
                      </Button>
                    )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-gray-600"
              >
                <Paperclip size={20} />
              </Button>
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002F6C]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-gray-600"
              >
                <Mic size={20} />
              </Button>
              <Button
                className="bg-[#2C7A7B] text-white rounded-full p-2 hover:bg-[#236c6d]"
                onClick={handleSendMessage}
              >
                <Send size={20} />
              </Button>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <Button
                variant="outline"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Check Balance
              </Button>
              <Button
                variant="outline"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                View Transactions
              </Button>
              <Button
                variant="outline"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Get Investment Advice
              </Button>
            </div>
          </div>
        </main>

        {/* Financial Insights */}
        <aside className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Financial Insights
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-gray-700">
                Total Balance
              </h4>
              <p className="text-3xl font-bold text-[#002F6C]">$21,221.33</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">
                Recent Transactions
              </h4>
              <ul className="space-y-2">
                {transactions.map((transaction) => (
                  <li
                    key={transaction.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">
                      {transaction.description}
                    </span>
                    <span
                      className={
                        transaction.amount > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {transaction.amount > 0 ? "+" : "-"}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">
                Financial Tip
              </h4>
              <p className="text-sm text-gray-600">
                Consider setting up automatic transfers to your savings account
                to build your emergency fund.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
