import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Plugins} from '@capacitor/core';
import {flatMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

const URL_BACKEND = environment.backendUrl;
const {Storage} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class PolluantService {


    /**
     * constructeur
     * @param http le client http
     */
    constructor(private http: HttpClient) {
    }


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

        return fromPromise(Storage.get({key: 'liste_polluants'}))
            .pipe(
                flatMap((data) => {
                    if (data.value !== null) {
                        return of(JSON.parse(data.value) as string[]);
                    } else {
                        return this.http.get<string[]>(URL_BACKEND.concat('/polluant/noms'), options);
                    }
                }));


    }
}
