import React from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <section className="h-screen bg-gray-100">
      <div className="flex h-full">

        {/* Sidebar */}
        <Sidebar />

        {/* Dynamic Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="bg-white h-full rounded-lg shadow-sm overflow-y-auto">
            <Outlet />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AdminLayout;