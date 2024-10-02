import React, { useState, useEffect } from "react";
import { Camera, GraduationCap, Eye, TrendingUp } from "lucide-react";

interface SuggestionButtonsProps {
  handleSuggestionClick: (text: string) => void;
}

const SuggestionButtons: React.FC<SuggestionButtonsProps> = ({
  handleSuggestionClick,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Assuming 768px as the breakpoint for mobile
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const suggestions = [
    {
      icon: <Camera className="w-5 h-5 text-[#62C4F9]" />,
      text: "Create an image for my presentation",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-[#9D7FEA]" />,
      text: "Explain nostalgia to a kindergartener",
    },
    {
      icon: <Eye className="w-5 h-5 text-[#F87171]" />,
      text: "Suggest a recipe based on a photo of my fridge",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#FCD34D]" />,
      text: "Experience Seoul like a local",
    },
  ];

  const displayedSuggestions = isMobile ? suggestions.slice(0, 2) : suggestions;

  return (
    <div className="flex flex-wrap gap-2 max-w-2xl w-full justify-center">
      {displayedSuggestions.map((item, index) => (
        <button
          key={index}
          className="border-[1px] border-[#2f2f2f] p-4 rounded-xl text-left hover:bg-[#3A3A3A] transition-colors text-white flex-1 min-w-[45%] md:min-w-[22%]"
          onClick={() => handleSuggestionClick(item.text)}
        >
          <span className="block mb-2">{item.icon}</span>
          <span className="text-sm text-[#787878] block">{item.text}</span>
        </button>
      ))}
    </div>
  );
};

export default SuggestionButtons;
