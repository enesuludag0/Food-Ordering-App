import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex gap-6 w-[1200px] mx-auto mt-24">
      <Sidebar />
      <div className="flex-1 px-4">
        {/* alt route'lar gösterilir */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
