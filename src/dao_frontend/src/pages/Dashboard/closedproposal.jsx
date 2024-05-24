import React, { useState } from 'react';
import NavigationBar from './navigationBar';
import Sidebar from './sidebar';
import ClosedProposal from './proposals/closedproposal';

// App Component
const AdminClosedProposal= () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <ClosedProposal />
    </div>
  );
};

export default AdminClosedProposal;
