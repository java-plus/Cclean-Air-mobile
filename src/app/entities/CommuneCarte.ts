/**
 * Classe représentant une commune sur la carte.
 */
import {PolluantDto} from './PolluantDto';

export class CommuneCarte {
  public codeINSEE: string;
  public codePostal: string;
  public nomCommune: string;
  public latitude: number;
  public longitude: number;
  public alerte: PolluantDto;

}
