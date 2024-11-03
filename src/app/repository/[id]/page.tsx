'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { FaDownload } from 'react-icons/fa';

interface Repository {
  title: string;
  description: string;
  fileURLs: string[];
}

export default function RepositoryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [repository, setRepository] = useState<Repository | null>(null);

  useEffect(() => {
    const fetchRepository = async () => {
      if (id) {
        const docRef = doc(db, 'documents', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRepository(docSnap.data() as Repository);
        } else {
          console.error('Repositório não encontrado');
        }
      }
    };

    fetchRepository();
  }, [id]);

  if (!repository) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{repository.title}</h1>
      <p className="text-gray-700 mb-6">{repository.description}</p>
      <h2 className="text-2xl font-semibold mb-4">Anexos</h2>
      <ul>
        {repository.fileURLs.map((url, index) => (
          <li key={index} className="mb-2 flex items-center">
            <FaDownload className="mr-2" />
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Baixar Anexo {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
