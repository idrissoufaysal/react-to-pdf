import { X, Download } from 'lucide-react';
import type { User } from '../types';
import Pdfprew from './Pdfprew';

interface PDFPreviewProps {
  user: User;
  onClose: () => void;
  onDownload: () => void;
}

export function PDFPreview({ user, onClose, onDownload }: PDFPreviewProps) {

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[900px] h-[95vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Aperçu du PDF - {user.nom} {user.prenom}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-scroll rounded-xl">
          {/* <PDFViewer width="100%" height="100%" className="border-0">
            <PDFDocument user={user} />
          </PDFViewer> */}

          <Pdfprew user={user}
           />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onDownload}
            className="btn-primary flex items-center gap-2"
          >
            <Download size={20} />
            Télécharger le PDF
          </button>
        </div>
      </div>
    </div>
  );
}