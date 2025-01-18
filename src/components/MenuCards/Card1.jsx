import React from "react";
import { Link } from "react-router-dom";
import {
  Book,
  BookCheck,
  Calculator,
  Notebook,
  Paperclip,
} from "lucide-react";

const Card1 = () => {
  const cardMenu = [
    {
      title: "Notes",
      icon: Notebook,
      path: "/notes",
    },
    {
      title: "Grade Calculator",
      icon: Calculator,
      path: "/grade-calculator",
    },
    {
      title: "Model Questions",
      icon: Book,
      path: "/model-question-paper",
    },
    {
      title: "PYQ",
      icon: Paperclip,
      path: "/pyq"
    },
    {
      title: "Attendance",
      icon: BookCheck,
      path: "/attendance-calculator",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cardMenu.map((item, index) => (
          <Link 
            key={index}
            to={item.path}
            className="block no-underline"
          >
            <div className="h-full">
              <div className="transform-gpu transition-all duration-300 hover:scale-95">
                <div className="bg-zinc-800 rounded-lg border-2 border-white hover:bg-violet-700 transition-colors duration-300">
                  <div className="flex items-center justify-center gap-3 p-4 h-[90px]">
                    <item.icon className="text-white w-8 h-8" />
                    <h6 className="text-white text-lg m-0 no-underline">
                      {item.title}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Card1;