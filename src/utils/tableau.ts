import html2canvas from "html2canvas";
import { Mois, User } from "../types";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const MoisArray: Mois[] = [
    Mois.Janvier, Mois.Février, Mois.Mars, Mois.Avril, Mois.Mai, Mois.Juin,
    Mois.Juillet, Mois.Août, Mois.Septembre, Mois.Octobre, Mois.Novembre, Mois.Décembre
  ];
  
 export const generateTableData = (tableData: User) => {
    // Create an array to represent each row (tache) with its data for each month
    return tableData.salaires.map(task => {
      const row = MoisArray.map(mois => {
        // Find the matching salaire for each task and month
        const salaire = tableData.salaires.find(s => s.mois === mois && s.tache === task.tache);
        return salaire ? salaire.montant : 0; // Display 0 if no salary is found for that month
      });
  
      return [task.tache, ...row];
    });
  };
  
  interface PrintRefs {
    [key: string]: React.RefObject<HTMLElement>;
  }

export const handleDownloadAllPDFs = async (users:User[], printRefs:PrintRefs) => {
  const zip = new JSZip();

  for (const user of users) {
    const element = printRefs[user?.id]?.current; // Récupérer la référence de l'élément utilisateur
    if (!element) {
      console.error(`Element for user ${user.nom} not found`);
      continue;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
      });
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 20, 10, pdfWidth, pdfHeight);

      // Ajouter le fichier PDF au ZIP
      const pdfBlob = pdf.output("blob");
      zip.file(`fiche_${user.nom}_${user.prenom}.pdf`, pdfBlob);
    } catch (error) {
      console.error(`Erreur pour l'utilisateur ${user.nom} :`, error);
    }
  }

  try {
    // Générer le fichier ZIP
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "fiches_utilisateurs.zip");
  } catch (error) {
    console.error("Erreur lors de la génération du fichier ZIP :", error);
  }
};
