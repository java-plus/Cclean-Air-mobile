import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { CommuneIndicateur } from "../entities/commune-indicateur";
import { IndicateurCreation } from "../entities/Indicateur-creation";
import { Observable } from 'rxjs';

const URL_BACKEND = environment.backendUrl;

/**
 * Classe de service qui permet de gérer les indicateurs
 */
@Injectable({
    providedIn: "root"
})
export class IndicateursService {
    constructor(private _http: HttpClient) { }

    /**
     * Méthode qui retourne une liste d'indicateurs pour un utilisateur donné
     */
    getListeIndicateurs(): Observable<CommuneIndicateur[]> {
        return this._http.get<CommuneIndicateur[]>(`${URL_BACKEND}/indicateurs`, {
            withCredentials: true
        });
    }

    /**
     * Méthode qui supprime un indicateur de la base
     * @param nomCommune
     */
    supprimerIndicateur(nomCommune: string): Observable<Object> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-type": "application/json"
            }),
            withCredentials: true
        };

        return this._http.delete(
            `${URL_BACKEND}/indicateurs/${nomCommune}`,
            httpOptions
        );
    }

    /**
     * Méthode qui enregistre un indicateur dans la base
     * @param indicateurCreation
     */
    enregistrerIndicateur(indicateurCreation: IndicateurCreation) {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-type": "application/json"
            }),
            withCredentials: true
        };

        return this._http.post(
            `${URL_BACKEND}/indicateurs`,
            indicateurCreation,
            httpOptions
        );
    }

    /**
     * méthode qui permet de modifier un indicateur
     */
    modifierIndicateur(
        indicateurModif: IndicateurCreation,
        ancienIndicateur: string
    ) {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-type": "application/json"
            }),
            withCredentials: true
        };

        return this._http.patch(
            `${URL_BACKEND}/indicateurs/${ancienIndicateur}`,
            indicateurModif,
            httpOptions
        );
    }
}