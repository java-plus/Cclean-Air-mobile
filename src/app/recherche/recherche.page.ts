import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {CommuneCarte} from '../entities/CommuneCarte';
import {CommuneService} from "../services/commune.service";

@Component({
    selector: 'app-recherche',
    templateUrl: './recherche.page.html',
    styleUrls: ['./recherche.page.scss'],
})
export class RecherchePage implements OnInit {

    listeCommunes: Array<CommuneCarte> = [];

    constructor(private communeService: CommuneService) {
    }

    ngOnInit() {
        /**
         * Initialisation du fond de carte
         */
        const MAP_RECHERCHE = L.map('map_recherche').setView([47.218371, -1.553621], 11);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(MAP_RECHERCHE);


    }

}
