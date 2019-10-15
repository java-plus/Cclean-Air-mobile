import { CommuneDtoVisualisation } from './CommuneDtovisualisation';
import { PolluantDtoVisualisation } from './PolluantDtoVisualisation';
import { ConditionMeteoDtoVisualisation } from './ConditionMeteoDtoVisualisation';
/**
 *Objet Dto de données locales qui sert à l'affichage des données d'un indicateur
 *
 * @class DonneesLocalesDto
 */
class DonneesLocalesDto {
  constructor(public commune: CommuneDtoVisualisation, public listePolluants: PolluantDtoVisualisation[],
    public conditionMeteo: ConditionMeteoDtoVisualisation, public date: Date) { }
}

export { DonneesLocalesDto };




