import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="h-100">
      <div className="w-100 bg-dark bg-opacity-75 p-2 d-flex justify-content-center">
        <marquee behavior="alternate" direction="right">
          <h3 className="text-white">Library Management System</h3>
        </marquee>
      </div>

      <div className="h-100 d-flex">
        <Sidebar />
        <div className="m-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
