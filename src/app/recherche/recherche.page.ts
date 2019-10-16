import {Component, OnInit} from '@angular/core';
import {CommuneCarte} from '../entities/CommuneCarte';
import {CommuneService} from '../services/commune.service';
import {CommuneRecherche} from '../entities/CommuneRecherche';
import {ResultatRechercheCommune} from '../entities/ResultatRechercheCommune';


@Component({
    selector: 'app-recherche',
    templateUrl: './recherche.page.html',
    styleUrls: ['./recherche.page.scss'],
})
export class RecherchePage implements OnInit {

    listeCommunes: Array<CommuneCarte> = [];
    recherche: CommuneRecherche;
    commune = new ResultatRechercheCommune();
    items: Array<CommuneCarte> = [];



    loading: boolean;

    constructor(private communeService: CommuneService) {

    }


    getItems(ev: any) {
        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() !== '') {
            this.items = this.listeCommunes.filter((item) => {
                return (item.nomCommune.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }

    submitSearch(commune: CommuneCarte) {
        console.log(commune);
    }

    ngOnInit() {

        /**
         * On initialise la liste des communes qui seront affichées lors de l'aide à la saisie
         */
        this.communeService.recupererCommunesRecherche().subscribe((communes) => {
            this.listeCommunes = communes;
           // this.items = this.listeCommunes;

        });




    }

}
