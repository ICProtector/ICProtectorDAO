import React, { useState } from 'react';
import MainContent from './maincontent';
import NavigationBar from './navigationBar';
import Sidebar from './sidebar';

// App Component
const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <MainContent />
    </div>
  );
};

export default AdminPanel;
