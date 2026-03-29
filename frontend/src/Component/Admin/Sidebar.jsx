import React, { useContext } from "react";
import { AuthContext } from "./context/Auth";
import { useNavigate, NavLink } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Services", path: "/admin/services" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Articles", path: "/admin/articles" },
    { name: "Testimonials", path: "/admin/testimonials" },
    { name: "Members", path: "/admin/members" },
  ];

  return (
    <div className="p-4">

      {/* Top Section */}
      <div className="w-64 bg-white shadow-md p-4 flex flex-col justify-between h-full rounded-lg">
        <div>
          <h2 className="text-2xl font-bold mb-6 pl-2">Sidebar</h2>

          <ul className="text-black font-bold divide-y divide-gray-300">
           {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block py-3 px-2 transition ${
                      isActive
                        ? "text-pink-500 bg-gray-100"
                        : "hover:text-pink-500 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-pink-500 hover:bg-amber-400 text-white px-2 py-2 rounded cursor-pointer"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Sidebar;