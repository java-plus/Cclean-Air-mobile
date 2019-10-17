import { CommuneDtoVisualisation } from './CommuneDtovisualisation';
import { PolluantDtoVisualisation } from './PolluantDtoVisualisation';
/**
 *Objet Dto de données locales qui sert à l'affichage de l'historique
 *
 * @class DonneesLocalesDto
 */
class DonneesLocalesHistorique {
    constructor(public communeDtoVisualisation: CommuneDtoVisualisation, public polluantDtoVisualisation: PolluantDtoVisualisation,
        public date: Date) { }
}

export { DonneesLocalesHistorique };
