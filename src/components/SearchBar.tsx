import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Buscar repositórios..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
}
