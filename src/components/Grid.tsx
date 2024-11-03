import React from 'react';
import RepositoryCard from './Card';


interface Repository {
  id: string;
  title: string;
  description: string;
  attachmentCount: number;
}

interface RepositoryGridProps {
  repositories: Repository[];
}

export default function RepositoryGrid({ repositories }: RepositoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {repositories.map((repo) => (
        <RepositoryCard
              key={repo.id}
              title={repo.title}
              description={repo.description}
              attachmentCount={repo.attachmentCount} id={''}        />
      ))}
    </div>
  );
}
