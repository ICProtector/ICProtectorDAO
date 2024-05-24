import React, { useState } from 'react';
import NavigationBar from './navigationBar';
import Sidebar from './sidebar';
import RejectedProposal from './proposals/rejectedproposal';

// App Component
const AdminRejectedProposal= () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <RejectedProposal />
    </div>
  );
};

export default AdminRejectedProposal;
