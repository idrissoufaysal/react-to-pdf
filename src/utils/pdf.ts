import { pdf } from '@react-pdf/renderer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { User } from '../types';
import { PDFDocument } from '../components/PDFGenerator';

export async function generatePDF(user: User) {
  const doc = <PDFDocument user={user} />;
  return await pdf(doc).toBlob();
}

export async function downloadSinglePDF(user: User) {
  const blob = await generatePDF(user);
  saveAs(blob, `fiche_${user.nom}_${user.prenom}.pdf`);
}

export async function downloadAllPDFs(users: User[]) {
  const zip = new JSZip();
  const folder = zip.folder('fiches_Users');
  
  if (!folder) {
    throw new Error('Impossible de créer le dossier dans le ZIP');
  }
  
  for (const user of users) {
    const blob = await generatePDF(user);
    folder.file(`${user.nom}_${user.prenom}.pdf`, blob);
  }
  
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, 'fiches_Users.zip');
}