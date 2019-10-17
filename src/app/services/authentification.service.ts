import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {UtilisateurAuthentification} from '../entities/utilisateur-authentification';
import {catchError, map} from 'rxjs/operators';
import {ProfilService} from './profil.service';

const URL_BACKEND = environment.backendUrl;

/**
 * Classe des services de l'authentification.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    constructor(private http: HttpClient, private profileService: ProfilService) {
    }

    /**
     * Méthode envoyant une requête pour savoir en réponse si l'utilisateur est
     * déjà authentifié.
     * @return Observable<void>
     */
    verificationEstAuthentifie(): Observable<void> {
        return this.http.get<void>(URL_BACKEND.concat('/connexion'),
            {withCredentials: true});
    }

    /**
     * Une requète est envoyée à l'application back, renvoie un observateur
     * @param utilisateur : UtilisateurAuthentification
     */
    authentifier(utilisateur: UtilisateurAuthentification): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            }),
            withCredentials: true,
        };

        return this.http.post(URL_BACKEND.concat('/connexion'), utilisateur, httpOptions);
    }

    /**
     * Méthode qui valide si on est connecté en tant qu'admin ou non. Elle
     *  retourne un observable de boolean.
     *
     * @returns {Observable<boolean>}
     * @memberof AuthentificationService
     */
    isAdmin(): Observable<boolean> {

        return this.http.get(URL_BACKEND.concat('/profils/statut'), {withCredentials: true, responseType: 'text'})
            .pipe(map(() => true),
                catchError(() => of(false)));

    }

}
