
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DonneesLocalesDto } from '../entities/DonneesLocalesDto';
import { environment } from '../../environments/environment';
import { DonneesLocalesHistorique } from '../entities/DonneesLocalesHistorique';
import { Commune } from '../entities/commune';
import { DonneesLocalesRecherchees } from '../entities/DonneesLocalesRecherchees';
import { CommuneCarte } from '../entities/CommuneCarte';
import { ResultatRechercheCommune } from '../entities/ResultatRechercheCommune';
import { CommuneRecherche } from '../entities/CommuneRecherche';

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

        return this.http.get<DonneesLocalesDto>(URL, { withCredentials: true })
            .pipe(
                tap(donnees => {

                    this.subDonneesLocales.next(donnees);
                })
            );
    }

    /**
     * Méthode envoyant un requête GET pour récuperer la liste des communes de
     * l'API.
     */
    recupererCommunes(): Observable<Commune[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            }),
            withCredentials: true,
        };

        return this.http.get<Commune[]>(URL_BACKEND.concat('/communes'), httpOptions);
    }


    /**
     *méthode qui récupère l'objet à afficher pour l'historique
     *
     * @param {string} codeInsee
     * @returns {Observable<DonneesLocalesHistorique>}
     * @memberof CommuneService
     */
    afficherHistorique(codeInsee: string, donneesRecherchees: DonneesLocalesRecherchees): Observable<DonneesLocalesHistorique[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-type": "application/json"
            }),
            withCredentials: true
        };

        const URL = URL_BACKEND + '/communes/historiques/' + codeInsee;

        return this.http.post<DonneesLocalesHistorique[]>(URL, donneesRecherchees, httpOptions);
    }

    /**
     * Récupère les 10 communes disposant de données sur la qualité de l'air
     */
    recupererCommunesRecherche(): Observable<Array<CommuneCarte>> {
        return this.http.get<Array<CommuneCarte>>(URL_BACKEND.concat('/donnees_carte'), { withCredentials: true });
    }

    /**
     * Récupère les données concernant la commune recherchée
     * @param commune : Détails de la commune à rechercher
     */
    recupererDetailsCommune(commune: CommuneRecherche): Observable<ResultatRechercheCommune> {
        const options = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            }),
            withCredentials: true
        };
        return this.http.post<ResultatRechercheCommune>(URL_BACKEND.concat('/details_commune'), {
            codeInsee: commune.codeEtNom.codeInsee,
            nomCommune: commune.codeEtNom.nomCommune,
            polluant: commune.polluant,
            date: commune.date,
            heure: commune.heure,
            alerte: commune.alerte
        }, options);
    }


}
