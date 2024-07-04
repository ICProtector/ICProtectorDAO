import React, { useState } from 'react';
import ClosedDetail from './proposals/closeddetail';
import NavigationBar from './navigationBar';
import { useParams } from 'react-router-dom';
import Sidebar from './sidebar';

// App Component
const AdmiClosedDetailPage = () => {
    const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <ClosedDetail id={id}/>
    </div>
  );
};

export default AdmiClosedDetailPage;
