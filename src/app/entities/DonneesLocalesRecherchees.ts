
/**
 *Objet Dto de données locales qui sert à demander l'affichage de l'historique
 *
 * @class DonneesLocalesDto
 */
class DonneesLocalesRecherchees {
    constructor(public dateDebut: Date, public dateFin: Date, public polluant: string) { }
}

export { DonneesLocalesRecherchees };
