import { Component, OnInit } from '@angular/core';
import {UtilisateurProfil} from '../entities/UtilisateurProfil';
import { Plugins } from '@capacitor/core';
import {CommuneRecherche} from "../entities/CommuneRecherche";
import {error} from "util";
const { Geolocation } = Plugins;

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
  communeRecherche: CommuneRecherche;
  loading: boolean;

  constructor() { }

  async rechercheParPosition() {
    this.loading = true;
    const coordinates = await Geolocation.getCurrentPosition().then((posInfos) => {
      console.log(posInfos);
      setTimeout(() => this.loading = false, 5000);

    }, (err) => {
      console.log(err());
      setTimeout(() => this.loading = false, 5000);
    });
  }

  ngOnInit() {
  }

}
