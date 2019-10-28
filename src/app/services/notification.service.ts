import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { interval, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommuneAlerte } from '../entities/commune-alerte';
import { flatMap, tap } from 'rxjs/operators';

const URL_BACKEND = environment.backendUrl;

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private httpClient: HttpClient) {
    }

    /**
     * méthode qui retourne les alertes pollution pour les indicateurs de l'utilisateur
     */
    recupererAlertesPollutionPourTousIndicateurs(): Observable<CommuneAlerte[]> {
        return this.httpClient.get<CommuneAlerte[]>(`${URL_BACKEND}/alertes`, {
            withCredentials: true
        });
    }

    /**
     *méthode qui retourne les alertes pollution pour toutes les communes
     *
     * @returns {Observable<CommuneAlerte[]>}
     * @memberof NotificationService
     */
    recupererAlertesPollutionPourCommunesANotifier(): Observable<CommuneAlerte[]> {
        return this.httpClient.get<CommuneAlerte[]>(`${URL_BACKEND}/alertes/notifications`, {
            withCredentials: true
        });
    }

}




