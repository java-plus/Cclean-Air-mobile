import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommuneIndicateur} from '../entities/commune-indicateur';
import {IndicateurCreation} from '../entities/Indicateur-creation';
import {Observable, of} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Plugins} from '@capacitor/core';
import {flatMap, tap} from 'rxjs/operators';

const {Storage} = Plugins;

const URL_BACKEND = environment.backendUrl;

/**
 * Classe de service qui permet de gérer les indicateurs
 */
@Injectable({
    providedIn: 'root'
})
export class IndicateursService {
    constructor(private _http: HttpClient) {
    }

    /**
     * Méthode qui retourne une liste d'indicateurs pour un utilisateur donné
     */
    getListeIndicateurs(): Observable<CommuneIndicateur[]> {
        return fromPromise(Storage.get({key: 'liste_indicateurs'})).pipe(flatMap(data => {
            if (data.value !== null) {
                return of(JSON.parse(data.value));
            } else {
                return this._http.get<CommuneIndicateur[]>(`${URL_BACKEND}/indicateurs`, {
                    withCredentials: true
                }).pipe(tap((indicateurs) => {
                    Storage.set({key: 'liste_indicateurs', value: JSON.stringify(indicateurs)});
                }));
            }
        }));
    }


    /**
     * Méthode qui enregistre un indicateur dans la base
     * @param indicateurCreation
     */
    enregistrerIndicateur(indicateurCreation: IndicateurCreation) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            }),
            withCredentials: true
        };

        return this._http.post(
            `${URL_BACKEND}/indicateurs`,
            indicateurCreation,
            httpOptions
        ).pipe(tap(() => {
            Storage.remove({key: 'liste_indicateurs'});
        }));
    }


}
