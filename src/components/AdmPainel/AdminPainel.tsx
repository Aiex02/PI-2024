'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AddDocuments from './AddDocuments';
import ManageUsers from './MenageUsers';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState<'addDocuments' | 'manageUsers'>('addDocuments');

  return (
    <div className="flex min-h-screen">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 p-6">
        {activeSection === 'addDocuments' && <AddDocuments />}
        {activeSection === 'manageUsers' && <ManageUsers />}
      </div>
    </div>
  );
}
