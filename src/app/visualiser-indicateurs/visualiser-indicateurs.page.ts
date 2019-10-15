import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommuneIndicateur } from 'src/app/entities/commune-indicateur';
import { IndicateursService } from 'src/app/services/indicateursService';

@Component({
  selector: 'app-visualiser-indicateurs',
  templateUrl: './visualiser-indicateurs.page.html',
  styleUrls: ['./visualiser-indicateurs.page.scss'],
})
export class VisualiserIndicateursPage implements OnInit {

  listeIndicateurs: CommuneIndicateur[];

  indicateurVide = true;

  affichageIndicateurs = true;

  suppressionIndicateur = false;

  creationIndicateur = false;

  compteurIndicateurs = true;

  communeSuppression: CommuneIndicateur;


  /**
   * variable qui sert à gérer l'affichage des composant enfant
   */
  @Output() childEvent: EventEmitter<{
    etat: number;
    indicateurCourant: CommuneIndicateur;
  }> = new EventEmitter<{
    etat: number;
    indicateurCourant: CommuneIndicateur;
  }>();

  /**
   * constructeur
   * @param indicateursService
   */
  constructor(private indicateursService: IndicateursService) { }


  /**
   * A l'initialisation de la page, la liste des indicateurs se met à jour
   */
  ngOnInit() {
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
 * méthode qui sert à passer à l'affichage de création d'un indicateur
 */
  creerIndicateur() {
    this.childEvent.emit({ etat: 1, indicateurCourant: null });
  }


  afficherDonnees(indicateur: CommuneIndicateur) {
    this.childEvent.emit({ etat: 3, indicateurCourant: indicateur })
  }


}
