import {PolluantDto} from './PolluantDto';
import {ConditionMeteo} from './ConditionMeteo';

export class ResultatRechercheCommune {

  public codeInsee: string;
  public nom: string;
  public polluants: Array<PolluantDto>;
  public nbHabitants: number;
  public meteo: ConditionMeteo;
  public  niveauAlerte: PolluantDto;
  public date: Date;
  public heure: number;

}
