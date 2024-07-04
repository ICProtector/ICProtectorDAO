import React, { useState } from 'react';
import OpenDetail from './proposals/openDetail';
import NavigationBar from './navigationBar';
import { useParams } from 'react-router-dom';
import Sidebar from './sidebar';

// App Component
const AdmiOpenDetailPage = () => {
    const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <OpenDetail id={id}/>
    </div>
  );
};

export default AdmiOpenDetailPage;
