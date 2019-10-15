/**
 * Classe représentant une alerte créée par un administrateur.
 */
export class AlerteAdministrateur {

  /**
   * Constructeur
   * @param communeInsee : string
   * @param objet : string
   * @param corpsMsg : string
   */
  constructor(public communeInsee: string, public objet: string, public corpsMsg: string) {}
}
