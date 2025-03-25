import { Link } from "react-router-dom";

const Sidebar = ({ activePath }) => {
  const navItems = [
    { path: "/add-items", label: "Add Items" },
    { path: "/inventory", label: "Inventory" },
    { path: "/orders", label: "Orders" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/advertisement", label: "Advertisement" },
  ];

  return (
    <div className="h-full w-48 bg-white rounded-xl shadow-md">
      <nav className="py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path} className="px-2">
              <Link
                to={item.path}
                className={`block w-full text-center py-3 px-2 rounded-lg transition-all duration-300 
                ${
                  activePath.includes(item.path)
                    ? "bg-emerald-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
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