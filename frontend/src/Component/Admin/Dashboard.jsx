import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <section className="h-screen bg-gray-100">
      <div className="flex h-full">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="bg-white h-full rounded-lg flex items-center justify-center shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome to admin Dashboard
            </h1>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;