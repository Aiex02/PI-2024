import React from 'react';
import { FaPaperclip } from 'react-icons/fa';
import Link from 'next/link';

interface RepositoryCardProps {
  id: string;
  title: string;
  description: string;
  attachmentCount: number;
}

export default function RepositoryCard({ id, title, description, attachmentCount }: RepositoryCardProps) {
  return (
    <Link href={`/repository/${id}`}>
      <div className="p-4 border rounded shadow hover:shadow-lg transition duration-300 cursor-pointer">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">
          {description.length > 100 ? description.slice(0, 100) + '...' : description}
        </p>
        <div className="flex items-center mt-2">
          <FaPaperclip className="mr-2" />
          <span>{attachmentCount} anexos</span>
        </div>
      </div>
    </Link>
  );
}
