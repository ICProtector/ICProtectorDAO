import React, { useState } from 'react';
import NavigationBar from './navigationBar';
import Sidebar from './sidebar';
import PendingProposal from './proposals/pendingproposal';

// App Component
const AdminPendingProposal= () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <PendingProposal />
    </div>
  );
};

export default AdminPendingProposal;
