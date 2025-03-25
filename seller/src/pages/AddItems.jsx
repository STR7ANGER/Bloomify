import { useState } from "react";
import FlowerItem from "./PlantItem";
import ToolItem from "./ToolItem";
import ArtItem from "./ArtItem";

const AddItems = () => {
  const [activeTab, setActiveTab] = useState("Plant");
  const [sid, setSid] = useState("");

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-4 md:p-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-emerald-900/10 border border-emerald-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-center">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Add New Item
            </h2>
          </div>

          <div className="flex justify-center p-4 bg-gray-50/50">
            <div className="inline-flex bg-white rounded-full p-1 shadow-md">
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

          <div className="p-6 md:p-8">
            {activeTab === "Plant" && <FlowerItem sid={sid} />}
            {activeTab === "Tools" && <ToolItem sid={sid} />}
            {activeTab === "Art" && <ArtItem sid={sid} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;