// src/components/admin/AddDocuments.tsx

import React, { useState } from 'react';
import { db, storage } from '@/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddDocuments: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setUploading(true);

    try {
      const fileURLs: string[] = [];

      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setProgressMessage(`Carregando ${file.name} (${i + 1}/${files.length})...`);

          const storageRef = ref(storage, `documents/${file.name}`);
          await uploadBytes(storageRef, file);
          const fileURL = await getDownloadURL(storageRef);
          fileURLs.push(fileURL);
        }
      }

      await addDoc(collection(db, 'documents'), {
        title,
        description,
        fileURLs,
        createdAt: new Date(),
      });

      setMessage('Documento(s) adicionado(s) com sucesso!');
      setTitle('');
      setDescription('');
      setFiles(null);
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
      setMessage('Erro ao adicionar documento.');
    } finally {
      setUploading(false);
      setProgressMessage('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Adicionar Documentos</h1>
      <form onSubmit={handleAddDocument} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Adicionar Documento
        </button>
      </form>
      {uploading && <p className="mt-4 text-gray-500">{progressMessage}</p>}
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default AddDocuments;
