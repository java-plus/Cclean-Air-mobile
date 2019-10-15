/**
 * Classe représentant un utilisateur lors de l'inscription.
 */
export class UtilisateurInscription {

  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  statuts: string[];
  nomCommune: string;
  codePostal: string;
  statutNotification: boolean;

  /**
   * Constructeur.
   * @param nom : string nom de l'utilisateur
   * @param prenom : string prénom de l'utilisateur
   * @param email : string email de l'utilisateur
   * @param motDePasse : string mot de passe de l'utilisateur
   * @param statuts : string[] tableau des statuts de l'utilisateur
   * @param nomCommune : string commune de résidence de l'utilisateur
   * @param codePostal : string code postal de la localisation de l'utilisateur
   * @param statutNotification : boolean statut des notifications pour la commune de l'utilisateur
   */
  constructor(nom: string, prenom: string, email: string, motDePasse: string,
              statuts: string[], nomCommune: string, codePostal: string,
              statutNotification: boolean) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.motDePasse = motDePasse;
    this.statuts = statuts;
    this.nomCommune = nomCommune;
    this.codePostal = codePostal;
    this.statutNotification = statutNotification;
  }
}
