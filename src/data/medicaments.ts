import { Medicament, Categorie } from '@/types/medicament'

export const categories: Categorie[] = [
  { id: '1', nom: 'Antidouleurs', icone: '💊', couleur: 'blue', description: 'Médicaments contre la douleur' },
  { id: '2', nom: 'Premiers secours', icone: '🚑', couleur: 'red', description: 'Soins d\'urgence' },
  { id: '3', nom: 'Vitamines', icone: '🍊', couleur: 'orange', description: 'Compléments alimentaires' },
  { id: '4', nom: 'Allergies', icone: '🤧', couleur: 'purple', description: 'Antihistaminiques' },
  { id: '5', nom: 'Antibiotiques', icone: '💉', couleur: 'green', description: 'Anti-infectieux' },
  { id: '6', nom: 'Troubles digestifs', icone: '🍃', couleur: 'emerald', description: 'Système digestif' },
  { id: '7', nom: 'Cardiovasculaire', icone: '❤️', couleur: 'red', description: 'Cœur et circulation' },
  { id: '8', nom: 'Respiratoire', icone: '🫁', couleur: 'cyan', description: 'Système respiratoire' },
  { id: '9', nom: 'Dermatologie', icone: '🧴', couleur: 'pink', description: 'Soins de la peau' },
  { id: '10', nom: 'Neurologie', icone: '🧠', couleur: 'indigo', description: 'Système nerveux' },
  { id: '11', nom: 'Ophtalmologie', icone: '👁️', couleur: 'teal', description: 'Soins des yeux' },
  { id: '12', nom: 'Contraception', icone: '💊', couleur: 'violet', description: 'Contraceptifs' }
]

export const medicaments: Medicament[] = [
  {
    id: '1',
    nom: 'Doliprane 1000mg',
    datePeremption: new Date('2024-08-15'),
    categorie: 'Antidouleurs',
    quantite: 2,
    statut: 'bientot_expire',
    marque: 'Sanofi',
    posologie: '1 comprimé toutes les 6h maximum',
    instructionsUsage: 'À prendre avec un verre d\'eau'
  },
  {
    id: '2',
    nom: 'Aspegic 100mg',
    datePeremption: new Date('2024-06-30'),
    categorie: 'Antidouleurs',
    quantite: 0,
    statut: 'expire',
    marque: 'Sanofi',
    posologie: '1 sachet par jour',
    instructionsUsage: 'Dissoudre dans un verre d\'eau'
  },
  {
    id: '3',
    nom: 'Vitamin D3',
    datePeremption: new Date('2025-12-31'),
    categorie: 'Vitamines',
    quantite: 5,
    statut: 'valide',
    marque: 'UPSA',
    posologie: '1 comprimé par jour',
    instructionsUsage: 'À prendre le matin avec le petit-déjeuner'
  },
  {
    id: '4',
    nom: 'Cetirizine 10mg',
    datePeremption: new Date('2025-03-15'),
    categorie: 'Allergies',
    quantite: 1,
    statut: 'valide',
    marque: 'Biogaran',
    posologie: '1 comprimé par jour',
    instructionsUsage: 'Antihistaminique'
  },
  {
    id: '5',
    nom: 'Amoxicilline 500mg',
    datePeremption: new Date('2024-10-20'),
    categorie: 'Antibiotiques',
    quantite: 3,
    statut: 'bientot_expire',
    marque: 'Arrow',
    posologie: '1 gélule 3 fois par jour',
    instructionsUsage: 'Antibiotique - terminer le traitement'
  },
  {
    id: '6',
    nom: 'Smecta',
    datePeremption: new Date('2025-06-10'),
    categorie: 'Troubles digestifs',
    quantite: 8,
    statut: 'valide',
    marque: 'Ipsen',
    posologie: '1 sachet 3 fois par jour',
    instructionsUsage: 'Diluer dans un verre d\'eau'
  },
  {
    id: '7',
    nom: 'Ventoline',
    datePeremption: new Date('2024-12-05'),
    categorie: 'Respiratoire',
    quantite: 1,
    statut: 'valide',
    marque: 'GSK',
    posologie: '2 bouffées si besoin',
    instructionsUsage: 'Bronchodilatateur'
  },
  {
    id: '8',
    nom: 'Biafine',
    datePeremption: new Date('2025-08-30'),
    categorie: 'Dermatologie',
    quantite: 2,
    statut: 'valide',
    marque: 'Johnson & Johnson',
    posologie: 'Application locale',
    instructionsUsage: 'Émulsion pour brûlures légères'
  }
]

export const pharmaciesProches = [
  {
    id: '1',
    nom: 'Pharmacie du Centre',
    adresse: '15 Rue de la République, 20000 Ajaccio',
    distance: '850m',
    tempsTrajet: '3 min à pied',
    telephone: '04 95 51 12 34',
    horaires: {
      matin: '9h00 - 12h30',
      apresmidi: '14h00 - 19h00'
    },
    ouvert: true,
    coordonnees: { lat: 41.9188, lng: 8.7386 }
  },
  {
    id: '2',
    nom: 'Pharmacie de la Gare',
    adresse: '3 Boulevard du Roi Jérôme, 20000 Ajaccio',
    distance: '1.2km',
    tempsTrajet: '5 min à pied',
    telephone: '04 95 51 45 67',
    horaires: {
      matin: '8h30 - 12h00',
      apresmidi: '14h30 - 19h30'
    },
    ouvert: false,
    coordonnees: { lat: 41.9200, lng: 8.7345 }
  }
]