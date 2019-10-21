/**
 * Classe représentant une alerte pollution sur une commune.
 */
export class CommuneAlerte {

    nomCommune: string;
    nomPolluant: string;
    valeur: number;
    codeInseeCommune: string;

    /**
     * Constructeur
     * @param nomCommune : nom de la commune comportant une alerte
     * @param nomPolluant : nom du polluant dont la valeur est élevée
     * @param valeur : valeur mesurée du polluant dans l'air
     * @param codeInseeCommune : code insee de la commune concernée
     */
    constructor(nomCommune: string, nomPolluant: string, valeur: number, codeInseeCommune: string) {
        this.nomCommune = nomCommune;
        this.nomPolluant = nomPolluant;
        this.valeur = valeur;
        this.codeInseeCommune = codeInseeCommune;
    }
}