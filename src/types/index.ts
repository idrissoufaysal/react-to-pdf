export enum _Mois {
  Janvier,
  Février,
  Mars,
  Avril,
  Mai,
  Juin,
  Juillet,
  Août,
  Septembre,
  Octobre,
  Novembre,
  Décembre,
}

export const MoisArray = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

interface Mois {
  mois: string;
  montant: number;
}

interface Salaire {
  tache: string;
  montant_par_moi: Mois[];
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  debutConge: string;
  finConge: string;
  logo?: string;
  salaires: Salaire[];
  signature?: string;
  lieu: string;
  tableau?: string
}


export type TabeItem = {
  nomMetier: string;
  montant: number;
  mois: Mois;
};

// Définir le type du tableau 
export type Tabe = TabeItem[];