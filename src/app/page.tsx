'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import RepositoryGrid from '@/components/Grid';
import SearchBar from '@/components/SearchBar';


interface Repository {
  id: string;
  title: string;
  description: string;
  attachmentCount: number;
}

export default function Home() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    // Simulando a busca de dados de um repositório
    const fetchRepositories = async () => {
      const data = [
        { id: '1', title: 'Repositório A', description: 'Descrição do repositório A', attachmentCount: 3 },
        { id: '2', title: 'Repositório B', description: 'Descrição do repositório B', attachmentCount: 5 },
        { id: '3', title: 'Repositório C', description: 'Descrição do repositório C', attachmentCount: 2 },
        // Adicione mais repositórios conforme necessário
      ];
      setRepositories(data);
      setFilteredRepositories(data);
    };

    fetchRepositories();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredRepositories(repositories);
    } else {
      const filtered = repositories.filter((repo) =>
        repo.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRepositories(filtered);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <SearchBar onSearch={handleSearch} />
        <RepositoryGrid repositories={filteredRepositories} />
      </div>
    </div>
  );
}
