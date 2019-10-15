/**
 *Objet dto de conditionMeteo qui sert à l'affichage des données locales
 *
 * @class ConditionMeteoDtoVisualisation
 */
class ConditionMeteoDtoVisualisation {

  constructor(public ensoleillement: number, public temperature: number, public humidite: number) {
  }
}

export { ConditionMeteoDtoVisualisation };
