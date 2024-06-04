import React, { useState } from 'react';
import NavigationBar from './navigationBar';
import Sidebar from './sidebar';
import ScamContent from './proposals/scams';

// App Component
const AdminScam= () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <ScamContent />
    </div>
  );
};

export default AdminScam;
