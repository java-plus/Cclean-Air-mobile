import {Component, OnInit} from '@angular/core';
import {UtilisateurProfil} from '../entities/UtilisateurProfil';
import {Plugins} from '@capacitor/core';
import {PositionService} from './position.service';
import {CommuneCarte} from '../entities/CommuneCarte';
import {flatMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Router} from "@angular/router";


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
    utilisateur: UtilisateurProfil;

    /**
     * Cet attribut représente l'affichage ou non de l'icone de chargement
     */
    loading: boolean;

    communeRecherche: CommuneCarte;

    constructor(private positionService: PositionService, private router: Router) {
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
                    this.communeRecherche = commune;
                    this.loading = false;
                    console.log(this.communeRecherche);
                },
                () => this.loading = false);
    }

    ngOnInit() {
    }

}
