'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Atualiza o perfil do usuário com o nome
      await updateProfile(userCredential.user, { displayName: name });

      // Salva o usuário no Firestore com o role padrão "usuario"
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: name,
        email: email,
        role: 'usuario', // Define o papel padrão como "usuario"
        createdAt: new Date(),
      });

      // Redireciona para a página inicial após o registro
      router.push('/');
    } catch (err: any) {
      // Tratamento de erros com base no código de erro do Firebase
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Esse e-mail já está em uso.');
          break;
        case 'auth/invalid-email':
          setError('O e-mail informado é inválido.');
          break;
        case 'auth/weak-password':
          setError('A senha é muito fraca. Escolha uma senha mais forte.');
          break;
        default:
          setError('Erro ao registrar. Tente novamente.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrar</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirme a Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Registrar
          </button>
        </form>
        <p className="mt-4 text-center">
          Já tem uma conta? <a href="/login" className="text-blue-500">Entrar</a>
        </p>
      </div>
    </div>
  );
}
