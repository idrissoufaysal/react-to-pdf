import { Mois, User } from "../types";

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
  