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
   * méthode qui sert à passer à l'affichage de création d'un indicateur
   */
  creerIndicateur() {
    this.childEvent.emit({ etat: 1, indicateurCourant: null });
  }

  /**
   * méthode qui sert à passer à l'affichage de la modification d'un indicateur.
   * Elle prend en paramètre l'indicateur à modifier.
   * @param indicateur
   */
  modifierIndicateur(indicateur: CommuneIndicateur) {
    this.childEvent.emit({ etat: 2, indicateurCourant: indicateur });
  }

  /**
   * A l'initialisation de la page, la liste des indicateurs se met à jour
   */
  ngOnInit() {
    this.indicateursService.getListeIndicateurs().subscribe(
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
    this.affichageIndicateurs = false;
    this.suppressionIndicateur = true;
    this.communeSuppression = communeIndicateur;
  }

  /**
   * méthode qui permet d'annuler la suppression d'un indicateur et de revenir à l'affichage des indicateurs
   */
  annulationSuppressionIndicateur() {
    this.suppressionIndicateur = false;
    this.affichageIndicateurs = true;
  }

  afficherDonnees(indicateur: CommuneIndicateur) {
    this.childEvent.emit({ etat: 3, indicateurCourant: indicateur })
  }

  /**
   * Methode qui permet la suppression définitive d'un indicateur.
   */
  confirmationSuppressionIndicateur() {
    this.indicateursService
      .supprimerIndicateur(this.communeSuppression.nomCommune)
      .subscribe(
        result => {
          this.suppressionIndicateur = false;
          this.affichageIndicateurs = true;

          if (this.listeIndicateurs.length === 1) {
            this.indicateurVide = false;
          }

          this.indicateursService.getListeIndicateurs().subscribe(
            result => {
              this.listeIndicateurs = result;
              if (this.listeIndicateurs.length === 0) {
                this.indicateurVide = true;
              }
              if (this.listeIndicateurs.length === 4) {
                this.compteurIndicateurs = true;
              }
            },
            err => { }
          );
        },
        err => {
          this.suppressionIndicateur = false;
          this.affichageIndicateurs = true;
        }
      );
  }
}
