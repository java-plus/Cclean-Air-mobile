import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { UtilisateurProfil } from '../entities/UtilisateurProfil';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const URL_BACKEND = environment.backendUrl;

@Injectable({
    providedIn: 'root'
})
export class ProfilService {

    private infoUtilisateur = new Subject<UtilisateurProfil>();

    /**
     * constructeur
     * @param http le client http
     */
    constructor(private http: HttpClient) { }

    /**
     * Méthode récupérant les données de l'utilisateur connecté.
     */
    get actionInfoUtilisateur() {
        return this.infoUtilisateur.asObservable();
    }

    /**
     * Méthode affichant les données de l'utilisateur connecté.
     */
    visualiserProfil(): Observable<UtilisateurProfil> {
        return this.http.get<UtilisateurProfil>(URL_BACKEND.concat('/profil'), { withCredentials: true });
    }

    /**
     * Méthode permettant de modifier l'utilisateur connecté.
     */
    modifierProfil(utilisateur: UtilisateurProfil): Observable<UtilisateurProfil> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true
        };

        return this.http.patch<UtilisateurProfil>(URL_BACKEND.concat('/profil/modification'), utilisateur, httpOptions);
    }

}
