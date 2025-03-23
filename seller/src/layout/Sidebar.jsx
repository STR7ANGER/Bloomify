import { Link } from "react-router-dom";

const Sidebar = ({ activePath }) => {
  // Navigation items matching the reference image
  const navItems = [
    { path: "/add-items", label: "Add Items" },
    { path: "/inventory", label: "Inventory" },
    { path: "/orders", label: "Orders" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/advertisement", label: "Advertisement" },
  ];

  return (
    <div className="h-full w-48">
      <nav className="py-2">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block w-full text-center py-3 px-2 rounded-md transition-colors 
                shadow-md 
                ${
                  activePath.includes(item.path)
                    ? "bg-white text-[#1E5128] border border-[#1E5128] drop-shadow-[0_0_5px_#1E5128]"
                    : "bg-[#1E5128] text-white hover:bg-[#1E5128]/90"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;