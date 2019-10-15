/**
 * Classe représentant un utilisateur lors de l'authentification.
 */
export class UtilisateurAuthentification {

  email: string;
  motDePasse: string;

  /**
   * Constructeur
   * @param email : string email de l'utilisateur souhaitant se connecter
   * @param motDePasse : string mot de passe de l'utilisateur souhaitant se
   * connecter
   */
  constructor(email: string, motDePasse: string) {
    this.email = email;
    this.motDePasse = motDePasse;
  }
}
