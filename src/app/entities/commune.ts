/**
 * Classe représentant une commune telle qu'insérée dans la base de données.
 */
export class Commune {

  nom: string;
  nbHabitants: number;
  codeInsee: string;
  latitude: number;
  longitude: number;

  /**
   * Constructeur
   * @param nom : string
   * @param nbHabitants: number
   * @param codeInsee: string
   * @param latitude: number
   * @param longitude: number
   */
  constructor(nom: string, nbHabitants: number, codeInsee: string, latitude: number, longitude: number) {
    this.nom = nom;
    this.nbHabitants = nbHabitants;
    this.codeInsee = codeInsee;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
