import { useState } from "react";
import FlowerItem from "./PlantItem";
import ToolItem from "./ToolItem";
import ArtItem from "./ArtItem";

const AddItems = () => {
  const [activeTab, setActiveTab] = useState("Plant");

  // Generate unique SID on component mount or tab change
  const [sid, setSid] = useState("");

  return (
    <div className="relative w-full overflow-x-hidden px-4">
      {/* Background decorative elements - positioned with percentage values */}
      <div className="fixed right-0 top-1/4 w-1/4 h-80 max-w-xs bg-gradient-to-br from-emerald-600/10 to-teal-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed left-0 bottom-1/4 w-1/4 h-80 max-w-xs bg-gradient-to-tl from-teal-600/10 to-emerald-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed left-1/3 top-0 w-64 h-64 bg-gradient-to-b from-green-500/10 to-teal-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-4xl mx-auto backdrop-blur-sm rounded-xl border border-emerald-900/20 shadow-xl shadow-emerald-900/10 p-4 md:p-8 relative">
        {/* Form background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-slate-900/90 to-emerald-900/90 rounded-xl -z-10"></div>

        {/* Form title */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400">
            Add New Item
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 mx-auto mt-2 md:mt-3 rounded-full"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 md:mb-8 overflow-x-auto">
          <div className="inline-flex bg-gray-800/50 p-1 rounded-lg shadow-inner shadow-emerald-900/10">
            {["Plant", "Tools", "Art"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-2 rounded-md text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-emerald-700 via-teal-700 to-green-700 text-white shadow-lg shadow-emerald-900/20"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content container with overflow control */}
        <div className="w-full overflow-x-hidden">
          {activeTab === "Plant" && <FlowerItem sid={sid} />}
          {activeTab === "Tools" && <ToolItem sid={sid} />}
          {activeTab === "Art" && <ArtItem sid={sid} />}
        </div>
      </div>
    </div>
  );
};

export default AddItems;