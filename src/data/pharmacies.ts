import { Pharmacie } from '@/types/pharmacy'

export const pharmaciesProches: Pharmacie[] = [
  {
    id: '1',
    nom: 'Pharmacie des Salines',
    adresse: '15 Rue de la République, 20000 Ajaccio',
    distance: '850m',
    tempsTrajet: '3 min à pied',
    telephone: '04 95 51 12 34',
    horaires: {
      lundi: { type: 'continu', ouverture: '8h30', fermeture: '20h00' },
      mardi: { type: 'continu', ouverture: '8h30', fermeture: '20h00' },
      mercredi: { type: 'continu', ouverture: '8h30', fermeture: '20h00' },
      jeudi: { type: 'continu', ouverture: '8h30', fermeture: '20h00' },
      vendredi: { type: 'continu', ouverture: '8h30', fermeture: '20h00' },
      samedi: { type: 'continu', ouverture: '8h30', fermeture: '20h00' },
      dimanche: { type: 'ferme' }
    },
    // Horaire du jour actuel (calculé dynamiquement)
    horairesAujourdhui: { type: 'continu', ouverture: '8h30', fermeture: '20h00' },
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
      lundi: { type: 'continu', ouverture: '8h30', fermeture: '19h30' },
      mardi: { type: 'continu', ouverture: '8h30', fermeture: '19h30' },
      mercredi: { type: 'continu', ouverture: '8h30', fermeture: '19h30' },
      jeudi: { type: 'continu', ouverture: '8h30', fermeture: '19h30' },
      vendredi: { type: 'continu', ouverture: '8h30', fermeture: '19h30' },
      samedi: { type: 'coupure', matin: '8h30 - 12h00', apresmidi: '14h00 - 18h00' },
      dimanche: { type: 'ferme' }
    },
    horairesAujourdhui: { type: 'continu', ouverture: '8h30', fermeture: '19h30' },
    ouvert: false,
    coordonnees: { lat: 41.9200, lng: 8.7345 }
  },
  {
    id: '3',
    nom: 'Pharmacie 24h/24',
    adresse: '10 Avenue Napoléon, 20000 Ajaccio',
    distance: '2.1km',
    tempsTrajet: '8 min à pied',
    telephone: '04 95 51 78 90',
    horaires: {
      lundi: { type: 'continu', ouverture: '00h00', fermeture: '23h59' },
      mardi: { type: 'continu', ouverture: '00h00', fermeture: '23h59' },
      mercredi: { type: 'continu', ouverture: '00h00', fermeture: '23h59' },
      jeudi: { type: 'continu', ouverture: '00h00', fermeture: '23h59' },
      vendredi: { type: 'continu', ouverture: '00h00', fermeture: '23h59' },
      samedi: { type: 'continu', ouverture: '00h00', fermeture: '23h59' },
      dimanche: { type: 'continu', ouverture: '00h00', fermeture: '23h59' }
    },
    horairesAujourdhui: { type: 'continu', ouverture: '00h00', fermeture: '23h59' },
    ouvert: true,
    coordonnees: { lat: 41.9250, lng: 8.7420 }
  }
]