import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeolocationPosition} from '@capacitor/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {CommuneCarte} from '../entities/CommuneCarte';

const URL_BACKEND = environment.backendUrl;

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) {
    }

    /**
     * Cette fonction retourne un observable de la commune la plus proche enregistrée sous la forme d'un
     * objet CommuneCarte
     * @param position Prend en paramètre un objet de type GeolocationPosition renvoyée par l'API de géolocalisation
     */
    recupererCommuneLaPlusProche(position: GeolocationPosition): Observable<CommuneCarte> {

        const options = {withCredentials: true};
        const coordonnees: Array<number> = [];
        coordonnees.push(position.coords.longitude);
        coordonnees.push(position.coords.latitude);
        return this.http.post<CommuneCarte>(URL_BACKEND.concat('/communes/plus_proche'), coordonnees, options);

    }
}
