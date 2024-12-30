export interface Salaire {
  tache: string;
  montants: number[];
}

export interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  debutConge: string;
  finConge: string;
  salaires: Salaire[];
  signature: string;
}