import React, { useContext } from "react";
import { AuthContext } from "./context/Auth";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    "Dashboard",
    "Services",
    "Projects",
    "Articles",
    "Testimonials",
    "Members",
  ];

  return (
    <div className="w-64 bg-white shadow-md p-5 flex flex-col justify-between h-full">
      
      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Sidebar</h2>

        <ul className="text-black font-bold divide-y divide-gray-300">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="py-3 px-2 cursor-pointer hover:text-pink-500 hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-pink-500 hover:bg-amber-400 text-white px-4 py-2 rounded cursor-pointer"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Sidebar;