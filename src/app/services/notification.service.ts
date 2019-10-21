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


    recupererAlertesPollutionPourTousIndicateurs(): Observable<CommuneAlerte[]> {
        return this.httpClient.get<CommuneAlerte[]>(`${URL_BACKEND}/alertes`, {
            withCredentials: true
        });
    }


    recupererAlertesPollutionPourCommunesANotifier(): Observable<CommuneAlerte[]> {
        return this.httpClient.get<CommuneAlerte[]>(`${URL_BACKEND}/alertes/notifications`, {
            withCredentials: true
        });
    }

}




