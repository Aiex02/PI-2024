// src/components/Sidebar.tsx

import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Administração</h2>
      <nav className="space-y-4">
        <Link href="/admin/documents" className="block py-2 px-4 rounded hover:bg-gray-700">
          Adicionar Documentos
        </Link>
        <Link href="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">
          Gerenciar Usuários
        </Link>
      </nav>
    </div>
  );
}
