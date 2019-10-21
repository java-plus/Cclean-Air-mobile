import {Component, OnInit} from '@angular/core';
import {CommuneCarte} from '../entities/CommuneCarte';
import {CommuneService} from '../services/commune.service';
import {CommuneRecherche} from '../entities/CommuneRecherche';
import {ResultatRechercheCommune} from '../entities/ResultatRechercheCommune';
import {ActivatedRoute} from '@angular/router';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;


@Component({
    selector: 'app-recherche',
    templateUrl: './recherche.page.html',
    styleUrls: ['./recherche.page.scss'],
})
export class RecherchePage implements OnInit {

    listeCommunes: Array<CommuneCarte> = [];
    recherche: CommuneRecherche;
    resultatRecherche: ResultatRechercheCommune;
    commune = new ResultatRechercheCommune();
    items: Array<CommuneCarte> = [];


    loading: boolean;

    constructor(private communeService: CommuneService, private route: ActivatedRoute) {

    }


    /**
     * Utilisé pour la gestion dynamique d'aide à la saisie
     * @param ev : en cas de changement de valeur du champ
     */
    getItems(ev: any) {
        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() !== '') {
            this.items = this.listeCommunes.filter((item) => {
                return (item.nomCommune.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }

        if (val === '') {
            this.items = [];
        }
    }


    /**
     * Fonction executé quand l'utilisateur clique sur une commune dans la barre de recherche
     * @param commune : Objet commune représenté par la liste d'autocompletion de la barre de recherche
     * Sera envoyé en au service
     */
    submitSearch(commune: CommuneCarte) {
        this.loading = true;
        const communeRecherche = new CommuneRecherche();
        communeRecherche.codeEtNom = {nomCommune: commune.nomCommune, codeInsee: commune.codeINSEE};

        this.communeService.recupererDetailsCommune(communeRecherche).subscribe((resultat) => {
            this.resultatRecherche = resultat;
            this.items = [];
            this.loading = false;
        }, () => {
            this.loading = false;
            this.items = [];
        });
    }

    ngOnInit() {

        this.resultatRecherche = null;

        /**
         * SI présence de paramètres dans l'url, initialisé les données pour cette commune
         */
        this.route.queryParams.subscribe(params => {
            if (Object.entries(params).length > 0) {
                this.recherche = new CommuneRecherche();
                this.recherche.codeEtNom = {nomCommune: params.nomCommune, codeInsee: params.codeInsee};
                this.communeService.recupererDetailsCommune(this.recherche)
                    .subscribe((commune) => {
                        this.resultatRecherche = commune;
                    });
            }
        });


        /**
         * On initialise la liste des communes qui seront affichées lors de l'aide à la saisie
         */
        this.communeService.recupererCommunesRecherche().subscribe((communes) => {
            this.listeCommunes = communes;

        });


    }

}
