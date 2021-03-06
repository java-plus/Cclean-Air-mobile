import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

const URL_BACKEND = environment.backendUrl;

/**
 * Classe des services liés à la déconnexion.
 */
@Injectable({
    providedIn: 'root'
})
export class DeconnexionService {

    constructor(private http: HttpClient) {
    }

    /**
     * Fait une requête logout auprès du back pour déconnecter l'utilisateur et
     * renvoie un Observable de la requête.
     */
    deconnecter(): Observable<any> {
        const httpOptions = {
            withCredentials: true
        };

        return this.http.post(`${URL_BACKEND}/logout`, {}, httpOptions)
            .pipe(
                tap(() => Storage.clear()));
    }
}
