/**
 * Classe représentant un utilisateur.
 */
export class UtilisateurProfil {
  nom: string;
  prenom: string;
  email: string;
  commune: string;
  listeIndicateur: string[];
  statutNotification: boolean;
  motDePasseActuel: string;
  motDePasseNouveau: string;
  getMotDePasseNouveauValidation: string;

  /**
   * Constructeur.
   * @param nom : string nom de l'utilisateur
   * @param prenom : string prénom de l'utilisateur
   * @param email : string email de l'utilisateur
   * @param nomCommune : string commune de résidence de l'utilisateur
   * @param listeIndicateur : string[] liste des indicateurs de l'utilisateur
   * @param statutNotification : boolean statut des notifications pour la commune de l'utilisateur
   * @param motDePasse : string mot de passe de l'utilisateur
   * @param motDePasseNouveau : string nouveau mot de passe de l'utilisateur
   * @param getMotDePasseNouveauValidation : string validation du nouveau mot de passe
   */
  constructor(nom: string, prenom: string, email: string, commune: string,
              listeIndicateur: string[], statutNotification: boolean, motDePasseActuel: string,
              motDePasseNouveau: string, getMotDePasseNouveauValidation: string) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.commune = commune;
    this.listeIndicateur = listeIndicateur;
    this.statutNotification = statutNotification;
    this.motDePasseActuel = motDePasseActuel;
    this.motDePasseNouveau = motDePasseNouveau;
    this.getMotDePasseNouveauValidation = getMotDePasseNouveauValidation;
  }
}
