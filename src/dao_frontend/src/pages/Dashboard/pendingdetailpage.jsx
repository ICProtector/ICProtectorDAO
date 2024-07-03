import React, { useState } from 'react';
import PendingDetail from './proposals/pendingDetail';
import NavigationBar from './navigationBar';
import { useParams } from 'react-router-dom';
import Sidebar from './sidebar';

// App Component
const AdminPendingDetailPage = () => {
    const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <PendingDetail id={id}/>
    </div>
  );
};

export default AdminPendingDetailPage;
