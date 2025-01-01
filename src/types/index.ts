export enum Mois {
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

// Typage des éléments du tableau `salaires`
export type Salaire = {
  tache: string;  // Nom de la tâche (par exemple, "aa", "d", "c")
  montant: number; // Montant pour cette tâche
  mois: Mois | string; // Le mois associé à ce salaire
};

// Typage de l'objet `User`
export type User = {
  id: string; // L'ID de l'utilisateur
  nom: string; // Le nom de l'utilisateur
  prenom: string; // Le prénom de l'utilisateur
  debutConge: string; // La date de début du congé (format "YYYY-MM-DD")
  finConge: string; // La date de fin du congé (format "YYYY-MM-DD")
  salaires: Salaire[]; // Tableau d'objets `Salaire` pour les différents mois et tâches
  signature: string; // Signature de l'utilisateur (sous forme de chaîne de caractères)
  dateAjout: string; // La date d'ajout ou de modification des informations (format "YYYY-MM-DD")
  logo ?:string
};

export type TabeItem = {
  nomMetier: string;
  montant: number;
  mois: Mois;
};

// Définir le type du tableau 
export type Tabe = TabeItem[];