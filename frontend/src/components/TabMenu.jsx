import { motion } from "framer-motion";

const TabMenu = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="relative flex flex-wrap justify-center gap-x-4 md:gap-x-20 lg:gap-x-10 mb-6 py-2">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`text-lg px-4 py-2 font-semibold relative uppercase 
            ${activeTab === id ? "text-red-500" : "text-red-400"}`}
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
              >
                <Icon size={28} />
              </motion.div>
            </div>
          </div>
          {activeTab === id && (
            <div
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
