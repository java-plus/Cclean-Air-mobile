import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { UtilisateurProfil } from '../entities/UtilisateurProfil';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UtilisateurAuthentification } from '../entities/utilisateur-authentification';
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
        return this.http.get<UtilisateurProfil>(URL_BACKEND.concat('/profil'), { withCredentials: true })
        .pipe(
            map(userB => new UtilisateurProfil(userB.nom, userB.prenom, userB.email, userB.commune, userB.listeIndicateur,
                userB.statutNotification, userB.motDePasseActuel, userB.motDePasseNouveau, userB.getMotDePasseNouveauValidation)));
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

    supprimerProfil(emailASupprimer: string): Observable<void> {
        const httpOptions = {
          withCredentials: true
        };
        return this.http.delete<void>(URL_BACKEND.concat('/profil/suppression/').concat(emailASupprimer), httpOptions);
      }

}
