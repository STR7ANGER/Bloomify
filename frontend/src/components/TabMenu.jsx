import { useState } from "react";
import { motion } from "framer-motion";
import { tabs } from "../constants";

const TabMenu = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id); // Set first tab as default

  return (
    <div className="relative flex flex-wrap justify-center gap-x-4 md:gap-x-20 lg:gap-x-10 mb-6 py-2">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          className="text-lg px-4 py-2 text-red-400 font-semibold relative uppercase"
          onClick={() => setActiveTab(id)}
        >
          <div className="flex items-center gap-2 relative">
            {label}
            <div className="w-7 relative">

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{
                x: activeTab === id ? 0 : "100%",
                opacity: activeTab === id ? 1 : 0,
              }}
              transition={{ type: "tween", duration: 0.3 }}
              className="right-0-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              >
              <Icon size={28} />
            </motion.div>
              </div>
          </div>
          {activeTab === id && (
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
