import { useState } from "react";
import FlowerItem from "./PlantItem";
import ToolItem from "./ToolItem";
import ArtItem from "./ArtItem";

const AddItems = () => {
  const [activeTab, setActiveTab] = useState("Plant");
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Item
        </h2>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-full">
            {["Plant", "Tools", "Art"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "Plant" && <FlowerItem  />}
        {activeTab === "Tools" && <ToolItem  />}
        {activeTab === "Art" && <ArtItem />}
      </div>
    </div>
  );
};

export default AddItems;