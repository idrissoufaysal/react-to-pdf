import { useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Users, FileDown } from 'lucide-react';
import { UserList } from './components/UserList';
import { PDFDocument } from './components/PDFGenerator';
import { pdf } from '@react-pdf/renderer';
import userData from './data/users.json';
import type { User } from './types';
import { generatePDF } from './utils/tableau';
import React from 'react';

function App() {
  const [users,setUsers] =useState<User[]>(userData);

  const printRefs = React.useMemo(() => {
    const refs: { [key: string]: React.RefObject<HTMLElement> } = {};
    users.forEach((user) => {
      refs[user.id] = React.createRef();
    });
    return refs;
  }, [users]);
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/data/user.json');
      const user = await res.json();
      setUsers(user);
    };
  
    fetchUser(); // Appel de la fonction fetchUser
  }, []); // Le

  const generatePDF = async (user: User) => {
    const doc = <PDFDocument user={user} />;
    const blob = await pdf(doc).toBlob();
    return blob;
  };

  const downloadSinglePDF = async (user: User) => {
    const blob = await generatePDF(user);
    saveAs(blob, `fiche_${user.nom}_${user.prenom}.pdf`);
  };

  const downloadAllPDFs = async () => {
    const zip = new JSZip();
  
    for (const user of users) {
      const pdfBlob = await generatePDF(user);
      if (pdfBlob) {
        zip.file(`fiche_${user.nom}_${user.prenom}.pdf`, pdfBlob);
      }
    }
  
    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "fiches_utilisateurs.zip");
    } catch (error) {
      console.error("Erreur lors de la génération du fichier ZIP :", error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500 text-white rounded-2xl">
              <Users size={24} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Gestion des Utilisateurs
            </h1>
          </div>
          <button
            onClick={downloadAllPDFs}
            className="btn-secondary flex items-center gap-2"
          >
            <FileDown size={20} />
            Télécharger tous les PDFs
          </button>
        </div>
        
        <div className="glass-card rounded-2xl shadow-xl p-6">
          <UserList 
            users={users}
            onDownloadPDF={downloadSinglePDF}
          />
        </div>
      </div>
    </div>
  );
}

export default App;