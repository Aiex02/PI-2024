// components/Navbar.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { auth, db } from '@/firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FaUser, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<{ isLoggedIn: boolean; name: string; role: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Busca o documento do usuário no Firestore para obter o role
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const userData = userDoc.data();

        setUser({
          isLoggedIn: true,
          name: currentUser.displayName || 'Usuário',
          role: userData?.role || 'usuario', // Define "usuario" como padrão se não tiver role
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push('/login'); // Redireciona para a página de login após o logout
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          Engenharia Civil
        </Link>
      </div>
      <div className="relative">
        {user ? (
          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <FaUser className="mr-2" /> {user.name}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Entrar no Painel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="flex items-center focus:outline-none">
            <FaSignInAlt className="mr-2" /> Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}
