import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {DonneesLocalesDto} from '../entities/DonneesLocalesDto';
import {environment} from '../../environments/environment';
import {CommuneCarte} from "../entities/CommuneCarte";

const URL_BACKEND = environment.backendUrl;

@Injectable({
    providedIn: 'root'
})
export class CommuneService {

    private subDonneesLocales = new Subject<DonneesLocalesDto>();

    get subCollegueObs(): Observable<DonneesLocalesDto> {
        return this.subDonneesLocales.asObservable();
    }

    /**
     * constructeur
     * @param http le client http
     */
    constructor(private http: HttpClient) {
    }

    /**
     * méthode qui récupère l'objet donneesLocalesDto pour la visualisation des données pour un indicateur à la dernière date d'enregistrement.
     * @param codeInsee le code Insee de la commune pour laquelle récupérer les informations
     */
    afficherDonneesLocales(codeInsee: string): Observable<DonneesLocalesDto> {


        const URL = URL_BACKEND + '/communes/' + codeInsee;

        return this.http.get<DonneesLocalesDto>(URL, {withCredentials: true})
            .pipe(
                tap(donnees => {

                    this.subDonneesLocales.next(donnees);
                })
            );
    }

    /**
     * Récupère les 10 communes disposant de données sur la qualité de l'air
     */
    recupererCommunesRecherche(): Observable<Array<CommuneCarte>> {
        return this.http.get<Array<CommuneCarte>>(URL_BACKEND.concat('/donnees_carte'), {withCredentials: true});
    }

}
