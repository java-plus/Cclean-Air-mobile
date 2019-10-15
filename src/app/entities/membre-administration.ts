/**
 * Classe représentant un membre de l'application pour l'interface d'administration.
 */
export class MembreAdministration {

  nom: string;
  prenom: string;
  email: string;

  /**
   * Constructeur
   * @param nom : string nom du membre
   * @param prenom : string prenom du membre
   * @param email : string email du membre
   */
  constructor(nom: string, prenom: string, email: string) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
  }

}
