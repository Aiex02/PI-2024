// src/components/admin/ManageUsers.tsx

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  const fetchUsers = async () => {
    const usersCollection = await getDocs(collection(db, 'users'));
    const usersList = usersCollection.docs.map((doc) => {
      const data = doc.data() as Omit<UserData, 'id'>;
      return {
        id: doc.id,
        ...data,
      };
    });
    setUsers(usersList);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
      );
    } catch (error) {
      console.error('Erro ao atualizar role do usuário:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários</h1>
      <table className="w-full bg-white rounded shadow-lg">
        <thead>
          <tr>
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="usuario">Usuário</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
