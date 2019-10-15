import {Injectable} from '@angular/core';
import {UtilisateurInscription} from '../entities/utilisateur-inscription';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const URL_BACKEND = environment.backendUrl;

@Injectable({
    providedIn: 'root'
})
export class InscriptionService {

    /**
     * Constructeur
     * @param http : HttpClient
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Méthode effectuant la requête de création d'un utilisateur auprès de l'API.
     * @param utilisateur : UtilisateurInscription l'utilisateur à créer
     */
    creerCompte(utilisateur: UtilisateurInscription): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true
        };

        return this.http.post<UtilisateurInscription>(`${URL_BACKEND}/comptes`,
            utilisateur, httpOptions);
    }
}
