import { useState } from "react";
import { motion } from "framer-motion";

const TabMenu = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id); // Set first tab as default

  return (
    <div className="relative flex flex-wrap justify-center gap-x-4 md:gap-x-20 lg:gap-x-10 mb-6 py-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className="text-lg px-4 py-2 text-red-400 font-semibold relative uppercase"
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 h-[1px] bg-red-400 bottom-[-5px]"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
