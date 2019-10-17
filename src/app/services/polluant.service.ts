import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const URL_BACKEND = environment.backendUrl;

@Injectable({
    providedIn: 'root'
})
export class PolluantService {


    /**
     * constructeur
     * @param http le client http
     */
    constructor(private http: HttpClient) { }


    /**
     *
     *méthode qui récupère la liste des polluant sans doublons
     * @returns {Observable<string[]>}
     * @memberof PolluantService
     */
    recupererPolluant(): Observable<string[]> {


        const URL = 'http://localhost:8090/polluant/noms';

        return this.http.get<string[]>(URL, { withCredentials: true });

    }
}