import { useState } from "react";
import clsx from "clsx";
import { useEffect, useRef } from "react";

const DropdownButton = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


   // Close dropdown when clicking outside
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-6 py-3 bg-white border border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-700 hover: font-medium rounded-full flex items-center"
      >
        {title}
        <span
          className={clsx(
            "transition-all ml-2 duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
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
