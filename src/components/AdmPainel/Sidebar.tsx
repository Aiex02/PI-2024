import React from 'react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: 'addDocuments' | 'manageUsers') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => (
  <div className="w-64 bg-gray-800 text-white h-screen p-6">
    <h2 className="text-2xl font-bold mb-6">Administração</h2>
    <nav className="space-y-4">
      <button
        onClick={() => setActiveSection('addDocuments')}
        className={`block w-full text-left px-4 py-2 rounded ${
          activeSection === 'addDocuments' ? 'bg-gray-700' : 'hover:bg-gray-700'
        }`}
      >
        Adicionar Documentos
      </button>
      <button
        onClick={() => setActiveSection('manageUsers')}
        className={`block w-full text-left px-4 py-2 rounded ${
          activeSection === 'manageUsers' ? 'bg-gray-700' : 'hover:bg-gray-700'
        }`}
      >
        Gerenciar Usuários
      </button>
    </nav>
  </div>
);

export default Sidebar;
