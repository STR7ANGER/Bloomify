import { useState } from "react";

const DropdownButton = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 bg-white border border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-700 hover: font-medium rounded-full"
      >
        {title}
        <span className={`transition-transform ml-2 duration-300 ${isOpen ? "rotate-180" : "group-hover:rotate-180"}`}>
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <ul className="py-2">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
