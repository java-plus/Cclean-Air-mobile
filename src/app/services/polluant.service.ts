import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

        const options = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            }),
            withCredentials: true
        };
        console.log(URL_BACKEND)

        return this.http.get<string[]>(URL_BACKEND.concat('/polluant/noms'), options);

    }
}