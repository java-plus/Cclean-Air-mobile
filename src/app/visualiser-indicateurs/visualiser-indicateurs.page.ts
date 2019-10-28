import { Component, OnInit } from '@angular/core';
import { CommuneIndicateur } from 'src/app/entities/commune-indicateur';
import { IndicateursService } from 'src/app/services/indicateursService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualiser-indicateurs',
  templateUrl: './visualiser-indicateurs.page.html',
  styles: [],
})
export class VisualiserIndicateursPage {

  listeIndicateurs: CommuneIndicateur[];
  communeSuppression: CommuneIndicateur;
  suppressionIndicateurs = false;

  indicateurVide = true;

  compteurIndicateurs = true;


  /**
   * constructeur
   * @param indicateursService
   */
  constructor(private indicateursService: IndicateursService, private router: Router) { }


  /**
   * A l'initialisation de la page, la liste des indicateurs se met à jour
   */
  ionViewWillEnter() {
    this.indicateursService.getListeIndicateurs()
      .subscribe(

        result => {
          this.listeIndicateurs = result;
          if (this.listeIndicateurs.length > 0) {
            this.indicateurVide = false;
          }

          if (this.listeIndicateurs.length >= 5) {
            this.compteurIndicateurs = false;
          }

        },
        err => { }
      );
  }

    /**
   * méthode qui sert à passer à l'affichage de la confirmation de suppression d'un indicateur.
   * Elle prend en paramètre l'indicateur à supprimer
   * @param communeIndicateur
   */
  supprimerIndicateur(communeIndicateur: CommuneIndicateur) {
    this.communeSuppression = communeIndicateur;
    this.suppressionIndicateurs = true;
  }

  /**
   * méthode qui permet d'annuler la suppression d'un indicateur et de revenir à l'affichage des indicateurs
   */
  annulationSuppressionIndicateur() {
    this.suppressionIndicateurs = false;
  }

  /**
   * Methode qui permet la suppression définitive d'un indicateur.
   */
  confirmationSuppressionIndicateur() {
    this.suppressionIndicateurs = false;
    this.indicateursService
      .supprimerIndicateur(this.communeSuppression.nomCommune)
      .subscribe(
        result => {
          location.reload();
        },
        err => {
          location.reload();
        }
      );
  }

}
