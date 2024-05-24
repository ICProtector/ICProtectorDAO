import React, { useState } from 'react';
import Details from './proposals/detail';
import NavigationBar from './navigationBar';
import { useParams } from 'react-router-dom';
import Sidebar from './sidebar';

// App Component
const AdminDetailPage = () => {
    const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Details id={id}/>
    </div>
  );
};

export default AdminDetailPage;
