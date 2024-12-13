'use client';

import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";

interface SidebarToggleProps {
  children: React.ReactNode;
}

const SidebarToggle = ({ children }: SidebarToggleProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} />
      {children}
    </>
  );
};

export default SidebarToggle;
