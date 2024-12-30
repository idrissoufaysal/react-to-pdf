import React, { useState } from 'react';
import { Search, FileText } from 'lucide-react';
import type { Utilisateur } from '../types';
import { PDFPreview } from './PDFPreview';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface UserListProps {
  users: Utilisateur[];
  onDownloadPDF: (user: Utilisateur) => void;
}

export function UserList({ users, onDownloadPDF }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<Utilisateur | null>(null);

  const filteredUsers = users.filter(user => 
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-3.5 text-black" size={20} />
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-4 gap-4 table-header">
          <div>Nom</div>
          <div>Prénom</div>
          <div>Période de congé</div>
          <div className="text-center">Actions</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredUsers.map(user => (
            <div key={user.id} className="grid grid-cols-4 gap-4 table-row">
              <div className="table-cell font-medium">{user.nom}</div>
              <div className="table-cell">{user.prenom}</div>
              <div className="table-cell text-gray-600">
                {format(new Date(user.debutConge), 'dd MMMM yyyy', { locale: fr })} - 
                {format(new Date(user.finConge), 'dd MMMM yyyy', { locale: fr })}
              </div>
              <div className="table-cell text-center">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <FileText size={16} />
                  Voir le PDF
                </button>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              Aucun utilisateur trouvé
            </div>
          )}
        </div>
      </div>

      {selectedUser && (
        <PDFPreview
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onDownload={() => {
            onDownloadPDF(selectedUser);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}