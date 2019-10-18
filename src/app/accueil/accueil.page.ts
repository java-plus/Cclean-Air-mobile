import {Component, OnInit} from '@angular/core';
import {UtilisateurProfil} from '../entities/UtilisateurProfil';
import {Plugins} from '@capacitor/core';
import {PositionService} from './position.service';
import {CommuneCarte} from '../entities/CommuneCarte';
import {flatMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Router} from '@angular/router';
import {CommuneRecherche} from '../entities/CommuneRecherche';
import {ProfilService} from '../services/profil.service';


const {Geolocation} = Plugins;

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.page.html',
    styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

    /**
     * Utilisateur connecté
     */
    utilisateur: string;

    /**
     * Cet attribut représente l'affichage ou non de l'icone de chargement
     */
    loading: boolean;

    /**
     * Commune qui va être envoyé au back pour recherche
     */
    communeRecupere: CommuneCarte;

    /**
     * Commune retournée au back
     */
    communeRecherche: CommuneRecherche;


    constructor(private positionService: PositionService, private router: Router, private profilService: ProfilService) {
    }

    /**
     * Récupère la géolocalisation de l'utilisateur, s'il l'accepte, et lui renvoie la commune enregistrée la plus proche
     * de sa position
     */
    async rechercheParPosition() {
        this.loading = true;

        fromPromise(Geolocation.getCurrentPosition())
            .pipe(
                flatMap(posInfos => this.positionService.recupererCommuneLaPlusProche(posInfos))
            )
            .subscribe(commune => {
                    this.communeRecupere = commune;
                    this.loading = false;
                    this.router.navigate(['/recherche'], {
                        queryParams: {
                            codeInsee: this.communeRecupere.codeINSEE,
                            nomCommune: this.communeRecupere.nomCommune,

                        }
                    });
                },
                () => this.loading = false);
    }

    rechercheDetaillee() {
        this.router.navigate(['/recherche']);
    }

    ngOnInit() {

        this.profilService.visualiserProfil().subscribe((user) => {
            this.utilisateur = user.prenom.toString().concat(' ').concat(user.nom.toString());
        });
    }

}
