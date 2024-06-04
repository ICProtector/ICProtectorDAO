import React, { useState } from 'react';
import NavigationBar from './navigationBar';
import Sidebar from './sidebar';
import ScamForm from './proposals/ScamForm';

// App Component
const AdminScamFormPage= () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <ScamForm />
    </div>
  );
};

export default AdminScamFormPage;
