/**
 * Classe représentant une commune pour l'insérer en base de données.
 */
export class IndicateurCreation {

  commune: string;
  alerte: boolean;


  constructor(commune: string, alerte: boolean) {
    this.commune = commune;
    this.alerte = alerte;
  }
}
